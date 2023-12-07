import { connectToDb } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDb();
    const prompt = await Prompt.findById(params.id).populate("creator"); // Populate reference i.e. User table using creator field

    if (!prompt) return new Response("Prompt not found.", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Unable to get all prompts.", { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDb();
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt)
      return new Response("Prompt not found.", { status: 404 });

    // Modify the prompt
    // existingPrompt.prompt = prompt;
    // existingPrompt.tag = tag;
    // await existingPrompt.save();

    // Update the prompt to the DB
    await Prompt.findByIdAndUpdate(params.id, { prompt: prompt, tag: tag });

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Unable to get all prompts.", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDb();
    await Prompt.findByIdAndDelete(params.id);

    return new Response("Prompt deleted.", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt.", { status: 500 });
  }
};
