import Footer from "@/app/components/Footer";
import Nav from "@/app/components/Nav";
import getSpecificArchive from "@/app/lib/getSpecificArchive";
import Image from "next/image";
import { buildMetadata } from "@/app/lib/metadata";

export async function generateMetadata({ params }) {
  try {
    const result = await getSpecificArchive(params.id);
    const entry = Array.isArray(result) ? result[0] : null;

    if (!entry) {
      return buildMetadata({
        title: "Archive Not Found",
        description:
          "The requested Kriti archive could not be located. Browse the main archives page for the latest collections.",
        path: `/archives/${params.id}`,
        robots: {
          index: false,
          follow: false,
        },
      });
    }

    const { archivesName, archivesDesc } = entry;
    return buildMetadata({
      title: `${archivesName} Archive`,
      description:
        archivesDesc ||
        `Explore memories from ${archivesName} captured during Kriti at Kakatiya Medical College.`,
      path: `/archives/${params.id}`,
      keywords: [
        `${archivesName} archive`,
        "kriti archives",
        "kakatiya medical college archive",
      ],
    });
  } catch (error) {
    console.error("Failed to load archive metadata", error);
    return buildMetadata({
      title: "Archive Details",
      description:
        "View photos and highlights from previous Kriti editions hosted by Kakatiya Medical College.",
      path: `/archives/${params.id}`,
    });
  }
}

const page = async ({ params }) => {
  const archivesData = await getSpecificArchive(params.id);
  const { archivesName, archivesDesc, archivesImgs } = await archivesData[0];
  // console.log({ archivesName, archivesDesc, archivesImgs });
  return (
    <>
      <Nav />
      <main className=" bg-bgSecondary py-8">
        <div>
          <h1 className="text-gray-100 text-center font-semibold text-3xl md:text-5xl mb-5">
            {archivesName.toLowerCase()}
          </h1>
          <p className="text-gray-200 max-w-screen-md mx-auto md:text-lg">
            {archivesDesc}
          </p>
        </div>
        <hr className="border-white/5 w-44 border-[1.25px] mx-auto mt-10" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 max-w-screen-lg mx-auto">
          {archivesImgs.map((src, index) => (
            <div key={index} className="relative w-full h-48 md:h-64 lg:h-80">
              <Image
                src={src}
                alt={`Archives Image ${index + 1}`}
                fill={true}
                className="object-contain rounded-lg"
              />
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default page;
