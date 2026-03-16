import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export interface Personality {
  name: string;
  role: string;
  purpose: string;
  tone: string;
  traits: Record<string, string>;
  prompt: string;
}

export class PersonalityLoader {
  private personalitiesPath: string;

  constructor() {
    this.personalitiesPath = path.join(process.cwd(), 'server', 'personalities');
  }

  public async loadAll(): Promise<Personality[]> {
    const files = fs.readdirSync(this.personalitiesPath);
    const yamlFiles = files.filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));

    const personalities: Personality[] = [];

    for (const file of yamlFiles) {
      const filePath = path.join(this.personalitiesPath, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const data = yaml.load(content) as Personality;
      personalities.push(data);
    }

    return personalities;
  }
}
