import React, { useEffect, useState } from "react";

const BackgroundVideo = () => {
  const videoSrc = [
      "raining_video.mp4",
    "dusk.mp4",
    // "snowy.mp4",
    "sunny.mp4",
    "windy.mp4",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);

  useEffect(() => {
    const preload = document.createElement("video");
    preload.src = videoSrc[nextIndex];
    preload.load();
  }, [nextIndex]);
  const transitionVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % videoSrc.length);
    setNextIndex((prev) => (prev + 1) % videoSrc.length);
  };
  return (
    <>
      <video
        src={`/assets/${videoSrc[currentIndex]}`}
        className="absolute w-full h-full object-cover -z-10"
        playsInline
        autoPlay
        loop={false}
        muted
        preload="auto"
        onEnded={transitionVideo}
      ></video>
    </>
  );
};

export default BackgroundVideo;
