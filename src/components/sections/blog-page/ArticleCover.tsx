import { cn } from "@/lib/utils";
import { imageSrc, articleImage } from "@/lib/images";
import type { Article } from "@/data/articles";

/** Article cover photo, resolved from the article's category. */
export function ArticleCover({
  article,
  ratio = "16/9",
  className,
}: {
  article: Article;
  ratio?: string;
  className?: string;
}) {
  const src = imageSrc(articleImage(article.category));
  return (
    <div
      className={cn("relative isolate w-full overflow-hidden rounded-image bg-ink-900", className)}
      style={{ aspectRatio: ratio }}
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/30 via-transparent to-transparent" />
    </div>
  );
}
