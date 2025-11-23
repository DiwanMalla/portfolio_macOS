'use client';

import useStore from '@/store/useStore';
import Window from './Window';

export default function WindowManager() {
  const windows = useStore((state) => state.windows);

  return (
    <>
      {windows.map((windowData) => (
        <Window key={windowData.id} windowData={windowData} />
      ))}
    </>
  );
}
