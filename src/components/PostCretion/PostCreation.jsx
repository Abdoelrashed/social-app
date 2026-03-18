import {
  Avatar,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import axios from "axios";
import React, { useRef, useState } from "react";
import { FaImages } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function PostCreation() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isUploaded, setisUploaded] = useState(false);
  const textInput = useRef(null);
  const imageInput = useRef(null);

  const query = useQueryClient();

  function prepareData() {
    const formData = new FormData();
    if (textInput.current.value) {
      formData.append("body", textInput.current.value);
    }
    if (imageInput.current.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }
    return formData;
  }

  function creatPost() {
    return axios.post(
      `https://route-posts.routemisr.com/posts`,
      prepareData(),
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }
  const { data, isPending, mutate } = useMutation({
    mutationFn: creatPost,
    onSuccess: () => {
      setisUploaded(null);
      console.log("hahah");
      query.invalidateQueries({
        queryKey: ["gatAllPosts"],
      });
      toast.success("post created successfully👍", {
        closeOnClick: true,
        autoClose: 2000,
      });
      // textInput.current.value = "";
      // imageInput.current.value = "";
    },
    onError: () => {
      toast.error("can't craete this post", {
        closeOnClick: true,
        autoClose: 2000,
      });
    },
  });

  function handelImagePreView(e) {
    console.log(e.target.files[0]);
    const path = URL.createObjectURL(e.target.files[0]);
    setisUploaded(path);
  }
  function handlRemove() {
    setisUploaded(false);
    imageInput.current.value = "";
  }

  return (
    <>
      <div className="max-w-100 mx-auto mb-5 bg-slate-400 p-2 rounded-md">
        <div className="flex gap-2">
          <Avatar
            isBordered
            size="md"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
          <input
            onClick={onOpen}
            type="text"
            className="w-full bg-slate-300 rounded-md"
            placeholder="what's in your mind..."
            readOnly
          />
        </div>
        <div className="modal">
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    creat post
                  </ModalHeader>
                  <ModalBody>
                    <textarea
                      ref={textInput}
                      className="w-full bg-slate-300 rounded-md p-2"
                      placeholder="create post "
                    ></textarea>
                    {isUploaded && (
                      <div className="relative">
                        <img
                          alt="Card background"
                          className="object-cover rounded-xl"
                          src={isUploaded}
                        />
                        <IoMdCloseCircleOutline
                          onClick={handlRemove}
                          className="absolute top-2.5 end-2.5 bg-slate-500 text-amber-50 cursor-pointer size-5"
                        />
                      </div>
                    )}
                  </ModalBody>
                  <ModalFooter className="flex p-2 items-center">
                    <label>
                      <FaImages className="size-5 cursor-pointer" />
                      <input
                        ref={imageInput}
                        type="file"
                        hidden
                        onChange={handelImagePreView}
                      />
                    </label>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <button
                      color="primary"
                      onClick={function () {
                        onClose();
                        mutate();
                      }}
                    >
                      craet
                    </button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
    </>
  );
}
