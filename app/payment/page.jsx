import Image from "next/image";
import SecondaryHero from "../components/SecondaryHero";
import Checkmark from "../registration/components/icons/Checkmark";
import { cookies } from "next/headers";
import UploaderButton from "./components/UploaderButton";
import Gateway from "./components/Gateway";

export default function Home() {
  const regCookie = cookies().get("registrationData").value;
  const regData = JSON.parse(Buffer.from(regCookie, "base64").toString());
  return <Gateway regData={regData} />;
}
