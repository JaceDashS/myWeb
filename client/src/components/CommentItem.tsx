// src/components/CommentItem.tsx
import React, { useState, useRef, useEffect } from 'react';
import Spinner from './Spinner';
import styles from './CommentItem.module.css';

export interface CommentItem {
  id: number;
  parentHeaderId?: number | null;
  content: string | null;
  createdAt: string;
  updatedAt: string;
  isEdited: number;
  isDeleted: number;
  version: number;
  editedCommentId?: number | null;
  headerId: number;
  tailId: number;
  hashedUser: string;
  children?: CommentItem[];
}

interface CommentProps {
  comment: CommentItem;
  apiUrl: string;
  onReload?: () => void;
}

// Helper function to format time
const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = (now.getTime() - date.getTime()) / 1000;
  const minutes = diffInSeconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;

  if (days < 30) {
    if (days >= 1) {
      const dayCount = Math.floor(days);
      return `${dayCount} day${dayCount > 1 ? 's' : ''} ago`;
    } else if (hours >= 1) {
      const hourCount = Math.floor(hours);
      return `${hourCount} hour${hourCount > 1 ? 's' : ''} ago`;
    } else if (minutes >= 1) {
      const minuteCount = Math.floor(minutes);
      return `${minuteCount} minute${minuteCount > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  } else {
    return date.toLocaleString();
  }
};

const CommentItemComponent: React.FC<CommentProps> = ({ comment, apiUrl, onReload }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [deletePassword, setDeletePassword] = useState('');
  const [history, setHistory] = useState<CommentItem[] | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isParent = !comment.parentHeaderId;

  // 더 이상 별도의 자식 댓글 API 호출을 하지 않습니다.
  // 백엔드 API에서 부모 댓글 조회 시 이미 children 필드로 자식 댓글을 포함하여 반환합니다.
  const [showChild, setShowChild] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [replyPassword, setReplyPassword] = useState('');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchHistory = async () => {
    setIsHistoryLoading(true);
    try {
      const response = await fetch(`${apiUrl}comments/${comment.id}/history`);
      const data = await response.json();
      if (response.ok) {
        setHistory(data.history);
      } else {
        console.error('Fetch comment history error:', data.error);
      }
    } catch (error) {
      console.error('Fetch comment history error:', error);
    } finally {
      setIsHistoryLoading(false);
    }
  };

  const handleUpdateComment = async () => {
    if (!editContent || !editPassword) {
      alert('Please enter the update content and password.');
      return;
    }
    try {
      const url = `${apiUrl}comments/${comment.id}`;
      const payload: any = { content: editContent, userPassword: editPassword };
      if (!isParent) {
        payload.newHashedUserIP = comment.hashedUser;
      }
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        alert(isParent ? 'Comment has been updated.' : 'Reply has been updated.');
        setIsEditing(false);
        if (onReload) onReload();
      } else {
        alert(`Update failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Update comment error:', error);
    }
  };

  const handleDeleteComment = async () => {
    if (!deletePassword) {
      alert('Please enter the password to delete.');
      return;
    }
    try {
      const url = `${apiUrl}comments/${comment.id}`;
      const payload: any = { userPassword: deletePassword };
      if (!isParent) {
        payload.newHashedUserIP = comment.hashedUser;
      }
      const response = await fetch(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        alert(isParent ? 'Comment has been deleted.' : 'Reply has been deleted.');
        if (onReload) onReload();
      } else {
        alert(`Deletion failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Delete comment error:', error);
    }
  };

  const handleMenuSelect = (action: 'edit' | 'delete' | 'history') => {
    setShowMenu(false);
    if (action === 'edit') {
      setIsEditing(true);
      setEditContent(comment.content || '');
      setEditPassword('');
      setIsDeleting(false);
    } else if (action === 'delete') {
      setIsDeleting(true);
      setDeletePassword('');
      setIsEditing(false);
    } else if (action === 'history') {
      if (!showHistory) fetchHistory();
      setShowHistory((prev) => !prev);
    }
  };

  // toggleChild 단순히 showChild 상태만 토글합니다.
  const toggleChild = () => {
    setShowChild((prev) => !prev);
    setShowMenu(false);
  };

  // 백엔드에서 전달받은 comment.children 배열을 사용합니다.
  const childrenToRender: CommentItem[] = comment.children || [];

  const childButtonText = showChild
    ? 'Hide Replies'
    : childrenToRender.length > 0
      ? 'View Replies'
      : 'Write Reply';

  const handleCreateReply = async () => {
    if (!replyContent || !replyPassword) {
      alert('Please enter the reply content and password.');
      return;
    }
    try {
      const response = await fetch(`${apiUrl}comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentHeaderId: comment.headerId,
          content: replyContent,
          userPassword: replyPassword,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Reply has been created.');
        setReplyContent('');
        setReplyPassword('');
        if (onReload) onReload();
      } else {
        alert(`Reply creation failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Create reply error:', error);
    }
  };

  return (
    <div className={`${styles.container} ${isParent ? styles.parent : styles.child}`}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.info}>
          <div>
            <div className={isParent ? styles.usernameParent : styles.usernameChild}>
              {comment.hashedUser}
            </div>
            <div className={isParent ? styles.timeParent : styles.timeChild}>
              {formatTime(comment.createdAt)}
            </div>
          </div>
        </div>
        {comment.content !== null && (
          <div className={styles.menuContainer} ref={menuRef}>
            <button
              className={isParent ? styles.menuButtonParent : styles.menuButtonChild}
              onClick={() => setShowMenu((prev) => !prev)}
            >
              ⋮
            </button>
            {showMenu && (
              <div className={styles.dropdownMenu}>
                <div
                  className={isParent ? styles.dropdownItemParent : styles.dropdownItemChild}
                  onClick={() => handleMenuSelect('edit')}
                >
                  Edit
                </div>
                <div
                  className={isParent ? styles.dropdownItemParent : styles.dropdownItemChild}
                  onClick={() => handleMenuSelect('delete')}
                >
                  Delete
                </div>
                <div
                  className={isParent ? styles.dropdownItemParent : styles.dropdownItemChild}
                  onClick={() => handleMenuSelect('history')}
                >
                  {showHistory ? 'Hide History' : 'View History'}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Comment Content or Edit Mode */}
      <div className={isParent ? styles.contentParent : styles.contentChild}>
        {isEditing ? (
          <div className={styles.updateContainer}>
            <div className={styles.updateInputColumn}>
              <textarea
                className={styles.updateTextarea}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                placeholder="Content to update"
                rows={3}
              />
            </div>
            <div className={styles.updateActionColumn}>
              <input
                type="password"
                className={styles.updateActionInput}
                value={editPassword}
                onChange={(e) => setEditPassword(e.target.value)}
                placeholder="Password"
              />
              <div className={styles.buttonGroup}>
                <button className={styles.updateActionButton} onClick={handleUpdateComment}>
                  Confirm
                </button>
                <button className={styles.cancelButton} onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>{comment.content === null ? <em>(deleted)</em> : comment.content}</>
        )}
      </div>

      {/* Deletion Mode */}
      {isDeleting && !isEditing && (
        <div className={styles.deletionContainer}>
          <input
            type="password"
            className={styles.updateActionInput}
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
            placeholder="Delete Password"
          />
          <button className={styles.updateActionButton} onClick={handleDeleteComment}>
            Confirm
          </button>
          <button className={styles.cancelButton} onClick={() => setIsDeleting(false)}>
            Cancel
          </button>
        </div>
      )}

      {/* History Section */}
      {showHistory && (
        <div className={styles.historyContainer}>
          <strong>{isParent ? 'Comment History' : 'Reply History'}</strong>
          {isHistoryLoading ? (
            <Spinner />
          ) : history && history.length > 0 ? (
            <ul className={styles.historyList}>
              {history.map((hist) => (
                <li key={hist.id} className={styles.historyItem}>
                  <span className={styles.historyVersion}>Version {hist.version}:</span>{' '}
                  {hist.content === null ? <em>(deleted)</em> : hist.content}
                  <br />
                  <small className={isParent ? styles.timeParent : styles.timeChild}>
                    {formatTime(hist.updatedAt)}
                  </small>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      )}

      {/* For Parent Comments: Reply Related Section */}
      {isParent && (
        <div>
          <button
            className={`${isParent ? styles.menuButtonParent : styles.menuButtonChild} ${styles.childToggleButton}`}
            onClick={toggleChild}
          >
            {childButtonText}
          </button>
          {showChild && (
            <div className={styles.childContainer}>
              <div>
                {childrenToRender.length > 0 ? (
                  childrenToRender.map((child) => (
                    <CommentItemComponent
                      key={child.id}
                      comment={child}
                      apiUrl={apiUrl}
                      onReload={onReload}
                    />
                  ))
                ) : (
                  <p>No replies available.</p>
                )}
              </div>
              <div className={styles.childReplyContainer}>
                <div className={styles.childReplyInputColumn}>
                  <textarea
                    className={styles.childReplyTextarea}
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Enter your reply content."
                    rows={3}
                  />
                </div>
                <div className={styles.childReplyActionColumn}>
                  <input
                    type="password"
                    className={styles.childReplyPasswordInput}
                    value={replyPassword}
                    onChange={(e) => setReplyPassword(e.target.value)}
                    placeholder="Password"
                  />
                  <button className={styles.childReplyButton} onClick={handleCreateReply}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentItemComponent;
