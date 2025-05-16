import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LandingHero } from "@/components/landing-hero"
import { Features } from "@/components/features"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { HowItWorks } from "@/components/how-it-works"
import { Testimonials } from "@/components/testimonials"
import { UpcomingWorkshops } from "@/components/upcoming-workshops"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <MainNav />
        </div>
      </header>
      <main className="flex-1">
        <LandingHero />
        <Features />
        <HowItWorks />
        <UpcomingWorkshops />
        <Testimonials />
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              Ready to streamline your internship experience?
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Join the GUC Internship System to simplify applications, assessments, and evaluations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/dashboard/student">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                >
                  Get Started
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
