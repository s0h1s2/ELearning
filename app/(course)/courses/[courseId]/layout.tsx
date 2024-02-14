import { getProgress } from "@/actions/GetProgress";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CourseSidebar from "./_components/CourseSidebar";

const CourseLayout = async ({ children, params }: { children: React.ReactNode, params: { courseId: string } }) => {
  const { userId } = auth()
  if (!userId) {
    return redirect("/")
  }
  const course = await db.course.findUnique({
    where: {
      id: params.courseId
    },
    include: {
      chapters: {
        where: {
          isPublished: true
        },
        include: {
          userProgress: {
            where: {
              userId
            }
          }
        },
        orderBy: {
          position: "asc"
        }
      }
    }
  })
  if (!course) {
    return redirect("/")
  }
  const userProgress = await getProgress(course.id, userId)

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-80 flex-col inset-y-0 z-50">
        <CourseSidebar course={course} progressCount={userProgress} />
      </div>
      <main className="md:pl-80 h-full">
        {children}
      </main>
    </div>
  );
}
export default CourseLayout
