"use client";

export default function ArrowUpLotie({handleClick}: {handleClick: () => void}) {
  return (
    <iframe
      onClick={handleClick}
      className="w-8 h-8 -rotate-90 cursor-pointer"
      allow="autoplay; fullscreen; picture-in-picture"
      //   loading="lazy"
      title="ArrowLeftLotie"
      src="https://lottie.host/embed/cee30ad4-808e-48dd-a071-a0423b374ce0/Mklq4Rs3ue.json"
    ></iframe>
  );
}
