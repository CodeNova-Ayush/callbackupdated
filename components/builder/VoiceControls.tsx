'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Sparkles, Loader2 } from 'lucide-react';

interface VoiceDictationButtonProps {
  onTranscript: (text: string) => void;
  currentValue?: string;
  mode?: 'append' | 'replace';
  size?: 'xs' | 'sm' | 'md';
  label?: string;
  placeholderPrompt?: string;
  className?: string;
  title?: string;
}

export function VoiceDictationButton({
  onTranscript,
  currentValue = '',
  mode = 'append',
  size = 'sm',
  label,
  placeholderPrompt = 'Listening... Speak now',
  className = '',
  title = 'Click to dictate via Voice',
}: VoiceDictationButtonProps) {
  const [isListening, setIsListening] = useState(false);
  const [interimText, setInterimText] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setIsSupported(false);
      }
    }
  }, []);

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
      recognitionRef.current = null;
    }
    setIsListening(false);
    setInterimText('');
  };

  const startListening = () => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Voice dictation is supported on Chrome, Safari, and Edge. Please check your browser permissions.');
      return;
    }

    try {
      const reco = new SpeechRecognition();
      reco.continuous = true;
      reco.interimResults = true;
      reco.lang = 'en-US';

      let finalRecognized = '';

      reco.onstart = () => {
        setIsListening(true);
        setInterimText('');
      };

      reco.onresult = (event: any) => {
        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptChunk = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalRecognized += transcriptChunk + ' ';
            const cleaned = finalRecognized.trim();
            if (mode === 'append' && currentValue) {
              const separator = currentValue.trim().endsWith('.') || currentValue.trim().endsWith(',') ? ' ' : ' ';
              onTranscript(currentValue + separator + cleaned);
            } else {
              onTranscript(cleaned);
            }
            finalRecognized = '';
          } else {
            interim += transcriptChunk;
          }
        }
        setInterimText(interim);
      };

      reco.onerror = (err: any) => {
        console.warn('Speech recognition event:', err);
        if (err.error !== 'no-speech') {
          stopListening();
        }
      };

      reco.onend = () => {
        setIsListening(false);
        setInterimText('');
      };

      recognitionRef.current = reco;
      reco.start();
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      setIsListening(false);
    }
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const sizeClasses = {
    xs: 'px-1.5 py-1 text-[10px]',
    sm: 'px-2 py-1 text-xs',
    md: 'px-2.5 py-1.5 text-xs',
  }[size];

  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
  }[size];

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={handleToggle}
        title={isListening ? 'Stop listening' : title}
        className={`rounded-lg font-medium flex items-center gap-1 transition-all cursor-pointer select-none ${sizeClasses} ${
          isListening
            ? 'bg-rose-500 text-white ring-2 ring-rose-400 ring-offset-1 animate-pulse shadow-xs shadow-rose-500/40'
            : 'text-slate-400 hover:text-[#1C152E] hover:bg-slate-100/80 active:scale-95'
        } ${className}`}
      >
        {isListening ? (
          <>
            <Mic className={`${iconSizes} animate-bounce text-white`} />
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-white">
              {label || 'Recording'}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          </>
        ) : (
          <>
            <Mic className={`${iconSizes} text-slate-500 group-hover:text-[#1C152E]`} />
            {label && <span>{label}</span>}
          </>
        )}
      </button>

      {/* Floating Live Speech Bubble when Listening */}
      {isListening && interimText && (
        <div className="absolute top-full left-0 mt-1 z-50 min-w-[200px] max-w-[320px] bg-slate-900 text-white text-[11px] rounded-xl px-3 py-2 shadow-2xl border border-rose-500/40 flex flex-col gap-1 animate-in fade-in zoom-in-95 pointer-events-none">
          <div className="flex items-center justify-between text-[9px] uppercase tracking-wider font-extrabold text-rose-400">
            <span>Live Dictation</span>
            <span className="animate-pulse">● Listening</span>
          </div>
          <p className="text-slate-100 font-sans italic leading-tight">
            &ldquo;{interimText}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}

interface VoiceReadbackButtonProps {
  textToSpeak?: string;
  size?: 'xs' | 'sm' | 'md';
  label?: string;
  className?: string;
  title?: string;
}

export function VoiceReadbackButton({
  textToSpeak = '',
  size = 'sm',
  label,
  className = '',
  title = 'Listen to audio preview (Voice-to-Voice review)',
}: VoiceReadbackButtonProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (typeof window === 'undefined' || !window.speechSynthesis) {
      alert('Text-to-speech is not supported by your browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const clean = (textToSpeak || '').replace(/•|\*|#|-/g, '').trim();
    if (!clean) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.lang = 'en-US';

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const sizeClasses = {
    xs: 'px-1.5 py-1 text-[10px]',
    sm: 'px-2 py-1 text-xs',
    md: 'px-2.5 py-1.5 text-xs',
  }[size];

  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
  }[size];

  const hasText = Boolean(textToSpeak && textToSpeak.trim().length > 0);

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={!hasText}
      title={isSpeaking ? 'Stop audio' : title}
      className={`rounded-lg font-bold flex items-center gap-1 transition-all cursor-pointer select-none disabled:opacity-40 disabled:cursor-not-allowed ${sizeClasses} ${
        isSpeaking
          ? 'bg-emerald-600 text-white ring-2 ring-emerald-400 ring-offset-1 animate-pulse shadow-sm shadow-emerald-600/40'
          : 'bg-slate-100/90 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 border border-slate-200/80 hover:border-emerald-300'
      } ${className}`}
    >
      {isSpeaking ? (
        <>
          <VolumeX className={`${iconSizes} text-white`} />
          <span className="text-[10px] uppercase tracking-wider font-extrabold text-white">
            {label || 'Mute'}
          </span>
        </>
      ) : (
        <>
          <Volume2 className={`${iconSizes} text-slate-500`} />
          {label && <span>{label}</span>}
        </>
      )}
    </button>
  );
}

interface VoiceFieldToolbarProps {
  onTranscript: (text: string) => void;
  textToSpeak?: string;
  currentValue?: string;
  mode?: 'append' | 'replace';
  label?: string;
}

export function VoiceFieldToolbar({
  onTranscript,
  textToSpeak = '',
  currentValue = '',
  mode = 'append',
  label,
}: VoiceFieldToolbarProps) {
  return (
    <div className="flex items-center gap-1.5">
      <VoiceDictationButton
        onTranscript={onTranscript}
        currentValue={currentValue}
        mode={mode}
        size="xs"
        label={label}
      />
      {textToSpeak && (
        <VoiceReadbackButton textToSpeak={textToSpeak} size="xs" />
      )}
    </div>
  );
}
