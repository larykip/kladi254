// app/api/items/route.js
import { NextResponse } from 'next/server';
import Item from '@/models/item';
import connectMongoDB from '@/lib/mongodb';

export async function POST(req) {
    try {
        const { img, text, stock, price } = await req.json();

        await connectMongoDB();
        await Item.create({ img, text, stock, price });
        
        return NextResponse.json({ message: 'Item created successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error creating item:', error);
        return NextResponse.json({ message: 'Error creating item', error: error.message }, { status: 500 });
    }
}

export async function GET(req) {
    try {
      await connectMongoDB();
  
      // Fetch all the items
      const items = await Item.find();
  
      return new Response(JSON.stringify(items), { status: 200 });
    } catch (error) {
      console.error("Error fetching items:", error);
      return new Response(
        JSON.stringify({ message: "Internal Server Error" }),
        { status: 500 }
      );
    }
  }

  export async function PUT(req) {   
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get('id');

        const { img, text, stock, price } = await req.json();
        console.log(`Image: ${img}, Text: ${text}, Price: ${price}`);

        await connectMongoDB();

        // const existingItem = await Item.findById(id);
        // if (!existingItem) {
        //     return NextResponse.json({ message: 'test Item not found' }, { status: 404 });
        // }

        const updatedItem = await Item.findByIdAndUpdate(id, { img, text, stock, price }, { new: true });
        if (!updatedItem) {
            return NextResponse.json({ message: 'Item not found' }, { status: 404 });
        }
        return NextResponse.json(updatedItem, { status: 200 });
    } catch (error) {
        console.error('Error updating item:', error);
        return NextResponse.json({ message: 'Error updating item', error: error.message }, { status: 500 });
    }
}


export async function DELETE(req) {
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get('id')

        await connectMongoDB();
        const existingItem = await Item.findById(id);
        if (!existingItem) {
            return NextResponse.json({ message: 'Item not found' }, { status: 404 });
        }

        const deletedItem = await Item.findByIdAndDelete(id);
        if (!deletedItem) {
            return NextResponse.json({ message: 'Item not found' }, { status: 404 });
        }
        
        return NextResponse.json({ message: 'Item deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting item:', error);
        return NextResponse.json({ message: 'Error deleting item', error: error.message }, { status: 500 });
    }
}
