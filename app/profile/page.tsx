"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Profile from "@components/Profile";
import { TypePrompt, TypeUser } from "../../types/app";

const ProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const userId: string | null = useSearchParams().get("userid");

  // Use state
  const [userPrompts, setUserPrompts] = useState<TypePrompt[]>([]);
  const [user, setUser] = useState<TypeUser | null>(null);

  // Use Effect
  useEffect(() => {
    if (!session) return;

    const fetchUserDetails = async () => {
      const respPrompts = await fetch(
        `api/users/${userId ? userId : session!.user.id}/posts`
      ); // Fetch other user id or your own
      setUserPrompts(await respPrompts.json());

      const respUser = await fetch(
        `api/users/${userId ? userId : session!.user.id}`
      ); // Fetch other user id or your own
      setUser(await respUser.json());
    };

    if (userId || session!.user.id) fetchUserDetails();
  }, [session, userId]);

  // Functions
  const handleEdit: (prompt: TypePrompt) => void = (prompt: TypePrompt) => {
    router.push(`/update-prompt?id=${prompt._id}`);
  };

  const handleDelete: (id: string) => void = async (id: string) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        const resp = await fetch(`/api/prompt/${id}`, {
          method: "DELETE",
        });

        if (resp.ok) {
          const filteredPrompts = userPrompts.filter(
            (prompt) => prompt._id !== id
          );
          setUserPrompts(filteredPrompts);
        } else {
          return alert("Unable to delete prompt.");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const renderPage = () => {
    if (!session) {
      // router.push("/");
      return <div className=""><p className="font-satoshi font-semibold orange_gradient text-3xl">Please sign in to view your own or others&apos; profile</p></div>;
    }

    if (userId) {
      return (
        <Profile
          name={`@${user?.username}'s`}
          desc="View other users' profile page. From here, you can see all the prompts that they have posted."
          data={userPrompts}
        />
      );
    } else {
      return (
        <Profile
          name="My"
          desc="This is your profile page! From here, you can manage the prompts that you've made! You can edit or delete your prompts."
          data={userPrompts}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      );
    }
  };

  return renderPage();
};

export default ProfilePage;
