"use client";
import { Lenis as ReactLenis } from "@studio-freight/react-lenis";

type Props = {
  children: React.ReactNode;
};
function SmoothScroll({ children }: Props) {
  return (
    <ReactLenis
      root
      options={{
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        lerp: 0.1,
        duration: 1.5,
      }}
      // autoRaf={false}
    >
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;
