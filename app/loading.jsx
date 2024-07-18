import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex h-screen text-white bg-bgSecondary justify-center items-center text-7xl font-semibold overflow-hidden brightness-105">
      <div className="relative animate-pulse flex flex-col -translate-y-8">
        <Image
          height={180}
          width={320}
          src={"/kriti_logo_dark.png"}
          alt="kritikmc logo"
        />
        <span className="w-full text-center text-lg mb-2">welcomes you</span>
      </div>
    </div>
  );
};

export default Loading;
