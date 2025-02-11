import { Check } from "lucide-react";
import React from "react";

interface ServiceButtonProps {
  type: "jet" | "yacht";
  isSelected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const ServiceButton = ({
  type,
  isSelected,
  onClick,
  icon,
  label
}: ServiceButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between rounded-lg border bg-[#F6F6F6] p-4 transition-all duration-200 ${
        isSelected
          ? "border-[#BFBFBF] shadow-sm"
          : "border-gray-200 hover:bg-gray-50"
      }`}
    >
      <div className='flex items-center gap-3'>
        {icon}
        <span className='text-sm font-normal'>{label}</span>
      </div>
      {isSelected ? (
        <span className='rounded-full border p-1 border-[#2db343]'>
          <Check className='h-3 w-3 text-[#2db343]' />
        </span>
      ) : (
        <span className='rounded-full border p-2 border-[#bbbbbb]' />
      )}
    </button>
  );
};

export default ServiceButton;
