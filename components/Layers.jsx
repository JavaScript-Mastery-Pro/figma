"use client";

import Image from "next/image";

import { layersData } from "@/constants";

const Layers = () => {
  return (
    <div
      id="layers"
      className="flex flex-col border-t border-primary-grey-200 bg-primary-black text-primary-grey-300 min-w-[227px] sticky left-0 h-screen pt-[60px] max-sm:hidden"
    >
      <h3 className="border border-primary-grey-200 px-5 py-4 text-xs uppercase">
        Layers
      </h3>

      <div className="flex flex-col">
        {layersData.map((item, index) => (
          <div
            key={index}
            className="group my-1 flex items-center gap-2 px-5 py-2.5 hover:cursor-pointer hover:bg-primary-green hover:text-primary-black"
          >
            <Image
              src={item.icon}
              alt="Layer"
              width={16}
              height={16}
              className="group-hover:invert"
            />
            <h3 className="text-sm font-semibold">{item.text}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Layers;
