"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session?.user) {
      router.push("/dashboard")
    }
  }, [session, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (res?.error) {
        setError("Invalid Credentials")
        return
      }

      router.push("/dashboard")
    } catch (error) {
      console.log(error)
    }
  }

  if (session?.user) {
    return null
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-[450px] bg-white shadow-md rounded-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Login</CardTitle>
          <CardDescription className="text-center text-gray-500">
            Enter your email and password to login
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleSubmit}>Login</Button>
        </CardFooter>
        <div className="text-center">
          <Link href="/forgot-password">
            <Button variant="link" className="text-sm text-blue-600 hover:text-blue-800">
              Forgot your password?
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
