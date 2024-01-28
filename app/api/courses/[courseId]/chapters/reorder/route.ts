import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PUT(req: Request, { params }: { params: { courseId: string } }) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("No authoraztion", { status: 401 })
    }
    const { list } = await req.json()
    const course = db.course.findFirst({
      where: {
        id: params.courseId,
        userId: userId
      }
    })
    if (!course) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    for (let chapter of list) {
      await db.chapter.update({
        where: {
          id: chapter.id
        },
        data: {
          position: chapter.position
        }
      })
    }
    return new NextResponse("Success", { status: 200 })
  } catch (error) {
    console.log("[CHAPTERS]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
