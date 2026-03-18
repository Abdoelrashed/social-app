import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../Loading/Loader'
import { useQuery } from '@tanstack/react-query'
import PostCard from '../PostCard/PostCard'

export default function PostDetails() {

const {id} =useParams()
 
 function getPostDetails () {

  return  axios.get(`https://route-posts.routemisr.com/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    })
 }

   const { data, isLoading, isError, isFetching, error } = useQuery({
    queryKey: ["getSinglePost",id],
    queryFn: getPostDetails,
  });

  

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return { error };
  }
 
 
    return (
  <>
  <PostCard post ={data?.data.data.post} isPostDetails={true} />
  </>
  )
}
