'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';

const LikedItemsContext = createContext();

export const LikedItemsProvider = ({ children }) => {
    const [clickedStates, setClickedStates] = useState({});
    const [likedItems, setLikedItems] = useState([]);
    const [userId, setUserId] = useState(null);

    //fetch user id
    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch('/api/auth/session');
            const result = await response.json();
            if(result.authenticated) {
                setUserId(result.user.id);
            }
        }
        fetchUser();
    }, []);

    useEffect(() => {
        if(userId){
            const fetchLikedItems = async () => {
                // Fetch liked items for the current user
                const response = await fetch(`/api/saved-items?userId=${userId}`);
                // Check if the response is successful
                if (response.ok) {
                    // Parse the response body as JSON
                    const items = await response.json();
                    // Set the liked items state
                    setLikedItems(items);

                    // Initialize clicked states based on the liked items
                    const initialStates = {}
                    // Set the clicked state to true for each liked item
                    items.forEach((item) => {
                        initialStates[item._id] = true;
                    });
                    setClickedStates(initialStates);
                }
            }
            fetchLikedItems();
        }
    }, [userId]);

    const handleClick = async (id, item) => {
        setClickedStates((prevStates) => ({ ...prevStates, [id]: !prevStates[id] }));

        // Call the appropriate API to add or remove liked items
        await updateLikedItems(id, item);
    };

    const updateLikedItems = async (id, item) => {
        // Check if the user ID is available/authenticated
        if (!userId) return;

        // Find the item in the liked items
        //const item = likedItems.find((item) => item._id === id);

        // Check if the item is not found
        //if(!item) return;

        // Determine the API method based on current state
        const isLiked = clickedStates[id]; //is a boolean value based on the current state of the item
        const method = isLiked ? 'DELETE' : 'POST'; //if the item is liked, the method is DELETE, otherwise it is POST
        const url = '/api/saved-items';

        const response = await fetch(url, {
            method: method,//method is either DELETE or POST based on above condition
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId, // Required for saving
                itemId: id, //The ID of the item to be added or removed
                item: isLiked ? null : item //If the item is being liked (added), it includes the item details; if it's being unliked (removed), this field is set to null.
            }),
        });

        if (response.ok) {
            // Optionally refresh liked items after modification
            const updatedLikedItems = await fetch(`/api/saved-items?userId=${userId}`);
            const items = await updatedLikedItems.json();
            setLikedItems(items);
        } else {
            console.error('Failed to update liked items.');
        }
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
