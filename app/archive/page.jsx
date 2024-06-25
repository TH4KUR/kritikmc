 
import SecondaryHero from "../components/SecondaryHero";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const page = () => {
  return (
    <>
      <Nav />
      <main>
        <SecondaryHero
          title={"Archive - Dive Into Our Time Capsule"}
          body={
            "Explore a treasure trove of past articles, stories, and insights. Discover valuable content spanning various topics and delve deep into our archives."
          }
        />
        <section></section>
      </main>
      <Footer />
    </>
  );
};

export default page;
