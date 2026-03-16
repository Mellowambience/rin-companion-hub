import { Server as SocketIOServer } from "socket.io";
import { Server as HTTPServer } from "http";
import { NovaKernel } from "./core/NovaCore.js";

export class NovaGateway {
  private io: SocketIOServer;
  private kernel: NovaKernel;

  constructor(server: HTTPServer, kernel: NovaKernel) {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });
    this.kernel = kernel;
    this.setupHandlers();
  }

  private setupHandlers() {
    this.io.on("connection", (socket) => {
      const userId = socket.handshake.query.userId as string || socket.id;
      console.log(`[NovaGateway] User connected: ${userId}`);

      socket.on("message", async (msg: string) => {
        try {
          const response = await this.kernel.process(msg, userId);
          socket.emit("response", response);
          
          // Broadcast lore updates or world events to all users
          this.broadcastWorldState();
        } catch (error) {
          console.error("[NovaGateway Error]", error);
          socket.emit("error", "Failed to process message");
        }
      });

      socket.on("disconnect", () => {
        console.log(`[NovaGateway] User disconnected: ${userId}`);
      });
    });
  }

  private broadcastWorldState() {
    // In a real scenario, this would send relevant world updates
    this.io.emit("world_update", {
      timestamp: Date.now(),
      message: "The world pulse remains steady..."
    });
  }
}
