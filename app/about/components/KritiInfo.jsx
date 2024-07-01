const KritiInfo = () => {
  const kriti2024Data = [
    {
      heading: "Cutting-Edge Research Presentations",
      body: "Building on last year's success, students from across India will present their latest research findings through papers and prayers. From artificial intelligence in healthcare to the latest in medical technology, attendees can expect to be inspired by innovative solutions to contemporary medical challenges.",
    },
    {
      heading: "Immersive Symposiums",
      body: "Featuring immersive sessions with the most creative students, this will encourage students to think critically and adapt to the ever-evolving field of medicine. As Confucius wisely said, “The key to success is often the ability to adapt.”",
    },
    {
      heading: "Networking Opportunities",
      body: "With participants coming from all over India, KRITI 2024 will foster a global network of researchers. Whether seeking collaboration on new projects or simply exchanging ideas, the networking opportunities will be abundant.",
    },
    {
      heading: "Innovative Competitions",
      body: "Engaging competitions such as Med-E-Bate and Medical Jeopardy will not only test knowledge but also promote a spirit of healthy competition and teamwork.",
    },
    {
      heading: "Conclusion",
      body: "KRITI 2024 transcends being merely an event; it represents a movement toward a research-oriented future. As we continue to nurture our students' intellectual curiosity and scientific excellence, we are confident that the innovations born from this initiative will have profound impacts on healthcare both in India and globally. In the world of medicine, as in life, 'success is never by mere chance; it is the result of forces working together.'",
    },
  ];
  return (
    <section className="bg-bgSecondary py-10 px-3 rounded-t-xl">
      <h1 className="text-5xl md:text-6xl text-gray-50 font-semibold text-center -translate-x-1 mb-5">
        kriti<span className="text-accent2">.</span>
      </h1>
      <div className="max-w-screen-lg sm:w-11/12 md:w-4/5 mx-auto">
        <div className="text-gray-100 text-base md:text-base mb-5">
          <h2 className="text-gray-50 font-semibold text-xl sm:text-2xl mb-2">
            Vision for kriti<span className="text-accent2">.</span> 2024:
          </h2>
          <p className="mb-3">
            Elevating Medical Research to New Heights In the spirit of the
            adage, “Rome was not built in a day,” KRITI 2024 stands as the
            exciting second edition of the Kakatiya Research Day (KRD). This
            event is a testament to the transformative journey we began back in
            2023. Sparked by the visionary discussions of the students of KMC
            and the esteemed KMC alumni in the US and India, the inaugural KRD
            set a precedent for fostering a vibrant research culture at Kakatiya
            Medical College.
          </p>{" "}
          <p>
            A well-trained doctor is crucial in the growing landscape of medical
            schools and hospitals, and a research-oriented mindset is essential.
            At KRITI 2024, we aim to cultivate this mindset further by providing
            a platform where innovative ideas can flourish. We envision a future
            where today{"'"}s efforts grow into groundbreaking research,
            enhancing our students
            {"'"}
            academic prowess and contributing to the global medical community
          </p>
        </div>

        <div className="">
          <h2 className="text-gray-50 font-semibold text-xl sm:text-2xl mb-3">
            Whats new in kriti<span className="text-accent2">.</span> 2024?
          </h2>
          <ul className="ml-8 list-decimal text-gray-50 *:mt-3 first:mt-0">
            {kriti2024Data.map((el, i) => {
              return (
                <li key={i}>
                  <h3 className="font-medium mb-1 text-lg">{el.heading}</h3>
                  <p className="text-base">{el.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default KritiInfo;
