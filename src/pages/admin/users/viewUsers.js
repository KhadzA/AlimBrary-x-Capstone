"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { checkAuthServer } from "@/helpers/checkAuth"
import { fetchUsers, deleteUser, updateUser } from "@/helpers/adminUserHandler"
import ViewUsersUI from "@/ui/admin/users/ViewUsersUI"

export default function ViewUsers() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const [editingUserId, setEditingUserId] = useState(null)
  const [editForm, setEditForm] = useState({ name: "", email: "", password: "" })
  const router = useRouter()

  // Set mounted state
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    // Only fetch data if component is mounted (client-side)
    if (isMounted) {
      const init = async () => {
        try {
          setIsLoading(true)
          const data = await fetchUsers()
          setUsers(data)
        } catch (error) {
          console.error("Error fetching users:", error)
        } finally {
          setIsLoading(false)
        }
      }
      init()
    }
  }, [isMounted])

  const handleDelete = async (id) => {
    try {
      setIsLoading(true)
      await deleteUser(id)
      const data = await fetchUsers()
      setUsers(data)
    } catch (error) {
      console.error("Error deleting user:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (user) => {
    setEditingUserId(user.id)
    setEditForm({
      name: user.name,
      email: user.email,
      password: "", // Password intentionally blank
    })
  }

  const handleSave = async (id) => {
    try {
      setIsLoading(true)
      await updateUser(id, editForm)
      setEditingUserId(null)
      const data = await fetchUsers()
      setUsers(data)
    } catch (error) {
      console.error("Error updating user:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const goHome = () => {
    router.push("/admin")
  }

  return (
    <ViewUsersUI
      users={users}
      isLoading={isLoading}
      isMounted={isMounted}
      editingUserId={editingUserId}
      editForm={editForm}
      setEditForm={setEditForm}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      handleSave={handleSave}
      goHome={goHome}
    />
  )
}

export async function getServerSideProps(context) {
  const auth = await checkAuthServer(context)

  if (!auth.authenticated) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    }
  }

  return { props: {} }
}
