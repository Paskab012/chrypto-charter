import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { Roboto } from "next/font/google";

const acumin_pro = Roboto({
  weight: "400",
  subsets: ["latin"]
});

const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  project
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4'
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className='bg-transparent  overflow-hidden max-w-4xl w-full relative pt-[5%]'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='relative aspect-video'>
              <Image
                src={project.image}
                alt={project.title}
                layout='fill'
                objectFit='cover'
              />
              <button
                onClick={onClose}
                className='absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2'
              >
                <AiOutlineClose size={20} />
              </button>
            </div>
            <div className='p-6 absolute bottom-0 bg-black/60 w-full'>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`mb-2 text-left md:text-3xl text-xl font-medium text-[#fff]  ${acumin_pro.className}`}
              >
                {project.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className='text-white mb-4 text-sm sm:text-md'
              >
                {project.location && `${project.location}`} Style:{" "}
                {project.style && `Style: ${project.style}`}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className='text-white text-sm sm:text-md'
              >
                {project.description}
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
