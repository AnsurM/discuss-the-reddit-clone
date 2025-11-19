"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/path";
import { Topic } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { z } from "zod";

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: "Name must be in lowercase and hyphen separated without spaces",
    }),
  description: z.string().min(10).max(100),
});

type CreateTopicFormState = {
  errors: {
    _form?: string[];
    name?: string[];
    description?: string[];
  };
};

export const createTopic = async (
  _prevState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> => {
  const name = formData.get("name");
  const description = formData.get("description");

  const { success, data, error } = createTopicSchema.safeParse({
    name,
    description,
  });

  if (!success) {
    return {
      errors: error.flatten().fieldErrors as CreateTopicFormState["errors"],
    };
  }

  const session = await auth();
  if (!session?.user) {
    return {
      errors: { _form: ["You must be logged in to create a topic"] },
    };
  }

  let topic: Topic | null = null;
  try {
    topic = await db.topic.create({
      data: {
        slug: data.name,
        description: data.description,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
    }
    return {
      errors: { _form: ["An unknown error occurred while creating the topic"] },
    };
  }

  revalidatePath(paths.home());
  redirect(paths.topicsShow(topic.slug));
};
