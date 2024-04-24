import { useState } from "react";

type serviceType = {
  _id: string,
  name: string;
  description: string;
  list: string[];
}
const RadioComponent = ({ service }: { service: serviceType }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <div>
      <label
        htmlFor="checkboxLabelFive"
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id="checkboxLabelFive"
            className="sr-only"
            onChange={() => {
              setIsChecked(!isChecked);
            }}
          />
          <div
            className={`box mr-4 flex h-5 w-5 items-center justify-center rounded-full border border-primary-700 
            ${isChecked && "!border-4"
              }`}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-white dark:bg-transparent"></span>
          </div>
        </div>
        {service.name}
      </label>
    </div>
  );
};

export default RadioComponent;
