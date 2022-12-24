import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const Post = ({ post, isActive }: any) => {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push("/" + post._id);
      }}
      className="rounded-2xl bg-white p-2 shadow-lg"
    >
      <div className="h-80 p-2">
        <Image
          className="h-full w-full rounded-2xl object-cover"
          width={300}
          height={300}
          src={post.file}
          alt={post.title}
        />
      </div>
      <div>
        <div className="mt-2 flex justify-around ">
          <div className="ml-4 text-2xl font-bold">{post.title}</div>
          {/* <div> {post.content}</div> */}
          {isActive ? (
            <div className="mr-4 rounded-2xl border  border-green-700 px-2 py-1 capitalize  hover:bg-green-700 hover:text-white">
              {post.status}
            </div>
          ) : (
            <div className="mr-4 rounded-2xl border border-rose-700 px-2 py-1  capitalize hover:bg-rose-700 hover:text-white ">
              {post.status}
            </div>
          )}
        </div>

        <div className="my-2 flex justify-center text-gray-500">
          {post.address}
        </div>
      </div>
    </div>
  );
};

export default Post;
