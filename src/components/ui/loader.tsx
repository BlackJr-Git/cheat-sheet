// "use client";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Loader() {
  //   return <DotLottieReact src="https://lottiefiles.com/fr/free-animation/loading-40-paperplane-pXSmJB5J2C?color-palette=true" loop autoplay />;
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="w-32 h-32 border-8 border-green-500 border-dotted rounded-full animate-spin"></div>
    </div>
  );
}
