import Footer from "@/app/components/Footer";
import Nav from "@/app/components/Nav";
import Link from "next/link";
import Form from "./components/Form";
import Arrow from "@/app/components/icons/Arrow";
import getDeadlineData from "@/app/lib/getDeadlineData";
import Image from "next/image";
import { buildMetadata } from "@/app/lib/metadata";
import {
  registrationToggle,
  registrationClosedMessage,
  workshopDayCapacities,
} from "@/app/lib/registrationConfig";
import { supabaseAdmin } from "@/app/lib/supabase/supabaseAdmin";
import { ID_TO_TABLE } from "@/app/lib/delegateRecords";
import FetchDetails from "./components/FetchDetails";

export const metadata = buildMetadata({
  title: "Workshop Registration",
  description:
    "Register for the workshop at Kriti to access mentorship sessions.",
  path: "/registration/workshop",
  keywords: [
    "workshop registration",
    "kriti workshop",
    "kmc workshop registration",
  ],
});

const { workshop: WORKSHOP_ENABLED = true } = registrationToggle;
const WORKSHOP_DEFAULT_CLOSED_COPY =
  "But Hey, you can always participate the next time in the most awaited medical conference of Telengana with amazing prize pools!";

function WorkshopRegistrationClosed({
  heading = "Registrations for the workshop are now over! 😭",
  message = WORKSHOP_DEFAULT_CLOSED_COPY,
}) {
  return (
    <>
      <Nav bg={"#eee"} />
      <main className=" bg-gradient-to-br from-[#1e0b0b] to-[#1b1701] py-10">
        <section className=" flex flex-col items-center justify-center px-3 gap-1 py-10">
          <svg
            className=" fill-red-500 size-16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
          >
            <path
              d="M216,96V208a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V96a8,8,0,0,1,8-8H208A8,8,0,0,1,216,96Z"
              opacity="0.2"
            ></path>
            <path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Z"></path>
          </svg>
          <h1 className="text-2xl font-semibold text-center text-gray-200">
            {heading}
          </h1>
          <p className="text-gray-400 text-lg max-w-[45ch] text-center mt-3 ">
            {message}
          </p>
        </section>
      </main>{" "}
      <Footer />
    </>
  );
}

export default async function Home({
  searchParams: { delegateId: rawDelegateId, allowPassive },
}) {
  const delegateId = rawDelegateId?.trim();
  const allowPassiveDefault = allowPassive === "true";
  if (!WORKSHOP_ENABLED) {
    return (
      <WorkshopRegistrationClosed
        heading="Workshop registrations are currently closed."
        message={registrationClosedMessage}
      />
    );
  }
  await fetch("https://reqres.in/api/users?delay=1", { cache: "no-cache" });
  const {
    showTimer,
    deadline,
    registrationStart: start,
  } = await getDeadlineData();

  if (Date.now() > deadline.getTime() || Date.now() < start.getTime()) {
    return <WorkshopRegistrationClosed />;
  }

  let details = null;
  let prefillError = "";
  if (delegateId) {
    try {
      const prefix = delegateId.split("-")[0]?.toUpperCase();
      const table = ID_TO_TABLE[prefix];

      if (!table) {
        throw new Error(
          "That delegate ID looks incorrect. Please double-check and try again."
        );
      }

      if (table === "unconfirmed_delegates") {
        throw new Error(
          "Unconfirmed delegates are not eligible for the workshop discount. Please let us verify your payment first."
        );
      }

      const { data, error } = await supabaseAdmin
        .from(table)
        .select(
          "delegateid,name,email,mobileno,collegename,collegeyear,iskmcstudent,ispgstudent,kmcrollno,participationtype"
        )
        .eq("delegateid", delegateId)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      const participation = (data?.participationtype || "").toLowerCase();
      if (!participation || !["active", "passive"].includes(participation)) {
        throw new Error(
          "Only active or passive delegates can claim the workshop discount. Check if this was a registration linked to workshop already."
        );
      }

      details = data;
    } catch (e) {
      prefillError = e?.message || "Unable to fetch your delegate details.";
    }
  }

  return (
    <>
      <Nav bg={"#eee"} />
      <main className=" bg-gradient-to-br from-[#F7D4D4ba] to-[#F6ECC4] py-10">
        {/* <Image ... /> */}
        <section className=" flex flex-col items-center justify-center px-3 gap-1 py-10">
          <h1 className="font-semibold text-lg md:text-2xl">
            Registration form for Kriti. Workshop.
          </h1>
          <p className="text-sm text-center w-80 md:text-base md:w-">
            Fill in the required details below and pay the applicable fee to
            register for the event!{" "}
          </p>
          {/* <Link ... /> */}

          <hr className="border-black border w-40 mt-5" />
          <p className="bg-accent/10 px-3 py-2 text-lg mt-2 font-medium rounded">
            For any queries, contact:{" "}
            <Link
              href={
                "https://api.whatsapp.com/send?phone=917702943703&text=Hi%20I%20want%20help%20with%20Kriti%20Registration%20in...."
              }
              className=" underline text-blue-700"
            >
              +91 77029 43703
            </Link>
          </p>
        </section>
        <FetchDetails
          initialDelegateId={delegateId || ""}
          errorMessage={prefillError}
          allowPassiveDefault={allowPassiveDefault}
        />

        <hr className="my-10" />
        <Form
          details={details}
          dayOptions={workshopDayCapacities}
          allowManualDefault={allowPassiveDefault}
        />
      </main>{" "}
      <Footer />
    </>
  );
}
