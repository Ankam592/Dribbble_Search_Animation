import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveHandler = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveHandler);

    return () => {
      window.removeEventListener("mousemove", moveHandler);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: position.y,
        left: position.x,
        width: "20px",
        height: "20px",
       backgroundColor: "rgba(224, 224, 224, 0.4)", // black with 40% opacity

        border: "1px solid #9e9e9e",
        borderRadius: "50%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none", // don’t block clicks
        zIndex: 9999,
      }}
    />
  );
}
