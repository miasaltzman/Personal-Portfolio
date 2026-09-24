import { beyondIntro } from "@/content/personalFacts";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { BeyondExplorer } from "./BeyondExplorer";
import { LeoEasterEgg } from "./LeoEasterEgg";

export function BeyondAI() {
  return (
    <section id="beyond" aria-labelledby="beyond-title" className="section-pad border-t border-line">
      <div className="shell">
        <SectionHeader
          index="04"
          label="Beyond AI"
          id="beyond-title"
          title={beyondIntro.heading}
          subtitle={beyondIntro.line}
          aside={<LeoEasterEgg />}
        />
        <Reveal className="mt-20 sm:mt-28">
          <BeyondExplorer />
        </Reveal>
      </div>
    </section>
  );
}
