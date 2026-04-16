import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Leaf, Send, Sparkles, User, RefreshCw, RotateCcw, AlertTriangle, MessageSquare, Info, BookOpen, Utensils } from 'lucide-react';
import { getAyurvedicResponse, resetChat } from '../services/gemini';

const WELCOME_MESSAGE = {
  id: 1,
  role: 'ai',
  text: `Namaste! 🙏 I am your Ayurvedic AI Advisor, powered by advanced AI. I can help you understand your Dosha, suggest herbal remedies, recommend therapies, or answer questions about Ayurvedic principles. How can I assist you today?`,
};

const SUGGESTIONS = [
  { text: "What's my Dosha?", icon: <User size={16} /> },
  { text: "Herbs for better sleep", icon: <Leaf size={16} /> },
  { text: "Diet for Pitta Dosha", icon: <Utensils size={16} /> },
  { text: "Traditional remedies for cold", icon: <MessageSquare size={16} /> }
];

const Chat = () => {
  const { currentUser, userData } = useAuth();
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleNewChat = () => {
    resetChat();
    setMessages([WELCOME_MESSAGE]);
    setInput('');
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    const messageToSend = input.trim();
    if (!messageToSend || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      text: messageToSend,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chatHistory = messages
        .filter(msg => msg.id !== 1 && !msg.isError)
        .map(msg => ({ role: msg.role, text: msg.text }));

      const responseText = await getAyurvedicResponse(userMessage.text, chatHistory);

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'ai',
        text: responseText,
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'ai',
        text: error.message,
        isError: true,
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container page" style={{ maxWidth: '900px', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)' }}>
      {/* Dynamic Background Elements */}
      <div style={{ position: 'fixed', top: '10%', right: '5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(76, 175, 80, 0.05) 0%, transparent 70%)', zIndex: -1, pointerEvents: 'none' }}></div>
      <div style={{ position: 'fixed', bottom: '10%', left: '5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(255, 179, 0, 0.05) 0%, transparent 70%)', zIndex: -1, pointerEvents: 'none' }}></div>

      <header style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: 'rgba(76, 175, 80, 0.1)', padding: '0.4rem 1rem', borderRadius: '50px', marginBottom: '0.5rem', border: '1px solid rgba(76, 175, 80, 0.2)' }}>
          <Sparkles size={14} color="var(--primary-color)" style={{ marginRight: '0.5rem' }} />
          <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--primary-dark)', letterSpacing: '1px', textTransform: 'uppercase' }}>AI-Powered Wisdom</span>
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>
          Ayurvedic Advisory
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto', opacity: 0.9 }}>
          Consult our expert AI for personalized herbal remedies and wellness advice.
        </p>
      </header>

      <div className="card" style={{ 
        flex: 1,
        display: 'flex', 
        flexDirection: 'column', 
        padding: 0,
        overflow: 'hidden',
        border: '1px solid var(--border-color)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.06)',
        borderRadius: '24px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        position: 'relative',
        minHeight: '400px'
      }}>
        
        {/* Chat Control Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 1.5rem',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          background: 'rgba(255,255,255,0.8)',
          zIndex: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#4CAF50', boxShadow: '0 0 10px rgba(76, 175, 80, 0.5)' }}></div>
            <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Live Advisor</span>
          </div>
          <button
            onClick={handleNewChat}
            className="btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.8rem',
              fontWeight: '600',
              padding: '0.4rem 0.8rem',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              backgroundColor: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <RotateCcw size={14} /> Clear Session
          </button>
        </div>

        {/* Chat Messages Area */}
        <div className="chat-messages" style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          backgroundColor: 'transparent',
          scrollBehavior: 'smooth'
        }}>
          {messages.map((message) => (
            <div 
              key={message.id} 
              className="message-fade"
              style={{
                display: 'flex',
                gap: '1.2rem',
                alignItems: 'flex-start',
                flexDirection: message.role === 'user' ? 'row-reverse' : 'row',
                animation: 'messageIn 0.3s ease-out forwards'
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: message.role === 'ai' ? '12px 12px 0 12px' : '12px 12px 12px 0',
                backgroundColor: message.isError ? '#fee2e2' : message.role === 'ai' ? 'var(--primary-color)' : 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color: 'white',
                boxShadow: message.role === 'ai' ? '0 4px 10px rgba(76, 175, 80, 0.2)' : '0 4px 10px rgba(0,0,0,0.1)'
              }}>
                {message.isError ? <AlertTriangle size={20} /> : message.role === 'ai' ? <Leaf size={20} /> : <User size={20} />}
              </div>
              
              <div style={{
                backgroundColor: message.isError ? '#fff' : message.role === 'ai' ? 'white' : 'var(--primary-color)',
                backgroundImage: message.role === 'user' ? 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)' : 'none',
                color: message.isError ? '#991b1b' : message.role === 'ai' ? 'var(--text-primary)' : 'white',
                padding: '1rem 1.25rem',
                borderRadius: '18px',
                boxShadow: message.role === 'ai' ? '0 2px 10px rgba(0,0,0,0.03)' : '0 8px 15px rgba(76, 175, 80, 0.12)',
                border: message.isError ? '2px solid #fca5a5' : message.role === 'ai' ? '1px solid rgba(0,0,0,0.05)' : 'none',
                maxWidth: '80%',
                fontSize: '0.95rem',
                lineHeight: '1.6',
                whiteSpace: 'pre-wrap',
                borderTopLeftRadius: message.role === 'ai' ? 0 : '18px',
                borderTopRightRadius: message.role === 'user' ? 0 : '18px',
                position: 'relative',
              }}>
                {message.role === 'ai' && !message.isError && (
                  <div style={{ fontSize: '0.65rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--primary-color)', marginBottom: '0.4rem', letterSpacing: '0.8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Sparkles size={10} /> Ayurvedic Insight
                  </div>
                )}
                {message.text}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start' }}>
               <div style={{ width: '40px', height: '40px', borderRadius: '12px 12px 0 12px', backgroundColor: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <Leaf size={20} className="spin-slow" />
              </div>
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                gap: '0.5rem', 
                padding: '1rem 1.25rem', 
                backgroundColor: 'white', 
                borderRadius: '18px', 
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)', 
                border: '1px solid rgba(0,0,0,0.05)', 
                borderTopLeftRadius: 0 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <RefreshCw size={16} className="animate-spin" color="var(--primary-color)" />
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>Brewing wisdom...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Queries */}
        {messages.length === 1 && !isLoading && (
            <div style={{ padding: '0 1.5rem 1rem 1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
                {SUGGESTIONS.map((s, i) => (
                    <button
                        key={i}
                        onClick={() => handleSuggestionClick(s.text)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            borderRadius: '50px',
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'white',
                            color: 'var(--text-secondary)',
                            fontSize: '0.8rem',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                        }}
                        className="suggestion-btn"
                    >
                        {s.icon} {s.text}
                    </button>
                ))}
            </div>
        )}

        {/* Input Area */}
        <div style={{ padding: '1.5rem 2rem 2rem 2rem', background: 'white', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
          <form 
            onSubmit={handleSendMessage} 
            style={{ 
              display: 'flex', 
              gap: '0.75rem', 
              backgroundColor: '#f9fafb', 
              padding: '0.4rem', 
              borderRadius: '16px',
              border: '1px solid rgba(0,0,0,0.08)',
              transition: 'all 0.3s ease',
              alignItems: 'center'
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={currentUser ? "Ask about herbs, Dosha, or Ayurvedic diet..." : "Ask a general Ayurvedic query..."}
              style={{ 
                flex: 1, 
                border: 'none', 
                padding: '0.75rem 1rem', 
                fontSize: '0.95rem', 
                outline: 'none',
                backgroundColor: 'transparent',
                color: 'var(--text-primary)'
              }}
            />
            <button 
              type="submit" 
              className="btn-primary" 
              disabled={!input.trim() || isLoading}
              style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '12px', 
                padding: 0, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                border: 'none'
              }}
            >
              <Send size={18} />
            </button>
          </form>
          <div style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.75rem', opacity: 0.6, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
            <Info size={12} /> Ayurveda AI can provide general guidance but not medical diagnosis.
          </div>
        </div>

      </div>

      <style>{`
        @keyframes messageIn {
          from { opacity: 0; transform: translateY(10px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        .spin-slow {
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .suggestion-btn:hover {
            border-color: var(--primary-color) !important;
            color: var(--primary-dark) !important;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
            background-color: rgba(76, 175, 80, 0.02) !important;
        }
        .chat-messages::-webkit-scrollbar {
          width: 5px;
        }
        .chat-messages::-webkit-scrollbar-track {
          background: transparent;
        }
        .chat-messages::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.05);
          border-radius: 10px;
        }
        .chat-messages::-webkit-scrollbar-thumb:hover {
          background: rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
};

export default Chat;
