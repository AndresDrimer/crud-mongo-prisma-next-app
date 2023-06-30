import { getById, updatePost, deletePost } from "../../../lib/data";
import { NextResponse } from "next/server"

// “traer un documento por Id”
export const GET =  async (req: Request, res: Response) => { 
(console.log("GET")); 
//despues esta linea se cambia por:  )
try{
const id = req.url.split("/blogs/")[1]; //esto seria como {params} pero con javascript
const post = getById(id)
if (!post) {
	return NextResponse.json({ message: "Error"}, {status: 404})
}
return NextResponse.json({message: "OK", post}, { status: 200});
} catch(err) {
	return NextResponse.json({ message: "Error", err}, {status: 500})
    }
}; 

// “modificar un document por Id”
export const PUT =  async (req: Request, res: Response) => { 
console.log("PUT"); 
//despues se transforma en:
try{
const { title, desc } = await req.json()
const id = req.url.split("/blogs/")[1];
updatePost(id, title, desc)
return NextResponse.json({ message: "OK"}, {status: 200})
} catch(err){
return NextResponse.json({message: "Error", err}, {status: 500,})}

};
//” borrar un document por Id”
export const DELETE=  async (req: Request, res: Response) => { 
console.log("DELETE"); 
//despues: 

try{
const id = req.url.split("/blogs/")[1];
deletePost(id)
return NextResponse.json({ message: "OK DELETED!" }, { status: 200})
} catch(err){
return NextResponse.json({message: "Error", err}, {status: 500,})
}
};
	
