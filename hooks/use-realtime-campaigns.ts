"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"

export function useRealtimeCampaigns(spaceId?: string) {
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!spaceId) return

    // Fetch initial data
    const fetchCampaigns = async () => {
      const { data, error } = await supabase
        .from("blookperks_campaigns")
        .select("*")
        .eq("space_id", spaceId)
        .order("created_at", { ascending: false })

      if (!error && data) {
        setCampaigns(data)
      }
      setLoading(false)
    }

    fetchCampaigns()

    // Set up real-time subscription
    const channel = supabase
      .channel("campaigns")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "blookperks_campaigns",
          filter: `space_id=eq.${spaceId}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setCampaigns((prev) => [payload.new as any, ...prev])
          } else if (payload.eventType === "UPDATE") {
            setCampaigns((prev) =>
              prev.map((campaign) => (campaign.id === payload.new.id ? (payload.new as any) : campaign)),
            )
          } else if (payload.eventType === "DELETE") {
            setCampaigns((prev) => prev.filter((campaign) => campaign.id !== payload.old.id))
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [spaceId])

  return { campaigns, loading }
}
