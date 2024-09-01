import { cookies } from "next/headers";
import Gateway from "./components/Gateway";
import GatewayPassive from "./components/GatewayPassive";
import GatewayAmboss from "./components/GatewayAmboss";

export default function Home({ searchParams: { rel } }) {
  const regCookie = cookies().get("registrationData").value;
  const regData = JSON.parse(Buffer.from(regCookie, "base64").toString());
  return (
    <>
      {(function () {
        if (rel === "passive") {
          return <GatewayPassive regData={regData} />;
        } else if (rel === "amboss") {
          return <GatewayAmboss regData={regData} />;
        } else {
          return <Gateway regData={regData} />;
        }
      })()}
    </>
  );
}
