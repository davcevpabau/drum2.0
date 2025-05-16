import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface DrumPadProps {
  sound: string;
  label: string;
  keyTrigger: string;
  isActive?: boolean;
}

const DrumPad = ({
  sound,
  label,
  keyTrigger,
  isActive = false,
}: DrumPadProps) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio(sound);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [sound]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toUpperCase() === keyTrigger) {
        playSound();
        setIsPressed(true);
        setTimeout(() => setIsPressed(false), 200);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [keyTrigger]);

  useEffect(() => {
    if (isActive) {
      playSound();
    }
  }, [isActive]);

  const playSound = async () => {
    try {
      if (audioRef.current) {
        // Reset the audio to start
        audioRef.current.currentTime = 0;

        // Play the sound
        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
          setIsPlaying(true);

          playPromise
            .then(() => {
              // Playback started successfully
            })
            .catch((error) => {
              console.error("Audio playback failed: ", error);
            });
        }
      }
    } catch (error) {
      console.error("Error playing sound: ", error);
    }
  };

  // Visual feedback when pad is played
  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        setIsPlaying(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isPlaying]);

  // Get abbreviated label if original is too long
  const getDisplayLabel = () => {
    if (label.length > 10) {
      return label.substring(0, 10) + "...";
    }
    return label;
  };

  // Generate a subtle gradient based on key trigger
  const generateGradient = () => {
    const hue = (keyTrigger.charCodeAt(0) * 15) % 360;
    return `linear-gradient(135deg, hsl(${hue}, 70%, 30%) 0%, hsl(${hue}, 50%, 15%) 100%)`;
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
        borderColor: "rgba(59, 130, 246, 0.5)",
      }}
      onClick={playSound}
      style={{
        background: generateGradient(),
      }}
      className={`relative rounded-xl p-6 w-full h-24 flex flex-col items-center justify-center shadow-lg transition-all duration-200
        ${
          isPressed || isPlaying || isActive
            ? "border-2 border-blue-400 shadow-blue-500/20"
            : "border border-white/10"
        }
      `}
    >
      {/* Visual pulse effect when played */}
      <AnimatedRing isActive={isPressed || isPlaying || isActive} />

      <span className="text-xl font-bold text-blue-300">{keyTrigger}</span>
      <span className="text-xs text-gray-400 mt-1 truncate max-w-full">
        {getDisplayLabel()}
      </span>
    </motion.button>
  );
};

// Ring animation that appears when pad is triggered
const AnimatedRing: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={
        isActive
          ? {
              opacity: [0, 0.4, 0],
              scale: [0.8, 1.4],
            }
          : { opacity: 0 }
      }
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="absolute inset-0 rounded-xl border border-blue-400"
      style={{ pointerEvents: "none" }}
    />
  );
};

export default DrumPad;
