import ContactForm from "@/components/contact/ContactForm";
import ContactIntro from "../../components/contact/ContactIntro";

export default function page() {
  return (
    <section className="mt-12 flex flex-wrap gap-6 flex-row">
      <ContactIntro />
      <ContactForm />
    </section>
  );
}
