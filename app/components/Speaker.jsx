import SpeakerCard from "./SpeakerCard";

function Speaker({ speakerdata }) {
  return (
    <>
      <section className="bg-bgSecondary flex flex-col items-center pt-8 pb-20 px-6 min-h-[600px] justify-center">
        <h2 className=" text-[#DA5867] uppercase font-semibold text-base md:text-lg mt-5">
          Speakers
        </h2>
        <h3 className="text-gray-100 text-2xl font-semibold md:text-3xl">
          Know the Speakers
        </h3>
        <div className={`md:w-9/12 lg:w-3/5 mt-5 `}>
          {speakerdata.map((el, i) => {
            return <SpeakerCard data={el} key={i} />;
          })}
        </div>
      </section>
    </>
  );
}

export default Speaker;
