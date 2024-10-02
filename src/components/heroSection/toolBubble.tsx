import Image from "next/image";

export default function ToolBubble({ className }: { className?: string }) {
  return (
    <div className={`rounded-full w-20 h-20 ${className} bg-white p-3`}>
      <Image
        src="/bubble_logo/Figma-01.svg"
        alt="logo"
        width={50}
        height={50}
      />
    </div>
  );
}
