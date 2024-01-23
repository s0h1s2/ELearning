import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { courseId: string, attachmentId: string } }) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized user", { status: 401 });
    }
    const courseOwner = await db.course.findFirst({ where: { id: params.courseId } })
    if (courseOwner?.userId != userId) {
      return new NextResponse("Unauthorized user", { status: 401 });
    }
    await db.attachment.delete({
      where: {
        courseId: params.courseId,
        id: params.attachmentId
      }
    });
    return NextResponse.json({});
  } catch (error) {
    console.log("COURSE_ID_ATTACHMENT", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
