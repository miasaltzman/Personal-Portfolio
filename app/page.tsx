import { Hero } from "@/components/hero/Hero";
import { SelectedWork } from "@/components/work/SelectedWork";
import { About } from "@/components/about/About";
import { Experience } from "@/components/experience/Experience";
import { Lab } from "@/components/lab/Lab";
import { BeyondAI } from "@/components/beyond/BeyondAI";
import { Contact } from "@/components/contact/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <About />
      <Experience />
      <Lab />
      <BeyondAI />
      <Contact />
    </>
  );
}
