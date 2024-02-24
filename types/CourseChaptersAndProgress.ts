import { Chapter, Course, UserProgress } from "@prisma/client"

export interface CourseChaptersProgress extends Course {
  chapters: (Chapter & {
    userProgress: UserProgress[] | null
  })[]
}
