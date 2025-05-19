import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { Clock, Signal, Wifi, Radio } from 'lucide-react';

interface Scene {
  id: number;
  location: string;
  text: string[];
  background: string;
  foreground: string;
  filter?: string;
}

interface StoryIntroProps {
  onComplete: () => void;
}

const scenes: Scene[] = [
  {
    id: 1,
    location: "Galaksi Luar - Planet Smoketron",
    text: [
      "Di sudut jauh galaksi…",
      "Tersembunyi sebuah dunia yang hampir terlupakan — Smoketron.",
      "Planet yang dulunya penuh cahaya… kini redup, retak, dan nyaris tak bernyawa."
    ],
    background: "https://images.pexels.com/photos/5738242/pexels-photo-5738242.jpeg",
    foreground: "https://images.pexels.com/photos/5476414/pexels-photo-5476414.jpeg",
    filter: "hue-rotate(180deg) brightness(0.6)"
  },
  {
    id: 2,
    location: "Laboratorium Smoketron",
    text: [
      "Para ilmuwan telah mengerahkan segala daya.",
      "Tapi hanya satu jawaban yang tersisa…",
      "Etherion.",
      "Partikel langka — sumber energi tertinggi di alam semesta."
    ],
    background: "https://images.pexels.com/photos/8100784/pexels-photo-8100784.jpeg",
    foreground: "https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg",
    filter: "hue-rotate(-30deg) brightness(0.7)"
  },
  {
    id: 3,
    location: "Pusat Kendali Sinyal",
    text: [
      "Suatu hari…",
      "Sebuah sinyal muncul dari kejauhan.",
      "Titik biru kecil…",
      "Di dalam jaringan yang disebut oleh mereka... BASE."
    ],
    background: "https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg",
    foreground: "https://images.pexels.com/photos/8731639/pexels-photo-8731639.jpeg",
    filter: "hue-rotate(60deg) brightness(0.8)"
  },
  {
    id: 4,
    location: "Orbit Planet Bumi",
    text: [
      "Planet biru.",
      "Berisi jejak-jejak Etherion tersebar di dalam aktivitas digital yang hidup.",
      "Tapi... misi ini tidak bisa dilakukan oleh siapa pun."
    ],
    background: "https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg",
    foreground: "https://images.pexels.com/photos/8728388/pexels-photo-8728388.jpeg",
    filter: "hue-rotate(30deg) brightness(0.7)"
  },
  {
    id: 5,
    location: "Stasiun Peluncuran",
    text: [
      "Maka… seseorang diutus.",
      "Sebuah perjalanan tanpa peta.",
      "Tanpa jaminan kembali.",
      "Hanya mereka yang berani dan cukup penasaran akan tahu...",
      "apa yang sebenarnya sedang dipertaruhkan."
    ],
    background: "https://images.pexels.com/photos/7672252/pexels-photo-7672252.jpeg",
    foreground: "https://images.pexels.com/photos/8100784/pexels-photo-8100784.jpeg",
    filter: "hue-rotate(-60deg) brightness(0.8)"
  },
  {
    id: 6,
    location: "Transmisi Akhir",
    text: [
      "⚡️ Jika kamu membaca ini, kamu sudah menjadi bagian dari sinyal itu.",
      "🚪 Gerbang misi akan segera dibuka.",
      "🛰️ Hanya mereka yang terdaftar dalam relay channel yang akan mendapat akses pertama."
    ],
    background: "https://images.pexels.com/photos/7672252/pexels-photo-7672252.jpeg",
    foreground: "https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg",
    filter: "hue-rotate(90deg) brightness(0.6)"
  }
];

const StoryIntro: React.FC<StoryIntroProps> = ({ onComplete }) => {
  const [currentScene, setCurrentScene] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [signalStrength, setSignalStrength] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const signalInterval = setInterval(() => {
      setSignalStrength(prev => (prev + 1) % 5);
    }, 800);

    return () => clearInterval(signalInterval);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTypingComplete && currentScene < scenes.length - 1) {
      timer = setTimeout(() => {
        setCurrentScene(prev => prev + 1);
        setIsTypingComplete(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [currentScene, isTypingComplete]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const handleComplete = () => {
    if (currentScene === scenes.length - 1) {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
      <div className="smoke-effect"></div>
      
      {/* HUD Elements */}
      <div className="fixed top-0 left-0 w-full p-4 flex justify-between items-start z-20 text-cyan-glow font-orbitron text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 border border-cyan-glow/30 bg-black/30 backdrop-blur-sm px-3 py-1 rounded">
            <Clock className="h-4 w-4" />
            <span>{formatTime(currentTime)}</span>
          </div>
          <div className="flex items-center space-x-2 border border-cyan-glow/30 bg-black/30 backdrop-blur-sm px-3 py-1 rounded">
            <Signal className="h-4 w-4" />
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i}
                  className={`w-1 ${i <= signalStrength ? 'bg-cyan-glow' : 'bg-cyan-glow/30'}`}
                  style={{ height: `${(i + 1) * 4}px` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 border border-cyan-glow/30 bg-black/30 backdrop-blur-sm px-3 py-1 rounded">
            <Wifi className="h-4 w-4" />
            <span>CONNECTED</span>
          </div>
          <div className="flex items-center space-x-2 border border-cyan-glow/30 bg-black/30 backdrop-blur-sm px-3 py-1 rounded">
            <Radio className="h-4 w-4" />
            <span>TRANSMISSION {currentScene + 1}/{scenes.length}</span>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 1 }}
          className="relative w-full h-full"
        >
          {/* Background Layer */}
          <motion.div 
            className="absolute inset-0 bg-cover bg-center"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10 }}
            style={{
              backgroundImage: `url(${scenes[currentScene].background})`,
              filter: scenes[currentScene].filter
            }}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          </motion.div>

          {/* Foreground Layer */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 0.3 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              backgroundImage: `url(${scenes[currentScene].foreground})`,
              filter: scenes[currentScene].filter
            }}
          />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-between p-8">
            {/* Location */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="text-cyan-glow font-orbitron text-lg"
            >
              {scenes[currentScene].location}
            </motion.div>

            {/* Story Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-2xl text-left"
            >
              <div className="text-2xl text-cyan-glow font-orbitron mb-8">
                <Typewriter
                  onInit={(typewriter) => {
                    scenes[currentScene].text.forEach((line, index) => {
                      typewriter
                        .typeString(line)
                        .pauseFor(1000)
                        .callFunction(() => {
                          if (index === scenes[currentScene].text.length - 1) {
                            setIsTypingComplete(true);
                            if (currentScene === scenes.length - 1) {
                              setTimeout(handleComplete, 3000);
                            }
                          }
                        })
                        .start();
                    });
                  }}
                  options={{
                    delay: 50,
                    cursor: '|',
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Futuristic Corner Elements */}
          <div className="absolute top-4 left-4 w-32 h-32 border-l-2 border-t-2 border-cyan-glow/50 rounded-tl-lg"></div>
          <div className="absolute top-4 right-4 w-32 h-32 border-r-2 border-t-2 border-cyan-glow/50 rounded-tr-lg"></div>
          <div className="absolute bottom-4 left-4 w-32 h-32 border-l-2 border-b-2 border-cyan-glow/50 rounded-bl-lg"></div>
          <div className="absolute bottom-4 right-4 w-32 h-32 border-r-2 border-b-2 border-cyan-glow/50 rounded-br-lg"></div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default StoryIntro;