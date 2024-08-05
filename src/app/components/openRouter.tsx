import React, { useState } from "react";
import { OpenAIData } from "../lib/interface";

import { AnimatePresence, motion } from "framer-motion";

export default function OpenAI({ message }: { message: string }) {
  const [openStates, setOpenStates] = useState<boolean[]>([]);
  if (!message) return <div>Loading....</div>;
  const data: OpenAIData = JSON.parse(message);
  console.log(data)

  const toggleOpenState = (index: number) => {
    setOpenStates((prev) => {
      const newStates = [...prev];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };
  return (
    <ul className="bg-slate-600 h-full p-5 mt-6 rounded">
      {data.recipes.map((item, index) => (
        <li
          key={index}
          className={`bg-gray-700 p-2 rounded mb-2 cursor-pointer`}
        >
          <div
            onClick={() => toggleOpenState(index)}
            className="flex justify-between items-center"
          >
            <span>
              Recipe for: {item.recipeName} | Serving: {item.serving}
            </span>
            <div className="flex gap-2">
              <AnimatePresence mode="wait">
                <motion.a className=" cursor-pointer border-none rounded-xl border-2 p-2 fill-slate-500 hidden lg:block">
                  <motion.svg
                    height="25px"
                    width="25px"
                    animate={{ rotate: openStates[index] ? 0 : 90 }}
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 330 330"
                    xmlSpace="preserve"
                  >
                    <path
                      id="XMLID_225_"
                      d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
	c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
	s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                    />
                  </motion.svg>
                </motion.a>
              </AnimatePresence>
            </div>
          </div>
          <div
            className={`p-1 ${
              openStates[index] ? "block" : "hidden"
            } cursor-auto relative`}
          >
            <hr className="w-full border rounded-full border-slate-600" />
            <div className="flex flex-col mb-2">
              ingredients:
              <ul className="flex gap-1 flex-col  list-disc">
                {item.ingredients.map((ingredient, i) => (
                  <div key={i} className="flex gap-1 ml-5">
                    <li>{ingredient.item}:</li>
                    <li className="list-none">{ingredient.amount}</li>
                   </div>
                ))}
              </ul>
            </div>
            {item.instruction}
          </div>
        </li>
      ))}
    </ul>
  );
}
