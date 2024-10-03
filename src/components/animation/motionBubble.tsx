"use client";
import { motion } from "framer-motion";
import { Children } from "react";

function MottionBubble({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      animate={{
        x: ["0%", "50%", "25%"], // Déplace le carré de 0% à 50% de la largeur de l'écran, puis retourne à 0%
        y: ["0%", "50%", "30%"], // Déplace le carré de 0% à 50% de la hauteur de l'écran, puis retourne à 0%
      }}
      transition={{
        duration: 30, // Durée de l'animation
        ease: "easeInOut", // Type d'animation
        repeat: Infinity, // Répéter indéfiniment
        repeatType: "reverse", // Faire l'animation en boucle (aller-retour)
      }}
      className={`absolute bg-transparent animate-pulse ${className} absolute`}
    >
      {children}
    </motion.div>
  );
}

export default MottionBubble;
