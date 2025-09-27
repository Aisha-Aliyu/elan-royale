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
    name="ELÁN ROYALE — Fine Dining Restaurant"
    content="ELÁN ROYALE offers a refined Edomae tasting menu and private 
    koshitsu dining rooms for an unforgettable culinary experience."
  />
      </Head>

      <main>
        <Navbar />   {/* top navigation */}
        <Hero />
        <ReservationSection />
      </main>
    </>
  );
}