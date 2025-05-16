import { motion } from "framer-motion";
import { Github, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <motion.div
      className="bg-black/70 backdrop-blur-md border-t border-white/10 py-4 px-6 text-gray-400 text-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { delay: 0.2, duration: 0.5 },
      }}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <span className="text-blue-400">Rhythm</span>Kit ©{" "}
          {new Date().getFullYear()}
        </div>

        <div className="flex flex-col md:flex-row md:space-x-8 items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <motion.a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors"
              whileHover={{ y: -2, color: "#60a5fa" }}
            >
              <Github size={18} />
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors"
              whileHover={{ y: -2, color: "#60a5fa" }}
            >
              <Twitter size={18} />
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors"
              whileHover={{ y: -2, color: "#60a5fa" }}
            >
              <Instagram size={18} />
            </motion.a>
          </div>

          <div className="flex space-x-6">
            <motion.a
              href="#"
              className="hover:text-blue-400 transition-colors"
              whileHover={{ x: 2 }}
            >
              Privacy
            </motion.a>
            <motion.a
              href="#"
              className="hover:text-blue-400 transition-colors"
              whileHover={{ x: 2 }}
            >
              Terms
            </motion.a>
            <motion.a
              href="#"
              className="hover:text-blue-400 transition-colors"
              whileHover={{ x: 2 }}
            >
              Help
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Footer;
