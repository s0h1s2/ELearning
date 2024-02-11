import { Category, Course } from "@prisma/client";

export type CourseProgressAndCategory = Course & {
  Category: Category | null;
  chapters: { id: string }[];
  progress: number | null;

}
