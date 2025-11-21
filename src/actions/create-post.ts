"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/path";
import { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { z } from "zod";

const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

type CreatePostFormState = {
  errors: {
    _form?: string[];
    title?: string[];
    content?: string[];
  };
};

export const createPost = async (
  slug: string,
  _prevState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> => {
  const title = formData.get("title");
  const content = formData.get("content");

  const { success, data, error } = createPostSchema.safeParse({
    title,
    content,
  });

  if (!success) {
    return {
      errors: error.flatten().fieldErrors as CreatePostFormState["errors"],
    };
  }

  const session = await auth();
  if (!session?.user || !session.user.id) {
    return {
      errors: { _form: ["You must be logged in to create a post"] },
    };
  }

  const topic = await db.topic.findUnique({
    where: { slug },
  });
  if (!topic) {
    return {
      errors: { _form: ["Topic not found"] },
    };
  }

  let post: Post | null = null;
  try {
    post = await db.post.create({
      data: {
        title: data.title,
        content: data.content,
        userId: session.user.id,
        topicId: topic.id,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
    }
    return {
      errors: { _form: ["An unknown error occurred while creating the post"] },
    };
  }

  if (post) {
    revalidatePath(paths.topicsShow(slug));
    redirect(paths.postShow(slug, post.id));
  }

  return {
    errors: { _form: ["An unknown error occurred while creating the post"] },
  };
};
