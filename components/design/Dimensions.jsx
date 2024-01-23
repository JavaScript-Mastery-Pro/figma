import { Label } from "../ui/label";
import { Input } from "../ui/input";

const dimensionsOptions = [
  { label: "W", property: "width" },
  { label: "H", property: "height" },
];

function Dimensions({ handleInputChange }) {
  return (
    <section className="flex flex-col border-b border-primary-grey-200">
      <div className="flex gap-4 px-6 py-3">
        {dimensionsOptions.map((item) => (
          <div
            key={item.label}
            className="flex flex-1 items-center gap-3 rounded-sm"
          >
            <Label htmlFor={item.property} className="font-bold text-[10px]">
              {item.label}
            </Label>
            <Input
              type="number"
              id={item.property}
              placeholder="100"
              min={10}
              max={10}
              className="input-ring"
              onChange={(e) => handleInputChange(item.property, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="flex px-6 py-3 w-full">
        <div className="flex items-center gap-3 rounded-sm w-full">
          <Label htmlFor="radius" className="font-bold text-[10px]">
            R
          </Label>
          <Input
            type="number"
            id="radius"
            placeholder="100"
            className="input-ring flex-1"
            onChange={(e) => handleInputChange("radius", e.target.value)}
          />
        </div>
      </div>
    </section>
  );
}

export default Dimensions;
