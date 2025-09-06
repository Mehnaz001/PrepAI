"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import FormField from "./FormField"
import { useRouter } from "next/navigation"

const authFormSchema = (type:FormType) => {
  return z.object({
    name: type === 'sign-up'? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  })
}

const AuthForm = ({type}:{type:FormType}) => {
  const formSchema = authFormSchema(type);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })
 
  function onSubmit(values: z.infer<typeof formSchema>) {
   try{
      if(type === 'sign-in') {
        toast.success("Account created sucessfully.Move to Sign In")
        router.push('/sign-in')
      }else {
        toast.success("Sign-in sucessfully")
        router.push('/')
      }
   }catch(err) {
      console.log(err);
      toast.error(`There is an error ${err}`);
   }
  }

  const isSignIn = type === 'sign-in';

  return (
       <div className="card-border lg:min-w-[566px]">
        <div className="flex flex-col gap-6 card py-14 px-10">
          <div className="flex flex-row gap-2 justify-center">
            <Image src="/logo.svg" alt="logo" height={32} width={38} />
            <h2 className="text-primary-100">PrepAI</h2>
          </div>
          <h3>AI - Powered Prep for your Dream Job</h3>
           <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
       {!isSignIn && <FormField control={form.control} name="name" label="Name" placeholder="Your Name"/>}
       <FormField control={form.control} name="email" label="Email" placeholder="Enter your email" type="email"/>
       <FormField control={form.control} name="password" label="Password" placeholder="Enter your password" type="password"/>
        <Button className="btn" type="submit">{isSignIn? "Sign In": "Create an Account" }</Button>
      </form>

      <p className="text-center">
        {isSignIn? 'No account yet?': 'Have an account already?'}
        <Link href={!isSignIn? '/sign-in':'/sign-up'} className="font-bold text-user-primary ml-1"> {!isSignIn? "Sign In": "Sign up"} </Link>
      </p>
    </Form>
        </div>
       
       </div>
  )

}

export default AuthForm
