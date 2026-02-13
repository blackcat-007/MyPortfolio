import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
  const cursor = cursorRef.current!;
  if (!cursor) return;

  let hover = false;

  const mouse = { x: 0, y: 0 };
  const pos = { x: 0, y: 0 };

  // Track mouse
  const move = (e: MouseEvent) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  };

  document.addEventListener("mousemove", move);

  // Smooth follow loop (NO GSAP tween)
  const loop = () => {
    if (!hover) {
      const speed = 0.15;

      pos.x += (mouse.x - pos.x) * speed;
      pos.y += (mouse.y - pos.y) * speed;

      gsap.set(cursor, {
        x: pos.x,
        y: pos.y,
      });
    }

    requestAnimationFrame(loop);
  };

  loop();

  // Hover interactions
  const items = document.querySelectorAll("[data-cursor]");

  items.forEach((item) => {
    const el = item as HTMLElement;

    const enter = () => {
      const rect = el.getBoundingClientRect();

      if (el.dataset.cursor === "icons") {
        hover = true;

        cursor.classList.add("cursor-icons");

        gsap.to(cursor, {
          x: rect.left,
          y: rect.top,
          duration: 0.3,
          ease: "power3.out",
          overwrite: "auto",
        });

        cursor.style.setProperty("--cursorH", `${rect.height}px`);
      }

      if (el.dataset.cursor === "disable") {
        cursor.classList.add("cursor-disable");
      }
    };

    const leave = () => {
      hover = false;
      cursor.classList.remove("cursor-disable", "cursor-icons");
    };

    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
  });

  return () => {
    document.removeEventListener("mousemove", move);
  };
}, []);


  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
