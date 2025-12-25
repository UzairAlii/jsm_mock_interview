"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import FormFeilds from "./FormFeilds"
import { useState } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { signIn, signUp } from "@/lib/actions/auth.action"
import { auth } from "@/firebase/Client"

const authFormSchema = (type: FormType) => {
    return z.object({
        name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(3),
    })
}

const AuthForms = ({ type }: { type: FormType }) => {

    const hideShowPass = useState(false)

    const router = useRouter();

    const formSchema = authFormSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (type === "sign-up") {
                const { name, email, password } = values;

                const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
                const results = await signUp({
                    uid: userCredentials.user.uid,
                    name: name!,
                    email,
                    password
                })

                if (!results?.success) {
                    toast.error(results?.message)
                    return;
                }

                toast.success("Account Created Succesfully, Please Sign In")
                router.push("/sign-in")
            } else {

                const { email, password } = values;
                const userCredentials = await signInWithEmailAndPassword(auth, email, password)

                const idToken = await userCredentials.user.getIdToken();

                if (!idToken) {
                    toast.error("Sign in failed")
                    return;
                }

                await signIn({
                    email, idToken
                })

                toast.success("Successfully Signed In")
                router.push("/")
            }
        } catch (error) {
            console.log(error)
            toast.error(`there was an error : ${error}`)
        }
    }


    const isSignIn = type === 'sign-in'

    return (
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col gap-6 card py-14 px-10">
                <div className="flex flex-row gap-2 justify-center text-center">
                    <Image src="/logo.svg" alt="logo" width={38} height={32} />
                    <h2 className="text-primary-100">Evaly AI</h2>
                </div>
                <h3>Train smarter for job interviews using AI powered practice</h3>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6 w-full mt-4 form">
                        {!isSignIn && (<FormFeilds
                            control={form.control}
                            name="name"
                            label="Name"
                            placeholder="Enter Your Name " />)}

                        <FormFeilds
                            control={form.control}
                            name="email"
                            label="Email"
                            placeholder="Enter Your Email " />
                        <FormFeilds
                            control={form.control}
                            name="password"
                            label="Password"
                            placeholder={isSignIn ? "Enter Your Password" : "Create an Strong Password"}
                            type="password" />
                        <Button className="btn" type="submit">{isSignIn ? "Sign In" : "Create An Account"}</Button>
                    </form>
                </Form>

                <p className="text-center">
                    {isSignIn ? "No account yet ?" : "Have an account already ?"}
                    <Link className="font-bold text-user-primary ml-1" href={!isSignIn ? '/sign-in' : "/sign-up"}>
                        {!isSignIn ? "Sign in" : "Sign up"}
                    </Link>
                </p>

            </div>
        </div>
    )
}

export default AuthForms