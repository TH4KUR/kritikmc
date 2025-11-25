import RegistrationLanding from "./components/RegistrationLanding";
import { buildMetadata } from "@/app/lib/metadata";

export const metadata = buildMetadata({
  title: "Registration",
  description:
    "Register for Kriti at Kakatiya Medical College. Choose between active, passive, or workshop participation and secure your delegate ID.",
  path: "/registration",
  keywords: [
    "kriti registration",
    "kmc registration",
    "medical conference registration",
  ],
});

export default async function Home() {
  await fetch("https://reqres.in/api/users?delay=1", { cache: "no-cache" });
  return <RegistrationLanding />;
}
