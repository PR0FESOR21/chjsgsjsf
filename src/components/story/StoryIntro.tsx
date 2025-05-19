import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from 'typewriter-effect';

interface Scene {
  id: number;
  location: string;
  text: string[];
  background: string;
  character: string;
  characterAnimation?: {
    initial: any;
    animate: any;
  };
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
    character: "https://images.pexels.com/photos/5476414/pexels-photo-5476414.jpeg",
    characterAnimation: {
      initial: { scale: 1.2, y: 50, opacity: 0 },
      animate: { scale: 1, y: 0, opacity: 0.6 }
    }
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
    character: "https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg",
    characterAnimation: {
      initial: { x: -100, opacity: 0 },
      animate: { x: 0, opacity: 0.7 }
    }
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
    character: "https://images.pexels.com/photos/8731639/pexels-photo-8731639.jpeg",
    characterAnimation: {
      initial: { rotate: 15, scale: 0.8, opacity: 0 },
      animate: { rotate: 0, scale: 1, opacity: 0.7 }
    }
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
    character: "https://images.pexels.com/photos/8728388/pexels-photo-8728388.jpeg",
    characterAnimation: {
      initial: { y: -100, scale: 1.2, opacity: 0 },
      animate: { y: 0, scale: 1, opacity: 0.7 }
    }
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
    character: "https://images.pexels.com/photos/8100784/pexels-photo-8100784.jpeg",
    characterAnimation: {
      initial: { scale: 0, rotate: -45, opacity: 0 },
      animate: { scale: 1, rotate: 0, opacity: 0.7 }
    }
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
    character: "https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg",
    characterAnimation: {
      initial: { scale: 1.5, opacity: 0 },
      animate: { scale: 1, opacity: 0.3 }
    }
  }
];

const StoryIntro: React.FC<StoryIntroProps> = ({ onComplete }) => {
  const [currentScene, setCurrentScene] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

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

  const handleActivateProtocol = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black overflow-hidden"
      animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="smoke-effect"></div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
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
              backgroundImage: `url(${scenes[currentScene].background})`
            }}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          </motion.div>

          {/* Character Layer */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            initial={scenes[currentScene].characterAnimation?.initial}
            animate={scenes[currentScene].characterAnimation?.animate}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              backgroundImage: `url(${scenes[currentScene].character})`
            }}
          />

          {/* Content */}
          {currentScene === scenes.length - 1 ? (
            // Final Scene - Centered Content
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl text-center"
              >
                <div className="text-2xl text-cyan-glow font-orbitron mb-12">
                  <Typewriter
                    onInit={(typewriter) => {
                      scenes[currentScene].text.forEach((line) => {
                        typewriter
                          .typeString(line)
                          .pauseFor(1000)
                          .start();
                      });
                    }}
                    options={{
                      delay: 50,
                      cursor: '|',
                    }}
                  />
                </div>
                
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 4 }}
                  onClick={handleActivateProtocol}
                  className="px-8 py-4 bg-transparent border-2 border-cyan-glow text-cyan-glow 
                           font-orbitron text-xl rounded hover:bg-cyan-glow/20 
                           transition-all duration-300 relative overflow-hidden
                           after:absolute after:inset-0 after:bg-cyan-glow/10 
                           after:opacity-0 hover:after:opacity-100 after:transition-opacity"
                >
                  AKTIFKAN PROTOKOL
                </motion.button>
              </motion.div>
            </div>
          ) : (
            // Regular Scenes
            <div className="relative z-10 h-full flex flex-col justify-between p-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="text-cyan-glow font-orbitron text-lg"
              >
                {scenes[currentScene].location}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-2xl"
              >
                <div className="text-2xl text-cyan-glow font-orbitron">
                  <Typewriter
                    onInit={(typewriter) => {
                      scenes[currentScene].text.forEach((line, index) => {
                        typewriter
                          .typeString(line)
                          .pauseFor(1000)
                          .callFunction(() => {
                            if (index === scenes[currentScene].text.length - 1) {
                              setIsTypingComplete(true);
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
          )}

          {/* Futuristic Corner Elements */}
          <div className="absolute top-4 left-4 w-32 h-32 border-l-2 border-t-2 border-cyan-glow/50 rounded-tl-lg"></div>
          <div className="absolute top-4 right-4 w-32 h-32 border-r-2 border-t-2 border-cyan-glow/50 rounded-tr-lg"></div>
          <div className="absolute bottom-4 left-4 w-32 h-32 border-l-2 border-b-2 border-cyan-glow/50 rounded-bl-lg"></div>
          <div className="absolute bottom-4 right-4 w-32 h-32 border-r-2 border-b-2 border-cyan-glow/50 rounded-br-lg"></div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default StoryIntro;