import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '../components/landing/Hero'
import { FeatureGrid } from '../components/landing/FeatureGrid'
import { PackageCards } from '../components/landing/PackageCards'
import { InstallBanner } from '../components/landing/InstallBanner'
import { CtaSection } from '../components/landing/CtaSection'

import landingCss from '../styles/landing.css?url'

export const Route = createFileRoute('/')({
  head: () => ({
    links: [{ rel: 'stylesheet', href: landingCss }],
  }),
  component: LandingPage,
})

function LandingPage() {
  return (
    <>
      <Hero />
      <FeatureGrid />
      <PackageCards />
      <InstallBanner />
      <CtaSection />
    </>
  )
}
