// src/pages/Comments.tsx
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CommentItemComponent, { CommentItem } from '../components/CommentItem';
import Spinner from '../components/Spinner';
import styles from './Comments.module.css';

const Comments: React.FC = () => {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [newContent, setNewContent] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Set API URL using environment variable or default value
  const apiUrl = process.env.REACT_APP_API_URL || '/api/';

  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}comments?page=${page}&limit=${limit}`);
      const data = await response.json();
      if (response.ok) {
        setComments(data.data);
        setTotalCount(data.totalCount);
      } else {
        console.error('Fetch comments error:', data.error);
      }
    } catch (error) {
      console.error('Fetch comments error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateComment = async () => {
    if (!newContent || !newPassword) {
      alert('Please enter both comment content and password.');
      return;
    }
    try {
      const response = await fetch(`${apiUrl}comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentHeaderId: null, // Create parent comment
          content: newContent,
          userPassword: newPassword,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Comment created successfully.');
        setNewContent('');
        setNewPassword('');
        setPage(1);
        fetchComments();
      } else {
        alert(`Comment creation failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Create comment error:', error);
    }
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div>
      <Header />
      <main className={styles.pageContainer}>
        <h1 style={{ marginBottom: '20px' }}>Comments</h1>
        <p className={styles.infoText}>
          * Your username is automatically generated based on a hashed value of your IP address.
        </p>
        <section className={styles.newCommentContainer}>
          {/* Left column: Enter comment content */}
          <div className={styles.commentInputColumn}>
            <textarea
              className={styles.newCommentTextarea}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Enter your comment."
              rows={3}
            />
          </div>
          {/* Right column: Password input and comment submission button */}
          <div className={styles.commentActionColumn}>
            <input
              type="password"
              className={styles.actionInput}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Password"
            />
            <button className={styles.actionButton} onClick={handleCreateComment}>
              Submit Comment
            </button>
          </div>
        </section>
        <section>
          {isLoading ? (
            <Spinner />
          ) : (
            comments.map((comment) => (
              <CommentItemComponent
                key={comment.id}
                comment={comment}
                apiUrl={apiUrl}
                onReload={fetchComments}
              />
            ))
          )}
        </section>
        <div className={styles.pagination}>
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </button>
          <span>
            {page} / {Math.ceil(totalCount / limit)} pages
          </span>
          <button disabled={page * limit >= totalCount} onClick={() => setPage(page + 1)}>
            Next
          </button>
        </div>
        {/* Move "Powered by OCI Autonomous Database" above Footer */}
        <p className={styles.footer}>Powered by OCI Autonomous Database</p>
      </main>
      <Footer />
    </div>
  );
};

export default Comments;
