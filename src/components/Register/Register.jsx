import React, { useState } from "react";
import { Form, Input, Button } from "@heroui/react";
import { RadioGroup, Radio } from "@heroui/react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const schema = zod
  .object({
    name: zod
      .string()
      .nonempty("name is required")
      .min(3, "minimum 3")
      .max(10, "the max 10 "),
    email: zod.email().nonempty("email is required"),
    password: zod
      .string()
      .nonempty("password is required")
      .regex(
        /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
        "errrrrrrrrr",
      ),
    rePassword: zod
      .string()
      .nonempty("password is required")
      .regex(
        /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
        "errrrrrrrrr",
      ),
    dateOfBirth: zod
      .string()
      .nonempty("date is required")
      .refine((date) => {
        const userDate = new Date(date);
        const currentDate = new Date();
        if (currentDate.getFullYear() - userDate.getFullYear() >= 10) {
          return true;
        } else {
          return false;
        }
      }),
    gender: zod.enum(["male", "female"]),
  })
  .refine(
    (values) => {
      if (values.password == values.rePassword) return true;
    },
    { message: "not matched" },
  );

export default function Register() {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const [error, seterror] = useState(null);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },

    resolver: zodResolver(schema),

    mode: "onChange",
  });

  const { register, handleSubmit, formState } = form;

  function handleRegister(values) {
    setloading(true);
    console.log(values);

    axios
      .post(`https://route-posts.routemisr.com/users/signup`, values)
      .then((res) => {
        if (res.data.message == "account created") {
          navigate("/login");
        }
      })
      .catch((err) => {
        seterror(err.response.data.errors);
        // console.log(err.response.data.errors);
      })
      .finally(() => {
        setloading(false);
      });
  }

  return (
    <>
      <div className="flex justify-center items-center mt-11 ">
        <Form
          onSubmit={handleSubmit(handleRegister)}
          className="w-full max-w-xs flex flex-col gap-4 "
        >
          <h1 className="text-2xl font-bold text-center">register</h1>
          {error && (
            <p className="bg-red-600 text-amber-50 font-bold p-2 m-4 rounded-s-sm w-[400px] mx-auto">
              {error}
            </p>
          )}
          <Input
            {...register("name")}
            label="Username"
            labelPlacement="outside"
            placeholder="Enter your username"
            type="text"
          />
          {formState.errors.name && formState.touchedFields.name && (
            <p className="bg-red-500 text-blue-600 rounded-b-md p-1 font-bold m-2 ">
              {formState.errors.name?.message}
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
          <Input
            {...register("rePassword")}
            label="rePassword"
            labelPlacement="outside"
            placeholder="Enter your rePassword"
            type="password"
          />
          {formState.errors.rePassword &&
            formState.touchedFields.rePassword && (
              <p className="bg-red-500 text-blue-600 rounded-b-md p-1 font-bold m-2 ">
                {formState.errors.rePassword?.message}
              </p>
            )}
          <Input
            {...register("dateOfBirth")}
            label="date of birth"
            labelPlacement="outside"
            placeholder="Enter your date of birth"
            type="date"
          />
          {formState.errors.dateOfBirth &&
            formState.touchedFields.dateOfBirth && (
              <p className="bg-red-500 text-blue-600 rounded-b-md p-1 font-bold m-2 ">
                {formState.errors.dateOfBirth?.message}
              </p>
            )}
          <input type="radio" {...register("gender")} value="male" />
          male
          <input type="radio" {...register("gender")} value="female" />
          female
          {formState.errors.gender && formState.touchedFields.gender && (
            <p className="bg-red-500 text-blue-600 rounded-b-md p-1 font-bold m-2 ">
              {formState.errors.gender?.message}
            </p>
          )}
          <div className="flex gap-2 w-full">
            <Button
              color="primary"
              type="submit"
              className="w-full disabled:bg-slate-700 disabled:text-slate-200"
              disabled={loading}
            >
              {loading ? <span className="loader"></span> : "register"}
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
