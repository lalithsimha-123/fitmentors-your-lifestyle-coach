import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const StickyWhatsApp = () => {
  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/919876543210?text=Hi%20Rajath,%20I%27m%20interested%20in%20fitness%20coaching",
      "_blank"
    );
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      onClick={handleWhatsApp}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-ping" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full" />
    </motion.button>
  );
};

export default StickyWhatsApp;
