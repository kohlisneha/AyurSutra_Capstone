import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Leaf, Send, Sparkles, User, RefreshCw, RotateCcw, AlertTriangle } from 'lucide-react';
import { getAyurvedicResponse, resetChat } from '../services/gemini';

const WELCOME_MESSAGE = {
  id: 1,
  role: 'ai',
  text: `Namaste! 🙏 I am your Ayurvedic AI Advisor, powered by advanced AI. I can help you understand your Dosha, suggest herbal remedies, recommend therapies, or answer questions about Ayurvedic principles. How can I assist you today?`,
};

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

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      text: input,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Build history from existing messages (excluding the welcome message and error messages)
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
    <div className="container page" style={{ maxWidth: '800px', paddingBottom: '20px' }}>
      <header className="text-center" style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          Ayurvedic Advisor <Sparkles color="var(--accent-color)" />
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Ask me anything about Ayurveda, herbs, or your personal wellness journey.
        </p>
      </header>

      <div className="card" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '600px', 
        maxHeight: 'calc(100vh - 250px)',
        padding: 0,
        overflow: 'hidden'
      }}>
        
        {/* Chat Header Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '0.5rem 1rem',
          borderBottom: '1px solid var(--border-color)',
          backgroundColor: 'white',
        }}>
          <button
            onClick={handleNewChat}
            className="btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.8rem',
              padding: '0.3rem 0.8rem',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'transparent',
              cursor: 'pointer',
            }}
            title="Start a new conversation"
          >
            <RotateCcw size={14} /> New Chat
          </button>
        </div>

        {/* Chat Messages Area */}
        <div style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          backgroundColor: '#fafafa'
        }}>
          {messages.map((message) => (
            <div 
              key={message.id} 
              style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'flex-start',
                flexDirection: message.role === 'user' ? 'row-reverse' : 'row'
              }}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: message.isError ? '#fee2e2' : message.role === 'ai' ? 'var(--primary-light)' : 'var(--bg-color)',
                border: message.role === 'user' ? '1px solid var(--border-color)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color: message.isError ? '#dc2626' : message.role === 'ai' ? 'white' : 'var(--text-secondary)'
              }}>
                {message.isError ? <AlertTriangle size={20} /> : message.role === 'ai' ? <Leaf size={20} /> : <User size={20} />}
              </div>
              
              <div style={{
                backgroundColor: message.isError ? '#fef2f2' : message.role === 'ai' ? 'white' : 'var(--primary-color)',
                color: message.isError ? '#991b1b' : message.role === 'ai' ? 'var(--text-primary)' : 'white',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-sm)',
                border: message.isError ? '1px solid #fecaca' : message.role === 'ai' ? '1px solid var(--border-color)' : 'none',
                maxWidth: '80%',
                lineHeight: '1.6',
                whiteSpace: 'pre-wrap',
                borderTopLeftRadius: message.role === 'ai' ? 0 : 'var(--radius-md)',
                borderTopRightRadius: message.role === 'user' ? 0 : 'var(--radius-md)'
              }}>
                {message.text}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
               <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <Leaf size={20} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem', backgroundColor: 'white', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)', borderTopLeftRadius: 0 }}>
                <RefreshCw size={16} className="animate-spin" color="var(--primary-color)" />
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Consulting ancient texts...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)', backgroundColor: 'white' }}>
          <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '1rem' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={currentUser ? "Ask about herbs, your Dosha, or Ayurvedic diet..." : "Log in for personalized advice, or ask a general query..."}
              className="input-field"
              style={{ flex: 1, margin: 0 }}
            />
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={!input.trim() || isLoading}
              style={{ padding: '0 1.5rem' }}
            >
              <Send size={20} />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Chat;
