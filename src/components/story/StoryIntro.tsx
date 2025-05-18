import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { ChevronRight } from 'lucide-react';

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

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
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
              <div className="text-2xl md:text-4xl text-cyan-glow font-orbitron mb-8 min-h-[120px]">
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
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default StoryIntro;