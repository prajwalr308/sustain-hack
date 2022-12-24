import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { server } from "../config";
import useSWR from "swr";
import { any } from "zod";

// const fetcher = (...args: any[]) => {
//   let spread: any = { ...args };
//   return fetch(spread).then((res) => res.json());
// };

const DeatilsPage = ({ post }: any) => {
  const router = useRouter();
  // const { id } = router.query;
  // const { data, error } = useSWR(`${server}/api/postById?id=${id}`, fetcher);
  // if (error) return <div>Failed to load</div>;
  // if (!data) return <div>Loading...</div>;
  // console.log("ID-------------------", id);
  // console.log("data-------------------", data);

  // const [data, setData] = useState({
  //   title: "",
  //   content: "",
  //   address: "",
  //   status: "",
  //   file: "",
  //   _id: "",
  // });
  // const [isLoading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   fetch(`${server}/api/postById?id=` + id)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data);
  //       setLoading(false);
  //       console.log("data-------------------", data);
  //     });
  // }, []);

  // console.log("ID-------------------", id);
  // console.log("data-------------------", data);


  if (!post) return <p>No profile data</p>;

  return (
    <div>
      <div>
        <Navbar />
        <div className="my-10 text-center text-4xl font-bold uppercase text-slate-700">
          Post Details
        </div>
        <div className="flex justify-evenly sm:mx-10">
          {/* Left side */}
          <div>
            <div className="my-4  mt-10 block pl-2 text-4xl font-bold text-gray-700">
              {post?.title}
            </div>
            <div className="my-4 block pl-2 text-xl font-medium text-gray-600">
              {post?.content}
            </div>
            <div className="my-4 block pl-2 text-lg font-normal text-gray-500">
              {post?.address}
            </div>
            <div className="text-md my-4 ml-2 flex">
              {post?.status === "active" ? (
                <div className="mr-4 w-32 rounded-2xl border border-green-700 px-2 py-1 text-center capitalize  hover:bg-green-700 hover:text-white">
                  Active
                </div>
              ) : (
                <div className="mr-4 w-32 rounded-2xl border border-rose-700 px-2 py-1 text-center capitalize hover:bg-rose-700 hover:text-white ">
                  Inactive
                </div>
              )}
            </div>
          </div>
          {/* Right side */}
          <div className="mt-10">
            <div className="max-w-xl">
              <Image
                width={300}
                height={300}
                className="rounded-2xl"
                alt="Picture of the post"
                src={post?.file || ""}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// export async function getStaticProps(context: any) {
//   console.log("This --------------------" + context);
//   // const id = params.id;
//   let data;
//   try {
//     const res = await fetch(`${server}/api/posts`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     data = await res.json();
//     // console.log("response data?", data);
//   } catch (error) {
//     console.log("Error happened here!");
//     console.error(error);
//   }

//   console.log("data", data);
//   return {
//     props: { post: data || null },
//   };
// }
export default DeatilsPage;

export const getStaticPaths = async () => {
  try {
    const res = await fetch(`${server}/api/posts`, {
      headers: {
        Accept: "application/json, text/plain, */*",
        "User-Agent": "*",
      },
    });
    const posts = await res.json();

    // Get the paths we want to pre-render based on posts
    const paths = posts.map((post: any) => ({
      params: { slug: post._id },
    }));

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false };
  } catch (error) {
    console.log("Error happened here!");
    console.error(error);
    return { paths: [], fallback: false };
  }
};
export async function getStaticProps(context: any) {
  console.log("This --------------------" + context);
  try {
    const { params } = context;
  console.log(params);
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`${server}/api/postById?id=${params.slug}`, {
    headers: {
      Accept: "application/json, text/plain, */*",
      "User-Agent": "*",
    },
  });

  const data = await res.json();
  const post = data?.data;
  // Pass post data to the page via props
  return { props: { post } };
  } catch (error) {
    console.log("Error happened here!");
    console.error(error);
    return { props: { post: null} };
  }
  
}
