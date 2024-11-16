'use client';

import { useEffect, useState } from 'react';

type CIStatus = {
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
        setCIStatus(data.data);
      } catch (error) {
        console.error('Error fetching CI/CD status:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // 每5秒刷新一次
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">CI/CD Dashboard</h1>
      {ciStatus.length > 0 ? (
        <div className="space-y-6 w-full max-w-4xl">
          {ciStatus
            .slice()
            .reverse()
            .map((status, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 ${
                  status.status === 'Success'
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                }`}
              >
                <h2 className="text-2xl font-semibold mb-2">{status.stage}</h2>
                <p className="text-lg">
                  <span className="font-bold">Status:</span> {status.status}
                </p>
                <p className="text-lg">
                  <span className="font-bold">Logs:</span> {status.logs}
                </p>
                <p className="text-sm mt-2 text-gray-200">
                  <span className="font-bold">Time:</span>{' '}
                  {new Date(status.time).toLocaleString()}
                </p>
              </div>
            ))}
        </div>
      ) : (
        <p className="text-lg text-gray-400">Loading CI/CD status...</p>
      )}
    </div>
  );
}
