/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
"use client";

import { useForm } from "@tanstack/react-form";
import { useEffect } from "react";
import { CheckCircle2, FileText, HelpCircle } from "lucide-react";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { createProblemSchema } from "../problems.shema";
import { ProblemFormProps, ProblemFormValues } from "../problems.types";
import { useCreateProblem, useUpdateProblem } from "../hooks/problem.hooks";
import { toast } from "sonner";
import { FetchError } from "ofetch";
import { useQueryClient } from "@tanstack/react-query";

const defaultValues: ProblemFormValues = {
  title: "",
  description: "",
  type: "MCQ",
  difficulty: "EASY",
  marks: 5,
  options: ["", "", "", ""],
  correctAnswer: "",
};

const ProblemForm = ({ problem, onCancel }: ProblemFormProps) => {
  const queryClient = useQueryClient();
  const { mutate: createProblem, isPending: createPending } =
    useCreateProblem();

  const { mutate: updateProblem, isPending: updatePending } =
    useUpdateProblem();

  const isPending = createPending || updatePending;
  console.log(problem);

  const form = useForm({
    defaultValues: problem ?? defaultValues,

    validators: {
      onSubmit: createProblemSchema,
    },

    onSubmit: ({ value }) => {
      if (problem) {
        updateProblem(
          {
            id: problem.id,
            data: value,
          },
          {
            onSuccess: (res) => {
              console.log(res);
              toast.success("Problem updated successfully");
              queryClient.removeQueries({ queryKey: ["problems"] });
              onCancel?.();
            },
            onError: (error: FetchError) => {
              const errorMessage =
                error?.data?.message ||
                error?.message ||
                "Problem update failure";
              toast.error(errorMessage, {
                description: "Somthing wen wrong! Plese try again.",
              });
              onCancel?.();
            },
          },
        );

        return;
      }

      createProblem(value, {
        onSuccess: (res) => {
          console.log(res);
          toast.success("Problem created successfully");
          queryClient.removeQueries({ queryKey: ["problems"] });
          onCancel?.();
        },
        onError: (error: FetchError) => {
          console.log(error);
          const errorMessage =
            error?.data?.message || error?.message || "Problem created failure";
          toast.error(errorMessage, {
            description: "Somthing wen wrong! Plese try again.",
          });
          onCancel?.();
        },
      });
    },
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup className="gap-5">
        {/* Title */}
        <form.Field name="title">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Title</FieldLabel>

                <div className="relative">
                  <HelpCircle className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id={field.name}
                    name={field.name}
                    placeholder="Enter question title"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                    className="h-11 pl-10.5"
                  />
                </div>

                <div className="min-h-5">
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </div>
              </Field>
            );
          }}
        </form.Field>

        {/* Description */}
        <form.Field name="description">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Description</FieldLabel>

                <div className="relative">
                  <FileText className="pointer-events-none absolute left-3.5 top-3.5 size-4 text-muted-foreground" />

                  <Textarea
                    id={field.name}
                    name={field.name}
                    placeholder="Enter question description"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                    className="min-h-24 resize-none pl-10.5"
                  />
                </div>

                <div className="min-h-5">
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </div>
              </Field>
            );
          }}
        </form.Field>

        {/* Type + Difficulty + Marks */}
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Type */}
          <form.Field name="type">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Type</FieldLabel>

                <select
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(event) =>
                    field.handleChange(event.target.value as "MCQ")
                  }
                  onBlur={field.handleBlur}
                  className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="MCQ">MCQ</option>
                </select>
              </Field>
            )}
          </form.Field>

          {/* Difficulty */}
          <form.Field name="difficulty">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Difficulty</FieldLabel>

                  <select
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(event) =>
                      field.handleChange(
                        event.target.value as ProblemFormValues["difficulty"],
                      )
                    }
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                    className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="EASY">Easy</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HARD">Hard</option>
                  </select>

                  <div className="min-h-5">
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </div>
                </Field>
              );
            }}
          </form.Field>

          {/* Marks */}
          <form.Field name="marks">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Marks</FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="number"
                    min={1}
                    placeholder="5"
                    value={field.state.value}
                    onChange={(event) =>
                      field.handleChange(Number(event.target.value))
                    }
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                    className="h-11"
                  />

                  <div className="min-h-5">
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </div>
                </Field>
              );
            }}
          </form.Field>
        </div>

        {/* Options */}
        <Field>
          <FieldLabel>Options</FieldLabel>

          <div className="grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <form.Field key={`option-${index}`} name={`options[${index}]`}>
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel
                        htmlFor={field.name}
                        className="text-xs text-muted-foreground"
                      >
                        Option {index + 1}
                      </FieldLabel>

                      <Input
                        id={field.name}
                        name={field.name}
                        placeholder={`Enter option ${index + 1}`}
                        value={field.state.value}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        onBlur={field.handleBlur}
                        aria-invalid={isInvalid}
                        className="h-11"
                      />

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            ))}
          </div>
        </Field>

        {/* Correct Answer */}
        <form.Field name="correctAnswer">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <form.Subscribe selector={(state) => state.values.options}>
                {(options) => (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Correct Answer</FieldLabel>

                    <div className="relative">
                      <CheckCircle2 className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                      <select
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        onBlur={field.handleBlur}
                        aria-invalid={isInvalid}
                        className="h-11 w-full appearance-none rounded-md border border-input bg-background pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="">Select correct answer</option>

                        {options.map((option, index) => (
                          <option
                            key={`correct-${index}`}
                            value={option}
                            disabled={!option}
                          >
                            {option || `Option ${index + 1}`}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="min-h-5">
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </div>
                  </Field>
                )}
              </form.Subscribe>
            );
          }}
        </form.Field>

        {/* Actions */}
        <Field className="pt-2">
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                size={"lg"}
                disabled={isPending}
              >
                Cancel
              </Button>
            )}

            <Button type="submit" disabled={isPending} size={"lg"}>
              {isPending ? (
                <>
                  <Spinner />
                  {problem ? "Updating..." : "Creating..."}
                </>
              ) : problem ? (
                "Update Problem"
              ) : (
                "Create Problem"
              )}
            </Button>
          </div>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default ProblemForm;
