import {getPodLogs} from "@/actions/getPodsAction";
import {NextRequest} from "next/server";

export async function POST(req: NextRequest) {
  const {podName, namespace} = await req.json();

  try {
    const pods = await getPodLogs(podName, namespace);
    return new Response(JSON.stringify(pods), {status: 200});
  } catch (error) {
    console.log("Error fetching pods: ", error);
    return new Response(JSON.stringify({error: "Failed to fetch pod logs"}), {status: 500});
  }
}
