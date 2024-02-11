import { db } from '@/lib/db'
import { log } from 'console'

export const getProgress = async (courseId: string, userId: string): Promise<number> => {
  try {
    const publishedChapters = await db.chapter.findMany({
      where: {
        courseId: courseId,
        isPublished: true
      },
      select: {
        id: true
      }
    })
    const publishedChapterIds = publishedChapters.map((chapter) => chapter.id)
    const validCompletedchapters = await db.userProgress.count({
      where: {
        userId: userId,
        chapterId: {
          in: publishedChapterIds
        },
        isCompleted: true
      }
    })
    const progressPercentage = (validCompletedchapters / publishedChapterIds.length) * 100
    return progressPercentage
  } catch (error) {
    console.log("[GET_PROGRESS]", error)
    return 0;
  }
}


