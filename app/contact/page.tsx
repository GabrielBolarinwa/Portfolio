import ContactForm from "@/components/contact/ContactForm";
import ContactIntro from "../../components/contact/ContactIntro";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Bolarinwa Gabriel",
};
export default function page() {
  return (
    <section className="mt-12 flex flex-wrap gap-6 flex-row">
      <ContactIntro />
      <ContactForm />
    </section>
  );
}
