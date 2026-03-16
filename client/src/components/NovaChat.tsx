import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const SOCKET_URL = "http://localhost:3000";

interface Message {
  text: string;
  isUser: boolean;
  isLore?: boolean;
}

export function NovaChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    newSocket.on("response", (data: string) => {
      setMessages(prev => [...prev, { text: data, isUser: false }]);
    });

    newSocket.on("world_update", (update: { message: string }) => {
      setMessages(prev => [...prev, { text: update.message, isUser: false, isLore: true }]);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || !socket) return;
    
    setMessages(prev => [...prev, { text: input, isUser: true }]);
    socket.emit("message", input);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[500px] bg-white/40 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-[#D4AF8F]/20 flex items-center justify-between bg-[#FDF8F3]/50">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#B49271]" />
          <span className="text-sm font-medium uppercase tracking-wider text-[#8B735B]">Nova Council Chat</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[10px] uppercase font-bold text-[#B49271]">Kernel Online</span>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-[#D4AF8F]/20"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-3 opacity-50">
            <MessageCircle className="w-10 h-10 text-[#D4AF8F]" />
            <p className="text-sm italic">The Council is silent, waiting for your first spark...</p>
          </div>
        )}
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => {
            const isCouncil = msg.text.includes("[Nova Kernel Fusion]");
            
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={cn(
                  "max-w-[90%] p-4 rounded-2xl text-sm leading-relaxed",
                  msg.isUser 
                    ? "ml-auto bg-[#2D1B0E] text-[#FDF8F3] shadow-md font-medium" 
                    : msg.isLore
                      ? "mx-auto bg-amber-50/80 border border-amber-200/50 text-[#8B735B] italic text-center text-xs px-8 py-2 rounded-full"
                      : isCouncil
                        ? "mr-auto bg-white/90 border border-[#D4AF8F]/30 text-[#4A3728] shadow-lg overflow-hidden"
                        : "mr-auto bg-white/80 text-[#4A3728] shadow-sm border border-white/20"
                )}
              >
                {isCouncil ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 border-b border-[#D4AF8F]/10 pb-2 mb-2">
                      <Sparkles className="w-3 h-3 text-[#B49271]" />
                      <span className="text-[10px] uppercase font-bold tracking-tighter text-[#B49271]">Council Synthesis</span>
                    </div>
                    <div className="whitespace-pre-line text-[#6D5D4E] text-xs leading-relaxed italic opacity-80">
                      {msg.text.split("Result:")[0].replace("[Nova Kernel Fusion]", "").trim()}
                    </div>
                    <div className="text-sm font-serif text-[#2D1B0E] pt-2 border-t border-[#D4AF8F]/10">
                      {msg.text.split("Result:")[1]?.trim() || msg.text}
                    </div>
                  </div>
                ) : (
                  msg.text
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-[#FDF8F3]/50 border-t border-[#D4AF8F]/20">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Send a message to the sanctuary..."
            className="flex-1 bg-white/60 border border-[#D4AF8F]/30 rounded-full px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B4B8]/50 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-2.5 bg-[#2D1B0E] text-white rounded-full hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
