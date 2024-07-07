import Nav from "../components/Nav";
import SecondaryHero from "../components/SecondaryHero";
import Timer from "../components/Timer";
import MagazineSlider from "./components/MagazineSlider";
import Footer from "../components/Footer";
import Articles from "./components/Articles";
import getDeadlineData from "../lib/getDeadlineData";

export const metadata = {
  title: "Magazine",
};

async function page() {
  const deadline = await getDeadlineData();
  await fetch("https://reqres.in/api/users?delay=1", { cache: "no-cache" });

  return (
    <>
      <Nav />
      <SecondaryHero
        title={"View the online version of our exclusive magazine"}
        body={
          <>
            Welcome to our online Kakatiya Medical College Magazine! Explore
            inspiring stories, cutting-edge research, and the human side of
            medicine. <br />
            <br /> Dive in and be inspired!
          </>
        }
      />
      <Timer deadline={deadline} showButton={true} />

      <div className="max-w-screen-md mx-auto">
        <MagazineSlider />
        <hr className="border-black bg-bg w-1/4 mx-auto" />
        <Articles />
      </div>
      <Footer />
    </>
  );
}

export default page;
