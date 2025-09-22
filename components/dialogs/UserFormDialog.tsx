"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import UserUpdateForm from "../forms/UserUpdateForm"
import {UserType} from "@/schemas/apiSchemas/userSchema"


export function UserFormDialog({ user }: { user: UserType }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User Profile</DialogTitle>
        </DialogHeader>

        <UserUpdateForm initialData={user}   onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}