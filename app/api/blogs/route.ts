import { getPosts, addPost } from "../../lib/data"
import { NextResponse } from "next/server"

// “traer la colección completa (el objeto con todos los documentos )”
export const GET =  async (req: Request, res: Response) => { 
try{
//( esto primero para probar la conexión: console.log(“GET REQUEST”); 
// si anda, lo sacamos y ponemos en su lugar:)

const posts = getPosts();
return NextResponse.json({message: "OK", posts}, { status: 200});
} catch(err) {
return NextResponse.json({ message: "Error detail: ", err }, { status: 500,});
}
};

 // “agregar un documento a la colección”
export const POST =  async (req: Request, res: Response) => { 
console.log("POST REQUEST"); 
//lo mismo, esta tambien se va una vez probada la conexion, por:
const { title, desc } = await req.json(); 
try{
	const post = { title, desc, date: new Date(), id:Date.now().toString() };
	addPost(post);
return NextResponse.json({ message: "OK!", post}, {status: 201,}) 
} catch(err){
	return NextResponse.json({ message: "Error: ", err}, { status: 500,});
}
};
