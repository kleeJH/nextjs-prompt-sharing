import React from "react";
import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient"> User-Created AI Prompts</span>
      </h1>
      <p className="desc text-center">
        Prompter is a website that allows users from anywhere to discover,
        create and share creative and useful prompts.
      </p>
      <Feed />
    </section>
  );
};

export default Home;
