"use client";

import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { dropdownShapes, elements } from "@/constants";

import { handleImageUpload } from "@/lib/shapes";
import { useLive } from "@/context/LiveProvider";
import { useFigma } from "@/context/FigmaProvider";

function ShapesMenu({ item }) {
  const { syncShapeInStorage } = useLive();
  const { handleElementSelect, activeElement, imageInputRef, fabricCanvasRef } =
    useFigma();

  const isShape = dropdownShapes.includes(activeElement);

  const handleDropDownMenuClick = (selectedItem) => {
    if (selectedItem.value === "image") {
      imageInputRef.current.click();
    }
    handleElementSelect(selectedItem.value);
  };

  return (
    <>
      <DropdownMenu key={item.label}>
        <DropdownMenuTrigger asChild className="no-ring">
          <Button
            className={`group toolbar-element ${
              isShape ? "bg-primary-green" : "hover:bg-primary-grey-200"
            }`}
          >
            <Image
              src={isShape ? `/assets/${activeElement}.svg` : item.icon}
              alt={item.label}
              width={20}
              height={20}
              className={`${isShape ? "invert" : ""}`}
            />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="shapes_menu-content">
          {elements.map((item) => (
            <Button
              key={item.name}
              onClick={() => handleDropDownMenuClick(item)}
              className={`shapes_menu-item ${
                activeElement === item.value
                  ? "bg-primary-green"
                  : "hover:bg-primary-grey-200"
              }`}
            >
              <div className="group flex items-center gap-2">
                <Image src={item.icon} alt={item.name} width={20} height={20} />
                <p>{item.name}</p>
              </div>
              <p className="capitalize">{item.value[0]}</p>
            </Button>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <input
        type="file"
        className="hidden"
        ref={imageInputRef}
        accept="image/*"
        onChange={(e) => {
          handleImageUpload(
            e.target.files[0],
            fabricCanvasRef,
            syncShapeInStorage
          );
        }}
      />
    </>
  );
}

export default ShapesMenu;
