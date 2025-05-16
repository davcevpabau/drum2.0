import { motion } from "framer-motion";
import {
  Home,
  Music,
  Headphones,
  Settings,
  User,
  X,
  PlaySquare,
  BookOpen,
  Cloud,
} from "lucide-react";

// Define types
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface MenuItem {
  icon: React.ReactNode;
  label: string;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const menuItems: MenuItem[] = [
    { icon: <Home size={20} />, label: "Home" },
    { icon: <Music size={20} />, label: "Drum Machine" },
    { icon: <PlaySquare size={20} />, label: "Sequencer" },
    { icon: <Headphones size={20} />, label: "My Recordings" },
    { icon: <BookOpen size={20} />, label: "Sound Library" },
    { icon: <Cloud size={20} />, label: "Cloud Projects" },
    { icon: <Settings size={20} />, label: "Settings" },
  ];

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  };

  const containerVariants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
          onClick={toggleSidebar}
        />
      )}

      <motion.div
        className={`fixed top-0 left-0 h-full bg-black/90 backdrop-blur-lg text-white z-50 w-64 ${
          isOpen ? "block" : "hidden md:block"
        } border-r border-white/10`}
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen || window.innerWidth >= 768 ? "open" : "closed"}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
                <Music size={18} className="text-white" />
              </div>
              <span className="ml-3 text-xl font-medium">RhythmKit</span>
            </div>
            <motion.button
              onClick={toggleSidebar}
              className="md:hidden"
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X size={22} />
            </motion.button>
          </div>

          <motion.div className="flex-1 space-y-1" variants={containerVariants}>
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="overflow-hidden"
              >
                <motion.div
                  className="flex items-center p-3 rounded-xl hover:bg-white/10 cursor-pointer"
                  whileHover={{
                    x: 4,
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="text-blue-400">{item.icon}</div>
                  <span className="ml-3 font-medium">{item.label}</span>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-auto p-4 rounded-xl overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%)",
              boxShadow: "0 4px 24px -8px rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <User size={20} />
              </div>
              <div className="ml-3">
                <p className="font-medium">Pro Account</p>
                <p className="text-xs text-blue-300">Unlimited access</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
