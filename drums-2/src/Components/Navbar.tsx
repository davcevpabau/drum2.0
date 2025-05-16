import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, Search, Bell, Download } from "lucide-react";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const [isSearchActive, setIsSearchActive] = useState(false);

  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const searchVariants = {
    collapsed: {
      width: "40px",
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    expanded: {
      width: "240px",
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      className="h-16 backdrop-blur-md bg-black/70 border-b border-white/10 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30"
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center">
        <motion.button
          onClick={toggleSidebar}
          className="md:hidden mr-4 w-10 h-10 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Menu size={22} />
        </motion.button>
      </div>

      <div className="flex-1 flex justify-center">
        <motion.div
          className={`relative flex items-center bg-white/10 rounded-full overflow-hidden ${
            isSearchActive
              ? "border border-blue-400/40"
              : "border border-transparent"
          }`}
          variants={searchVariants}
          animate={isSearchActive ? "expanded" : "collapsed"}
        >
          <Search
            className="absolute left-3 text-white/60"
            size={16}
            onClick={() => setIsSearchActive(true)}
          />
          <input
            type="text"
            className={`bg-transparent text-white w-full h-10 pl-10 pr-4 focus:outline-none ${
              isSearchActive ? "opacity-100" : "opacity-0"
            }`}
            placeholder="Search sounds..."
            onBlur={() => setIsSearchActive(false)}
            onFocus={() => setIsSearchActive(true)}
          />
        </motion.div>
      </div>

      <div className="flex items-center space-x-4">
        <motion.button
          className="relative w-10 h-10 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Bell size={20} className="text-white/80" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
        </motion.button>

        <motion.button
          className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white rounded-full h-9 px-4 text-sm font-medium flex items-center shadow-lg shadow-blue-600/20"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Download size={16} className="mr-2" />
          Export
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Navbar;
