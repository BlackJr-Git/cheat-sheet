// "use client";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";
// import LottieFlight from "../animation/lottieFlight.json";
// import Image from "next/image";
// import { Lottie } from "lottie-react";

export default function Loader() {
  return (
    // <DotLottieReact
    //   src="https://lottie.host/23584564-9cc9-4795-9c7d-7f50319930f0/nuxkDAFRGb.lottie"
    //   loop
    //   autoplay
    //   className="w-screen h-screen"
    // />
    // <Image
    //   src={LottieFlight}
    //   alt="LottieFlight"
    //   className="w-screen h-screen"
    //   width={800}
    //   height={800}
    // />
    <iframe
      title="LottieFlight"
      className="w-screen h-screen"
      src="https://lottie.host/embed/e541c2da-b99d-45fd-954a-c58fd37b4b01/FdfMqN7WOf.json"
    ></iframe>
    // {LottieFlight }
  );
  // return (
  //   <div className="flex justify-center items-center h-screen w-screen">
  //     <div className="w-32 h-32 border-8 border-green-500 border-dotted rounded-full animate-spin"></div>
  //    https://lottie.host/48cdd97b-b894-4a8d-9a78-377353bf994e/xAS8eBokxa.json
  //   </div>
  // );
}
