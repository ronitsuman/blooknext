import type { Metadata } from "next"
import { VendorRegistrationForm } from "./components/vendor-registration-form"

export const metadata: Metadata = {
  title: "Vendor Registration - BlookMySpace",
  description: "Register as a vendor to provide services for advertising campaigns",
}

export default function VendorRegistrationPage() {
  return (
    <div className="container mx-auto py-8">
      <VendorRegistrationForm />
    </div>
  )
}
