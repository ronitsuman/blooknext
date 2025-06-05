import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Building, Users, ShoppingBag, Award } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">BlookMySpace</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#how-it-works" className="text-sm font-medium hover:underline underline-offset-4">
              How It Works
            </Link>
            <Link href="#modules" className="text-sm font-medium hover:underline underline-offset-4">
              Modules
            </Link>
            <Link href="#benefits" className="text-sm font-medium hover:underline underline-offset-4">
              Benefits
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Monetize Your Space Today ✨ Earn Extra, Effort-Free
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Turn your physical space into a revenue stream. Connect with brands, manage campaigns, and earn
                    passive income.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register/space-owner">
                    <Button className="w-full">
                      Register Your Space
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/register/brand">
                    <Button variant="outline" className="w-full">
                      Find Spaces to Advertise
                    </Button>
                  </Link>
                  <Link href="/register/vendor">
                    <Button variant="outline" className="w-full">
                      Join as Vendor
                    </Button>
                  </Link>
                </div>
              </div>
              <img
                src="/placeholder.svg?height=550&width=550"
                width={550}
                height={550}
                alt="BlookMySpace Platform"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How BlookMySpace Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  A simple 3-step process to start monetizing your space
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold">Register</h3>
                <p className="text-muted-foreground">
                  Sign up your space with details about location, type, and audience.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold">List</h3>
                <p className="text-muted-foreground">Add your space to our marketplace for brands to discover.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold">Earn</h3>
                <p className="text-muted-foreground">
                  Get paid when brands use your space for promotions and campaigns.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Counters Section */}
        <section className="py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              <div className="flex flex-col items-center justify-center space-y-2 border rounded-lg p-4">
                <h3 className="text-3xl font-bold">1,200+</h3>
                <p className="text-sm text-muted-foreground text-center">Spaces Onboarded</p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 border rounded-lg p-4">
                <h3 className="text-3xl font-bold">405</h3>
                <p className="text-sm text-muted-foreground text-center">HeatMapping Signups</p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 border rounded-lg p-4">
                <h3 className="text-3xl font-bold">50+</h3>
                <p className="text-sm text-muted-foreground text-center">Brands Onboarded</p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 border rounded-lg p-4">
                <h3 className="text-3xl font-bold">₹10M+</h3>
                <p className="text-sm text-muted-foreground text-center">Revenue Generated</p>
              </div>
            </div>
          </div>
        </section>

        {/* Module Highlights Section */}
        <section id="modules" className="py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Modules</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Comprehensive solutions for every stakeholder in the ecosystem
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2">
              <div className="flex flex-col space-y-4 rounded-lg border p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Building className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold">BlookSpace</h3>
                <p className="text-muted-foreground">
                  The core platform connecting spaces with brands for advertising and promotions.
                </p>
                <Link href="/modules/blookspace">
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </div>
              <div className="flex flex-col space-y-4 rounded-lg border p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold">BlookPerks</h3>
                <p className="text-muted-foreground">
                  Consumer-facing rewards and engagement module for QR-based campaigns.
                </p>
                <Link href="/modules/blookperks">
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </div>
              <div className="flex flex-col space-y-4 rounded-lg border p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold">BlookWorks</h3>
                <p className="text-muted-foreground">
                  Vendor management for printing, fabrication, and deployment services.
                </p>
                <Link href="/modules/blookworks">
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </div>
              <div className="flex flex-col space-y-4 rounded-lg border p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold">BlookForce</h3>
                <p className="text-muted-foreground">
                  Recruitment module for bringing in space owners or clients and earning commissions.
                </p>
                <Link href="/modules/blookforce">
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">See BlookMySpace in Action</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Watch our explainer video to understand how our platform works
                </p>
              </div>
              <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-xl border">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">Video Placeholder - 30-sec explainer video</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Get Started?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join BlookMySpace today and start monetizing your space
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/register/space-owner">
                  <Button size="lg" className="w-full">
                    Register Your Space
                  </Button>
                </Link>
                <Link href="/register/brand">
                  <Button size="lg" variant="outline" className="w-full">
                    Find Spaces to Advertise
                  </Button>
                </Link>
                <Link href="/register/vendor">
                  <Button size="lg" variant="outline" className="w-full">
                    Join as Vendor
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} BlookMySpace. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
