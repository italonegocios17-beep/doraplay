import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, VideoOff } from "lucide-react";
import { getNovela } from "@/lib/catalog";
import { seo } from "@/lib/seo";
import { btn } from "@/components/dp/ui";

export const Route = createFileRoute("/assistir/$slug")({
  loader: ({ params }) => { const novela = getNovela(params.slug); if (!novela) throw notFound(); return { novela }; },
  head: ({ loaderData }) => seo(loaderData ? `Assistir ${loaderData.novela.title}` : "Player", "Player vertical da DoraPlay (prévia).", true),
  component: Player,
});

function Player() {
  const { novela } = Route.useLoaderData();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 pt-safe pb-safe">
      <div className="mb-3 flex w-full max-w-sm items-center gap-3">
        <Link to="/novela/$slug" params={{ slug: novela.slug }} className={btn({ variant: "ghost", size: "sm", className: "px-2" })} aria-label="Voltar"><ArrowLeft className="size-5" /></Link>
        <p className="truncate text-sm font-medium">{novela.title}</p>
      </div>
      <div className="relative aspect-[9/16] w-full max-w-sm overflow-hidden rounded-3xl border border-border bg-card">
        {novela.videoUrl ? (
          <video src={novela.videoUrl} controls playsInline className="size-full object-cover" />
        ) : (
          <div className="bg-hero flex size-full flex-col items-center justify-center p-8 text-center">
            <VideoOff className="mb-4 size-10 text-primary" aria-hidden />
            <h1 className="text-2xl">Vídeo ainda não cadastrado</h1>
            <p className="mt-2 text-sm text-muted-foreground">Este player vertical 9:16 está pronto para receber o vídeo completo da novela no futuro.</p>
          </div>
        )}
      </div>
    </div>
  );
}
