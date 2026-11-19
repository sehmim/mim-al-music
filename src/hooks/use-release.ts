import { useEffect, useState } from "react";

/** setTimeout tops out at about 24.8 days; longer waits are re-armed in steps. */
const MAX_DELAY = 2 ** 31 - 1;

/** True once `target` has passed. Flips on its own at release time without polling. */
export const useReleased = (target: number) => {
  const [released, setReleased] = useState(() => Date.now() >= target);

  useEffect(() => {
    if (released) return;
    let timer: ReturnType<typeof setTimeout>;
    const arm = () => {
      const wait = target - Date.now();
      if (wait <= 0) return setReleased(true);
      timer = setTimeout(arm, Math.min(wait, MAX_DELAY));
    };
    arm();
    return () => clearTimeout(timer);
  }, [target, released]);

  return released;
};

export interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

const split = (ms: number): Remaining => {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor(total / 3600) % 24,
    minutes: Math.floor(total / 60) % 60,
    seconds: total % 60,
    done: total === 0,
  };
};

/** Time left until `target`, updated on each whole second. */
export const useCountdown = (target: number): Remaining => {
  const [left, setLeft] = useState(() => split(target - Date.now()));

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const ms = target - Date.now();
      setLeft(split(ms));
      if (ms <= 0) return;
      // Land just after the next second boundary so the digits change in step with the clock.
      timer = setTimeout(tick, (ms % 1000) + 20);
    };
    tick();
    return () => clearTimeout(timer);
  }, [target]);

  return left;
};
