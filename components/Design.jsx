import Image from "next/image";

import {
  alignmentOptions,
  fontFamilyOptions,
  fontSizeOptions,
  fontWeightOptions,
  groupingOptions,
} from "@/constants";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useFigma } from "@/context/FigmaProvider";
import { useRef } from "react";
import { exportToPDF } from "@/lib/utils";

const Design = () => {
  const { elementAttributes, setElementAttributes } = useFigma();

  const ColorInputRef = useRef(null);
  const strokeInputRef = useRef(null);

  return (
    <section
      id="design"
      className="border-t border-primary-grey-200 bg-primary-black text-primary-grey-300 300 min-w-[227px] sticky left-0 h-screen pt-[60px]"
    >
      <h3 className="border-b border-primary-grey-200 p-3 text-xs uppercase">
        Design
      </h3>

      {/* alignment */}
      <div className="flex border-b border-primary-grey-200 p-3">
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

      {/* grouping */}
      <section className="flex flex-col border-b border-primary-grey-200 py-3">
        <h3 className=" p-3 text-[10px] uppercase">Grouping</h3>

        <div className="flex border-b border-primary-grey-200 p-3">
          {groupingOptions.map((option) => (
            <Button
              key={option.value}
              className="group hover:bg-primary-green"
              size="icon"
              // onClick={() => {
              //   handleGrouping(option.value);
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
      </section>

      {/* dimensions */}
      <div className="flex flex-col border-b border-primary-grey-200">
        <div className="flex justify-around  p-1">
          <div className="flex w-24 items-center gap-2 rounded-sm">
            <Label htmlFor="width">W</Label>
            <Input
              type="number"
              id="width"
              placeholder="100"
              className="border-none bg-transparent"
              onChange={(e) =>
                setElementAttributes({
                  ...elementAttributes,
                  width: e.target.value,
                })
              }
            />
          </div>

          <div className="flex w-24 items-center gap-2 rounded-sm">
            <Label htmlFor="width">H</Label>
            <Input
              type="number"
              id="height"
              placeholder="100"
              className="border-none bg-transparent"
              onChange={(e) =>
                setElementAttributes({
                  ...elementAttributes,
                  height: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="flex justify-around  p-1">
          <div className="flex w-24 items-center gap-2 rounded-sm">
            <Label htmlFor="width">R</Label>
            <Input
              type="number"
              id="radius"
              placeholder="100"
              className="border-none bg-transparent"
              onChange={(e) =>
                setElementAttributes({
                  ...elementAttributes,
                  radius: e.target.value,
                })
              }
            />
          </div>

          <div className="flex w-24 items-center gap-2 rounded-sm"></div>
        </div>
      </div>

      {/* font settings */}
      <div className="flex flex-col border-b border-primary-grey-200 py-3">
        <h3 className=" p-3 text-[10px] uppercase">Text</h3>

        <div className="mx-3 flex flex-col gap-3">
          <Select
            onValueChange={(value) =>
              setElementAttributes({
                ...elementAttributes,
                fontFamily: `${value}`,
              })
            }
          >
            <SelectTrigger className="w-full rounded-sm border border-primary-grey-200">
              <SelectValue placeholder="Choose a font" />
            </SelectTrigger>
            <SelectContent className="border-primary-grey-200 bg-primary-black text-primary-grey-300">
              {fontFamilyOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className=" hover:bg-primary-green hover:text-primary-black"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="mb-5 flex gap-2">
            <Select
              onValueChange={(value) =>
                setElementAttributes({
                  ...elementAttributes,
                  fontSize: value,
                })
              }
            >
              <SelectTrigger className="w-full rounded-sm border border-primary-grey-200">
                <SelectValue placeholder="30" />
              </SelectTrigger>
              <SelectContent className="border-primary-grey-200 bg-primary-black text-primary-grey-300">
                {fontSizeOptions.map((option) => (
                  <SelectItem
                    key={option}
                    value={option}
                    className=" hover:bg-primary-green hover:text-primary-black"
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) =>
                setElementAttributes({
                  ...elementAttributes,
                  fontWeight: value,
                })
              }
            >
              <SelectTrigger className="w-full rounded-sm border border-primary-grey-200">
                <SelectValue placeholder="Semibold" />
              </SelectTrigger>
              <SelectContent className="border-primary-grey-200 bg-primary-black text-primary-grey-300">
                {fontWeightOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className=" hover:bg-primary-green hover:text-primary-black"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* color settings */}
      <div className="flex flex-col border-b border-primary-grey-200 py-3 pb-8">
        <h3 className=" p-3 text-[10px] uppercase">Color</h3>
        <div
          className="mx-3 flex  items-center gap-2 border border-primary-grey-200"
          onClick={() => ColorInputRef.current.click()}
        >
          <input
            type="color"
            className="w-1/5"
            value={elementAttributes.elementColor}
            ref={ColorInputRef}
            onChange={(e) =>
              setElementAttributes({
                ...elementAttributes,
                elementColor: e.target.value,
              })
            }
          />
          <Label className="w-[70%]">{elementAttributes.elementColor}</Label>
          <Label className="flex h-6 w-8 items-center justify-center bg-primary-grey-100 text-[10px] leading-3">
            90%
          </Label>
        </div>
      </div>

      {/* stroke settings */}
      <div className="flex flex-col border-b border-primary-grey-200 py-3 pb-8">
        <h3 className=" p-3 text-[10px] uppercase">Stroke</h3>
        <div
          className="mx-3 flex  items-center gap-2 border border-primary-grey-200"
          onClick={() => strokeInputRef.current.click()}
        >
          <input
            type="color"
            ref={strokeInputRef}
            className="w-1/5"
            value={elementAttributes.strokeColor}
            onChange={(e) =>
              setElementAttributes({
                ...elementAttributes,
                strokeColor: e.target.value,
              })
            }
          />
          <Label className="w-[70%]">{elementAttributes.strokeColor}</Label>
          <Label className="flex h-6 w-8 items-center justify-center bg-primary-grey-100 text-[10px] leading-3">
            90%
          </Label>
        </div>
      </div>

      {/* Export to PDF */}
      <div className="flex flex-col  py-3">
        <h3 className=" p-3 text-[10px] uppercase">Export</h3>
        <div className="flex  px-3">
          <Button
            variant="outline"
            className="w-full hover:bg-primary-green hover:text-primary-black"
            onClick={exportToPDF}
          >
            Export to PDF
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Design;
