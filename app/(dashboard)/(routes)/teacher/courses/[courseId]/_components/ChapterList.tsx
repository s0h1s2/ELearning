"use client";
import { Chapter } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import { DragDropContext, Draggable, DraggableProvided, DraggableRubric, DraggableStateSnapshot, Droppable } from '@hello-pangea/dnd';
import { cn } from '@/lib/utils';
import { Grip, Pencil } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
interface Props {
  items: Chapter[];
  onReorder: (updatedState: { id: string, position: number }) => void;
  onEdit: (id: string) => void;

}
const ChapterList = ({ items, onReorder, onEdit }: Props) => {
  const [isMounted, setIsMounted] = useState(false)
  const [chapters, setChapters] = useState(items)
  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    setChapters(items)
  }, [items])
  if (!isMounted) {
    return null
  }
  return (
    <DragDropContext onDragEnd={() => { }}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((chapter, index) => (
              <Draggable key={chapter.id} draggableId={chapter.id} index={index}>
                {(provided) => (
                  <div className={cn("flex items-center gap-x-2 bg-slate-200 border-slate-200 text-slate-700 rounded-md mb-4 text-sm", chapter.isPublished && "bg-sky-100 border-sky-200 text-sky-700")} ref={provided.innerRef} {...provided.draggableProps}>
                    <div className={cn("px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition", chapter.isPublished && "border-r-sky-200 hover:bg-sky-200")} {...provided.dragHandleProps}>
                      <Grip className="h-5 w-5 " />
                    </div>
                    {chapter.title}
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      {chapter.isFree && (
                        <Badge>
                          Free
                        </Badge>
                      )}
                      <Badge className={cn("bg-slate-500", chapter.isPublished && "bg-sky-700")}>
                        {chapter.isPublished ? "Published" : "Draft"}
                      </Badge>
                      <Pencil onClick={() => { onEdit(chapter.id) }} className="h-4 w-4 cursor-pointer hover:opacity-75 transition" />
                    </div>
                  </div>
                )}
              </Draggable>

            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>

  )
}

export default ChapterList
