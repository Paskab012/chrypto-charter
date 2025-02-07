"use client";
import { ReactLenis } from "@studio-freight/react-lenis";

function LenisProvider({ children }: any) {
  return <ReactLenis root>{children}</ReactLenis>;
}

export default LenisProvider;
