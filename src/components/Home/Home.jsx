import axios from "axios";
import React, { useEffect, useState } from "react";
import PostCard from "../PostCard/PostCard";
import Loader from "../Loading/Loader";
import { useQuery } from "@tanstack/react-query";
import PostCreation from "../PostCretion/PostCreation";

export default function Home() {
  function getAllPosts() {
    return axios.get(`https://route-posts.routemisr.com/posts`, {
      params: { sort: "-createdAt" },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
  }

  const { data, isLoading, isError, isFetching, error } = useQuery({
    queryKey: ["getAllPosts"],
    queryFn: getAllPosts,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <h1> erorrrrrrrrrrrr</h1>;
  }

  return (
    <>

<PostCreation />


      {data?.data.data.posts.map((post) => (
        <PostCard key={post.id} post={post}  />
      ))}
    </>
  );
}
