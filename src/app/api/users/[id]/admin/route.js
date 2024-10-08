import connectMongoDB from "@/lib/mongodb";

export async function PATCH(req, { params }) {
    try{
        await connectMongoDB()
        const { isAdmin } = await req.json()

        // Check if the user is an admin
        const user = await User.findByIdAndUpdate(params.id, { isAdmin }, { new: true })

        if(!user){
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'User updated successfully' })
    }catch(error){
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 })
    }
}