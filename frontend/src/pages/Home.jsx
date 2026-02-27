import React from 'react'
import Hero from '../components/Hero';
import CategorySection from '../components/CategorySection';
import LatestCollection from '../components/LatestCollection';
import BestSeller from '../components/BestSeller';
import OurPolicy from '../components/OurPolicy';
import NewsLetterBox from '../components/NewsLetterBox';

const Home = () => {
  return (
    <div>
        <Hero />
        {/* categories quick links - clicking one navigates to the collection page with that
            category pre‑selected so the user sees only matching products. */}
        <CategorySection />

        <LatestCollection />
        <BestSeller />
        <OurPolicy />
        <NewsLetterBox/>
    </div>
  )
}

export default Home;
