'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLikedItems } from '@/contexts/LikedItemsContext';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const ItemPreview = () => {
    const router = useRouter(); // Access the router instance
    const [itemId, setItemId] = useState(null); // State to store the current item id
    const { likedItems } = useLikedItems(); // Get the liked items from context

    // Extract the dynamic route parameter using `router.pathname`
    useEffect(() => {
        const idFromUrl = window.location.pathname.split('/').pop(); // Get the last segment of the URL
        setItemId(idFromUrl); // Store the id in the state
    }, []);

    // Debugging: Log the id and likedItems
    console.log("ID from URL:", itemId);
    console.log("Liked Items Array:", likedItems);

    // Find the selected item by id
    const item = likedItems.find(item => String(item.id) === String(itemId));

    if (!item) {
        return <p>Item not found. ID: {itemId}</p>;
    }

    return (
        <div className='mt-8'>
            <Button>
                <Link href='/saved'>Back</Link>
            </Button>
            <h2 className='text-xl font-bold'>{item.text}</h2>
            <div className='relative w-[300px] h-[400px]'>
                <Image src={item.img} fill style={{ objectFit: 'cover' }} alt={item.text} />
            </div>
            <div className='mt-4'>
                <p>Price: {item.price}</p>
                <p>Description: {item.description}</p>
            </div>
        </div>
    );
};

export default ItemPreview;
