"use client";

import { useState, useEffect } from "react";
import { getAllPosts } from "@/services/post";
import { useSession } from "next-auth/react";

export const PostList = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if(!session || !session.user || !session.user.accessToken) {
      return;
    }
    
    getAllPosts(session?.user?.accessToken)
      .then((res: any) => {
        setPosts(res?.posts);
      })
      .catch((err: Error) => {
        console.error(err);
      });
  }, [session]);

  return (
    <div className="flex flex-col space-y-12 items-center">
      {posts &&
        posts.map((post: any) => (
          <div
            key={post.id}
            className="group text-white flex justify-between border-4 border-white rounded-lg hover:bg-green-600 hover:border-green-600 duration-300 cursor-pointer"
          >
            <div>
              <img src="/treasure.png" alt="treasure" className="w-36" />
            </div>
            <div className="flex flex-col space-y-4 justify-center px-16 my-6 border-1 border-white group-hover:border-green-600 duration-300">
              <h2 className="text-xl font-bold uppercase">{post.title}</h2>
              <p className="text-md capitalize">{post.content}</p>
            </div>
          </div>
        ))}
    </div>
  );
};
