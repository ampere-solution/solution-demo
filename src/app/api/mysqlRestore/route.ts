import {NextRequest, NextResponse} from 'next/server';
import {restoreMysqlDump} from "@/actions/mysqlAction";

export async function POST(req: NextRequest) {
    const {podName, namespace, database, wordpressPodName} = await req.json();
    try{
        await restoreMysqlDump(podName, namespace, database, wordpressPodName);
        return NextResponse.json({ message: 'Database restored successfully' }, { status: 200 });
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
