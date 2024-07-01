const SecondaryHero = ({ title, body }) => {
  return (
    <section className="text-[#fdf8e2] bg-bgSecondary py-12 px-4">
      <h1 className="text-xl md:text-2xl font-semibold mb-4 md:w-4/5 sm:mx-auto mx-5 max-w-screen-md">
        {title}
      </h1>
      <p className="text-base md:text-lg mx-5 md:w-4/5 sm:mx-auto max-w-screen-md">
        {body}
      </p>
    </section>
  );
};

export default SecondaryHero;
