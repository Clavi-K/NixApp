"use client"

import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "@/components/Sidebar";

export default function Home() {

  const { user } = useAuth()

  useEffect(() => {
    if (!user) redirect("/user/login")
  }, [])

  return (
    <div>
      <Sidebar />
    </div>
  );
}
