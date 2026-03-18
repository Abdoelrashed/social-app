import React, { useContext, useState } from "react";
import { Form, Input, Button } from "@heroui/react";
import { RadioGroup, Radio } from "@heroui/react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const schema = zod.object({
  email: zod.email().nonempty("email is required"),
  password: zod
    .string()
    .nonempty("password is required")
    .regex(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
      "errrrrrrrrr",
    ),
});

export default function Login() {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const [error, seterror] = useState(null);
  const { userLogin, setUserLogin } = useContext(AuthContext);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    resolver: zodResolver(schema),

    mode: "onChange",
  });

  const { register, handleSubmit, formState } = form;

  function handleLogin(values) {
    setloading(true);

    axios
      .post(`https://route-posts.routemisr.com/users/signin`, values)
      .then((res) => {
        if (res.data.message == "signed in successfully") {
          navigate("/home");

          localStorage.setItem("userToken", res.data.data.token);
          setUserLogin(res.data.data.token);
        }
      })
      .catch((err) => {
        seterror(err.response.data.errors);
      })
      .finally(() => {
        setloading(false);
      });
  }

  return (
    <>
      <div className="flex justify-center items-center mt-11 text-center ">
        <Form
          onSubmit={handleSubmit(handleLogin)}
          className="w-full max-w-xs flex flex-col gap-4 "
        >
          <h1 className="text-2xl font-bold text-center">Login</h1>
          {error && (
            <p className="bg-red-600 text-amber-50 font-bold p-2 m-4 rounded-s-sm w-[400px] mx-auto">
              {error}
            </p>
          )}

          <Input
            {...register("email")}
            label="email"
            labelPlacement="outside"
            placeholder="Enter your email"
            type="email"
          />
          {formState.errors.email && formState.touchedFields.email && (
            <p className="bg-red-500 text-blue-600 rounded-b-md p-1 font-bold m-2 ">
              {formState.errors.email?.message}
            </p>
          )}
          <Input
            {...register("password")}
            label="password"
            labelPlacement="outside"
            placeholder="Enter your password"
            type="password"
          />
          {formState.errors.password && formState.touchedFields.password && (
            <p className="bg-red-500 text-blue-600 rounded-b-md p-1 font-bold m-2 ">
              {formState.errors.password?.message}
            </p>
          )}

          <div className="flex gap-2 w-full">
            <Button
              color="primary"
              type="submit"
              className="w-full disabled:bg-slate-700 disabled:text-slate-200"
              disabled={loading}
            >
              {loading ? <span className="loader"></span> : "Login"}
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
