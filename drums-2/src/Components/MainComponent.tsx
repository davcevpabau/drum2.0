import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import WelcomeScreen from "./WelcomeScreen";
import DrumMachine from "./DrumMachine";
import Footer from "./Footer";

const MainComponent = () => {
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = (): void => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleGetStarted = (): void => {
    setShowWelcome(false);
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen flex flex-col">
      {!showWelcome && <Navbar toggleSidebar={toggleSidebar} />}

      <div className="flex flex-1">
        {!showWelcome && (
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        )}

        <div
          className={`flex-1 transition-all duration-300 ease-in-out ${
            !showWelcome ? "md:ml-64" : ""
          }`}
        >
          <AnimatePresence mode="wait">
            {showWelcome ? (
              <motion.div
                key="welcome"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="h-full"
              >
                <WelcomeScreen onGetStarted={handleGetStarted} />
              </motion.div>
            ) : (
              <motion.div
                key="drum-machine"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="h-full"
              >
                <DrumMachine />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {!showWelcome && <Footer />}
    </div>
  );
};

export default MainComponent;
