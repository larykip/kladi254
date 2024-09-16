'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const data = [
    { img: '/images/pizza.jpg', text: 'Pizza' },
    { img: '/images/flowers.jpg', text: 'Flowers' },
    { img: '/images/pancakes.jpg', text: 'Pancakes' },
    { img: '/images/pizza.jpg', text: 'Pizza1' },
    { img: '/images/flowers.jpg', text: 'Flowers1' },
    { img: '/images/pancakes.jpg', text: 'Pancakes1' },
];

const PreviewComponent = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [itemsToShow, setItemsToShow] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width <= 600) {
                setItemsToShow(1); // Show 1 image at a time for small screens
            } else if (width <= 800) {
                setItemsToShow(2); // Show 2 images at a time for medium screens
            } else if (width <= 1200) {
                setItemsToShow(3); // Show 3 images at a time for large screens
            } else if(width > 1240){
                setItemsToShow(6); // Show 4 images at a time for large screens
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isMobile]);

    const nextSlide = () => {
        if (currentIndex < data.length - itemsToShow) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(0); // Loop back to the start
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else {
            setCurrentIndex(data.length - itemsToShow); // Go to the end
        }
    };

    return (
        <div className='relative flex flex-col items-center'>
            <div className='relative flex'>
                {data.slice(currentIndex, currentIndex + itemsToShow).map((item, index) => (
                    <div key={index} className='flex flex-col w-[180px] h-[280px] mx-4'>
                        <div className='relative w-[180px] h-[230px]'>
                            <Image src={item.img} className='absolute' fill style={{ objectFit: 'cover' }} alt={item.text} />
                        </div>
                        <div className='flex justify-center items-center bottom-0 w-full h-[50px] bg-white'>
                            {item.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* Slider controls */}
            {isMobile && (
                <div className='flex justify-between w-full mt-4'>
                    <button onClick={prevSlide} className='px-4 py-2 bg-gray-300 rounded'>Prev</button>
                    <button onClick={nextSlide} className='px-4 py-2 bg-gray-300 rounded'>Next</button>
                </div>
            )}

            {/* Dot indicators */}
            <div className='flex justify-center mt-4 w-full'>
                {Array.from({ length: Math.ceil(data.length / itemsToShow) }).map((_, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrentIndex(index * itemsToShow)}
                        className={`cursor-pointer mx-2 w-3 h-3 rounded-full ${
                            currentIndex / itemsToShow === index ? 'bg-blue-600 w-4 h-4' : 'bg-gray-400'
                        }`}
                    />
                ))}
            </div>
        </div>
    )
}

export default PreviewComponent;
