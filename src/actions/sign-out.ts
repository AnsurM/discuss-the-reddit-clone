"use server";

import { signOut as signOutAction } from "@/auth";

export const signOut = async () => {
  await signOutAction();
};
