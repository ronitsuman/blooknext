"use server"

import { createServerClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { sendEmail } from "@/lib/email-service"

export async function registerSpaceOwner(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  try {
    // Extract form data
    const userData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      fullName: formData.get("fullName") as string,
      phone: formData.get("phone") as string,
    }

    const spaceOwnerData = {
      companyName: formData.get("companyName") as string,
      contactPerson: formData.get("contactPerson") as string,
      address: formData.get("address") as string,
      pincode: formData.get("pincode") as string,
      landmark: formData.get("landmark") as string,
    }

    const spaceData = {
      spaceName: formData.get("spaceName") as string,
      spaceAddress: formData.get("spaceAddress") as string,
      spaceType: formData.get("spaceType") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      spaceSize: Number.parseInt(formData.get("spaceSize") as string),
      footfallWeekday: Number.parseInt(formData.get("footfallWeekday") as string),
      footfallWeekend: Number.parseInt(formData.get("footfallWeekend") as string),
      ageGroup: formData.get("ageGroup") as string,
      incomeSegment: formData.get("incomeSegment") as string,
      hasCameras: formData.get("hasCameras") === "true",
      cameraCount: formData.get("cameraCount") ? Number.parseInt(formData.get("cameraCount") as string) : null,
      cameraType: formData.get("cameraType") as string,
      cameraAccessible: formData.get("cameraAccessible") === "true",
    }

    // Create user account
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          full_name: userData.fullName,
          role: "space_owner",
        },
      },
    })

    if (authError) throw authError

    if (authData.user) {
      // Create space owner profile with PENDING status
      const { data: spaceOwner, error: spaceOwnerError } = await supabase
        .from("space_owners")
        .insert({
          user_id: authData.user.id,
          full_name: userData.fullName,
          email: userData.email,
          phone: userData.phone,
          company_name: spaceOwnerData.companyName,
          contact_person: spaceOwnerData.contactPerson,
          address: spaceOwnerData.address,
          pincode: spaceOwnerData.pincode,
          landmark: spaceOwnerData.landmark,
          status: "pending", // Requires admin approval
        })
        .select()
        .single()

      if (spaceOwnerError) throw spaceOwnerError

      // Create space with PENDING status
      const { data: space, error: spaceError } = await supabase
        .from("spaces")
        .insert({
          owner_id: spaceOwner.id,
          name: spaceData.spaceName,
          address: spaceData.spaceAddress,
          space_type: spaceData.spaceType,
          city: spaceData.city,
          state: spaceData.state,
          pincode: spaceOwnerData.pincode,
          space_size: spaceData.spaceSize,
          footfall_weekday: spaceData.footfallWeekday,
          footfall_weekend: spaceData.footfallWeekend,
          age_group: spaceData.ageGroup,
          income_segment: spaceData.incomeSegment,
          has_cameras: spaceData.hasCameras,
          camera_count: spaceData.cameraCount,
          camera_type: spaceData.cameraType,
          camera_accessible: spaceData.cameraAccessible,
          status: "pending", // Requires admin approval
        })
        .select()
        .single()

      if (spaceError) throw spaceError

      // Send notification emails
      await sendEmail({
        to: userData.email,
        subject: "Registration Submitted - Pending Approval",
        template: "space-owner-registration-pending",
        data: {
          name: userData.fullName,
          spaceName: spaceData.spaceName,
        },
      })

      // Notify admin
      await sendEmail({
        to: "admin@blookmyspace.com",
        subject: "New Space Owner Registration - Approval Required",
        template: "admin-approval-required",
        data: {
          ownerName: userData.fullName,
          spaceName: spaceData.spaceName,
          city: spaceData.city,
          spaceType: spaceData.spaceType,
          approvalUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/admin/approvals/${spaceOwner.id}`,
        },
      })

      return { success: true, message: "Registration submitted successfully! Please wait for admin approval." }
    }
  } catch (error) {
    console.error("Registration error:", error)
    return { success: false, message: "Registration failed. Please try again." }
  }

  redirect("/login?message=Registration submitted. Please wait for approval.")
}
