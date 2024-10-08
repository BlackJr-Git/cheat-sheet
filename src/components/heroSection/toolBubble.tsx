"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ToolBubble({ className , icon }: { className?: string , icon: string }) {
  return (
    <motion.div
      className={`rounded-full w-20 h-20 ${className} bg-white p-3`}
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
    >
      <Image
        src={icon}
        alt="logo"
        width={50}
        height={50}
      />
    </motion.div>
  );
}
