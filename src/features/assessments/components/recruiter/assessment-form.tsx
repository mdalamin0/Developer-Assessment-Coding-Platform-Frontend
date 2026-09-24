"use client";

import { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AssessmentFormProps, AssessmentFormValues } from "../../assessment.types";
import { assessmentSchema } from "../../assessment.shema";


const defaultValues: AssessmentFormValues = {
  title: "",
  description: "",
  duration: 60,
  totalMarks: 100,
  passingMarks: 60,
  startAt: "",
  endAt: "",
};

const combineDateAndTime = (date: Date | undefined, time: string): string => {
  if (!date || !time) return "";

  const [hours, minutes] = time.split(":").map(Number);

  const result = new Date(date);
  result.setHours(hours, minutes, 0, 0);

  return result.toISOString();
};

const AssessmentForm = ({ assessment, onCancel }: AssessmentFormProps) => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [startTime, setStartTime] = useState("");

  const [endDate, setEndDate] = useState<Date | undefined>();
  const [endTime, setEndTime] = useState("");

  const form = useForm({
    defaultValues: assessment ?? defaultValues,

    validators: {
      onSubmit: assessmentSchema,
    },

    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  useEffect(() => {
    const values = assessment ?? defaultValues;

    form.reset(values);

    if (values.startAt) {
      const start = new Date(values.startAt);

      setStartDate(start);
      setStartTime(format(start, "HH:mm"));
    } else {
      setStartDate(undefined);
      setStartTime("");
    }

    if (values.endAt) {
      const end = new Date(values.endAt);

      setEndDate(end);
      setEndTime(format(end, "HH:mm"));
    } else {
      setEndDate(undefined);
      setEndTime("");
    }
  }, [assessment, form]);

  return (
    <form
      id="assessment-form"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();

        form.handleSubmit();
      }}
    >
      <FieldGroup className="space-y-5">
        {/* Title */}
        <form.Field name="title">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Title</FieldLabel>

                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="Frontend Developer Assessment - Round 1"
                  aria-invalid={isInvalid}
                />

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

                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value ?? ""}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="Assess core frontend development skills including JavaScript, React and CSS."
                  rows={4}
                  aria-invalid={isInvalid}
                />

                <div className="min-h-5">
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </div>
              </Field>
            );
          }}
        </form.Field>

        {/* Duration / Total Marks / Passing Marks */}
        <div className="grid gap-5 sm:grid-cols-3">
          <form.Field name="duration">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Duration (minutes)
                  </FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="number"
                    min={1}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) =>
                      field.handleChange(Number(event.target.value))
                    }
                    aria-invalid={isInvalid}
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

          <form.Field name="totalMarks">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Total Marks</FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="number"
                    min={1}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) =>
                      field.handleChange(Number(event.target.value))
                    }
                    aria-invalid={isInvalid}
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

          <form.Field name="passingMarks">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Passing Marks</FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="number"
                    min={1}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) =>
                      field.handleChange(Number(event.target.value))
                    }
                    aria-invalid={isInvalid}
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

        {/* Start At */}
        <div className="grid gap-5 sm:grid-cols-2">
          <Field>
            <FieldLabel>Start Date</FieldLabel>

            <Popover>
              <PopoverTrigger
                render={
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-start font-normal"
                  >
                    {startDate ? format(startDate, "PPP") : "Select start date"}
                  </Button>
                }
              />

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={(date) => {
                    setStartDate(date);

                    const value = combineDateAndTime(date, startTime);

                    form.setFieldValue("startAt", value);
                  }}
                />
              </PopoverContent>
            </Popover>
          </Field>

          <Field>
            <FieldLabel htmlFor="start-time">Start Time</FieldLabel>

            <Input
              id="start-time"
              type="time"
              value={startTime}
              onChange={(event) => {
                const value = event.target.value;

                setStartTime(value);

                const dateTime = combineDateAndTime(startDate, value);

                form.setFieldValue("startAt", dateTime);
              }}
            />
          </Field>
        </div>

        {/* End At */}
        <div className="grid gap-5 sm:grid-cols-2">
          <Field>
            <FieldLabel>End Date</FieldLabel>

            <Popover>
              <PopoverTrigger
                render={
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-start font-normal"
                  >
                    {endDate ? format(endDate, "PPP") : "Select end date"}
                  </Button>
                }
              />

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={(date) => {
                    setEndDate(date);

                    const value = combineDateAndTime(date, endTime);

                    form.setFieldValue("endAt", value);
                  }}
                />
              </PopoverContent>
            </Popover>
          </Field>

          <Field>
            <FieldLabel htmlFor="end-time">End Time</FieldLabel>

            <Input
              id="end-time"
              type="time"
              value={endTime}
              onChange={(event) => {
                const value = event.target.value;

                setEndTime(value);

                const dateTime = combineDateAndTime(endDate, value);

                form.setFieldValue("endAt", dateTime);
              }}
            />
          </Field>
        </div>

        {/* Date/Time validation errors */}
        <form.Field name="startAt">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <div className="-mt-3 min-h-5">
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </div>
            );
          }}
        </form.Field>

        <form.Field name="endAt">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <div className="-mt-3 min-h-5">
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </div>
            );
          }}
        </form.Field>

        {/* Actions */}
        <div className="flex justify-end gap-3 border-t pt-5">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}

          <Button type="submit">
            {assessment ? "Update Assessment" : "Create Assessment"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
};

export default AssessmentForm;
