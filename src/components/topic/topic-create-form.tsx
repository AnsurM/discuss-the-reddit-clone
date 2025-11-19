"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";

import { createTopic as createTopicAction } from "@/actions/create-topic";

import { useActionState, startTransition } from "react";

export default function TopicCreateForm() {
  const [formState, formAction, isPending] = useActionState(createTopicAction, {
    errors: {},
  });

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

  const nameErrors = getPrettyErrors(formState.errors.name, "Name");
  const descriptionErrors = getPrettyErrors(
    formState.errors.description,
    "Description"
  );
  const formErrors = getPrettyErrors(formState.errors._form, "Form");

  return (
    <div>
      <Popover placement="left-start">
        <PopoverTrigger>
          <Button color="success" variant="flat">
            New Topic
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-4 p-4 w-80">
              <h3 className="text-lg ">Create New Topic</h3>
              <Input
                label="Topic Name"
                labelPlacement="outside"
                placeholder="Enter topic name"
                name="name"
                className="w-full"
                isInvalid={!!nameErrors}
                errorMessage={nameErrors}
                disabled={isPending}
              />
              <Textarea
                label="Topic Description"
                labelPlacement="outside"
                placeholder="Enter topic description"
                name="description"
                className="w-full"
                isInvalid={!!descriptionErrors}
                errorMessage={descriptionErrors}
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
                Create Topic
              </Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
}
