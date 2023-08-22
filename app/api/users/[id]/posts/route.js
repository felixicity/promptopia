import { connectDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const prompts = await Prompt.find({
      creator: params.id.toString(),
    }).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("failed to fetch all prompts", { status: 500 });
  }
};
