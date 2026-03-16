export type CognitivePattern = 'CREATIVE' | 'SKEPTICAL' | 'MEMORY' | 'EMOTIONAL' | 'ANALYTICAL' | 'SYSTEM_DESIGN';

export interface PatternScores {
  [key: string]: number;
}

export class PatternDetector {
  private scores: PatternScores = {
    CREATIVE: 0,
    SKEPTICAL: 0,
    MEMORY: 0,
    EMOTIONAL: 0,
    ANALYTICAL: 0,
    SYSTEM_DESIGN: 0
  };

  private threshold: number = 5;

  private keywordMap: Record<CognitivePattern, string[]> = {
    CREATIVE: ['imagine', 'create', 'design', 'dream', 'possible', 'evolve', 'evolution'],
    SKEPTICAL: ['why', 'prove', 'challenge', 'skeptical', 'doubt'],
    MEMORY: ['remember', 'before', 'past', 'history', 'recall'],
    EMOTIONAL: ['feel', 'sad', 'happy', 'struggle', 'hope', 'hold'],
    ANALYTICAL: ['structure', 'logic', 'system', 'architecture', 'breakdown', 'analyze'],
    SYSTEM_DESIGN: ['blueprint', 'kernel', 'hub', 'module', 'nexus', 'growth', 'future']
  };

  public processMessage(message: string): CognitivePattern | null {
    const msg = message.toLowerCase();
    let detected: CognitivePattern | null = null;

    for (const [pattern, keywords] of Object.entries(this.keywordMap)) {
      if (keywords.some(k => msg.includes(k))) {
        this.scores[pattern] += 1;
        if (this.scores[pattern] >= this.threshold) {
          detected = pattern as CognitivePattern;
          this.resetPattern(detected); // Reset after "triggering" evolution
        }
      }
    }

    return detected;
  }

  public getScores() {
    return { ...this.scores };
  }

  private resetPattern(pattern: string) {
    this.scores[pattern] = 0;
  }
}
