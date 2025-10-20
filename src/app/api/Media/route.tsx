import { db } from '@/db';
import { media } from '@/db/schema';
import { FileError } from '@/errors/files';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest,
) {
    try {
        // let title = req.nextUrl.searchParams.get("title");
        // throw new FileError("101", title || "Unknown Title", "Cause of error")

        let res = await db.select().from(media);

        return NextResponse.json({ medias: res }, { status: 200 });
    } catch (err: unknown) {
        if (err instanceof FileError) {
            console.error(`Error Involving File:`);
            console.error(err);
            return new Response(`Internal server error ${JSON.stringify(err)}`, { status: 302 });
        } else {
            console.error(`Error processing request:`);
            console.error(err);
            return new Response(`Internal server error ${JSON.stringify(err)}`, { status: 500 });
        }
    }
}

export async function POST(
    req: NextRequest,
) {
    try {
        const body = await req.json();

        if (body.type == "delete"){
            const res = await db.delete(media).where(eq(media.title, body.title));
            return NextResponse.json({ result: res }, { status: 200 });
        }

        const title = body.title;
        if (!title) {
            throw new Error("No Title Given")
        }
        const res = await db.insert(media).values({ title: title });
        return NextResponse.json({ result: res }, { status: 200 });
    } catch (err: unknown) {
        console.error(`Error processing request:`);
        console.error(err);
        return new Response(`Internal server error ${JSON.stringify(err)}`, { status: 500 });
    }
}
