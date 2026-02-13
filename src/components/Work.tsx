import "./styles/Work.css";
//import WorkImage from "./WorkImage";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { config } from "../config";


const Work = () => {
  const stackRef = useRef<HTMLDivElement | null>(null);

 useEffect(() => {
  const cards = gsap.utils.toArray<HTMLElement>(".work-box");
  if (!cards.length) return;

  // 🔊 Preload sound once
  const slideSound = new Audio("/sounds/file-slide.mp3");
  slideSound.volume = 0.5;

  // Mutable stack order
  let stack = [...cards];

  // ===== Layout Function (instant, no animation) =====
  function layoutStack() {
    stack.forEach((card, i) => {
      gsap.set(card, {
        y: i * 35,
        z: -i * 40,
        scale: 1 - i * 0.04,
        opacity: 1 - i * 0.07,
      });
    });
  }

  // Initial layout
  layoutStack();

  // ===== Click Handler =====
  function handleClick(card: HTMLElement) {
    // 🔊 Play trimmed sound smoothly
    slideSound.currentTime = 0.5;
    slideSound.play();

    setTimeout(() => {
      slideSound.pause();
      slideSound.currentTime = 0.5;
    }, 150);

    // Animate clicked card flying out
    gsap.to(card, {
      y: -350,
      z: 200,
      rotateX: 10,
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
      overwrite: "auto",

      onComplete: () => {
        // Move clicked card to back
        stack = stack.filter((c) => c !== card);
        stack.push(card);

        // Reset instantly behind stack
        gsap.set(card, {
          y: 35 * (stack.length - 1),
          z: -40 * (stack.length - 1),
          scale: 1 - (stack.length - 1) * 0.04,
          opacity: 1 - (stack.length - 1) * 0.07,
          rotateX: 0,
        });

        // Re-layout others smoothly
        gsap.to(stack, {
          y: (i) => i * 35,
          z: (i) => -i * 40,
          scale: (i) => 1 - i * 0.04,
          opacity: (i) => 1 - i * 0.07,
          duration: 0.4,
          ease: "power2.out",
        });
      },
    });
  }

  // ===== Attach listeners =====
  cards.forEach((card) => {
    card.addEventListener("click", () => handleClick(card));
  });

  // ===== Cleanup =====
  return () => {
    cards.forEach((card) => {
      card.replaceWith(card.cloneNode(true));
    });
  };
}, []);



  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
          
        </h2>
          <span >(click to change)</span>
        <div className="work-stack" ref={stackRef}>
          {config.projects.map((project, index) => (
            <div className="work-box" key={project.id}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>

                <h4>Tools and features</h4>
                <h5>{project.technologies}</h5>
                <p>{project.features}</p>
              </div>

              <img
                src={project.image}
                alt={project.title}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
