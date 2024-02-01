import { getAnimeResponse } from "@/libs/api-libs";
import React from "react";
import Image from "next/image";
import VideoPlayer from "@/components/Utilities/VideoPlayer";
import CollectionButton from "@/components/AnimeList/CollectionButton";
import { authUserSession } from "@/libs/auth-libs";
import prisma from "@/libs/prisma";
import CommentInput from "@/components/AnimeList/CommentInput";
import BoxComment from "@/components/AnimeList/BoxComment";

const Page = async ({ params: { id } }) => {
    const anime = await getAnimeResponse(`anime/${id}`);
    const user = await authUserSession();

    const collection = await prisma.collection.findFirst({
        where: { user_email: user?.email, anime_mal_id: id },
    });

    return (
      <section className="md:mx-40 mx-2">
        <div className="pt-4 px-4 flex md:flex-row flex-col gap-4">
          <h3 className="text-2xl text-color-primary">
            {anime.data.title} - {anime.data.year}
          </h3>
          {!collection && user && (
            <CollectionButton
              anime_mal_id={id}
              user_email={user?.email}
              anime_image={anime.data.images.webp.image_url}
              anime_title={anime.data.title}
            />
          )}
        </div>
        <div className="pt-4 px-4 flex gap-2 text-color-primary overflow-x-auto">
          <div className="w-36 flex flex-col justify-center items-center rounded border border-color-primary p-2">
            <h3>Peringkat</h3>
            <p>{anime.data.rank}</p>
          </div>
          <div className="w-36 flex flex-col justify-center items-center rounded border border-color-primary p-2">
            <h3>Skor</h3>
            <p>{anime.data.score}</p>
          </div>
          <div className="w-36 flex flex-col justify-center items-center rounded border border-color-primary p-2">
            <h3>Anggota</h3>
            <p>{anime.data.members}</p>
          </div>
          <div className="w-36 flex flex-col justify-center items-center rounded border border-color-primary p-2">
            <h3>Episode</h3>
            <p>{anime.data.episodes}</p>
          </div>
        </div>
        <div className="pt-4 px-4 flex sm:flex-nowrap flex-wrap gap-2 text-color-primary">
          <Image
            src={anime.data.images.webp.image_url}
            alt={anime.data.images.jpg.image_url}
            width={250}
            height={250}
            className="w-full rounded object-cover"
          />
          <p className="text-justify text-xl px-2">{anime.data.synopsis}</p>
        </div>
        <div className="p-4 text-color-primary border border-color-primary rounded-lg mt-8">
          <h3 className="font-bold text-2xl text-color-primary mb-2">
            Kirim Komentar
          </h3>
          {user && (
            <CommentInput
              anime_mal_id={id}
              user_email={user?.email}
              username={user?.name}
              anime_title={anime.data.title}
            />
          )}
          <h3 className="font-bold text-2xl text-color-primary my-3">
            Komentar
          </h3>
          <BoxComment anime_mal_id={id} />
        </div>
        <div className="">
          <VideoPlayer youtubeId={anime.data.trailer.youtube_id} />
        </div>
      </section>
    );
};

export default Page;