'use client';
import { useLikedItems } from '@/contexts/LikedItemsContext';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { useState, useEffect } from 'react';
//import { data } from '@/lib/data'; // Ensure you import your data

const ItemComponent = () => {
    const { clickedStates, handleClick } = useLikedItems();
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch('/api/items');
            if (response.ok) {
                const items = await response.json();
                setItems(items);
            }
        };
        fetchItems();
    }, []);

    return (
        <div className='flex flex-wrap m-4'>
            {items.length > 0 ? (
                items.map((item) => (
                    <div key={item._id} className='flex flex-col w-[300px] h-[800px] mx-4'>
                        <div className='relative w-[300px] h-[400px]'>
                            <Image src={`${item.img}`} className='absolute' fill style={{ objectFit: 'cover' }} alt='' />
                            <div className='mr-5 mb-2 p-2 rounded-full bg-white absolute bottom-0 right-0'>
                                <Heart onClick={() => handleClick(item._id, item)} className={`${clickedStates[item._id] ? 'fill-black' : 'fill-none'}`} />
                            </div>
                        </div>
                        <div className='flex flex-col justify-center items-center bottom-0 w-full h-[200px] bg-blue-500'>
                            <p>{item.text}</p>
                            <p>{item.price} <Heart/></p>
                            <p key = {item._id}>Vipi { item._id }</p>
                        </div>
                    </div>
                ))
            ): (
                <p>No items yet!</p>
            )}
        </div>
    );
};

export default ItemComponent;
