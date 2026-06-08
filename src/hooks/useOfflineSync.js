import { useState, useEffect } from 'react';

export default function useOfflineSync() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [pendingQueue, setPendingQueue] = useState(0);

  useEffect(() => {
    // Check local storage on mount to see if we have old unsynced items
    const checkQueue = () => {
      const queue = JSON.parse(localStorage.getItem('anirescue_offline_queue')) || [];
      setPendingQueue(queue.length);
    };
    checkQueue();

    const handleOnline = () => {
      setIsOffline(false);
      syncPendingData();
    };
    
    const handleOffline = () => {
      setIsOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Save a failed/offline report to localStorage
  const saveForOfflineSync = (reportData) => {
    const currentQueue = JSON.parse(localStorage.getItem('anirescue_offline_queue')) || [];
    currentQueue.push({ 
      ...reportData, 
      timestamp: new Date().toISOString(),
      offlineId: Date.now() 
    });
    // This is where a QuotaExceededError is thrown if the file is too big
    localStorage.setItem('anirescue_offline_queue', JSON.stringify(currentQueue));
    setPendingQueue(currentQueue.length);
  };

  // The function that runs automatically when the internet returns
  const syncPendingData = () => {
    const queue = JSON.parse(localStorage.getItem('anirescue_offline_queue')) || [];
    if (queue.length === 0) return;

    console.log(`🌍 Internet restored! Syncing ${queue.length} pending reports to backend...`);
    
    // Simulate the upload delay and clear the queue
    setTimeout(() => {
      localStorage.removeItem('anirescue_offline_queue');
      setPendingQueue(0);
      alert(`✅ Connection restored! Successfully synced ${queue.length} offline rescue reports.`);
    }, 2500);
  };

  return { isOffline, pendingQueue, saveForOfflineSync };
}