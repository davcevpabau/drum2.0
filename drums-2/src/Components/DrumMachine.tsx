import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Play,
  Pause,
  Save,
  RefreshCw,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import { soundURLs } from "../Constants/soundURLs";
import DrumPad from "./DrumPad";

const DrumMachine = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [showTips, setShowTips] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [selectedPad, setSelectedPad] = useState<string | null>(null);

  const categories = ["all", "kicks", "snares", "hi-hats", "percussion"];

  // Filter sounds based on active category
  const filteredSounds =
    activeCategory === "all"
      ? soundURLs
      : soundURLs.filter(
          (sound) =>
            sound.label.toLowerCase().includes(activeCategory) ||
            (activeCategory === "kicks" &&
              sound.label.toLowerCase().includes("kik")) ||
            (activeCategory === "percussion" &&
              !sound.label.toLowerCase().includes("kick") &&
              !sound.label.toLowerCase().includes("kik") &&
              !sound.label.toLowerCase().includes("snare") &&
              !sound.label.toLowerCase().includes("hat"))
        );

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      const sound = soundURLs.find((s) => s.keyTrigger === e.key.toUpperCase());
      if (sound) {
        setSelectedPad(sound.keyTrigger);
        setTimeout(() => setSelectedPad(null), 300);
      }
    };

    window.addEventListener("keydown", keyDownHandler);
    return () => window.removeEventListener("keydown", keyDownHandler);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.2,
      },
    },
  };

  const padVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-3xl font-semibold bg-gradient-to-r from-blue-400 to-blue-200 text-transparent bg-clip-text">
            Drum Studio
          </h1>

          <div className="flex flex-wrap gap-3">
            <motion.button
              className={`${
                isRecording
                  ? "bg-red-600 hover:bg-red-500"
                  : "bg-white/10 hover:bg-white/15"
              } 
                rounded-xl py-2 px-4 text-sm font-medium flex items-center transition-all duration-200`}
              onClick={() => setIsRecording(!isRecording)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {isRecording ? (
                <Pause size={16} className="mr-2" />
              ) : (
                <Play size={16} className="mr-2" />
              )}
              {isRecording ? "Recording..." : "Record"}
            </motion.button>

            <motion.button
              className="bg-white/10 hover:bg-white/15 rounded-xl py-2 px-4 text-sm font-medium flex items-center"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Save size={16} className="mr-2" />
              Save
            </motion.button>

            <motion.button
              className="bg-white/10 hover:bg-white/15 rounded-xl py-2 px-4 text-sm font-medium flex items-center"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <RefreshCw size={16} className="mr-2" />
              Reset
            </motion.button>
          </div>
        </div>

        {/* Sound Categories */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/15"
              }`}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Drum Pads Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredSounds.map((pad, i) => (
            <motion.div key={i} variants={padVariants}>
              <DrumPad
                sound={pad.url}
                label={pad.label}
                keyTrigger={pad.keyTrigger}
                isActive={selectedPad === pad.keyTrigger}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Help/Tips Section */}
        <div className="mt-8">
          <motion.button
            onClick={() => setShowTips(!showTips)}
            className="flex items-center justify-between w-full px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-left transition-colors duration-200"
            whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          >
            <div className="flex items-center">
              <HelpCircle size={18} className="text-blue-400 mr-2" />
              <span className="font-medium">How to Use the Drum Machine</span>
            </div>
            <motion.div
              animate={{ rotate: showTips ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={18} />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {showTips && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="p-4 bg-white/5 mt-1 rounded-xl border border-white/10">
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      Click on drum pads or use keyboard keys to trigger sounds
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      Press the Record button to start recording your beat
                      patterns
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      Use the category filters to find specific types of sounds
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      Save your creations and export them when finished
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default DrumMachine;
