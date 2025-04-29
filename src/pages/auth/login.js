"use client"

import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import Cookies from "js-cookie"
import { checkRoleAndRedirect } from "@/helpers/checkRole"
import LoginForm from "@/ui/auth/LoginForm"
import "@/ui/css/General.css"

axios.defaults.withCredentials = true
axios.defaults.baseURL = "http://localhost:8000"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await axios.get("/sanctum/csrf-cookie")
      const csrfToken = Cookies.get("XSRF-TOKEN")

      await axios.post(
        "/login",
        { email, password },
        {
          headers: {
            "X-XSRF-TOKEN": decodeURIComponent(csrfToken),
          },
        },
      )

      checkRoleAndRedirect(router)
    } catch (err) {
      console.error(err)
      // You could add error handling here to show an error message
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="page-container">
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        isLoading={isLoading}
      />
    </div>
  )
}
