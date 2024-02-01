"use client";

import React from "react";
import { CaretLeft } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

const Header = ({ title }) => {
    const router = useRouter();
    const handleBack = (event) => {
        event.preventDefault();
        router.back;
    };

    return (
      <div className="flex justify-start items-center mb-4 gap-4">
        <button
          className="text-color-primary flex items-center justify-center"
          onClick={() => router.back()}
        >
          <CaretLeft size={20} />
          Back
        </button>
        <h3 className="text-2xl text-color-primary font-bold">{title}</h3>
      </div>
    );
};

export default Header;
