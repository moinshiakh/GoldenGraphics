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
import LabourService from './LabourService'
import BuySell from './BuySell'
import JobPortal from './jobportal'
import ComplaintPortal from './Complaintportal'
import PoliceMitr from './Policemitr'
import TrustPortal from './Trustportal'
import MarriageProfiles from './MarriageProfiles'






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



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainSite />} />
      <Route path="/blood-donation" element={<BloodDonationPortal />} />
      <Route path="/donate-poor" element={<DonatePoor />} />
      <Route path="/labour-service" element={<LabourService />} />
      <Route path="/buy-sell" element={<BuySell />} />
      <Route path="/job-portal" element={<JobPortal />} />
      <Route path="/complaint-portal" element={<ComplaintPortal />} />
      <Route path="/police-mitr" element={<PoliceMitr />} />
      <Route path="/trust-portal" element={<TrustPortal />} />
      <Route path="/marriage-profiles" element={<MarriageProfiles />} />
    </Routes>
  )
}
