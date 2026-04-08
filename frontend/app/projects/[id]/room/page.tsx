"use client";

import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Hash, Users, Code, Activity, MessageSquare, Terminal } from 'lucide-react';
import Link from 'next/link';

export default function ProjectRoom({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Alan Turing', role: 'Frontend', avatar: 'A', bgColor: 'bg-emerald-500/50', text: 'Hey team! I just pushed the new UI components to the beta branch.', time: '10:30 AM', isMe: false },
    { id: 2, sender: 'Sarah Connor', role: 'Backend', avatar: 'S', bgColor: 'bg-pink-500/50', text: 'Awesome, I will wire up the API endpoints to them right now. Give me 20 mins.', time: '10:32 AM', isMe: false },
    { id: 3, sender: 'System', role: 'Bot', avatar: '🤖', bgColor: 'bg-purple-500/50', text: 'Alan Turing created a pull request: "Fix responsive layout on dashboard".', time: '10:45 AM', isMe: false, isSystem: true },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setMessages([...messages, { 
      id: Date.now(), 
      sender: 'You', 
      role: 'Senior Eng', 
      avatar: 'Y',
      bgColor: 'bg-primary/80',
      text: newMessage, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
      isMe: true 
    }]);
    setNewMessage('');
  };

  return (
    <div className="pt-24 pb-0 h-screen flex flex-col container mx-auto px-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] -z-10 pointer-events-none" />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 glass-card p-4 rounded-2xl border border-white/10 z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white">
            <Terminal size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Quantum Trade Engine <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/40 uppercase tracking-widest">Live Room</span>
            </h1>
            <p className="text-white/50 text-xs">Project ID # {params.id} • End-to-end encrypted chat</p>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <Link href="/dashboard">
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white/70 transition-colors">
              Exit Room
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 overflow-hidden pb-6">
        {/* Left Sidebar - Channels & Tools */}
        <div className="hidden lg:flex flex-col gap-4">
          <div className="glass-card p-4 rounded-2xl flex-1 border border-white/5">
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-4 px-2">Channels</h3>
            <ul className="space-y-1">
              <li className="flex items-center gap-2 px-3 py-2 bg-primary/20 text-primary border border-primary/30 rounded-lg cursor-pointer text-sm font-medium">
                <Hash size={16} /> general
              </li>
              <li className="flex items-center gap-2 px-3 py-2 hover:bg-white/5 text-white/60 rounded-lg cursor-pointer text-sm transition-colors">
                <Hash size={16} /> frontend-ui
              </li>
              <li className="flex items-center gap-2 px-3 py-2 hover:bg-white/5 text-white/60 rounded-lg cursor-pointer text-sm transition-colors">
                <Hash size={16} /> backend-api
              </li>
            </ul>

            <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-4 px-2 mt-8">Integrations</h3>
            <ul className="space-y-1">
              <li className="flex items-center gap-2 px-3 py-2 hover:bg-white/5 text-white/60 rounded-lg cursor-pointer text-sm transition-colors">
                <Code size={16} className="text-blue-400" /> GitHub Actions
              </li>
              <li className="flex items-center gap-2 px-3 py-2 hover:bg-white/5 text-white/60 rounded-lg cursor-pointer text-sm transition-colors">
                <Activity size={16} className="text-emerald-400" /> Vercel Deployments
              </li>
            </ul>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="lg:col-span-2 flex flex-col glass-card rounded-2xl border border-white/5 overflow-hidden">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'} ${msg.isSystem ? 'justify-center' : ''}`}>
                {msg.isSystem ? (
                  <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs text-white/50 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                    {msg.text} <span className="text-white/30">{msg.time}</span>
                  </div>
                ) : (
                  <div className={`flex gap-3 max-w-[85%] ${msg.isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm shadow-xl ${msg.bgColor}`}>
                      {msg.avatar}
                    </div>
                    <div className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                      <div className="flex items-baseline gap-2 mb-1 px-1">
                        <span className="text-sm font-semibold text-white/90">{msg.sender}</span>
                        {!msg.isMe && <span className="text-[10px] text-white/40 bg-white/5 px-2 py-0.5 rounded uppercase">{msg.role}</span>}
                        <span className="text-[10px] text-white/30">{msg.time}</span>
                      </div>
                      <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-lg ${
                        msg.isMe 
                          ? 'bg-primary text-white rounded-tr-sm' 
                          : 'bg-surface border border-white/5 text-white/80 rounded-tl-sm'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-4 bg-background/50 border-t border-white/5 backdrop-blur-md">
            <form onSubmit={handleSend} className="relative flex items-center">
              <button type="button" className="absolute left-4 text-white/40 hover:text-white transition-colors">
                <Paperclip size={20} />
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message to the team..."
                className="w-full bg-surface border border-white/10 rounded-full py-4 pl-12 pr-16 text-white focus:outline-none focus:border-primary/50 transition-colors"
              />
              <button 
                type="submit" 
                disabled={!newMessage.trim()}
                className="absolute right-2 w-10 h-10 bg-primary hover:bg-primary/80 disabled:bg-primary/50 disabled:cursor-not-allowed rounded-full flex items-center justify-center text-white transition-colors"
              >
                <Send size={16} className={newMessage.trim() ? "translate-x-[-1px] translate-y-[1px]" : ""} />
              </button>
            </form>
          </div>
        </div>

        {/* Right Sidebar - Active Members */}
        <div className="hidden lg:flex flex-col gap-4">
          <div className="glass-card p-4 rounded-2xl flex-1 border border-white/5">
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-4 px-2 flex items-center justify-between">
              Team Online <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </h3>
            
            <ul className="space-y-3">
              <li className="flex items-center gap-3 px-2">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/50 flex items-center justify-center text-white font-bold text-xs">A</div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#12121a] rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-white/90">Alan Turing</p>
                  <p className="text-[10px] text-white/40">Frontend</p>
                </div>
              </li>
              <li className="flex items-center gap-3 px-2">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-pink-500/50 flex items-center justify-center text-white font-bold text-xs">S</div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#12121a] rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-white/90">Sarah Connor</p>
                  <p className="text-[10px] text-white/40">Backend</p>
                </div>
              </li>
              <li className="flex items-center gap-3 px-2">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-primary/50 flex items-center justify-center text-white font-bold text-xs">Y</div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#12121a] rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-white/90">You</p>
                  <p className="text-[10px] text-white/40">Senior Eng</p>
                </div>
              </li>
            </ul>

            <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-4 px-2 mt-8">Offline (1)</h3>
            <ul className="space-y-3 opacity-50">
               <li className="flex items-center gap-3 px-2">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-xs">J</div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-gray-500 border-2 border-[#12121a] rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-white/90">John Carmack</p>
                  <p className="text-[10px] text-white/40">Game Dev</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
