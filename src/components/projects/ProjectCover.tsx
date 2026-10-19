import Image from "next/image";
import type { Project } from "@/content/projects";
import { LogoMark } from "@/components/site/icons";

type ProjectCoverProps = {
  project: Project;
  alt: string;
  sizes: string;
  eager?: boolean;
  className?: string;
};

export function ProjectCover({ project, alt, sizes, eager, className = "" }: ProjectCoverProps) {
  return (
    <div className={`relative aspect-[16/10] overflow-hidden rounded-[14px] bg-surface-2 ${className}`}>
      {project.image ? (
        <Image
          src={project.image.src}
          alt={alt}
          fill
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
          className="object-cover object-top transition-transform duration-700 ease-stage group-hover:scale-[1.03]"
        />
      ) : (
        <div className="stage-light absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-stage group-hover:scale-[1.03]">
          <span
            aria-hidden="true"
            className="outline-text-gold text-[clamp(96px,15vw,220px)] leading-none font-extrabold tracking-[-0.04em]"
          >
            {project.watermark}
          </span>
          <span className="absolute bottom-5 left-6 flex items-center gap-2.5 text-sm font-semibold text-ink">
            <LogoMark className="size-4 text-gold" />
            {project.name}
          </span>
        </div>
      )}
    </div>
  );
}
