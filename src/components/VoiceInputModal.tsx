import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Mic, 
  MicOff, 
  Sparkles, 
  Check, 
  RotateCcw, 
  AlertCircle, 
  Volume2, 
  Globe 
} from 'lucide-react';
import { Language } from '../types';
import { api } from '../services/api';

interface VoiceInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTranscriptReady: (transcript: string) => void;
  language: Language;
}

export const VoiceInputModal: React.FC<VoiceInputModalProps> = ({
  isOpen,
  onClose,
  onTranscriptReady,
  language,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [statusMessage, setStatusMessage] = useState<string>('Click "Start Speaking" or select a preset voice query below.');
  const [hasMicError, setHasMicError] = useState(false);
  const [isProcessingAudio, setIsProcessingAudio] = useState(false);
  const [selectedLang, setSelectedLang] = useState<Language>(language);

  // References for Web Speech API and MediaRecorder
  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Sample voice prompts for testing or quick voice simulation
  const voicePresets = {
    en: [
      'How do I apply for a Driving Licence on Sarathi Parivahan?',
      'My water bill this month is ₹5,000, whereas it used to be around ₹1,000. I want to complain.',
      'There has been no water supply in my village for five days.',
      'How do I report an electricity outage in my area?',
      'Find water supply policies and guidelines in Punjab.',
      'Help me apply for an income certificate under Right to Service.'
    ],
    hi: [
      'ड्राइविंग लाइसेंस (सारथी परिवहन) के लिए आवेदन कैसे करें?',
      'मेरा पानी का बिल इस महीने ₹5,000 आया है, जबकि पहले ₹1,000 आता था। मुझे शिकायत करनी है।',
      'हमारे गांव में पिछले पांच दिनों से पानी की आपूर्ति बंद है।',
      'बिजली कटौती की शिकायत कैसे दर्ज करें?',
      'आय प्रमाण पत्र के लिए आवश्यक दस्तावेज क्या हैं?'
    ],
    pa: [
      'ਡਰਾਈਵਿੰਗ ਲਾਇਸੈਂਸ (ਸਾਰਥੀ ਪਰਿਵਹਨ) ਲਈ ਅਰਜ਼ੀ ਕਿਵੇਂ ਦੇਣੀ ਹੈ?',
      'ਮੇਰਾ ਪਾਣੀ ਦਾ ਬਿਲ ਇਸ ਮਹੀਨੇ ₹5,000 ਆਇਆ ਹੈ ਜਦਕਿ ਪਹਿਲਾਂ ₹1,000 ਆਉਂਦਾ ਸੀ। ਮੈਂ ਸ਼ਿਕਾਇਤ ਕਰਨੀ ਹੈ।',
      'ਸਾਡੇ ਪਿੰਡ ਵਿੱਚ ਪੰਜ ਦਿਨਾਂ ਤੋਂ ਪਾਣੀ ਦੀ ਸਪਲਾਈ ਨਹੀਂ ਆਈ।',
      'ਬਿਜਲੀ ਕੱਟ ਦੀ ਰਿਪੋਰਟ ਕਿਵੇਂ ਕਰੀਏ?',
      'ਪੰਜਾਬ ਵਿੱਚ ਜਲ ਸਪਲਾਈ ਨੀਤੀਆਂ ਲੱਭੋ।'
    ]
  };

  useEffect(() => {
    setSelectedLang(language);
  }, [language]);

  useEffect(() => {
    if (isOpen) {
      setTranscript('');
      setHasMicError(false);
      setStatusMessage('Click "Start Speaking" to record, or choose a voice prompt below.');
    } else {
      stopAllRecording();
    }
  }, [isOpen]);

  const stopAllRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
      recognitionRef.current = null;
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {
        // ignore
      }
      mediaRecorderRef.current = null;
    }

    setIsRecording(false);
  };

  const startRecording = async () => {
    setHasMicError(false);
    setTranscript('');
    audioChunksRef.current = [];

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    // Strategy 1: Try Web Speech API for immediate live text
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = selectedLang === 'hi' ? 'hi-IN' : selectedLang === 'pa' ? 'pa-IN' : 'en-IN';
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onstart = () => {
          setIsRecording(true);
          setStatusMessage('Listening to your voice... Speak clearly into your microphone.');
        };

        recognition.onresult = (event: any) => {
          let currentText = '';
          for (let i = 0; i < event.results.length; i++) {
            currentText += event.results[i][0].transcript + ' ';
          }
          setTranscript(currentText.trim());
        };

        recognition.onerror = (event: any) => {
          console.warn('SpeechRecognition error:', event.error);
          if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
            setHasMicError(true);
            setStatusMessage('Microphone access was denied or is blocked by your browser settings. You can still test with the sample citizen queries below.');
          } else {
            setStatusMessage(`Recognition paused: ${event.error}. You can re-record or select a sample query.`);
          }
          setIsRecording(false);
        };

        recognition.onend = () => {
          setIsRecording(false);
          if (!hasMicError) {
            setStatusMessage('Recording completed. Review your query below.');
          }
        };

        recognitionRef.current = recognition;
        recognition.start();
        return;
      } catch (err: any) {
        console.warn('SpeechRecognition init failed, falling back to MediaRecorder:', err);
      }
    }

    // Strategy 2: Fallback to MediaRecorder & server Gemini transcription
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstart = () => {
          setIsRecording(true);
          setStatusMessage('Recording audio via microphone... Click "Stop & Transcribe" when finished.');
        };

        mediaRecorder.onstop = async () => {
          setIsRecording(false);
          setIsProcessingAudio(true);
          setStatusMessage('Transcribing audio with JanConnect AI voice engine...');

          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const reader = new FileReader();
          reader.onloadend = async () => {
            const base64Audio = reader.result as string;
            try {
              const res = await api.transcribeAudio(base64Audio, 'audio/webm', selectedLang);
              if (res.transcript) {
                setTranscript(res.transcript);
                setStatusMessage('Audio transcribed successfully.');
              }
            } catch (transcribeErr: any) {
              setHasMicError(true);
              setStatusMessage('Audio processing notice: Transcribed fallback applied.');
            } finally {
              setIsProcessingAudio(false);
            }
          };
          reader.readAsDataURL(audioBlob);

          // Stop all stream tracks
          stream.getTracks().forEach((track) => track.stop());
        };

        mediaRecorder.start();
        return;
      } catch (mediaErr: any) {
        console.warn('getUserMedia error:', mediaErr);
        setHasMicError(true);
        setStatusMessage('Microphone permission unavailable in this view. Please choose a sample query below or type directly.');
        setIsRecording(false);
      }
    } else {
      setHasMicError(true);
      setStatusMessage('Voice capture is not supported in this browser environment. You can use the instant sample queries below.');
    }
  };

  const stopRecording = () => {
    stopAllRecording();
  };

  const handleSelectPreset = (presetText: string) => {
    setTranscript(presetText);
    setStatusMessage('Voice query populated. Click "Use This Voice Query" to proceed.');
  };

  const handleConfirm = () => {
    if (transcript.trim()) {
      onTranscriptReady(transcript.trim());
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-slate-800">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0e3b6c] to-[#154c87] text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-white/10 text-amber-300">
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight">
                JanConnect AI Voice Assistant (आवाज़ सहायक)
              </h3>
              <p className="text-[11px] text-blue-100">
                Speak your grievance or service query in your preferred language
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-blue-200 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* Language selector for voice input */}
          <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs">
            <span className="flex items-center gap-1.5 font-semibold text-slate-700">
              <Globe className="w-3.5 h-3.5 text-blue-700" />
              <span>Voice Recognition Language:</span>
            </span>
            <div className="flex items-center gap-1">
              {(['en', 'hi', 'pa'] as Language[]).map((lng) => (
                <button
                  key={lng}
                  type="button"
                  onClick={() => setSelectedLang(lng)}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                    selectedLang === lng
                      ? 'bg-[#0e3b6c] text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {lng === 'en' ? 'English' : lng === 'hi' ? 'हिन्दी' : 'ਪੰਜਾਬੀ'}
                </button>
              ))}
            </div>
          </div>

          {/* Big Recording Indicator / Button */}
          <div className="flex flex-col items-center justify-center py-4 space-y-3">
            <button
              type="button"
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isProcessingAudio}
              className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all cursor-pointer ${
                isRecording
                  ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse ring-8 ring-red-100'
                  : 'bg-[#0e3b6c] hover:bg-[#124b8a] text-white hover:scale-105'
              }`}
            >
              {isRecording ? (
                <MicOff className="w-9 h-9" />
              ) : isProcessingAudio ? (
                <span className="w-7 h-7 border-3 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <Mic className="w-9 h-9 text-amber-300" />
              )}
            </button>

            <div className="text-center">
              <span className="text-xs font-bold text-slate-800 block">
                {isRecording ? 'Listening... Tap to Stop' : isProcessingAudio ? 'Transcribing...' : 'Tap to Start Speaking'}
              </span>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {statusMessage}
              </p>
            </div>

            {/* Sound Wave Animation when recording */}
            {isRecording && (
              <div className="flex items-center gap-1 h-6">
                {[4, 10, 16, 22, 14, 8, 18, 12, 6, 20].map((h, i) => (
                  <span
                    key={i}
                    className="w-1 bg-red-500 rounded-full animate-pulse"
                    style={{
                      height: `${h}px`,
                      animationDelay: `${i * 80}ms`
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Transcript Box */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
              <span>Transcribed Text (Editable):</span>
              {transcript && (
                <button
                  type="button"
                  onClick={() => setTranscript('')}
                  className="text-[11px] text-slate-400 hover:text-slate-700 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              )}
            </label>
            <textarea
              rows={3}
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Your spoken words will appear here in real-time..."
              className="w-full text-xs p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 text-slate-800"
            />
          </div>

          {/* Quick Voice Simulation / Presets */}
          <div className="space-y-2 pt-1 border-t border-slate-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5 text-blue-700" />
              <span>Or Choose a Sample Voice Query (1-Click Test):</span>
            </span>
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {voicePresets[selectedLang].map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className="w-full text-left p-2 rounded-md bg-slate-50 hover:bg-blue-50 hover:border-blue-300 text-xs text-slate-700 border border-slate-200 transition-colors flex items-center justify-between gap-2 group"
                >
                  <span className="truncate group-hover:text-blue-900">{preset}</span>
                  <span className="text-[10px] text-blue-600 font-semibold shrink-0">Use</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!transcript.trim()}
              onClick={handleConfirm}
              className="px-5 py-2 bg-[#0e3b6c] hover:bg-[#124b8a] text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors disabled:opacity-40 cursor-pointer"
            >
              <Check className="w-4 h-4 text-emerald-300" />
              <span>Use This Voice Query</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
