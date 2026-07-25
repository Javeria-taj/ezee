'use me';
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles, RefreshCw, ChevronRight } from 'lucide-react';

interface Message {
  id: string;
  role: 'USER' | 'ASSISTANT';
  content: string;
  createdAt: string;
  toolCalls?: Array<{ tool: string; args: any; result: any }>;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Quick suggestion chips for students
  const quickPrompts = [
    'Check my order status',
    'What are the printing rates?',
    'I have a payment issue',
    'How does binding work?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Initial welcome message if conversation empty
  useEffect(() => {
    if (isOpen && messages.length === 0 && !conversationId) {
      initConversation();
    }
  }, [isOpen]);

  const initConversation = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';
      const res = await fetch('/api/v1/chatbot/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({ title: 'Student Support' }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setConversationId(data.data.id);
        setMessages([
          {
            id: 'welcome',
            role: 'ASSISTANT',
            content:
              '👋 Hi! I am **Ezi AI**, your personal printing assistant. How can I help you today?',
            createdAt: new Date().toISOString(),
          },
        ]);
      }
    } catch (err) {
      // Fallback local chat mode
      setMessages([
        {
          id: 'welcome-fallback',
          role: 'ASSISTANT',
          content:
            '👋 Hi! I am **Ezi AI**. Ask me about order status, rates, or support!',
          createdAt: new Date().toISOString(),
        },
      ]);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'USER',
      content: text,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      let targetConvId = conversationId;
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

      if (!targetConvId) {
        const createRes = await fetch('/api/v1/chatbot/conversations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
          },
          body: JSON.stringify({ title: 'Student Support' }),
        });
        const createData = await createRes.json();
        if (createData.success && createData.data) {
          targetConvId = createData.data.id;
          setConversationId(targetConvId);
        }
      }

      if (targetConvId) {
        const res = await fetch(`/api/v1/chatbot/conversations/${targetConvId}/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
          },
          body: JSON.stringify({ message: text }),
        });
        const data = await res.json();

        if (data.success && data.data?.assistantMessage) {
          const aiMsg = data.data.assistantMessage;
          setMessages((prev) => [
            ...prev,
            {
              id: aiMsg.id || Date.now().toString(),
              role: 'ASSISTANT',
              content: aiMsg.content,
              createdAt: aiMsg.createdAt || new Date().toISOString(),
              toolCalls: aiMsg.toolCalls,
            },
          ]);
        } else {
          throw new Error(data.message || 'Failed to get AI response');
        }
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'ASSISTANT',
          content:
            "I'm experiencing a quick connection hiccup. For immediate help, check your orders in the dashboard or reach out via the Support page!",
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '60px',
          height: '60px',
          borderRadius: '30px',
          background: 'linear-gradient(135deg, #D48A70 0%, #B86B52 100%)',
          color: '#FFFFFF',
          boxShadow: '0 8px 24px rgba(212, 138, 112, 0.4)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
        }}
        aria-label="Toggle Ezi AI Assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={26} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ position: 'relative' }}
            >
              <MessageSquare size={26} />
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#4ADE80',
                  border: '2px solid #D48A70',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              position: 'fixed',
              bottom: '96px',
              right: '24px',
              width: '380px',
              maxWidth: 'calc(100vw - 32px)',
              height: '560px',
              maxHeight: 'calc(100vh - 120px)',
              backgroundColor: '#FAF7F1',
              borderRadius: '20px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
              border: '1px solid rgba(212, 138, 112, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              zIndex: 9998,
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '16px 20px',
                background: 'linear-gradient(135deg, #2D2926 0%, #1A1816 100%)',
                color: '#FAF7F1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #D48A70 0%, #E6A085 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Sparkles size={20} color="#FFF" />
                </div>
                <div>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: '15px',
                      fontWeight: 600,
                      color: '#FFF',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    Ezi AI Assistant
                  </h3>
                  <span
                    style={{
                      fontSize: '11px',
                      color: '#4ADE80',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    ● Online • Powered by Gemini
                  </span>
                </div>
              </div>
              <button
                onClick={() => setMessages([])}
                title="New Chat"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#A0988E',
                  cursor: 'pointer',
                  padding: '6px',
                  borderRadius: '6px',
                }}
              >
                <RefreshCw size={16} />
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div
              style={{
                flex: 1,
                padding: '16px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    gap: '8px',
                    justifyContent: msg.role === 'USER' ? 'flex-end' : 'flex-start',
                  }}
                >
                  {msg.role === 'ASSISTANT' && (
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: '#D48A70',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFF',
                        flexShrink: 0,
                        marginTop: '2px',
                      }}
                    >
                      <Bot size={16} />
                    </div>
                  )}

                  <div
                    style={{
                      maxWidth: '80%',
                      padding: '10px 14px',
                      borderRadius:
                        msg.role === 'USER'
                          ? '16px 16px 2px 16px'
                          : '16px 16px 16px 2px',
                      backgroundColor:
                        msg.role === 'USER' ? '#D48A70' : '#FFFFFF',
                      color: msg.role === 'USER' ? '#FFFFFF' : '#2D2926',
                      fontSize: '13.5px',
                      lineHeight: '1.45',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                      border:
                        msg.role === 'ASSISTANT'
                          ? '1px solid rgba(0, 0, 0, 0.06)'
                          : 'none',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {msg.content}
                  </div>

                  {msg.role === 'USER' && (
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: '#2D2926',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFF',
                        flexShrink: 0,
                        marginTop: '2px',
                      }}
                    >
                      <User size={16} />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: '#D48A70',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFF',
                    }}
                  >
                    <Bot size={16} />
                  </div>
                  <div
                    style={{
                      padding: '10px 16px',
                      borderRadius: '16px',
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                      display: 'flex',
                      gap: '4px',
                    }}
                  >
                    <motion.span
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                      style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#D48A70' }}
                    />
                    <motion.span
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                      style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#D48A70' }}
                    />
                    <motion.span
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                      style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#D48A70' }}
                    />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions (if conversation is short) */}
            {messages.length <= 2 && (
              <div
                style={{
                  padding: '8px 16px',
                  display: 'flex',
                  gap: '6px',
                  overflowX: 'auto',
                  backgroundColor: 'rgba(0,0,0,0.02)',
                }}
              >
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSendMessage(prompt)}
                    style={{
                      whiteSpace: 'nowrap',
                      fontSize: '11.5px',
                      padding: '6px 10px',
                      borderRadius: '12px',
                      border: '1px solid #D48A70',
                      backgroundColor: '#FFF',
                      color: '#B86B52',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    {prompt} <ChevronRight size={12} />
                  </button>
                ))}
              </div>
            )}

            {/* Input Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              style={{
                padding: '12px 16px',
                borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <input
                type="text"
                placeholder="Ask Ezi AI..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={isLoading}
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: '20px',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  backgroundColor: '#FAF7F1',
                  fontSize: '13.5px',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: inputMessage.trim() && !isLoading ? '#D48A70' : '#E0D8D0',
                  color: '#FFFFFF',
                  border: 'none',
                  cursor: inputMessage.trim() && !isLoading ? 'pointer' : 'default',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.2s',
                }}
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
