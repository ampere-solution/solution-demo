import {NextRequest, NextResponse} from 'next/server';
import {getMysqlDump} from "@/actions/mysqlAction";

export async function POST(req: NextRequest) {
    const {podName, namespace, database} = await req.json();
    try{
        await getMysqlDump(podName, namespace, database);
        return NextResponse.json({ message: `Mysql Dump completed` }, { status: 200 });
    } catch (error) {
        console.log("dump action error:", error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
