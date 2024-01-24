"use client";

import Image from "next/image";

import { Button } from "./ui/button";
import ShapesMenu from "./ShapesMenu";

import ActiveUsers from "./ActiveUsers";
import { toolbarButtons } from "@/constants";
import { useFigma } from "@/context/FigmaProvider";

// TODO: Rename to Navbar
const Toolbar = () => {
  const { handleElementSelect, activeElement } = useFigma();

  return (
    <section className="toolbar">
      <Image src="/assets/logo.svg" alt="FigPro Logo" width={58} height={20} />

      <div className="flex gap-3">
        {toolbarButtons.map((item) =>
          item.isdropdown ? (
            <ShapesMenu key={item.label} item={item} />
          ) : (
            <Button
              key={item.label}
              className={`group toolbar-element ${
                activeElement === item.value
                  ? "bg-primary-green"
                  : "hover:bg-primary-grey-200"
              }`}
              onClick={() => handleElementSelect(item.value)}
            >
              <Image
                src={item.icon}
                alt={item.label}
                width={20}
                height={20}
                className={activeElement === item.value ? "invert" : ""}
              />
            </Button>
          )
        )}
      </div>

      {/* <Button className="toolbar-btn" onClick={() => setActiveElement("reset")}>
        <Image
          src={"/assets/new-file.svg"}
          alt="New File"
          width={12}
          height={12}
        />
        <p className="text-xs">New File</p>
      </Button> */}

      <ActiveUsers />
    </section>
  );
};

export default Toolbar;
