import React, { useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import AOS from "aos";
import { useLenis } from "@studio-freight/react-lenis";
import { Roboto } from "@next/font/google";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const acumin_pro = Roboto({
  weight: "400",
  subsets: ["latin"]
}) as unknown as { className: string };

const modalAnimationProps = {
  initial: { opacity: 0, y: -100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -100 },
  transition: { type: "spring", damping: 25, stiffness: 200 }
} as const;

const overlayAnimationProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
} as const;

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children
}): JSX.Element => {
  const lenis = useLenis();

  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
      AOS.refresh();
    } else {
      lenis?.start();
    }

    return () => {
      lenis?.start();
    };
  }, [isOpen, lenis]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            {...overlayAnimationProps}
            onClick={onClose}
            className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4'
          />
          <motion.div
            {...modalAnimationProps}
            className='fixed top-[10%] lg:left-[26%] sm:left-[15%] -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-[#383836] z-50 rounded-sm shadow-xl'
          >
            <div className='relative px-12 pt-12 pb-6'>
              <button
                type='button'
                onClick={onClose}
                aria-label='Close modal'
                className='absolute right-4 top-4 text-[#AEA797] border p-2 rounded-full text-xl border-white/10 hover:text-white transition-colors'
              >
                <AiOutlineClose size={20} />
              </button>

              <h2
                className={`text-left text-2xl font-bold text-[#AEA797] sm:text-4xl ${acumin_pro.className}`}
                data-aos='fade-down'
                data-aos-delay='100'
              >
                {title}
              </h2>
            </div>

            <div
              className='px-12 pb-12'
              style={{
                maxHeight: "calc(80vh - 116px)",
                overflowY: "auto"
              }}
            >
              <div
                className='custom-scrollbar'
                role='dialog'
                aria-labelledby='modal-title'
              >
                <div className='text-neutral-200 space-y-4'>{children}</div>
              </div>
            </div>
          </motion.div>

          <style jsx global>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
            }

            .custom-scrollbar::-webkit-scrollbar-track {
              background: rgba(255, 255, 255, 0.1);
              border-radius: 3px;
            }

            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(174, 167, 151, 0.5);
              border-radius: 3px;
            }

            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: rgba(174, 167, 151, 0.7);
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
