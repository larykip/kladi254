'use client';
import { useLikedItems } from '@/contexts/LikedItemsContext';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { data } from '@/lib/data'; // Ensure you import your data

const ItemComponent = () => {
    const { clickedStates, handleClick } = useLikedItems();

    return (
        <div className='flex flex-wrap m-4'>
            {data.map((item) => (
                <div key={item.id} className='flex flex-col w-[300px] h-[800px] mx-4'>
                    <div className='relative w-[300px] h-[400px]'>
                        <Image src={item.img} className='absolute' fill style={{ objectFit: 'cover' }} alt='' />
                        <div className='mr-5 mb-2 p-2 rounded-full bg-white absolute bottom-0 right-0'>
                            <Heart onClick={() => handleClick(item.id)} className={`${clickedStates[item.id] ? 'fill-black' : 'fill-none'}`} />
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center bottom-0 w-full h-[200px] bg-blue-500'>
                        <p>{item.text}</p>
                        <p>{item.price} <Heart/></p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ItemComponent;
