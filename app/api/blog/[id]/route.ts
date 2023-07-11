import { NextResponse } from "next/server";
import { main } from "../route";
import prisma from "@/prisma";
import cors from "cors";

const corsMiddleware = cors({
  origin: "https://crud-mongo-prisma-next-app-zehl-kf6076oia-andresdrimer.vercel.app",
  methods: ["GET", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
});

export const GET = async (req: Request, res: NextResponse) => {
  try {
    await corsMiddleware(req, res); 
    const id = req.url.split("/blog/")[1];
    await main();
    const post = await prisma.post.findFirst({ where: { id } });
    if (!post)
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = async (req: Request, res: NextResponse) => {
  try {
    const id = req.url.split("/blog/")[1];
    const { title, description, author } = await req.json();
    await main();
    const post = await prisma.post.update({
      data: { title, description }, // los paso en el body del request en postman
      where: { id }, // lo paso como una const desde linea 22
    });
    return NextResponse.json({ message: "Success", post }, { status: 200 }); //llegó
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 }); //no llegó
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    const id = req.url.split("/blog/")[1];
    await main();
    const post = await prisma.post.delete({ where: { id } });
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};