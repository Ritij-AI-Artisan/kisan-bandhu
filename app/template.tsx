'use client';
import { motion } from 'framer-motion';

/** 150ms fade between routes — never blocks navigation. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15, ease: 'easeOut' }}>
      {children}
    </motion.div>
  );
}
