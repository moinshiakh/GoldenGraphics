import Navbar from './navbar'
import Hero from './home'
import About from './about'
import Services from './services'
import News from './news'
import Cta from './cta'
import Footer from './footer'
import Statusbar from './statusbar'

export default function App() {
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
