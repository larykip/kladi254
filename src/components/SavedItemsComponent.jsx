'use client';
import React from 'react';
import { useLikedItems } from '@/contexts/LikedItemsContext';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';

const SavedItemsComponent = () => {
    const { likedItems, handleClick, clickedStates } = useLikedItems();

    return (
        <div className='mt-8'>
            <Button>
                <Link href='/'>Back</Link>
            </Button>
            <h2 className='text-xl font-bold'>Liked Items</h2>
            <div className='flex flex-wrap'>
                {likedItems.length > 0 ? (
                    likedItems.map((item) => (
                        <div key={item.id} className='flex flex-col w-[300px] h-[800px] mx-4'>
                            <div className='relative w-[300px] h-[400px]'>
                                <Image src={item.img} className='absolute' fill style={{ objectFit: 'cover' }} alt='' />
                                <div className='mr-5 mb-2 p-2 rounded-full bg-white absolute bottom-0 right-0'>
                                    <Heart onClick={
                                        () => handleClick(item.id)} 
                                        className={`${clickedStates[item.id] ? 'fill-black' : 'fill-none'}`} />
                                </div>
                            </div>
                            <div className='flex flex-col justify-center items-center bottom-0 w-full h-[200px] bg-blue-500'>
                                <p>{item.text}</p>
                                <p>{item.price} <Heart className='fill-black'/></p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No items liked yet.</p>
                )}
            </div>
        </div>
    );
}

export default SavedItemsComponent;
