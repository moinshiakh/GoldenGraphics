import { Routes, Route } from 'react-router-dom'
import Navbar from './navbar'
import Hero from './home'
import About from './about'
import Services from './services'
import News from './news'
import Cta from './cta'
import Footer from './footer'
import Statusbar from './statusbar'
import BloodDonationPortal from './BloodDonationPortal'
import DonatePoor from './DonatePoor'

function MainSite() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Statusbar />
      <About />
      <News />
      <Cta />
      <Footer />
    </>
  )
}

function DonatePoorPage() {
  return (
    <>
      <Navbar />
      <DonatePoor />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainSite />} />
      <Route path="/blood-donation" element={<BloodDonationPortal />} />
      <Route path="/donate-poor" element={<DonatePoorPage />} />
    </Routes>
  )
}
