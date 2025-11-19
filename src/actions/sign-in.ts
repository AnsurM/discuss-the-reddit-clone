"use server";

import { signIn as signInAction } from "@/auth";

export const signIn = async () => {
  await signInAction("github");
};
