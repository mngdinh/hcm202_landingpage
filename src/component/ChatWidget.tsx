import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { MessageCircle, X, Send, Loader2, Sparkles, Bot, Trash2 } from 'lucide-react';
import { CONTENT_SECTIONS } from '../data/constants';

interface Message {
    id: string;
    role: 'user' | 'model';
    text: string;
}

// Construct context from the existing content constants to ground the AI
const SITE_CONTEXT = `
Bạn là trợ lý AI cho trang web giáo dục về "Vận dụng Tư tưởng Hồ Chí Minh".
Nhiệm vụ của bạn là giải đáp thắc mắc của người dùng dựa trên nội dung sau đây:

${CONTENT_SECTIONS.map(s =>
    `CHỦ ĐỀ: ${s.title}
   TÓM TẮT: ${s.subtitle}
   NỘI DUNG CHÍNH:
   ${s.points.map(p => `- ${p}`).join('\n')}
   TỪ KHÓA: ${s.highlight}`
).join('\n\n')}

HƯỚNG DẪN TRẢ LỜI:
1. Trả lời ngắn gọn, súc tích, dễ hiểu.
2. Luôn giữ thái độ trang trọng, lịch sự, mang tính giáo dục.
3. Nếu câu hỏi không liên quan đến nội dung trên, hãy lịch sự từ chối và hướng người dùng quay lại chủ đề Tư tưởng Hồ Chí Minh.
4. Sử dụng tiếng Việt.
5. Sử dụng định dạng **in đậm** cho các từ khóa quan trọng.
`;

export const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Initial chat messages (used to reset/clear history)
    const INIT_MESSAGES: Message[] = [
        { id: 'init', role: 'model', text: 'Xin chào! Tôi có thể giúp gì cho bạn về nội dung bài học hôm nay?' }
    ];

    const [messages, setMessages] = useState<Message[]>(INIT_MESSAGES);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chatSession, setChatSession] = useState<Chat | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initialize Chat Session
    useEffect(() => {
        try {
            // In Vite with our config, process.env.API_KEY is available
            const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
            const chat = ai.chats.create({
                model: 'gemini-flash-latest',
                config: {
                    systemInstruction: SITE_CONTEXT,
                },
            });
            setChatSession(chat);
        } catch (error) {
            console.error("Failed to initialize Gemini:", error);
        }
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim() || !chatSession) return;

        const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const result = await chatSession.sendMessageStream({ message: userMsg.text });

            const botMsgId = (Date.now() + 1).toString();
            let fullText = '';

            // Add placeholder for bot message
            setMessages(prev => [...prev, { id: botMsgId, role: 'model', text: '' }]);

            for await (const chunk of result) {
                const text = chunk.text;
                if (text) {
                    fullText += text;
                    setMessages(prev =>
                        prev.map(msg => msg.id === botMsgId ? { ...msg, text: fullText } : msg)
                    );
                }
            }
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleClearHistory = () => {
        const ok = confirm('Bạn có chắc muốn xóa lịch sử chat?');
        if (!ok) return;
        setIsLoading(false);
        setMessages(INIT_MESSAGES);
    };

    // Helper to render markdown-like text (strip headings, bolding and basic lists)
    const renderFormattedText = (text: string) => {
        return text.split('\n').map((line, i) => {
            // Trim the line and remove markdown heading markers like '#', '##', '### ' etc.
            const trimmed = line.trim();
            const withoutHeading = trimmed.replace(/^#{1,6}\s+/, '');

            // Check for list items (starting with - or *) after stripping headings
            const isBullet = withoutHeading.startsWith('- ') || withoutHeading.startsWith('* ');
            const cleanLine = isBullet ? withoutHeading.substring(2).trim() : withoutHeading;

            // Split by **bold** syntax
            const parts = cleanLine.split(/(\*\*.*?\*\*)/g).map((part, j) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={j} className="font-bold">{part.slice(2, -2)}</strong>;
                }
                return part;
            });

            if (isBullet) {
                return (
                    <div key={i} className="flex items-start gap-2 mb-1 ml-1">
                        <div className="mt-2 w-1.5 h-1.5 bg-current rounded-full flex-shrink-0 opacity-60"></div>
                        <span>{parts}</span>
                    </div>
                );
            }

            // Handle empty lines for spacing
            if (!trimmed) return <div key={i} className="h-2"></div>;

            return <div key={i} className="mb-1 last:mb-0">{parts}</div>;
        });
    };

    return (
        <>
            {/* Floating Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center ${isOpen
                    ? 'bg-slate-200 text-slate-800 rotate-90 dark:bg-slate-700 dark:text-white'
                    : 'bg-gradient-to-r from-red-600 to-red-700 text-white animate-pulse-soft'
                    }`}
                aria-label="Toggle Chat"
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </button>

            {/* Chat Window */}
            <div
                className={`fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300 transform z-40 origin-bottom-right flex flex-col ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none'
                    }`}
                style={{ height: '500px', maxHeight: '70vh' }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-red-800 to-red-900 p-4 flex items-center gap-3 text-white justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-full">
                            <Sparkles className="w-5 h-5 text-yellow-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm">Trợ lý ảo Tư tưởng HCM</h3>
                            <p className="text-xs text-red-200 flex items-center gap-1">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                Powered by Gemini
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleClearHistory}
                            title="Xóa lịch sử chat"
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                            <Trash2 className="w-4 h-4 text-white" />
                        </button>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex items-start gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-slate-200 dark:bg-slate-700' : 'bg-red-100 dark:bg-red-900/30'
                                }`}>
                                {msg.role === 'user' ? (
                                    <div className="w-4 h-4 bg-slate-500 rounded-full" />
                                ) : (
                                    <Bot className="w-5 h-5 text-red-600 dark:text-red-400" />
                                )}
                            </div>

                            <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                                ? 'bg-red-600 text-white rounded-tr-sm'
                                : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-tl-sm'
                                }`}>
                                {renderFormattedText(msg.text)}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-center gap-2 text-slate-400 text-xs ml-10">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            Đang suy nghĩ...
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Đặt câu hỏi về bài học..."
                            disabled={isLoading}
                            className="w-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white rounded-full py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || isLoading}
                            className="absolute right-1.5 p-2 bg-red-600 hover:bg-red-500 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-full transition-colors"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};