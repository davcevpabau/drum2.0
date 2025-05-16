import { motion } from "framer-motion";
import { Music, ArrowRight, AudioLines, Zap, Share2 } from "lucide-react";

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

const WelcomeScreen = ({ onGetStarted }: WelcomeScreenProps) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.15 + 0.8,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const features = [
    {
      icon: <AudioLines size={24} className="text-blue-400" />,
      title: "Premium Sound Library",
      description:
        "Access our extensive collection of high-quality drum samples created by professional producers.",
    },
    {
      icon: <Zap size={24} className="text-blue-400" />,
      title: "Intuitive Interface",
      description:
        "Our sleek, responsive design makes creating beats effortless on any device.",
    },
    {
      icon: <Share2 size={24} className="text-blue-400" />,
      title: "Share Your Creations",
      description:
        "Export and share your beats directly to social media or your DAW.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                background: `radial-gradient(circle at center, rgba(59, 130, 246, ${
                  Math.random() * 0.3 + 0.1
                }) 0%, transparent 70%)`,
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `translate(-50%, -50%)`,
              }}
              animate={{
                x: [Math.random() * 40 - 20, Math.random() * 40 - 20],
                y: [Math.random() * 40 - 20, Math.random() * 40 - 20],
                opacity: [0.7, 0.3, 0.7],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-2xl mx-auto"
        >
          {/* Logo */}
          <motion.div
            className="mb-6 flex justify-center items-center"
            variants={itemVariants}
          >
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-xl shadow-blue-600/30">
              <Music size={32} className="text-white" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 text-transparent bg-clip-text"
            variants={itemVariants}
          >
            RhythmKit
          </motion.h1>

          {/* Subtitle */}
          <motion.div variants={itemVariants}>
            <p className="text-xl md:text-2xl text-blue-50 font-light mb-2">
              Create. Produce. Innovate.
            </p>
            <p className="text-gray-300 mb-8 max-w-lg mx-auto">
              Unleash your creativity with our professional-grade drum machine.
              Perfect for producers, beatmakers, and music enthusiasts.
            </p>
          </motion.div>

          {/* Button */}
          <motion.button
            onClick={onGetStarted}
            className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white text-lg font-medium py-4 px-8 rounded-xl flex items-center mx-auto shadow-lg shadow-blue-600/20"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 15px 25px -4px rgba(59, 130, 246, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
            variants={itemVariants}
          >
            Get Started
            <ArrowRight size={20} className="ml-2" />
          </motion.button>
        </motion.div>

        {/* Features */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 relative z-10 max-w-6xl w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300"
              whileHover={{
                y: -5,
                boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.3)",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
              }}
            >
              <div className="h-12 w-12 rounded-full bg-blue-900/30 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
