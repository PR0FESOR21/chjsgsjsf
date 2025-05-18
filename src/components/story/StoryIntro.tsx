import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { ChevronRight, Clock, Signal, Wifi, Radio } from 'lucide-react';

interface Scene {
  id: number;
  text: string;
  image: string;
  filter?: string;
}

interface StoryIntroProps {
  onComplete: () => void;
}

const scenes: Scene[] = [
  {
    id: 1,
    text: "Year 2135. Planet Smoketron faces a deadly energy crisis...",
    image: "https://images.pexels.com/photos/5738242/pexels-photo-5738242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    filter: "hue-rotate(180deg) brightness(0.6)"
  },
  {
    id: 2,
    text: "A mysterious signal detected... originating from a network called BASE in the Earth galaxy.",
    image: "https://images.pexels.com/photos/8100784/pexels-photo-8100784.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    filter: "hue-rotate(-30deg) brightness(0.7)"
  },
  {
    id: 3,
    text: "CIGAR, the Etherion extractor, was created... but it needs the human network to fully activate.",
    image: "https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    filter: "hue-rotate(60deg) brightness(0.8)"
  },
  {
    id: 4,
    text: "The community is the fuel. You are part of this mission.",
    image: "https://images.pexels.com/photos/8728388/pexels-photo-8728388.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    filter: "hue-rotate(30deg) brightness(0.7)"
  },
  {
    id: 5,
    text: "The base is ready. Begin your journey.",
    image: "https://images.pexels.com/photos/7672252/pexels-photo-7672252.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    filter: "hue-rotate(-60deg) brightness(0.8)"
  }
];

const StoryIntro: React.FC<StoryIntroProps> = ({ onComplete }) => {
  const [currentScene, setCurrentScene] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
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
    if (isAutoPlaying && isTypingComplete && currentScene < scenes.length - 1) {
      timer = setTimeout(() => {
        setCurrentScene(prev => prev + 1);
        setIsTypingComplete(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [currentScene, isTypingComplete, isAutoPlaying]);

  const handleNext = () => {
    if (currentScene === scenes.length - 1) {
      onComplete();
    } else {
      setCurrentScene(prev => prev + 1);
      setIsTypingComplete(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
      <div className="smoke-effect"></div>
      
      {/* Futuristic HUD Elements */}
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
                  className={`w-1 h-3 ${i <= signalStrength ? 'bg-cyan-glow' : 'bg-cyan-glow/30'}`}
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="relative w-full h-full"
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
            style={{
              backgroundImage: `url(${scenes[currentScene].image})`,
              filter: scenes[currentScene].filter
            }}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
            <div className="max-w-3xl text-center">
              <div className="text-2xl md:text-4xl text-cyan-glow font-orbitron mb-8 min-h-[120px] relative">
                <div className="smoke-text-effect"></div>
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                      .typeString(scenes[currentScene].text)
                      .callFunction(() => setIsTypingComplete(true))
                      .start();
                  }}
                  options={{
                    delay: 50,
                    cursor: '|',
                  }}
                />
              </div>
            </div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isTypingComplete ? 1 : 0 }}
              className="absolute bottom-10 right-10"
            >
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-transparent border-2 border-cyan-glow text-cyan-glow 
                         font-orbitron text-lg rounded-md hover:bg-cyan-glow/20 
                         transition-all duration-300 flex items-center space-x-2"
              >
                <span>{currentScene === scenes.length - 1 ? 'Enter' : 'Next'}</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>

            {/* Scene Progress */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {scenes.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentScene ? 'bg-cyan-glow w-6' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>

            {/* Futuristic Corner Elements */}
            <div className="absolute top-4 left-4 w-32 h-32 border-l-2 border-t-2 border-cyan-glow/50 rounded-tl-lg"></div>
            <div className="absolute top-4 right-4 w-32 h-32 border-r-2 border-t-2 border-cyan-glow/50 rounded-tr-lg"></div>
            <div className="absolute bottom-4 left-4 w-32 h-32 border-l-2 border-b-2 border-cyan-glow/50 rounded-bl-lg"></div>
            <div className="absolute bottom-4 right-4 w-32 h-32 border-r-2 border-b-2 border-cyan-glow/50 rounded-br-lg"></div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default StoryIntro;