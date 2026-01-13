
import React, { useState, useRef, useEffect } from 'react';
import { getSmartResponse, generateSpeech, fileToDataPart, transcribeAudio } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hi! I am your AI Assistant. How can I help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [useSearch, setUseSearch] = useState(true);
  const [useThinking, setUseThinking] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];
      
      recorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);
      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64Audio = (reader.result as string).split(',')[1];
          setIsLoading(true);
          const transcription = await transcribeAudio(base64Audio);
          setInputValue(transcription);
          setIsLoading(false);
        };
        reader.readAsDataURL(audioBlob);
      };
      
      recorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const handleSend = async () => {
    if ((!inputValue.trim() && !selectedFile) || isLoading) return;

    const userText = inputValue.trim();
    let mediaData: any = null;
    if (selectedFile) {
      mediaData = await fileToDataPart(selectedFile);
    }

    setMessages(prev => [...prev, { role: 'user', text: userText || "Analyze this file" }]);
    setInputValue('');
    setSelectedFile(null);
    setIsLoading(true);

    try {
      const result = await getSmartResponse(userText, messages, {
        useThinking,
        useSearch,
        useMaps: true,
        media: mediaData ? [mediaData] : []
      });

      setMessages(prev => [...prev, { 
        role: 'model', 
        text: result.text,
        groundingUrls: result.groundingUrls
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Error connecting to AI. Please check your settings." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeech = async (text: string) => {
    const base64Audio = await generateSpeech(text);
    if (base64Audio) {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const binary = atob(base64Audio);
      const bytes = new Uint8Array(binary.length);
      for(let i=0; i<binary.length; i++) bytes[i] = binary.charCodeAt(i);
      const int16 = new Int16Array(bytes.buffer);
      const buffer = ctx.createBuffer(1, int16.length, 24000);
      const channelData = buffer.getChannelData(0);
      for(let i=0; i<int16.length; i++) channelData[i] = int16[i] / 32768.0;
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start();
    }
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-6 z-[60]">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl flex items-center justify-center hover:bg-indigo-700 transition-all active:scale-90 group"
        >
          <i className="fas fa-brain text-xl md:text-2xl"></i>
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 md:absolute md:inset-auto md:bottom-0 md:right-0 bg-white md:w-[400px] md:h-[600px] md:rounded-[32px] shadow-2xl flex flex-col overflow-hidden animate-slideUp z-[70]">
          <div className="bg-indigo-600 p-4 text-white flex items-center justify-between pt-safe">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <i className="fas fa-sparkles text-sm"></i>
              </div>
              <div>
                <p className="font-bold text-sm">Campus Pro AI</p>
                <p className="text-[10px] text-indigo-200">Gemini 3 Multimodal</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setUseThinking(!useThinking)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${useThinking ? 'bg-amber-400 text-indigo-900' : 'bg-white/10 text-white'}`}
              >
                <i className="fas fa-lightbulb text-xs"></i>
              </button>
              <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center text-indigo-200 hover:text-white">
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-white text-gray-700 rounded-tl-none border border-gray-100 shadow-sm'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  {msg.groundingUrls && (
                    <div className="mt-3 pt-3 border-t border-gray-100 space-y-1">
                      {msg.groundingUrls.map((link, i) => (
                        <a key={i} href={link.uri} target="_blank" rel="noreferrer" className="block text-indigo-500 hover:underline text-xs truncate">
                          <i className="fas fa-link mr-1"></i> {link.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                {msg.role === 'model' && (
                  <button 
                    onClick={() => handleSpeech(msg.text)}
                    className="mt-1 px-2 py-1 text-[10px] text-indigo-400 font-bold active:bg-indigo-50 rounded-lg"
                  >
                    <i className="fas fa-volume-high mr-1"></i> Speak
                  </button>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 px-4 py-2 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-gray-100 pb-safe">
            <div className="flex items-center gap-2 bg-gray-100 rounded-2xl px-3 py-1 border border-transparent focus-within:border-indigo-300">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="text-gray-400 hover:text-indigo-600 p-2"
              >
                <i className="fas fa-paperclip"></i>
              </button>
              <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
              
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent py-3 text-sm outline-none text-gray-700"
              />

              <button 
                onMouseDown={startRecording}
                onMouseUp={stopRecording}
                className={`p-2 transition-colors ${isRecording ? 'text-rose-500' : 'text-gray-400'}`}
              >
                <i className="fas fa-microphone"></i>
              </button>

              <button 
                onClick={handleSend}
                disabled={(!inputValue.trim() && !selectedFile) || isLoading}
                className="text-indigo-600 p-2 disabled:opacity-30"
              >
                <i className="fas fa-arrow-up-long"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatbot;
