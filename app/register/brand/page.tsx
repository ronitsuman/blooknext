import type { Metadata } from "next"
import { BrandRegistrationForm } from "./components/brand-registration-form"

export const metadata: Metadata = {
  title: "Brand Registration - BlookMySpace",
  description: "Register your brand to start advertising campaigns",
}

export default function BrandRegistrationPage() {
  return (
    <div className="container mx-auto py-8">
      <BrandRegistrationForm />
    </div>
  )
}
