import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
    try {
        const { title, id } = await req.json();
        const { getUser } = getKindeServerSession()
        const user = getUser()

        if (!title || !id) {
            return new NextResponse("Bad Request", { status: 400 })
        }
        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const res = await db.file.update({
            where: { id: id, userId: user.id },
            data: { name: title }
        });
        console.log(res);
        return NextResponse.json(res)
    } catch (e) {
        console.error(e);
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();
        const { getUser } = getKindeServerSession()
        const user = getUser()

        if (!id) {
            return new NextResponse("Bad Request", { status: 400 })
        }
        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const res = await db.file.delete({
            where: { id: id, userId: user.id }
        });
        console.log(res);
        return NextResponse.json(res)
    } catch (e) {
        console.error(e);
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
