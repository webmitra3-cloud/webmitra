import { useQuery } from "@tanstack/react-query";
import { useInitialSiteSettingsContext } from "@/context/site-settings-context";
import { publicApi } from "@/lib/api";
import { mergeSiteSettings } from "@/lib/constants";
import { SiteSettings } from "@/types";

export function useSiteSettings(initialData?: SiteSettings | null) {
  const contextInitialData = useInitialSiteSettingsContext();
  const seededData = initialData !== undefined ? initialData : contextInitialData;

  return useQuery({
    queryKey: ["site-settings"],
    queryFn: publicApi.getSettings,
    initialData: seededData ?? undefined,
    select: mergeSiteSettings,
  });
}
