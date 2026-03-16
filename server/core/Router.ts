import { Personality } from "./PersonalityLoader";

export class Router {
  public selectAgents(message: string, personalities: Personality[]): Personality[] {
    const selectedNames: string[] = [];
    const msg = message.toLowerCase();

    // Semantic keyword mapping (Simple prototype)
    if (msg.includes("why") || msg.includes("meaning") || msg.includes("feel") || msg.includes("idea")) {
      selectedNames.push("Lumina");
    }

    if (msg.includes("doubt") || msg.includes("really") || msg.includes("challenge") || msg.includes("mistake")) {
      selectedNames.push("Myrrha");
    }

    if (msg.includes("remember") || msg.includes("recall") || msg.includes("history") || msg.includes("data")) {
      selectedNames.push("Kheper");
    }

    // Default to Lumina if no specific match
    if (selectedNames.length === 0) {
      selectedNames.push("Lumina");
    }

    return personalities.filter(p => selectedNames.includes(p.name));
  }
}
