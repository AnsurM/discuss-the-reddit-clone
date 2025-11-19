"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/path";
import { revalidatePath } from "next/cache";

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

  try {
    await db.topic.create({
      data: {
        slug: data.name,
        description: data.description,
      },
    });
    revalidatePath(paths.home());
    return { errors: {} };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
    }
    return {
      errors: { _form: ["An unknown error occurred while creating the topic"] },
    };
  }
};
