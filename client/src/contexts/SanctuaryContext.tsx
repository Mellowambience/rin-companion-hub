import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useBreathCycle, BreathState } from '../hooks/useBreathCycle';

export type PersonaLayer = 'companion' | 'technomancer' | 'streamer';
export type SomaticState = 'calm' | 'activated' | 'overwhelmed' | 'grounded';

interface SanctuaryContextType {
  personaLayer: PersonaLayer;
  setPersonaLayer: (layer: PersonaLayer) => void;
  somaticState: SomaticState;
  setSomaticState: (state: SomaticState) => void;
  breath: BreathState;
}

const SanctuaryContext = createContext<SanctuaryContextType | undefined>(undefined);

export function SanctuaryProvider({ children }: { children: ReactNode }) {
  const [personaLayer, setPersonaLayer] = useState<PersonaLayer>('companion');
  const [somaticState, setSomaticState] = useState<SomaticState>('calm');
  const breath = useBreathCycle();

  return (
    <SanctuaryContext.Provider
      value={{
        personaLayer,
        setPersonaLayer,
        somaticState,
        setSomaticState,
        breath,
      }}
    >
      {children}
    </SanctuaryContext.Provider>
  );
}

export function useSanctuary() {
  const context = useContext(SanctuaryContext);
  if (context === undefined) {
    throw new Error('useSanctuary must be used within a SanctuaryProvider');
  }
  return context;
}
