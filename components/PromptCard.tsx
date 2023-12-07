"use client";

import { MouseEventHandler, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { TypePromptCard } from "../types/app";

const PromptCard = ({
  prompt,
  handleTagClick,
  handleEdit,
  handleDelete,
}: TypePromptCard) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter()

  // Use state
  const [copyText, setCopyText] = useState<string>("");

  // Function
  const handleCopy: MouseEventHandler = () => {
    setCopyText(prompt.prompt);
    navigator.clipboard.writeText(prompt.prompt);
    setTimeout(() => setCopyText(""), 3000);
  };

  const handleViewOtherProfile = () => {
    // check if it is your own profile
    if (session?.user.id === prompt.creator._id) {
      router.push("/profile")
      return
    }

    // otherwise go to other people's profile
    return router.push(`/profile?userid=${prompt.creator._id}`)
  }

  return (
    <div className="prompt_card">
      <div className="flex just-between item-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer" onClick={handleViewOtherProfile}>
          <Image
            src={prompt.creator!.image}
            alt="Profile image of person who added the prompt"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              @{prompt.creator!.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {prompt.creator!.email}
            </p>
          </div>
        </div>

        <div className="copy_btn hover:shadow-lg hover:shadow-blue-500/30" onClick={handleCopy}>
          <Image
            src={
              copyText === prompt.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt=""
            width={15}
            height={15}
          ></Image>
        </div>
      </div>

      <p className="my-5 font-satoshi text-sm text-gray-700">{prompt.prompt}</p>
      <p
        className={`font-inter text-sm blue_gradient ${session?.user.id === prompt.creator._id && pathname === "/profile" ? "cursor-not-allowed": "cursor-pointer"}`}
        onClick={() => handleTagClick && handleTagClick(prompt.tag)}
      >
        {prompt.tag}
      </p>

      {session?.user.id === prompt.creator._id && pathname === "/profile" ? (
        <div className="mt-2 flex-between gap-7 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm cursor-pointer copy_btn px-10 py-1.5 hover:shadow-lg hover:shadow-green-400/30"
            onClick={() => handleEdit && handleEdit(prompt)}
          >
            <span className="green_gradient font-semibold">Edit</span>
          </p>
          <p
            className="font-inter text-sm cursor-pointer copy_btn px-10 py-1.5 hover:shadow-lg hover:shadow-amber-500/30"
            onClick={() => handleDelete && handleDelete(prompt._id)}
          >
            <span className="orange_gradient font-semibold">Delete</span>
          </p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PromptCard;
