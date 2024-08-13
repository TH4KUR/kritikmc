import { cookies } from "next/headers";
import Gateway from "./components/Gateway";
import GatewayPassive from "./components/GatewayPassive";

export default function Home({ searchParams: { rel } }) {
  const regCookie = cookies().get("registrationData").value;
  const regData = JSON.parse(Buffer.from(regCookie, "base64").toString());
  return (
    <>
      {rel === "passive" ? (
        <GatewayPassive regData={regData} />
      ) : (
        <Gateway regData={regData} />
      )}
    </>
  );
}
