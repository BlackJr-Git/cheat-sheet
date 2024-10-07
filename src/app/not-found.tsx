import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <iframe
        className="w-1/2 h-1/2"
        title="Not Found"
        src="https://lottie.host/embed/5e5f762b-435e-4800-8d0e-cb582a9ebf54/wQ9KLXENGN.json"
      ></iframe>
    </div>
  );
}
