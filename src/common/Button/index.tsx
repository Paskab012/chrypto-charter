import React from "react";
import Link from "next/link";
import { IconType } from "react-icons";

interface ButtonProps {
  text: string;
  icon?: React.ElementType;
  href?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, icon: Icon, href, onClick }) => {
  const ButtonWrapper = href ? "a" : "button";
  return (
    <ButtonWrapper href={href} onClick={onClick}>
      <p className='flex items-center justify-center bg-[#D3CFC4] px-6 py-2 text-[#383836] transition-colors hover:bg-[#D3CFC4]/80'>
        {text}
        {Icon && <Icon className='ml-2' />}
      </p>
    </ButtonWrapper>
  );
};

export default Button;
