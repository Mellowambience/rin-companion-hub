export interface MessageEntry {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export class MemorySystem {
  // Map of userId -> personal history/notes
  private userSessions: Map<string, { history: MessageEntry[], notes: string[] }> = new Map();
  // Shared global lore and world events
  private globalLore: string[] = ["The sanctuary was founded in the first tick of the Nova Kernel."];

  public addMessage(userId: string, role: 'user' | 'assistant' | 'system', content: string) {
    if (!this.userSessions.has(userId)) {
      this.userSessions.set(userId, { history: [], notes: [] });
    }
    const session = this.userSessions.get(userId)!;
    session.history.push({ role, content, timestamp: Date.now() });
    
    if (session.history.length > 50) {
      session.history.shift();
    }
  }

  public addUserNote(userId: string, note: string) {
    const session = this.ensureSession(userId);
    session.notes.push(note);
  }

  public addGlobalLore(lore: string) {
    this.globalLore.push(lore);
  }

  public recallUser(userId: string, n: number = 5): MessageEntry[] {
    const session = this.userSessions.get(userId);
    return session ? session.history.slice(-n) : [];
  }

  public getGlobalLore(): string[] {
    return [...this.globalLore];
  }

  public getFullContext(userId: string): string {
    const session = this.ensureSession(userId);
    const historyBlock = session.history.map(m => `[${m.role}]: ${m.content}`).join('\n');
    const notesBlock = session.notes.map(n => `[Personal Note]: ${n}`).join('\n');
    const loreBlock = this.globalLore.map(l => `[World Lore]: ${l}`).join('\n');
    
    return `### WORLD LORE\n${loreBlock}\n\n### PERSONAL CONTEXT\n${notesBlock}\n\n### RECENT DIALOGUE\n${historyBlock}`;
  }

  private ensureSession(userId: string) {
    if (!this.userSessions.has(userId)) {
      this.userSessions.set(userId, { history: [], notes: [] });
    }
    return this.userSessions.get(userId)!;
  }
}
