"use client";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { useRef, useEffect } from "react";
import gsap from "gsap";

type Props = {
  children: React.ReactNode;
};
function SmoothScrolling({ children }: Props) {
  const lenisRef = useRef();

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  });

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.5,
      }}
      // autoRaf={false}
    >
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;
