import {getPodsAction} from "@/actions/getPodsAction";
import {NextRequest} from "next/server";

export async function POST(req: NextRequest) {
  const {namespace} = await req.json();

  try {
    const pods = await getPodsAction(namespace);
    return new Response(JSON.stringify(pods), {status: 200});
  } catch (error) {
    console.log("Error fetching pods: ", error);
    return new Response(JSON.stringify({error: "Failed to fetch pods"}), {status: 500});
  }
}
