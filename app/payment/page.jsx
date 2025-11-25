import { redirect } from "next/navigation";
import { buildMetadata } from "@/app/lib/metadata";

export const metadata = buildMetadata({
  title: "Kriti Payments",
  description:
    "Access the Kriti payment portal to confirm your registration for events at Kakatiya Medical College.",
  path: "/payment",
  keywords: ["kriti payment", "registration payment", "kmc payment portal"],
  robots: {
    index: false,
    follow: false,
  },
});

export default function PaymentPage() {
  redirect("/payment/v2");
}
