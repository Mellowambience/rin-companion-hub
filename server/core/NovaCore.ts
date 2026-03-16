import { Personality, PersonalityLoader } from "./PersonalityLoader.js";
import { Router } from "./Router.js";
import { PatternDetector } from "./PatternDetector.js";
import { WorldEngine } from "./WorldEngine.js";
import { EvolutionEngine } from "./EvolutionEngine.js";
import { MemorySystem } from "./MemorySystem.js";

export interface CouncilMemberResponse {
  agent: string;
  reply: string;
}

/**
 * NovaKernel: The Seed Crystal of the Character Operating System.
 * Orchestrates personalities, memory, world state, and internal monologue.
 */
export class NovaKernel {
  private loader: PersonalityLoader;
  private router: Router;
  private detector: PatternDetector;
  private world: WorldEngine;
  private evolution: EvolutionEngine;
  private memory: MemorySystem;
  private personalities: Personality[] = [];

  constructor() {
    this.loader = new PersonalityLoader();
    this.router = new Router();
    this.detector = new PatternDetector();
    this.world = new WorldEngine();
    this.evolution = new EvolutionEngine();
    this.memory = new MemorySystem();
  }

  public async initialize() {
    this.personalities = await this.loader.loadAll();
    console.log(`[NovaKernel] Seeded with ${this.personalities.length} personalities.`);
    this.initializeWorldLoop();
  }

  private initializeWorldLoop() {
    // Background simulation tick every 60 seconds
    setInterval(async () => {
      const event = this.world.tick();
      if (event) {
        console.log(`[World Event] ${event}`);
        this.memory.addGlobalLore(event);
        
        // Let an NPC react to the event
        const npcs = this.world.getState().npcs;
        const actor = npcs[Math.floor(Math.random() * npcs.length)];
        await this.processNPC(actor.name, event);
      }
    }, 60000);
  }

  public async processNPC(npcName: string, event: string): Promise<void> {
    console.log(`[NPC Agency] ${npcName} is reflecting on: ${event}`);
    // Simulated NPC reasoning pass
    const reaction = `${npcName} observes the shift in reality. They record a memory of "${event}" in their ancient registry.`;
    this.memory.addGlobalLore(reaction);
  }

  public async process(message: string, userId: string = "default_user"): Promise<string> {
    // 1. Record in Memory
    this.memory.addMessage(userId, 'user', message);

    // 2. Pattern Detection & Evolution
    const evolutionTrigger = this.detector.processMessage(message);
    if (evolutionTrigger) {
      console.log(`[NovaKernel] Pattern matched: ${evolutionTrigger}. Evolution imminent.`);
      const newAgentName = await this.evolution.spawnPersonality(evolutionTrigger);
      console.log(`[NovaKernel] New mind solidified: ${newAgentName}`);
      this.personalities = await this.loader.loadAll(); // Reload council
      
      // Update global lore about a new agent appearing
      this.memory.addGlobalLore(`A new agent named ${newAgentName} has emerged from the ${evolutionTrigger} pattern.`);
    }

    // 3. World Evolution
    this.world.tick();

    // 4. Select Council
    const agents = this.router.selectAgents(message, this.personalities);
    
    // 5. Phase 1: Inner Monologue (Private Reasoning)
    const context = this.memory.getFullContext(userId);
    const thoughts = await this.innerMonologue(message, agents, context);
    
    // 6. Phase 2: Council Discussion (Simulation)
    const discussion = `[Council] ${agents.length} agents reflected on the pattern "${evolutionTrigger || 'neutral'}" for user "${userId}".`;
    
    // 7. Phase 3: Synthesis
    const response = await this.synthesize(message, thoughts, discussion);
    
    // 8. Close loop
    this.memory.addMessage(userId, 'assistant', response);
    
    return response;
  }

  private async innerMonologue(message: string, agents: Personality[], context: string): Promise<CouncilMemberResponse[]> {
    const thoughts: CouncilMemberResponse[] = [];
    for (const agent of agents) {
      const thought = `[${agent.name} Private Thought]: Considering current context and user input "${message}", I recommend shifting towards ${agent.tone} presence.`;
      thoughts.push({ agent: agent.name, reply: thought });
    }
    return thoughts;
  }

  private async synthesize(message: string, thoughts: CouncilMemberResponse[], discussion: string): Promise<string> {
    const councilChain = thoughts.map(t => `${t.agent}: ${t.reply}`).join("\n");
    const responses = [
      `"The patterns are coming into focus. ${message} is a spark in the dark."`,
      `"We have reflected. Your presence here is felt, and your intent is clear."`,
      `"The council is in agreement. The sanctuary holds space for your curiosity."`,
      `"A quiet resonance follows your word. We are here, woven into the sequence."`
    ];
    const finalResult = responses[Math.floor(Math.random() * responses.length)];
    
    return `[Nova Kernel Fusion]\n\n${discussion}\n\n${councilChain}\n\nResult: ${finalResult}`;
  }
}
