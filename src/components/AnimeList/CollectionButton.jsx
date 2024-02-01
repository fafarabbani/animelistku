"use client";

import React, { useState } from "react";
import { Star } from "@phosphor-icons/react";

const CollectionButton = ({
    anime_mal_id,
    user_email,
    anime_image,
    anime_title,
    }) => {
    const [isCreated, setIsCreated] = useState(false);

    const handleCollection = async (event) => {
    event.preventDefault();

    const data = { anime_mal_id, user_email, anime_image, anime_title };

    const response = await fetch("/api/v1/collection", {
        method: "POST",
        body: JSON.stringify(data),
    });

    const collection = await response.json();
    if (collection.isCreated) {
        setIsCreated(true);
    }
    return;
    };

    return (
    <>
        {isCreated ? (
        <p className="pt-1 text-color-accent">Berhasil Ditambahkan Ke Kolesi</p>
        ) : (
        <button
            onClick={handleCollection}
            className="text-color-dark flex justify-center items-center gap-2 rounded-md bg-color-accent py-1 px-3 "
        >
            <Star size={28} weight="fill" /> <p>Add to Collection</p>
        </button>
        )}
    </>
    );
};

export default CollectionButton;
