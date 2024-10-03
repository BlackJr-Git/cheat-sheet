"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ChangingWords = () => {
  // Liste des mots qui changeront
  const words = ["IA", "Design", "UX", "UI" , "Photos", "Dev Web"];

  // État pour suivre quel mot afficher
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    // Changer de mot toutes les 2 secondes (2000 ms)
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) =>
        prevIndex === words.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    // Nettoyage de l'intervalle quand le composant est démonté
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <motion.span
      key={currentWordIndex} // Utiliser la clé pour appliquer l'animation à chaque changement
      initial={{ opacity: 0, y: 50 }} // Animation d'entrée
      animate={{ opacity: 1, y: 0 }} // Animation active
      exit={{ opacity: 0, y: -50 }} // Animation de sortie
      transition={{ duration: 0.5 }} // Durée de l'animation
      className=""
    >
      <span>{words[currentWordIndex]}</span>
    </motion.span>
  );
};

export default ChangingWords;
