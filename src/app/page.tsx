import { HomeForm } from "@/components/home/home-form";

export default async function Home() {

  return (
    <>
      <h2 className="scroll-m-20 text-4xl mt-40 font-extrabold lg:text-5xl">URL Shortener</h2>
      <HomeForm />
    </>
  );
}
