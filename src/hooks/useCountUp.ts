import { useEffect, useState } from "react";

export function useCountUp(target: number, duration = 1500, start = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const isFloat = !Number.isInteger(target);
    const step = (t: number) => {
      const elapsed = t - t0;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const v = target * eased;
      setValue(isFloat ? parseFloat(v.toFixed(1)) : Math.floor(v));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);

  return value;
}
