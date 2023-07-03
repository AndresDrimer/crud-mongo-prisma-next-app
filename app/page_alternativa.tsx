import Link from "next/link";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { cache } from "react";

interface Post {
  id: number;
  title: string;
  date: string;
  description: string;
}

interface PostProps {
  posts: Post[];
}


export async function getServerSideProps(): Promise<{ props: PostProps }> {
  const res = await fetch("http://localhost:3000/api/blog", {cache: "no-cache"});
  const data = await res.json()
  console.log("aca", data)
  const posts: Post[] = data.posts
  return { props: { posts } }
}
 


///////




export default async function Home({posts } : PostProps) {
  

  return (
    <main className="w-full h-full">
      <div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-5 rounded-lg bg-slate-800 drop-shadow-xl">
        <h1 className="text-slate-200 text-center text-2xl font-extrabold font-[verdana]">
          FULL STACK Blog App <br/> <span className="text-lg">Next.js 13.4 + MongoDb + Prisma</span>
        </h1>
      </div>
      {/* Link */}
      <div className="flex my-5">
        <Link
          href={"/blog/add"}
          className="button md:w-1/6 sm:w-2/4 text-center rounded-md p-2 m-auto bg-slate-200 font-semibold"
        >
          Add New Blog 🚀
        </Link>
      </div>
      {/* Blogs */}
      <div className="w-full flex  flex-col justify-center items-center">
        {posts?.map((post: any) => (
          <div className="w-3/4 p-4 rounded-md mx-3 my-2 bg-slate-200 flex flex-col justify-center" key={post.id}>
            {/* Title and Action */}
            <div className="flex items-center my-3">
              <div className="mr-auto">
                <h2 className="mr-auto font-semibold text-xl">{post.title}</h2>
              </div>
              <Link
                href={`/blog/edit/${post.id}`}
                className="button px-4 py-1  text-center text-xl bg-slate-900 rounded-md font-semibold text-slate-200"
              >
                Edit
              </Link>
            </div>
            {/* Date & Description */}
            <div className="mr-auto my-1">
              <blockquote className="font-bold text-slate-700 text-xs">
                {new Date(post.date).toDateString()}
              </blockquote>
            </div>
            <div className=" mr-auto my-1">
              <h2>{post.description}</h2>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}