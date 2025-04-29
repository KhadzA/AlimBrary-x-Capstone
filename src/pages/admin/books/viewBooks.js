"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { checkAuthServer } from "@/helpers/checkAuth"
import { fetchBooks, deleteBook, updateBook } from "@/helpers/adminBookHandler"
import ViewBooksUI from "@/ui/admin/books/ViewBooksUI"

export default function Books() {
  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(false) // Start with false for SSR
  const [isMounted, setIsMounted] = useState(false) // Track if component is mounted
  const [editingBookId, setEditingBookId] = useState(null)
  const [editForm, setEditForm] = useState({ title: "", author: "", genre: "" })
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
          const data = await fetchBooks()
          setBooks(data)
        } catch (error) {
          console.error("Error fetching books:", error)
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
      await deleteBook(id)
      const data = await fetchBooks()
      setBooks(data)
    } catch (error) {
      console.error("Error deleting book:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (book) => {
    setEditingBookId(book.id)
    setEditForm({
      title: book.title,
      author: book.author,
      genre: book.genre,
    })
  }

  const handleSave = async (id) => {
    try {
      setIsLoading(true)
      await updateBook(id, editForm)
      setEditingBookId(null)
      const data = await fetchBooks()
      setBooks(data)
    } catch (error) {
      console.error("Error updating book:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const goHome = () => {
    router.push("/admin")
  }

  return (
    <ViewBooksUI
      books={books}
      isLoading={isLoading}
      isMounted={isMounted} 
      editingBookId={editingBookId}
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
