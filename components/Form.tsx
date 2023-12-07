import React, { Dispatch, FormEventHandler, SetStateAction } from "react";
import Link from "next/link";

const Form = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
}: {
  type: string;
  post: { prompt: string; tag: string };
  setPost: Dispatch<SetStateAction<{ prompt: string; tag: string }>>;
  submitting: boolean;
  handleSubmit: FormEventHandler;
}) => {
  return (
    <section className="w-full max-w-full flex-start- flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share creative prompts with others. Let others enjoy what you
        have cooked up!
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your Prompt!
          </span>
          <textarea
            className="form_textarea"
            required
            placeholder="Write your prompt here!"
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            value={post.prompt}
          ></textarea>
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your Tag!
          </span>
          <input
            className="form_input"
            required
            placeholder="Write your tag here! Example: #tag"
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            value={post.tag}
          ></input>
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href={"/"} className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange text-white rounded-full"
          >
            {submitting ? `Processing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
