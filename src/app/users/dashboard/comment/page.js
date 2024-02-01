import { authUserSession } from "@/libs/auth-libs";
import prisma from "@/libs/prisma";
import React from "react";
import Link from "next/link";
import Header from "@/components/Dashboard/Header";

const Page = async () => {
    const user = await authUserSession;

    const comments = await prisma.comment.findMany({
        where: { user_email: user.email },
    });

    return (
        <section className="md:mx-56 mx-2 mt-4">
        <Header title={"My Comment"} />
        <div className="flex flex-col gap-3 rounded-md">
            {comments.map((comment) => {
            return (
                <Link
                href={`/anime/${comment.anime_mal_id}`}
                key={comment.id}
                className="border bg-color-primary text-color-dark rounded-md p-2 w-full"
                >
                <p className="font-bold">{comment.anime_title}</p>
                <p className="pt-1 text-sm italic">{comment.comment}</p>
                </Link>
            );
            })}
        </div>
        </section>
    );
};

export default Page;
