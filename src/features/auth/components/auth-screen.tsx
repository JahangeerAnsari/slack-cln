"use client"
import { useState } from "react"
import { AuthTypes } from "../types"

import { SingUpCard } from "./sign-up-card"
import { SignInCard } from "./sign-in-card"

export const AuthScreen = () =>{
    const[authState,setAuthState] = useState<AuthTypes>("signIn");
   
    return (
        <div className="h-full flex items-center justify-center bg-[#5C3B58]">
            <div className="md:h-auto md:w-[420px]">
            { authState === "signIn" ? (<SignInCard setAuthState={setAuthState}/>) : <SingUpCard setAuthState={setAuthState} 
            />}
            </div>
        </div>
    )
}