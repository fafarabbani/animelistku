import prisma from '@/libs/prisma'
import React from 'react'

const BoxComment = async ({ anime_mal_id }) => {
    const comments = await prisma.comment.findMany({ where: {anime_mal_id} })
    
    return (
      <div className="flex flex-col mt-3 gap-3 rounded-md">
        
        {comments.map((comment) => {
          return (
            <div key={comment.id} className="border bg-color-secondary rounded-md p-2 w-full">
              <p className="font-bold">{comment.username}</p>
              <p className="pt-1 text-sm italic">{comment.comment}</p>
            </div>
          );
        })}
      </div>
    );
}

export default BoxComment