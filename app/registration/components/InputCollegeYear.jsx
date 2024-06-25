import { Description, Field, Label, Select } from "@headlessui/react";

const InputCollegeYear = () => {
  return (
    <Field>
      <Label className="text-sm font-medium text-black">
        Year Of Study <span className=" text-red-600">*</span>
      </Label>
      <Description className="text-sm text-black/50">
        Choose and option below.
      </Description>
      <div className="relative">
        <Select
          name="college_year"
          className={
            "mt-3 block w-full appearance-none rounded-lg border-2 border-black/50 bg-white py-1.5 px-3 text-sm/6 focus:border-blue-500 focus:ring focus:outline-none focus:ring-blue-500/20 text-black *:text-black"
          }
          aria-placeholder="Choose the year of college you're in"
          defaultValue={0}
          required
        >
          <option value="0" disabled hidden className="text-black/60">
            Choose one below
          </option>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
          <option value="intern">Interns & Post Interns</option>
        </Select>
        <svg
          className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black/60"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
        >
          <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
        </svg>
      </div>
    </Field>
  );
};

export default InputCollegeYear;
