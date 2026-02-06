import React from "react";

const Hero = ({ title, subtitle }) => {
  return (
    <section className="flex flex-col items-center justify-center text-center my-20 px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{title}</h1>
      <p className="text-gray-600 mt-4 text-lg md:text-xl">{subtitle}</p>
    </section>
  );
};

export default Hero;
