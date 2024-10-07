"use client";
import ArrowUpLotie from "./arrowUpLotie";
import Image from "next/image";
const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Pour un effet de défilement fluide
    });
  };

  return (
    <button
      aria-label="Scroll to top"
      onClick={scrollToTop}
      className="fixed bottom-4 cursor-pointer right-4 p-3 text-white rounded-full shadow-lg transition z-50"
    >
      {/* <ArrowUpLotie handleClick={scrollToTop} /> */}
      {/* <Image
        src="/arrow-left.gif"
        alt="Arrow animation"
        width={50}
        height={50}
        className="w-8 h-8"
      /> */}
      <img
        className="w-8 h-8 -rotate-90"
        src="/arrow-left.gif"
        alt="animated gif"
      />
    </button>
  );
};

export default ScrollToTopButton;
