"use server";

import { signIn as signInAction, signOut as signOutAction } from "@/auth";

export const signIn = async () => {
  await signInAction("github");
};

export const signOut = async () => {
  await signOutAction();
};
