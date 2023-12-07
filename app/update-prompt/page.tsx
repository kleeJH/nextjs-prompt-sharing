"use client";

import { FormEvent, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";
import { TypePrompt } from "../../types/app";

const EditPrompt = () => {
  const router = useRouter();
  const promptId: string | null = useSearchParams().get("id");

  // Use State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<{ prompt: string; tag: string }>({
    prompt: "",
    tag: "",
  });

  // Use Effect
  useEffect(() => {
    const getPromptDetails = async () => {
      const resp = await fetch(`/api/prompt/${promptId}`);
      const data: TypePrompt = await resp.json();
      setPost({ prompt: data.prompt, tag: data.tag });
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  // Function
  const updatePrompt = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) return alert("Unable to retrieve prompt id. Please retry.");

    try {
      const resp = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (resp.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={isSubmitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
