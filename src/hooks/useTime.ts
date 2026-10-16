import { useState, useEffect } from "react";

export function useTime() {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    let animationFrameId: number;
    let lastTick = Date.now();

    const tick = () => {
      const now = Date.now();
      if (now - lastTick >= 1000) { // Optimize: only update React state once a second
        setTime(new Date(now));
        lastTick = now;
      } else {
        // Alternatively we can update more frequently if we want smooth sweeping hands
        // but typically per second is enough unless it's a smooth analog sweep
        setTime(new Date(now));
      }
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return time;
}
