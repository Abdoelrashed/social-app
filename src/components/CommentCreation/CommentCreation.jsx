import { Input } from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { LuLoader } from "react-icons/lu";
import { FaCommentAlt, FaImage } from "react-icons/fa";
import { toast } from "react-toastify";

export default function CommentCreation({ postId, querykey }) {
  const query = useQueryClient();

  const form = useForm({
    defaultValues: {
      body: "",
      image: "",
    },
  });
  const { register, handleSubmit, reset } = form;

  const formData = new FormData();

  function CreatComment() {
    return axios.post(
      `https://route-posts.routemisr.com/posts/${postId}/comments`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }

  const { data, isPending, mutate } = useMutation({
    mutationFn: CreatComment,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: querykey });
      reset();
      toast.success("comment created successfully👍", {
        closeOnClick: true,
        autoClose: 2000,
      });
    },

    onError: () => {
      toast.error("can't craete this comment", {
        closeOnClick: true,
        autoClose: 2000,
      });
    },
    onSettled: () => {},
  });

  function handelCreateComment(values) {
    if (!values.body && !values.image[0]) return;

    if (values.body) {
      formData.append("content", values.body);
    }
    if (values.image[0]) {
      formData.append("image", values.values.image[0]);
    }
    mutate();
  }

  return (
    <>
      <div className="w-[90%] mx-auto cursor-pointer my-2">
        <form onSubmit={handleSubmit(handelCreateComment)}>
          <Input
            {...register("body")}
            labelPlacement="outside"
            placeholder="add comment"
            endContent={
              <button
                disabled={isPending}
                type="submit"
                className="bg-sky-700 flex justify-center items-center disabled:bg-slate-500 disabled:cursor-not-allowed p-2 cursor-pointer text-amber-50 rounded-sm"
              >
                {isPending ? (
                  <LuLoader className="animate-spin" />
                ) : (
                  <FaCommentAlt />
                )}
              </button>
            }
            type="text"
          />
          <label htmlFor="test">
            <div className="bg-blue-600 p-2 w-full my-2 rounded-md flex justify-center tex-md text-amber-50 cursor-pointer">
              <FaImage />
            </div>
          </label>
          <input {...register("image")} id="test" type="file" hidden />
        </form>
      </div>
    </>
  );
}
