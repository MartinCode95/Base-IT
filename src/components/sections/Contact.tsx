import SEOHead from "../ui/SEOHead";
import { seoData } from "../../utils/seoData";
import ContactForm from "../ui/contact-form";

const Contact = () => {
  return (
    <>
      <SEOHead {...seoData.contact} />
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>
    </>
  );
};

export default Contact;