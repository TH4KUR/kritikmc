import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Form from "./components/Form";
import Arrow from "../components/icons/Arrow";
import Link from "next/link";
import getDeadlineData from "../lib/getDeadlineData";
import RegistrationLanding from "./components/RegistrationLanding";

export const metadata = {
  title: "Registration Form",
  description:
    "Registration form for kriti kmc. Limited Seats Left! Hurry Up now register now!",
};

export default async function Home() {
  await fetch("https://reqres.in/api/users?delay=1", { cache: "no-cache" });
  const { start, deadline } = await getDeadlineData();
  return <RegistrationLanding deadline={deadline} start={start} />;
}
