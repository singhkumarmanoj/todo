


import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Task from "@/models/Task";

// GET all tasks
export async function GET() {
  try{
    await connectDB();
    const tasks = await Task.find();
    // return NextResponse.json(tasks);

    //
    return NextResponse.json({
      status: "success",
      dbConnected: true,
      tasks,
  });
    //

    
  }catch(error: any){
    console.error("Failed to fetch tasks", error.message);
    // return NextResponse.json(
    //   {status: 'error', message: error.message},
    //   {status: 500}

    return NextResponse.json({
      status: 'error',
      dbConnected: false,
      tasks: [],
      message: error.message,
    }, { status: 500});

  }
}

// POST new task
export async function POST(req: Request) {
  await connectDB();
  const { title1 } = await req.json();
  const task = await Task.create({ title1 });
  return NextResponse.json(task);
}


 














// import { NextResponse } from "next/server";
// import  connectDB  from "../../../lib/mongodb";


// export async function GET() {
//     try {
//         await connectDB();
//         return NextResponse.json({status: "Mongodb atlas connected"});

//     } catch(error){
//           console.error("MongoDB connection error:", error);
//         return NextResponse.json({status: "Failed to connect", error}, {status: 500});
//     }
    
// }