import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Music,
  Library,
  Headphones,
  Settings,
  Download,
} from "lucide-react";

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

const WelcomeScreen = ({ onGetStarted }: WelcomeScreenProps) => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    // Start the animation sequence after component mounts
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (startAnimation) {
      // Auto-advance through features
      const interval = setInterval(() => {
        setCurrentFeature((prev) => {
          // When we've shown all features, trigger the onGetStarted
          if (prev >= features.length - 1) {
            clearInterval(interval);
            setTimeout(onGetStarted, 1000);
            return prev;
          }
          return prev + 1;
        });
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [startAnimation, onGetStarted]);

  const features = [
    {
      icon: <Music size={36} className="text-pink-500" />,
      title: "Professional Beats",
      description:
        "Create studio-quality drum patterns with our premium sound library",
      color: "from-pink-500 to-purple-600",
    },
    {
      icon: <Library size={36} className="text-blue-500" />,
      title: "Sample Library",
      description: "Access thousands of high-quality drum samples and loops",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: <Headphones size={36} className="text-green-500" />,
      title: "Live Mixing",
      description:
        "Mix and adjust your beats in real-time with professional tools",
      color: "from-green-500 to-teal-600",
    },
    {
      icon: <Download size={36} className="text-amber-500" />,
      title: "Export & Share",
      description:
        "Export your beats in multiple formats or share with one click",
      color: "from-amber-500 to-orange-600",
    },
    {
      icon: <Settings size={36} className="text-violet-500" />,
      title: "Customization",
      description: "Personalize your workflow with custom layouts and settings",
      color: "from-violet-500 to-purple-600",
    },
  ];

  const mainVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.5,
        staggerChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        when: "afterChildren",
      },
    },
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const titleVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const progressVariants = {
    hidden: { width: "0%" },
    visible: {
      width: "100%",
      transition: {
        duration: 1.8,
        ease: "linear",
      },
    },
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-6 overflow-hidden">
      <motion.div
        className="relative max-w-md w-full mx-auto text-center"
        variants={mainVariants}
        initial="hidden"
        animate={startAnimation ? "visible" : "hidden"}
        exit="exit"
      >
        {/* Logo */}
        <motion.div variants={logoVariants} className="mb-6">
          <div className="h-20 w-20 mx-auto rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Play size={40} className="text-white ml-1" />
          </div>
        </motion.div>

        {/* App Title */}
        <motion.div variants={titleVariants}>
          <h1 className="text-4xl font-bold mb-1 tracking-tight">RhythmKit</h1>
          <p className="text-lg text-gray-400 mb-12">
            Your premium beat production studio
          </p>
        </motion.div>

        {/* Feature Showcase */}
        <div className="h-64 relative">
          <AnimatePresence mode="wait">
            {startAnimation && (
              <motion.div
                key={currentFeature}
                className="absolute inset-0 flex flex-col items-center justify-center"
                variants={featureVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div
                  className={`h-16 w-16 rounded-full bg-gradient-to-br ${features[currentFeature].color} flex items-center justify-center mb-4 shadow-lg`}
                >
                  {features[currentFeature].icon}
                </div>
                <h2 className="text-2xl font-semibold mb-2">
                  {features[currentFeature].title}
                </h2>
                <p className="text-gray-400 max-w-xs text-center">
                  {features[currentFeature].description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {features.map((_, i) => (
            <div
              key={i}
              className="relative h-1 w-12 bg-gray-800 rounded-full overflow-hidden"
            >
              {i === currentFeature && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  variants={progressVariants}
                  initial="hidden"
                  animate="visible"
                />
              )}
              {i < currentFeature && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
