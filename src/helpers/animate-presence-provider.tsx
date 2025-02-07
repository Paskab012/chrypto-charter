"use client";

import { AnimatePresence } from "framer-motion";

function AnimatePresenceProvider({ children }: any) {
  return <AnimatePresence>{children}</AnimatePresence>;
}

export default AnimatePresenceProvider;
