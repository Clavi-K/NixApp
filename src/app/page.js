"use client"

import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { pingUser } from "./actions";

export default function Home() {

  const { user } = useAuth()
  const userToken = localStorage.getItem("nixAccessToken")

  useEffect(() => {
    if (!user || !userToken) {
      redirect("/user/login")
    } else {
      redirect("/dashboard")
    }
  }, [])

  return (<></>);
}
