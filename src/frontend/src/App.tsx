import Hero from './components/Hero';
import UnveilingSequence from './components/UnveilingSequence';
import FocusSpotlight from './components/FocusSpotlight';
import WaveSection from './components/WaveSection';
import ProductDetails from './components/ProductDetails';
import EditionsShowcase from './components/EditionsShowcase';
import Footer from './components/Footer';

function App() {
  return (
    <div className="relative w-full overflow-x-hidden bg-background">
      <Hero />
      <UnveilingSequence />
      <FocusSpotlight />
      <WaveSection />
      <ProductDetails />
      <EditionsShowcase />
      <Footer />
    </div>
  );
}

export default App;
