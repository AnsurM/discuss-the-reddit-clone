"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";

import { createPost as createPostAction } from "@/actions/create-post";

import { useActionState, startTransition } from "react";

interface PostCreateFormProps {
  slug: string;
}

export default function PostCreateForm({ slug }: PostCreateFormProps) {
  const [formState, formAction, isPending] = useActionState(
    createPostAction.bind(null, slug),
    {
      errors: {},
    }
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      formAction(formData);
    });
  }

  const getPrettyErrors = (errors: string[] | undefined, field: string) => {
    if (!errors || !Array.isArray(errors) || errors.length === 0) return null;
    return (
      <ul className="list-disc pl-5">
        {errors.map((error) => {
          return <li key={error}>{error.replace("String", field)}</li>;
        })}
      </ul>
    );
  };

  const titleErrors = getPrettyErrors(formState.errors.title, "Title");
  const contentErrors = getPrettyErrors(formState.errors.content, "Content");
  const formErrors = getPrettyErrors(formState.errors._form, "Form");

  return (
    <div>
      <Popover placement="left-start">
        <PopoverTrigger>
          <Button color="success" variant="flat">
            New Post
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-4 p-4 w-80">
              <h3 className="text-lg ">Create New Post</h3>
              <Input
                label="Post Title"
                labelPlacement="outside"
                placeholder="Enter post title"
                name="title"
                className="w-full"
                isInvalid={!!titleErrors}
                errorMessage={titleErrors}
                disabled={isPending}
              />
              <Textarea
                label="Post Content"
                labelPlacement="outside"
                placeholder="Enter post content"
                name="content"
                className="w-full"
                isInvalid={!!contentErrors}
                errorMessage={contentErrors}
                disabled={isPending}
              />
              {formErrors && <div className="text-red-500">{formErrors}</div>}
              <Button
                type="submit"
                color="success"
                variant="flat"
                className="w-full"
                isLoading={isPending}
                disabled={isPending}
              >
                Create Post
              </Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
}
