import type { Metadata } from "next"
import { BlookForceRegistrationForm } from "./components/blookforce-registration-form"

export const metadata: Metadata = {
  title: "BlookForce Agent Registration - BlookMySpace",
  description: "Join BlookForce and earn commissions by referring new users",
}

export default function BlookForceRegistrationPage() {
  return (
    <div className="container mx-auto py-8">
      <BlookForceRegistrationForm />
    </div>
  )
}
