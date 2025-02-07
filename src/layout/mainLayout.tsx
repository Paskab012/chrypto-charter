"use client";
import Footer from "@/src/common/Footer";
import Navbar from "@/src/components/navbar/Navbar";
import AnimatePresenceProvider from "@/src/helpers/animate-presence-provider";
import LenisProvider from "@/src/helpers/lenis-provider";
import { ReactNode, useState } from "react";

interface MainLayout {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayout) => {
  const [active, setActive] = useState([false, false, false, false, false]);
  const isSomeActive = active.some((element) => element);
  const handleClick = () => {
    isSomeActive
      ? setActive([false, false, false, false, false])
      : setActive([true, true, true, true, true, true]);
  };
  return (
    <LenisProvider>
      <AnimatePresenceProvider>
        <main className='box-border bg-[#151616] relative w-full flex-col items-center overflow-hidden'>
          <div
            className='absolute inset-0 w-full h-full opacity-20 pointer-events-none'
            style={{
              backgroundImage: `radial-gradient(circle at center, gray 1px, transparent 0.5px)`,
              backgroundSize: "12px 12px",
              backgroundPosition: "center",
              backgroundRepeat: "repeat"
            }}
          />

          <Navbar />
          <div className='w-full'>{children}</div>
          <Footer />
        </main>
      </AnimatePresenceProvider>
    </LenisProvider>
  );
};

export default MainLayout;
