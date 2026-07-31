"use client";
import { Send } from "lucide-react";
import React, { useState } from "react";
import { DashRing } from "../dash-ring";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { contactSchema } from "@/src/schema/contact";
import z from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ContactForm() {
  const portfolioForm = useForm({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
  });
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting },
  } = portfolioForm;
  const [gotcha, setGotcha] = useState<string>("");

  async function onSubmit(data: z.infer<typeof contactSchema>) {
    try {
      const formSubmit = await fetch("https://formspree.io/f/mwvezgwk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...data, _gotcha: gotcha }),
      });
      handleSubmitResponse(formSubmit);
    } catch (e) {
      toast.error("Form submit failed, please try again later");
      console.error(e);
    }
  }

  async function handleSubmitResponse(res: Response) {
    if (res.ok) {
      toast.success(
        "Form was successfully submitted, you'll receive a response in your email.",
      );
    } else {
      switch (res.status) {
        case 422:
          const data = await res.json();
          await data.errors.forEach(
            (error: { field: string; message: string; code: string }) => {
              toast.error(`Error: ${error.message}`);
            },
          );
          break;
        case 429:
          toast.error(`Quota exceeded please try again later`);
        default:
          toast.error("Generic server error, please try again later");
          break;
      }
    }
  }

  return (
    <div className="w-full md:w-[48%] bg-card-background border border-white/20 rounded-lg p-6 mt-6">
      <form
        className="flex flex-col justify-between h-full gap-4"
        onSubmit={handleSubmit(onSubmit, () => {
          toast.error("Please check your inputs");
        })}
      >
        <FieldGroup className="flex justify-between gap-4 flex-col md:flex-row flex-wrap">
          <Field
            data-invalid={errors?.name ? true : false}
            className="flex-1 focus-within:not-input:text-accent-neon"
          >
            <FieldLabel htmlFor="name-input">Name</FieldLabel>
            <Input
              id="name-input"
              type="text"
              placeholder="John Doe"
              autoComplete="name"
              className="text-sm"
              aria-invalid={errors?.name ? true : false}
              {...register("name")}
              onFocus={() => portfolioForm.trigger("name")}
            />
            {touchedFields.name && errors.name && (
              <FieldError>{errors.name.message}</FieldError>
            )}
          </Field>
          <Field
            data-invalid={errors?.email ? true : false}
            className="flex-1 focus-within:not-input:text-accent-neon"
          >
            <FieldLabel htmlFor="email-input">Email</FieldLabel>
            <Input
              id="email-input"
              type="email"
              placeholder="john@example.com"
              autoComplete="email"
              className="text-sm"
              aria-invalid={errors?.email ? true : false}
              {...register("email")}
              onFocus={() => portfolioForm.trigger("email")}
            />
            {touchedFields.email && errors.email && (
              <FieldError>{errors.email.message}</FieldError>
            )}
          </Field>
        </FieldGroup>
        <Field
          data-invalid={errors?.subject ? true : false}
          className="focus-within:not-input:text-accent-neon"
        >
          <FieldLabel htmlFor="subject-input">Subject</FieldLabel>
          <Input
            id="subject-input"
            type="text"
            className="text-sm"
            placeholder="Project Inquiry"
            aria-invalid={errors?.subject ? true : false}
            {...register("subject")}
            onFocus={() => portfolioForm.trigger("subject")}
          />
          {touchedFields.subject && errors.subject && (
            <FieldError>{errors.subject.message}</FieldError>
          )}
        </Field>
        <Field
          data-invalid={errors?.message ? true : false}
          className="focus-within:not-input:text-accent-neon"
        >
          <FieldLabel htmlFor="message-input">Message</FieldLabel>
          <Textarea
            id="message-input"
            className="min-h-[80px] text-sm"
            placeholder="Tell me about your project"
            aria-invalid={errors?.message ? true : false}
            {...register("message")}
            onFocus={() => portfolioForm.trigger("message")}
          />
          {touchedFields.message && errors.message && (
            <FieldError>{errors.message.message}</FieldError>
          )}
        </Field>
        <input
          type="text"
          name="_gotcha"
          value={gotcha}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setGotcha(e.target.value)
          }
          className="absolute opacity-0 top-0 left-0 h-0 w-0"
        />
        <Button
          type="submit"
          className={`rounded-full bg-(image:--primary-gradient) text-text font-headings disabled:bg-muted disabled:text-black border hover:-translate-y-0.5 hover:shadow-neon-hover font-bold ${Object.keys(errors).length > 0 && "border-destructive"} mt-4`}
          disabled={isSubmitting}
        >
          Send Message <Send />{" "}
          {isSubmitting && <DashRing className="size-5 mr-8" />}
        </Button>
      </form>
    </div>
  );
}
