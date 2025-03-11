import Footer from "@/app/components/Footer";
import Nav from "@/app/components/Nav";
import getSpecificArchive from "@/app/lib/getSpecificArchive";
import { archives } from "@/sanity/schemaTypes/archives";
import Image from "next/image";

const page = async ({ params }) => {
  const archivesData = await getSpecificArchive(params.id);
  const { archivesName, archivesDesc, archivesImgs } = await archivesData[0];
  console.log({ archivesName, archivesDesc, archivesImgs });
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
