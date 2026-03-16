import { useState, useEffect, useCallback } from 'react';

/**
 * 4-4-6-2 Breath Cycle:
 * - 4s Inhale
 * - 4s Hold
 * - 6s Exhale
 * - 2s Rest
 * Total: 16s
 */

export type BreathStage = 'inhale' | 'hold' | 'exhale' | 'rest';

export interface BreathState {
  stage: BreathStage;
  progress: number; // 0 to 1 within the current stage
  totalProgress: number; // 0 to 1 within the entire 16s cycle
}

const DURATIONS: Record<BreathStage, number> = {
  inhale: 4000,
  hold: 4000,
  exhale: 6000,
  rest: 2000,
};

const CYCLE_START_TIMES: Record<BreathStage, number> = {
  inhale: 0,
  hold: 4000,
  exhale: 8000,
  rest: 14000,
};

const TOTAL_CYCLE_DURATION = 16000;

export function useBreathCycle() {
  const [startTime] = useState(() => Date.now());
  const [state, setState] = useState<BreathState>({
    stage: 'inhale',
    progress: 0,
    totalProgress: 0,
  });

  const update = useCallback(() => {
    const elapsed = (Date.now() - startTime) % TOTAL_CYCLE_DURATION;
    const totalProgress = elapsed / TOTAL_CYCLE_DURATION;

    let stage: BreathStage = 'inhale';
    if (elapsed < 4000) stage = 'inhale';
    else if (elapsed < 8000) stage = 'hold';
    else if (elapsed < 14000) stage = 'exhale';
    else stage = 'rest';

    const stageElapsed = elapsed - CYCLE_START_TIMES[stage];
    const progress = stageElapsed / DURATIONS[stage];

    setState({ stage, progress, totalProgress });
  }, [startTime]);

  useEffect(() => {
    let animFrame: number;
    const tick = () => {
      update();
      animFrame = requestAnimationFrame(tick);
    };
    animFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame);
  }, [update]);

  return state;
}
