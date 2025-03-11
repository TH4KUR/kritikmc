import { cookies } from "next/headers";
import Checkmark from "../registration/components/icons/Checkmark";

export const metadata = {
  title: "Registration Successfull",
};

const page = () => {
  const registrationData = JSON.parse(
    atob(cookies().get("registrationData").value)
  );
  return (
    <main className="bg-green-600">
      <div className="grid place-items-center h-screen">
        <div className="flex flex-col items-center text-white font-bold w-full">
          <Checkmark className={"fill-white size-8"} /> SUCCESS
          <ul className="bg-black w-full text-[#fde2a4] p-5  mt-5 font-semibold">
            {Object.keys(registrationData).map((key, i) => {
              // console.log(key, registrationData[key]);
              if (key === "events") {
                return (
                  <li key={i}>
                    {key}:
                    {registrationData[key].reduce((sum, i) => sum + "\n\n" + i)}
                  </li>
                );
              }
              return (
                <li key={i}>
                  {key} : {registrationData[key]}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {}
    </main>
  );
};

export default page;
