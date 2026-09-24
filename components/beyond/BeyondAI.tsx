import { beyondIntro, personalFacts } from "@/content/personalFacts";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import {
  BuildingMoment,
  CitiesMoment,
  DepopMoment,
  LeoEasterEgg,
  MatchaMoment,
  SnowboardMoment,
} from "./moments";

/**
 * Small, discoverable moments. Each label is readable without interacting;
 * tapping adds a few seconds of motion and a short line.
 */
export function BeyondAI() {
  const f = personalFacts;
  return (
    <section id="beyond" aria-labelledby="beyond-title" className="section-pad border-t border-line">
      <div className="shell">
        <SectionHeader
          index="05"
          label="Beyond AI"
          id="beyond-title"
          title={beyondIntro.heading}
          subtitle={beyondIntro.subtitle}
          aside={<LeoEasterEgg />}
        />

        <Reveal className="mt-14 grid gap-4 sm:mt-20 md:grid-cols-6 lg:grid-cols-12">
          {f.snowboarding.show && <SnowboardMoment className="md:col-span-6 lg:col-span-7" />}
          {f.cities.show && <CitiesMoment className="md:col-span-6 lg:col-span-5" />}
          {f.matcha.show && <MatchaMoment className="md:col-span-3 lg:col-span-4" />}
          {f.depop.show && <DepopMoment className="md:col-span-3 lg:col-span-4" />}
          {f.building.show && <BuildingMoment className="md:col-span-6 lg:col-span-4" />}
        </Reveal>
      </div>
    </section>
  );
}
