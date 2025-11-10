import RegistrationLanding from "./components/RegistrationLanding";

export const metadata = {
  title: "Registration Form",
  description:
    "Registration form for kriti kmc. Limited Seats Left! Hurry Up now register now!",
};

export default async function Home() {
  await fetch("https://reqres.in/api/users?delay=1", { cache: "no-cache" });
  return <RegistrationLanding />;
}
