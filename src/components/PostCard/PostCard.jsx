import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdEdit } from "react-icons/md";

import Comment from "./../Comment/Comment";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation, useQuery ,useQueryClient } from "@tanstack/react-query";
import CommentCreation from "../CommentCreation/CommentCreation";
import { FaRegTrashAlt } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from 'react-toastify';
const PlaceHolder_Image =
  "https://avatars.githubusercontent.com/u/86160567?s=200&v=4";

export default function PostCard({ post, isPostDetails = false }) {
  const { userId: logedUserId } = useContext(AuthContext);
  function getPostComments() {
    return axios.get(`https://route-posts.routemisr.com/posts/${id}/comments`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
      // params: {limit : 10}
    });
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getPostComments"],
    queryFn: getPostComments,
    enabled: isPostDetails,
  });

  const { body, image, comments, createdAt, user, topComment, id } = post;
  const { name, photo } = user;
  const myTopComment = topComment;
  const userId = user._id;

  if (!body && !image) return;

  function deletPost() {
    return axios.delete(`https://route-posts.routemisr.com/posts/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    });
  }
  const query = useQueryClient()
  const navigate =useNavigate()

  const { isPending, mutate } = useMutation({
    mutationFn: deletPost,
    onSuccess: ()=>{
toast.success("post deleted")
query.invalidateQueries({queryKey:["getPostComments"]})
navigate("/")
    },
    onError : ()=>{
toast.error("post can't be deleted")
    }
  });

  return (
    <Card className="max-w-100 mx-auto mb-5">
      <CardHeader className="flex justify-between gap-3">
        <div className="flex gap-2">
          <img
            alt="heroui logo"
            height={40}
            radius="sm"
            src={photo}
            width={40}
            onError={(e) => (e.target.src = PlaceHolder_Image)}
          />
          <div className="flex flex-col">
            <p className="text-md">{name}</p>
            <p className="text-small text-default-500">{createdAt}</p>
          </div>
        </div>

        {logedUserId === userId && (
          <Dropdown>
            <DropdownTrigger>
              <BsThreeDotsVertical className="cursor-pointer" />
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="edit">
                <div className="flex justify-between items-center">
                  Edit <MdEdit />
                </div>
              </DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger">
                <div className="flex justify-between items-center" onClick={mutate}>
                  delete
                  <FaRegTrashAlt />
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </CardHeader>
      <Divider />
      <CardBody>
        {body && <p className="mb-2">{body}</p>}
        {image && <img src={image} alt={body} />}
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="flex w-full justify-between">
          <div className="cursor-pointer">like👍</div>
          <div className="cursor-pointer">
            <Link to={`/postdetails/${id}`}>comment💬</Link>
          </div>
          <div className="cursor-pointer"> share↗️</div>
        </div>
      </CardFooter>
      <CommentCreation
        postId={id}
        queryKey={isPostDetails ? ["getPostComments"] : ["getAllPosts"]}
      />

      {isPostDetails === false && myTopComment && (
        <Comment comment={myTopComment} />
      )}
      {isPostDetails &&
        data?.data.data.comments.map((currComment) => (
          <Comment key={currComment._id} comment={currComment} />
        ))}
    </Card>
  );
}
