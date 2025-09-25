"use client";

import React from "react";
import { useFetchUser } from "@/hooks/user/useFetchUser";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { UserFormDialog } from "@/components/dialogs/UserFormDialog";
import LogoutConfirmButton from "@/components/auth/logout";

export default function ProfilePage() {
  const { data: user, isLoading } = useFetchUser();

  if (isLoading)
    return (
      <div className="min-h-[220px] flex items-center justify-center">
        <p className="text-sm opacity-80">Loading profile...</p>
      </div>
    );

  if (!user)
    return (
      <div className="min-h-[220px] flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Failed to load profile ❌</p>
      </div>
    );

  return (
    <div className="max-w-lg mx-auto p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold leading-tight">Profile</h1>
        <div className="flex items-center gap-2">
          <UserFormDialog user={user} />
          <LogoutConfirmButton />
        </div>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          {/* Header: avatar + basic info */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Avatar className="h-20 w-20 flex-shrink-0">
              <AvatarImage src={user.image ?? ""} alt={user.name ?? "User"} />
              <AvatarFallback>{user.name?.[0] ?? "U"}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg sm:text-xl font-semibold truncate">{user.name}</h2>
              <p className="text-sm text-muted-foreground truncate">{user.email}</p>
            </div>
          </div>

          {/* Details section: always single line label + value */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Name</span>
              <span className="truncate">{user.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Email account</span>
              <span className="truncate">{user.email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Mobile number</span>
              <span className="truncate">{user.phoneNumber || "Add number"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Role</span>
              <span className="truncate">{user.role ?? "—"}</span>
            </div>
          </div>

          {/* Edit dialog (trigger left as-is) */}
          
            <UserFormDialog user={user} />
          
        </CardContent>
      </Card>
    </div>
  );
}