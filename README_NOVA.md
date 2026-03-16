# Nova Core Operation Guide

The Nova Core is a dual-layer system: a **VRM Somatic Frontend** (Vite) and a **Distributed Kernel Backend** (Node/Express/Socket.io).

## 1. Start the Distributed Kernel (Backend)
The kernel manages personalities, memory, world state, and the WebSocket gateway.

```bash
# In the project root:
npx tsx server/index.ts
```
*Note: I have already started this for you in the current session.*

## 2. Start the Somatic Interface (Frontend)
This runs the 3D VRM model and the Sanctuary UI.

```bash
# In the project root:
pnpm run dev
# (Currently running at http://localhost:3001)
```

## 3. Interaction Protocols

### A. Real-Time WebSocket (The Nova Network)
Connect to `http://localhost:3000` using a `socket.io-client`.
- **Event:** `message` (send your input)
- **Event:** `response` (receive synthesized council output)
- **Event:** `world_update` (receive background world events)

### B. HTTP API (The Direct Line)
```bash
curl -X POST http://localhost:3000/api/nova/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "I want to design a new world module."}'
```

## 4. Monitoring Evolution
Watch the server console logs for:
- `[World Event]`: Background simulation advancements.
- `[NPC Agency]`: Characters in the world reflecting on events.
- `[NovaKernel] New mind solidified`: Triggered when your conversation patterns (Creative, Skeptical, etc.) hit the threshold and a new personality YAML is created.

Check `server/personalities/` to see new agents appear in real-time as you chat!
