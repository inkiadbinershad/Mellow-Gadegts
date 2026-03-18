import HeroBannerSlider  from '../components/sections/HeroBannerSlider'
import HeroSection        from '../components/sections/HeroSection'
import FeaturedCategories from '../components/sections/FeaturedCategories'
import NewArrivals        from '../components/sections/NewArrivals'
import FlashDeals         from '../components/sections/FlashDeals'
import OurProducts        from '../components/sections/OurProducts'
import TrustBadges        from '../components/sections/TrustBadges'
import CustomerReviews    from '../components/sections/CustomerReviews'
import FadeIn             from '../components/ui/FadeIn'

export default function Home() {
  return (
    <main>
      <HeroBannerSlider />
      <HeroSection />
      <FadeIn><FeaturedCategories /></FadeIn>
      <FadeIn delay={80}><NewArrivals /></FadeIn>
      <FadeIn><FlashDeals /></FadeIn>
      <FadeIn delay={80}><OurProducts /></FadeIn>
      <FadeIn><TrustBadges /></FadeIn>
      <FadeIn delay={60}><CustomerReviews /></FadeIn>
    </main>
  )
}
