"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { TypePrompt } from "../types/app";

const PromptCardList = ({
  prompts,
  handleTagClick,
}: {
  prompts: TypePrompt[];
  handleTagClick: (tag: string) => void;
}) => {
  return (
    <div className="mt-16 prompt_layout">
      {prompts.map((prompt) => (
        <PromptCard
          key={prompt._id}
          prompt={prompt}
          handleTagClick={() => handleTagClick && handleTagClick(prompt.tag)}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  // Use State
  const [allPrompts, setAllPrompts] = useState<TypePrompt[]>([]);

  // Search stuff
  const [searchText, setSearchText] = useState<string>("");
  const [searchResultPrompts, setSearchResultPrompts] = useState<TypePrompt[]>(
    []
  );
  const [searchTimeout, setSearchTimeout] = useState<
    string | number | NodeJS.Timeout | undefined
  >(undefined);

  // Use Effect
  useEffect(() => {
    const fetchAllPrompts = async () => {
      const resp = await fetch("api/prompt");
      const data = await resp.json();
      setAllPrompts(data);
    };

    fetchAllPrompts();
  }, []);

  // Function
  const filterPrompts = (searchtext: string) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPrompts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearchButtonClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (!searchText) return;

    clearTimeout(searchTimeout);
    setSearchText(searchText);

    setSearchTimeout(
      setTimeout(() => {
        setSearchResultPrompts(filterPrompts(searchText));
      }, 500)
    );
  };

  const handleTagClick = (tag: string) => {
    setSearchText(tag);
    setSearchResultPrompts(filterPrompts(tag));
  };

  return (
    <section className="feed">
      <div className="flex flex-row gap-5 w-full">
        <form className="relative w-4/5">
          <input
            type="text"
            placeholder="Search for username, tag or any relevant word"
            value={searchText}
            onChange={handleSearchChange}
            required
            className="search_input peer relative w-4/5"
          />
        </form>
        <button
          className="hero-join-button mx-auto w-fit overflow-hidden rounded-full p-[1.2px] transition-all duration-300 hover:bg-transparent hover:shadow-[0_0_2rem_-0.5rem_#3B82F6] md:mr-0 lg:mr-auto"
          onClick={handleSearchButtonClick}
        >
          <span className="inline-flex h-full w-fit items-center gap-1 rounded-full px-5 py-1.5 transition-all duration-300 bg-neutral-100 text-black">
            Search
          </span>
        </button>
      </div>

      {searchText && searchResultPrompts.length > 0 ? (
        <PromptCardList
          prompts={searchResultPrompts}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList prompts={allPrompts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
