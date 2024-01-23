import { useRef } from "react";
import Image from "next/image";

import { alignmentOptions } from "@/constants";

import { Button } from "@/components/ui/button";
import { useFigma } from "@/context/FigmaProvider";

import Text from "./Text";
import Color from "./Color";
import Export from "./Export";
import Groups from "./Groups";
import Dimensions from "./Dimensions";

const Design = () => {
  const colorInputRef = useRef(null);
  const strokeInputRef = useRef(null);
  const {
    elementAttributes,
    setElementAttributes,
    handleGrouping,
    handleAlignment,
  } = useFigma();

  const handleInputChange = (property, value) => {
    setElementAttributes({ ...elementAttributes, [property]: value });
  };

  return (
    <section
      id="design"
      className="border-t border-primary-grey-200 bg-primary-black text-primary-grey-300 300 max-w-[320px] sticky left-0 h-screen pt-[60px] max-sm:hidden"
    >
      <h3 className="border-b border-primary-grey-200 px-5 py-4 text-xs uppercase">
        Design
      </h3>

      {/* alignment */}
      <div className="flex border-b border-primary-grey-200 px-5 py-4">
        {alignmentOptions.map((option) => (
          <Button
            key={option.value}
            className="group hover:bg-primary-green"
            size="icon"
            // onClick={() => {
            //   setSelectedElementAttributes({
            //     ...selectedElementAttributes,
            //     alignment: option.value,
            //   });
            // }}
          >
            <Image
              src={option.icon}
              alt={option.label}
              width={14}
              height={14}
              className="group-hover:invert"
            />
          </Button>
        ))}
      </div>

      <Groups handleGrouping={handleGrouping} />

      <Dimensions handleInputChange={handleInputChange} />

      <Text handleInputChange={handleInputChange} />

      <Color
        inputRef={colorInputRef}
        attribute={elementAttributes.elementColor}
        placeholder="color"
        attributeType="elementColor"
        handleInputChange={handleInputChange}
      />

      <Color
        inputRef={strokeInputRef}
        attribute={elementAttributes.strokeColor}
        placeholder="stroke"
        attributeType="strokeColor"
        handleInputChange={handleInputChange}
      />

      <Export />
    </section>
  );
};

export default Design;
