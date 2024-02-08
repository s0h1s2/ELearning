import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { courseId: string } }) {
  const { userId } = auth()
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }
  const ownCourse = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId: userId
    }
  })
  if (!ownCourse) {
    return new NextResponse("Unauthorized", { status: 401 })
  }
  const UnpublishCourse = await db.course.update({
    where: {
      id: ownCourse.id
    },
    data: {
      isPublished: true
    }
  })
  return NextResponse.json(UnpublishCourse)
}

