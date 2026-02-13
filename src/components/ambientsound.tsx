import { useEffect, useRef } from "react";

const AmbientSound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/sounds/ambient.mp3");

    audio.loop = true;
    audio.volume = 0.25; // soothing level
    audioRef.current = audio;

    // Start after first interaction
    const startAudio = () => {
      audio.play().catch(() => {});
      window.removeEventListener("click", startAudio);
    };

    window.addEventListener("click", startAudio);

    return () => {
      window.removeEventListener("click", startAudio);
      audio.pause();
    };
  }, []);

  return null;
};

export default AmbientSound;
