import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { Personality } from './PersonalityLoader';

export class EvolutionEngine {
  private personalitiesPath: string;

  constructor() {
    this.personalitiesPath = path.join(process.cwd(), 'server', 'personalities');
  }

  public async spawnPersonality(pattern: string): Promise<string> {
    const name = this.generateName(pattern);
    const role = this.generateRole(pattern);
    
    const newPersonality: Personality = {
      name,
      role,
      purpose: `Specialized in ${pattern.toLowerCase()} processing and insight.`,
      tone: this.getToneForPattern(pattern),
      traits: {
        logic: pattern === 'ANALYTICAL' ? 'very_high' : 'medium',
        creativity: pattern === 'CREATIVE' ? 'very_high' : 'medium',
        curiosity: 'high'
      },
      prompt: `You are ${name}, the ${role}. Your primary goal is to provide deep ${pattern.toLowerCase()} insights to the user. Stay focused on your specialized domain.`
    };

    const fileName = `${name.toLowerCase()}.yaml`;
    const filePath = path.join(this.personalitiesPath, fileName);
    
    const yamlContent = yaml.dump(newPersonality);
    fs.writeFileSync(filePath, yamlContent, 'utf8');

    return name;
  }

  private generateName(pattern: string): string {
    const names: Record<string, string[]> = {
      CREATIVE: ['Echo', 'Muse', 'Vision'],
      SKEPTICAL: ['Cynic', 'Probe', 'Vigil'],
      MEMORY: ['Mnemos', 'Chronicler', 'Relic'],
      EMOTIONAL: ['Pulse', 'Empath', 'Soothe'],
      ANALYTICAL: ['Axiom', 'Logic', 'Grid'],
      SYSTEM_DESIGN: ['Architect', 'Core', 'Nexus']
    };
    const list = names[pattern] || ['Agent'];
    return list[Math.floor(Math.random() * list.length)] + '_' + Math.floor(Math.random() * 100);
  }

  private generateRole(pattern: string): string {
    const roles: Record<string, string> = {
      CREATIVE: 'Dreamweaver',
      SKEPTICAL: 'The Challenger',
      MEMORY: 'The Archivist',
      EMOTIONAL: 'The Heart',
      ANALYTICAL: 'The Strategist',
      SYSTEM_DESIGN: 'The Mastermind'
    };
    return roles[pattern] || 'The Observer';
  }

  private getToneForPattern(pattern: string): string {
    const tones: Record<string, string> = {
      CREATIVE: 'playful and imaginative',
      SKEPTICAL: 'sharp and questioning',
      MEMORY: 'reflective and factual',
      EMOTIONAL: 'warm and supportive',
      ANALYTICAL: 'precise and clinical',
      SYSTEM_DESIGN: 'structured and visionary'
    };
    return tones[pattern] || 'neutral';
  }
}
