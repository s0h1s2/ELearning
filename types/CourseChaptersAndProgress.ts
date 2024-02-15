import { Chapter, Course, UserProgress } from "@prisma/client"

export type CourseChaptersProgress = {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null
    })[]

  }
}
