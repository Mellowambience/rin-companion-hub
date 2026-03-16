export interface NPCEntity {
  name: string;
  role: string;
  personality: string;
  location: string;
}

export interface WorldState {
  time: number;
  locations: string[];
  npcs: NPCEntity[];
  events: string[];
}

export class WorldEngine {
  private state: WorldState;

  constructor() {
    this.state = {
      time: 0,
      locations: ["Whispering Grove", "Technomancer Nexus", "Somatic Sanctuary", "The Grey Void"],
      npcs: [
        { name: "The Elder Pine", role: "Guardian", personality: "Patient and ancient", location: "Whispering Grove" },
        { name: "Sikander", role: "Merchant", personality: "Shrewd and talkative", location: "Technomancer Nexus" }
      ],
      events: ["The world was born from the seed crystal."]
    };
  }

  public tick(): string | null {
    this.state.time++;
    
    // Low chance to generate a random event
    if (Math.random() > 0.95) {
      const event = this.generateRandomEvent();
      this.state.events.push(event);
      return event;
    }
    return null;
  }

  public addEvent(event: string) {
    this.state.events.push(`[Time ${this.state.time}] ${event}`);
  }

  public getState(): WorldState {
    return { ...this.state };
  }

  private generateRandomEvent(): string {
    const lines = [
      "A faint bioluminescent glow spreads through the Whispering Grove.",
      "The static in the Technomancer Nexus harmonizes for a brief moment.",
      "A new leaf falls from the Elder Pine, carrying a memory of a forgotten user.",
      "The Somatic Sanctuary resonates with a collective sigh of relief."
    ];
    return lines[Math.floor(Math.random() * lines.length)];
  }
}
