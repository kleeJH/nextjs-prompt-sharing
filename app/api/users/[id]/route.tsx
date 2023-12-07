import { connectToDb } from "@utils/database";
import User from "@models/user";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDb();
    const user = await User.findById(params.id);

    if (!user) return new Response("User not found", { status: 400 });
    
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response("Unable to get user.", { status: 500 });
  }
};
