import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import { Bebas_Neue } from "@next/font/google";

import Accordion from "./accordion";

type Props = {
  question: string;
  answer: string;
  idx: number;
};

interface LayoutProps {
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
  isSomeActive: any;
  turn: boolean[];
  setTurn: Dispatch<SetStateAction<boolean[]>>;
  data: Props[];
}

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"]
});

const FrenquentlyAskedQ = ({
  handleClick,
  isSomeActive,
  data,
  turn,
  setTurn
}: LayoutProps) => {
  return (
    <div className='  flex  justify-center items-center  md:w-5/6 flex-col mx-auto px-4 sm:px-0 py-20'>
      <div className=''>
      <h1
              className={`mb-4 sm:text-6xl text-4xl font-bold ${bebasNeue.className}`}
            >            Frequently Asked Questions
        </h1>
        <p className='  text-center  font-normal text-gray-400 '>
          Here you will find the answers to the frequently asked questions.
        </p>
      </div>
      <div className='items-center flex flex-col lg:w-7/12 pt-4 w-full  my-2  px-2'>
        {data.map((el, i) => {
          return (
            <div className='w-full' key={"questions" + i}>
              <Accordion
                question={el.question}
                answer={el.answer}
                turn={turn}
                setTurn={setTurn}
                idx={el.idx}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FrenquentlyAskedQ;
