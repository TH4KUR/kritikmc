import { cookies } from "next/headers";
import Cancel from "@/app/components/icons/Cancel";

export const metadata = {
  title: "Payment Failed",
};

const page = () => {
  const registrationData = JSON.parse(
    atob(cookies().get("registrationData").value)
  );
  return (
    <main className="bg-red-600">
      <div className="grid place-items-center h-screen">
        <div className="flex flex-col items-center text-white font-bold w-full">
          <Cancel size={32} fill="#fff" /> Failed : Payment Declined
          <ul className="bg-black w-full text-[#fde2a4] p-5  mt-5 font-semibold">
            {Object.keys(registrationData).map((key, i) => {
              console.log(key, registrationData[key]);
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
