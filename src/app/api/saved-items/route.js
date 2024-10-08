import { NextResponse } from 'next/server';
import SavedItem from '@/models/savedItem'; // Model for saving items
import connectMongoDB from '@/lib/mongodb';

// POST route to add saved item
export async function POST(req) {
    try {
      const { userId, itemId, item } = await req.json();
      
      await connectMongoDB();
  
      const savedItem = new SavedItem({ userId, itemId, item });
      await savedItem.validate();  // Validates the document before saving
  
      const result = await savedItem.save();  // Saves the validated document
      return NextResponse.json(result, { status: 201 });
    } catch (error) {
      if (error.name === 'ValidationError') {
        console.error('Validation error:', error.errors);
      } else {
        console.error('Database error:', error);
      }
      return NextResponse.json({ message: 'Failed to save item', error: error.message }, { status: 500 });
    }
  }
  

// DELETE route to remove saved item
export async function DELETE(req) {
    const { userId, itemId } = await req.json();
    await connectMongoDB();

    try {
        const deletedItem = await SavedItem.findOneAndDelete({ userId, 'item.id': itemId });
        if (!deletedItem) {
            return NextResponse.json({ message: 'Item not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Item removed successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error removing item:', error);
        return NextResponse.json({ message: 'Error removing item', error: error.message }, { status: 500 });
    }
}

// GET route to fetch all saved items for a user
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
        return new Response(JSON.stringify({ message: 'User ID is required' }), { status: 400 });
    }

    await connectMongoDB();
    try {
        const items = await SavedItem.find({ userId });
        return new Response(JSON.stringify(items), { status: 200 });
    } catch (error) {
        console.error('Error fetching saved items:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
}
