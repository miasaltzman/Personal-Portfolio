import { Hero } from "@/components/hero/Hero";
import { SelectedWork } from "@/components/work/SelectedWork";
import { Experience } from "@/components/experience/Experience";
import { About } from "@/components/about/About";
import { BeyondAI } from "@/components/beyond/BeyondAI";
import { Contact } from "@/components/contact/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <Experience />
      <About />
      <BeyondAI />
      <Contact />
    </>
  );
}
