"use client"

import React, { useRef } from 'react'
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useRouter } from 'next/navigation';

const InputSearch = () => {
    const searchRef = useRef()
    const router = useRouter()

    const handleSearch = (event) => {
        const keyword = searchRef.current.value;

        if(!keyword || keyword.trim() == "") return

        if(event.key === "Enter" || event.type === "click") {
            event.preventDefault()
            router.push(`/search/${keyword}`)
        }
    }

    return (
        <div className='relative md:w-1/3'>
            <input 
                placeholder="Cari Anime" 
                className="w-full p-2 rounded" 
                ref={searchRef}
                onKeyDown={handleSearch}
            />
            <button className="absolute top-2 end-2" onClick={handleSearch}>
                <MagnifyingGlass size={24} />
            </button>
        </div>
    )
    }

export default InputSearch