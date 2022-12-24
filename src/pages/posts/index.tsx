import React from "react";
import {
  GetServerSideProps,
  GetStaticProps,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
  type NextPage,
} from "next";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Post from "../../components/Post";
import { server } from "../../config";

const Posts: NextPage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: session } = useSession();
  // console.log("session data", session);
  // console.log("all post", posts);

  const [isActive, setIsActive] = useState(true);
  const [postData, setPostData] = useState(posts);

  useEffect(() => {
    // console.log(isActive);
    // console.log(session);
    if(!posts) return;
    if (isActive) {
      const activePost = posts?.filter((post: any) => {
        return post.status === "active";
      });
      setPostData(activePost);
    } else {
      const inactivePost = posts?.filter((post: any) => {
        return post.status === "inactive";
      });
      setPostData(inactivePost);
    }
  }, [isActive]);
  if(!posts) return <p>No post data</p>;
  return (
    <div>
      <title>Posts</title>
      <Navbar />

      <div className="text-center">
        {/* Heading */}
        {!session ? (
          <div>
            <h1 className="mt-4 text-4xl font-bold text-gray-800">
              Welcome to Reuse
            </h1>
          </div>
        ) : (
          <div>
            <h1 className="mt-4 text-4xl font-bold text-gray-800">
              Welcome to Reuse, {session?.user?.name}
            </h1>
          </div>
        )}

        {/* Active / Inactive bar */}

        <div className="mt-10 flex justify-center">
          <div className="flex gap-2 rounded-3xl border border-gray-200">
            <button
              onClick={() => {
                setIsActive(true);
              }}
              className={
                isActive
                  ? "rounded-3xl border-green-600 bg-green-700 px-4  py-2 text-white "
                  : "rounded-3xl border border-green-600 px-4 py-1"
              }
            >
              Active Posts
            </button>
            <button
              onClick={() => {
                setIsActive(false);
              }}
              className={
                !isActive
                  ? "rounded-3xl border-rose-900 bg-rose-600 px-4  py-2 text-white"
                  : "rounded-3xl border border-rose-900 px-4 py-1"
              }
            >
              Inactive Posts
            </button>
          </div>
        </div>
        {/* Posts */}
        <div className="m-10 grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {postData?.length > 0 &&
            postData?.map((post: any) => (
              <div key={post.title}>
                <Post post={post} isActive={isActive} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;

export const getStaticProps: GetStaticProps = async (context) => {
  let posts: [] = [];
  try {
    const res = await fetch(`${server}/api/posts`, {
      method: "GET",

      headers: {
        Accept: "application/json, text/plain, */*",
        "User-Agent": "*",
      },
    });
    posts = await res.json();
    console.log("posts-------------->", posts);
    return {
      props: { posts: posts  },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { posts: null  },
    };
  }

  
};
