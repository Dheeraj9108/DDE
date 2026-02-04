import { Separator } from "../ui/separator";
import Faq from "./faq";
import Footer from "./footer";
import HeroSection from "./hero-section";
import Navbar from "./navbar";

export default function Home(){
    return (
    <div className='relative'>
      <Navbar/>

      <main className='flex flex-col'>
        <HeroSection />
        <Faq/>
      </main>
      <Separator />
      <Footer/>
    </div>
  )
}