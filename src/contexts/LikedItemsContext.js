'use client';
import React, { createContext, useState, useContext } from 'react';
import { data } from '@/lib/data';

//creates a useContext hook and a Provider component. UseContext have providers and consumers
const LikedItemsContext = createContext();

//provider component that wraps the children components and provides the context to them
export const LikedItemsProvider = ({ children }) => {
    const [clickedStates, setClickedStates] = useState(() => {
        //initialize an empty object
        const initialStates = {};

        //loop through the data array and set the initial state of each item to false
        data.forEach(item => {
            initialStates[item.id] = false;
        });
        return initialStates;
    });
    const [likedItems, setLikedItems] = useState([]);

    const handleClick = (id) => {
        //update the state of the clicked item
        setClickedStates((prevStates) => {
            //create a new object with the previous states
            const newStates = { ...prevStates };
            //toggle the state of the clicked item
            newStates[id] = !newStates[id];
    
            // Find the item in data
            const item = data.find((item) => item.id === id);
    
            // Check if item exists in data
            if (!item) {
                console.error(`Item with id ${id} not found in data.`);
                return prevStates; // Return the previous states without changes
            }
    
            setLikedItems((prevLikedItems) => {
                if (newStates[id]) {
                    // Add item if it's not already in likedItems
                    if(prevLikedItems.find((likedItem) => likedItem.id === item.id)){
                        return prevLikedItems
                    } else {
                        return [...prevLikedItems, item];
                    }
                } else {
                    // Remove item if it's in likedItems
                    return prevLikedItems.filter((likedItem) => likedItem.id !== item.id);
                }
            });
    
            return newStates;
        });
    };

    return (
        <LikedItemsContext.Provider value={{ clickedStates, likedItems, handleClick }}>
            {children}
        </LikedItemsContext.Provider>
    );
};

export const useLikedItems = () => {
    const context = useContext(LikedItemsContext);
    if (!context) {
        throw new Error('useLikedItems must be used within a LikedItemsProvider');
    }
    return context;
};
