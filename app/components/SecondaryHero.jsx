import React from "react";

const SecondaryHero = ({ title, body }) => {
  return (
    <section className="text-bg  bg-bgSecondary py-10 px-4">
      <h1 className="text-lg font-semibold mb-4">{title}</h1>
      <p className="text-sm w-5/6">{body}</p>
    </section>
  );
};

export default SecondaryHero;
