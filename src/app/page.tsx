'use client';

import { useEffect, useState } from 'react';

type CIStatus = {
  _id: string;
  stage: string;
  status: string;
  logs: string;
  time: string;
};

export default function Home() {
  const [ciStatus, setCIStatus] = useState<CIStatus[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/status');
        const data = await response.json();
        if (data.success) {
          setCIStatus(data.data);
        } else {
          console.error('Failed to fetch CI/CD status:', data.message);
        }
      } catch (error) {
        console.error('Error fetching CI/CD status:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>CI/CD Dashboard</h1>
      {ciStatus.length > 0 ? (
        ciStatus.map((status) => (
          <div
            key={status._id}
            style={{
              border: '1px solid #ddd',
              padding: '10px',
              margin: '10px 0',
              borderRadius: '5px',
              backgroundColor: status.status === 'Success' ? '#e0f7e9' : '#fce4e4',
            }}
          >
            <h2>{status.stage}</h2>
            <p>
              <strong>Status:</strong> {status.status}
            </p>
            <p>
              <strong>Logs:</strong> {status.logs}
            </p>
            <p>
              <strong>Time:</strong> {new Date(status.time).toLocaleString()}
            </p>
          </div>
        ))
      ) : (
        <p>Loading CI/CD status...</p>
      )}
    </div>
  );
}
