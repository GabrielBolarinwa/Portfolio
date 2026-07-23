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

export default function ContactForm() {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<
    | {
        name?:
          | {
              errors: string[];
            }
          | undefined;
        email?:
          | {
              errors: string[];
            }
          | undefined;
        subject?:
          | {
              errors: string[];
            }
          | undefined;
        message?:
          | {
              errors: string[];
            }
          | undefined;
      }
    | undefined
  >({});
  const [gotcha, setGotcha] = useState<string>("");
  async function handleChange(e: React.InputEvent) {
    if (!e.target) return;
    const input = e.target as HTMLInputElement | HTMLTextAreaElement;
    setFields((prev) => ({
      ...prev,
      [input.name]: input.value,
    }));
    const result = await contactSchema.safeParseAsync(fields);
    if (!result.success) {
      setStatus("error");
      setErrors(z.treeifyError(result.error).properties || {});
      return;
    } else {
      setStatus("idle");
      setErrors({});
    }
  }

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setStatus("submitting");
    const result = await contactSchema.safeParseAsync(fields);
    if (!result.success) {
      setStatus("error");
      setErrors(z.treeifyError(result.error).properties || {});
      toast.error("Check your inputs and try again");
      return;
    }
    try {
      const formSubmit = await fetch("https://formspree.io/f/mwvezgwk", {
        method: "POST",
        headers: { "Content-Type": "application/jsson" },
        body: JSON.stringify({ ...fields, _gotcha: gotcha }),
      });
      if (formSubmit.ok) {
        setStatus("success");
        toast.success("Your message was successfully submitted");
      }
    } catch (e) {
      setStatus("error");
      toast.error("Form submit failed, please try again later");
      console.error(e);
    }
  }

  return (
    <div className="w-full md:w-[48%] bg-card-background border border-white/20 rounded-lg p-6">
      <form
        className="flex flex-col justify-between h-full gap-4"
        onSubmit={handleSubmit}
      >
        <FieldGroup className="flex justify-between gap-4 flex-col md:flex-row flex-wrap">
          <Field data-invalid={errors?.name ? true : false} className="flex-1">
            <FieldLabel htmlFor="name-input">Name</FieldLabel>
            <Input
              name="name"
              id="name-input"
              type="text"
              placeholder="John Doe"
              autoComplete="name"
              className="text-sm"
              aria-invalid={errors?.name ? true : false}
              onInput={handleChange}
            />
            {errors?.name && <FieldError>{errors?.name.errors[0]}</FieldError>}
          </Field>
          <Field data-invalid={errors?.email ? true : false} className="flex-1">
            <FieldLabel htmlFor="email-input">Email</FieldLabel>
            <Input
              name="email"
              id="email-input"
              type="email"
              placeholder="john@example.com"
              autoComplete="email"
              className="text-sm"
              aria-invalid={errors?.email ? true : false}
              onInput={handleChange}
            />
            {errors?.email && (
              <FieldError>{errors?.email.errors[0]}</FieldError>
            )}
          </Field>
        </FieldGroup>
        <Field data-invalid={errors?.subject ? true : false}>
          <FieldLabel htmlFor="subject-input">Subject</FieldLabel>
          <Input
            name="subject"
            id="subject-input"
            type="text"
            className="text-sm"
            placeholder="Project Inquiry"
            aria-invalid={errors?.subject ? true : false}
            onInput={handleChange}
          />
          {errors?.subject && (
            <FieldError>{errors?.subject.errors[0]}</FieldError>
          )}
        </Field>
        <Field data-invalid={errors?.message ? true : false}>
          <FieldLabel htmlFor="message-input">Message</FieldLabel>
          <Textarea
            name="message"
            id="message-input"
            className="min-h-[80px] text-sm"
            placeholder="Tell me about your project"
            aria-invalid={errors?.message ? true : false}
            onInput={handleChange}
          />
          {errors?.message && (
            <FieldError>{errors?.message.errors[0]}</FieldError>
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
          className={`rounded-full bg-(image:--primary-gradient) text-text font-headings disabled:bg-muted disabled:text-black border hover:-translate-y-0.5 hover:shadow-neon-hover font-bold ${status === "error" && "border-destructive"} mt-4`}
          disabled={status === "submitting"}
        >
          Send Message <Send />{" "}
          {status === "submitting" && <DashRing className="size-5 mr-8" />}
        </Button>
      </form>
    </div>
  );
}
