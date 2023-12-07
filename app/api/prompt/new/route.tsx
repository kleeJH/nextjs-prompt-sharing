import { connectToDb } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req: Request) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDb();
    const newPrompt = new Prompt({
      creator: userId, // When retrieve, it will use userId and get a reference from the User table
      prompt: prompt,
      tag: tag,
    });

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Unable to create prompt.", { status: 500 });
  }
};
