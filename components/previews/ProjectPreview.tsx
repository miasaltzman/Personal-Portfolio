import type { Project } from "@/content/projects";
import { MentrPreview } from "./MentrPreview";
import { VitaPreview } from "./VitaPreview";

/** Maps a project's `preview` key to its interactive preview. */
export function ProjectPreview({ preview }: { preview: Project["preview"] }) {
  switch (preview) {
    case "mentr":
      return <MentrPreview />;
    case "vita":
      return <VitaPreview />;
    default:
      return null;
  }
}
