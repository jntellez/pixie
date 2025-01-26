import { HomeForm } from "@/components/home/home-form";

export default async function Home() {

  return (
    <main className="flex flex-col items-center h-[calc(100vh-4.4rem)] gap-8 pt-40 font-[family-name:var(--font-geist-sans)]">
      <h2 className="scroll-m-20 text-4xl font-extrabold lg:text-5xl">URL Shortener</h2>
      <HomeForm />
    </main>
  );
}
