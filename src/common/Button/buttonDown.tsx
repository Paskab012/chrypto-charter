import React from "react";
import Link from "next/link";
import { IconType } from "react-icons";

interface ButtonProps {
  text: string;
  icon?: IconType;
  href: string;
  onClick?: () => void;
}

const ButtonDown: React.FC<ButtonProps> = ({
  text,
  icon: Icon,
  href,
  onClick
}) => {
  const ButtonWrapper = href ? "a" : "button";
  return (
    <Link href={href} onClick={onClick}>
      <button className='flex items-center justify-center bg-black/50 animate-bounce hover:animate-none duration-500  py-4 text-black border-white/60 border-2 rounded-t-full rounded-b-full transition-colors hover:bg-[#000]/80'>
        {text}
        {Icon && (
          <Icon className='text-white md:text-3xl sm:text-2xl text-xl' />
        )}
      </button>
    </Link>
  );
};

export default ButtonDown;
