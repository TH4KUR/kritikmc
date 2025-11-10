import { Description, Field, Label, Select } from "@headlessui/react";

const InputCollegeYear = () => {
  function setValid(e) {
    const classesToAdd = [
      "focus:valid:border-green-500",
      "focus:valid:ring-green-500/20",
      "valid:border-green-500/80",
    ];
    e.target.classList.add(...classesToAdd);
  }
  return (
    <Field className="flex flex-col gap-1.5">
      <Label className="text-sm font-semibold text-slate-700">
        Year of Study <span className="text-red-600">*</span>
      </Label>
      <Description className="text-sm text-slate-500">
        Choose the option that best matches your current year.
      </Description>
      <div className="relative mt-1">
        <Select
          name="college_year"
          onChange={setValid}
          className="block w-full appearance-none rounded-2xl border border-slate-300 bg-white/90 py-3 px-4 text-sm text-slate-900 shadow-sm transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 invalid:border-rose-400 focus:invalid:border-rose-400 focus:invalid:ring-rose-200 *:text-slate-700"
          aria-placeholder="Choose the year of college you're in"
          defaultValue=""
          required
        >
          <option value="" disabled hidden>
            Choose one below
          </option>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
          <option value="5">Interns &amp; Post Interns</option>
        </Select>
        <svg
          className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 fill-slate-500"
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
