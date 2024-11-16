'use client';

import { useEffect, useState } from 'react';

type CIStatus = {
  stage: string;
  status: string;
  logs: string;
  time: string;
};

export default function Dashboard() {
  const [ciStatus, setCIStatus] = useState<CIStatus[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/status');
        const data = await response.json();
        setCIStatus(data);
      } catch (error) {
        console.error('Error fetching CI/CD status:', error);
      }
    };

    // 初始加载数据
    fetchData();

    // 定期更新数据（每5秒）
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>CI/CD Dashboard</h1>
      {ciStatus.length > 0 ? (
        ciStatus.map((status, index) => (
          <div
            key={index}
            style={{
              marginBottom: '20px',
              border: '1px solid #ccc',
              padding: '10px',
              borderRadius: '5px',
            }}
          >
            <h2>{status.stage}</h2>
            <p>Status: {status.status}</p>
            <p>Logs: {status.logs}</p>
            <p>Time: {new Date(status.time).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>Loading CI/CD status...</p>
      )}
    </div>
  );
}
