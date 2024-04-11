import React, { useState } from "react";
import { Input } from "../../Components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../Components/ui/form";
import { Button } from "../../Components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { isValidEmail, isValidPassWord } from "../../services/regex";
import { login } from "../../services/httpServices";
import Loader from "../../Components/Loader";
import { toast } from "../../Components/ui/use-toast";
import { useNavigate } from "react-router-dom";
const validationSchema = z.object({
  email: z
    .string()
    .min(1, { message: "User Email is required." })
    .refine((data) => isValidEmail(data), {
      message: "Invalid email address.",
    }),
  password: z
    .string()
    .min(1, { message: "User password is required." })
    
});
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof validationSchema>) => {
    try {
      setLoading(true);
      const res = await login(values);
      if (res.status === 200) {
        toast({
          variant: "success",
          title: res.data.msg,
        });
        localStorage.setItem("authToken",res.data.token)
        navigate("/");
      }
    } catch (err:any) {
      // Handle errors
      toast({
        variant: "destructive",
        title: err?.response?.data?.error,
      });
      console.warn(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="SignupBG flex items-center justify-center w-full h-[100vh]">
      <div className=" bg-[#FFFFFF] w-3/4 md:w-auto p-7 border rounded-sm">
        <div className="p-0 md:p-[15px]">
          <div className="flex flex-col gap-5 items-center md:items-start">
            <h2 className="text-[#000000] font-semibold text-[25px]">
              Welcome here is your login form!
            </h2>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full flex flex-col gap-5"
              >
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="emailAddress">
                        Email Address <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input type="text" id="emailAddress" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  // control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">
                        Password <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input type="password" id="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <p className="cursor-pointer underline" onClick={() => navigate("/register")}>
                  Not registered?
                </p>
                <Button type="submit" className="w-full bg-[#0F172A]">
                  {loading ? <Loader /> : "Register"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
