"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const PageTransitionLayout: React.FC<Props> = ({ children }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode={"wait"}>
      <motion.div
        key={pathname}
        className="relative top-0 left-0 w-screen z-10 h-screen "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransitionLayout;
