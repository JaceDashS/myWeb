// client/src/components/Spinner.tsx
import React from 'react';

const Spinner: React.FC = () => (
    <>
        <style>
            {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
        </style>
        <div
            style={{
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #3498db',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                animation: 'spin 1s linear infinite',
            }}
        />
    </>
);

export default Spinner;
