import Image from "next/image";
import { profile } from "@/content/profile";

/**
 * Mia's portrait. The image path, crop focus and alt text all come from
 * content/profile.ts — change them there, never here.
 */
export function Headshot({
  className = "",
  sizes = "(min-width: 1024px) 40vw, (min-width: 640px) 28rem, 100vw",
  priority = false,
}: {
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden bg-paper-2 ${className}`}>
      <Image
        src={profile.headshot}
        alt={profile.headshotAlt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={{ objectPosition: profile.headshotPosition }}
      />
    </div>
  );
}
