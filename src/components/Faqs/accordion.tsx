import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

type Props = {
  question: string;
  answer: string;
  turn: boolean[];
  setTurn: Dispatch<SetStateAction<boolean[]>>;
  idx: number;
};

const Accordion = ({ question, answer, turn, setTurn, idx }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = turn[idx]
        ? `${contentRef.current.scrollHeight}px`
        : "0px";
    }
  }, [contentRef, turn, idx]);

  const toggleAccordion = () => {
    const newTurn = [...turn];
    newTurn[idx] = !newTurn[idx];
    setTurn(newTurn);
  };

  return (
    <div className='flex flex-col items-center text-white justify-center w-full text-xs border-b border-b-[#615FEB] mb-4 lg:text-base'>
      <button
        onClick={toggleAccordion}
        className='bg-transparent cursor-pointer w-full'
      >
        <div className='px-4'>
          <div className='flex items-center justify-between py-4 lg:py-6'>
            <span className='font-normal text-sm lg:text-base text-left text-[#fff] flex-1 pr-4'>
              {question}
            </span>
            <div className='flex-shrink-0'>
              {turn[idx] ? (
                <FaMinus className='text-[#615FEB] border p-1 text-lg lg:text-2xl rounded-full border-[#615FEB]' />
              ) : (
                <FaPlus className='text-[#000] border p-1 text-lg lg:text-2xl rounded-full border-[#615FEB] bg-[#615FEB]' />
              )}
            </div>
          </div>
          <div
            ref={contentRef}
            className='overflow-hidden text-left transition-all duration-500'
          >
            <p className='pb-4 font-normal text-xs lg:text-sm text-[#8a8a8a] leading-normal text-justify whitespace-pre-line'>
              {answer}
            </p>
          </div>
        </div>
      </button>
    </div>
  );
};

export default Accordion;
