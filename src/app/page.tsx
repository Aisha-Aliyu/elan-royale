import Head from "next/head";
import Navbar from "../app/components/Navbar";
import Hero from "../app/components/Hero";
import ReservationSection from "../app/components/ReservationSection";

export default function Home() {
  return (
    <>
      <Head>
        <title>ELÁN ROYALE</title>
        <meta
          name="description"
          content="ELÁN ROYALE — refined Edomae tasting menus & private koshitsu rooms."
        />
      </Head>

      <main>
        <Navbar />   {/* ✅ top navigation */}
        <Hero />
        <ReservationSection />
      </main>
    </>
  );
}