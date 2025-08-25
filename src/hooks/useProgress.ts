import { useEffect, useState } from 'react';
import useBoards from './useBoards';

const useProgress = () => {
  const { boards, isLoading, error } = useBoards();
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (!boards || isLoading || error) return;
    // Calculate the summatory of parameters
    const current = boards.reduce((acc, { current }) => acc + current, 0);
    const total = boards.reduce((acc, { total }) => acc + total, 0);

    // Calculate the total progress
    const stats = total !== 0 ? (current / total) * 100 : 0;
    const roundedProgress = Number(stats.toFixed(2));
    setProgress(roundedProgress);
  }, [boards, isLoading, error]);

  return { progress, isLoading, error };
};

export default useProgress;
