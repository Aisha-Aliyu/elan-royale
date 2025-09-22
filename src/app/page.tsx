import Head from "next/head";
import Hero from "../app/components/Hero";
import ReservationForm from "../app/components/ReservationForm";

export default function Home() {
  return (
    <>
      <Head>
        <title>ELÁN ROYALE</title>
        <meta name="description" content="ELÁN ROYALE — refined Edomae tasting menus & private koshitsu rooms." />
      </Head>

      <main>
        <Hero />
        <section className="container mx-auto px-6 py-12">
          <ReservationForm />
        </section>
      </main>
    </>
  );
}