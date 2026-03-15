import { createContext, useContext, type ReactNode } from "react";
import { SiteSettings } from "@/types";

const SiteSettingsContext = createContext<SiteSettings | null | undefined>(undefined);

export function SiteSettingsProvider({
  initialSettings,
  children,
}: {
  initialSettings?: SiteSettings | null;
  children: ReactNode;
}) {
  return <SiteSettingsContext.Provider value={initialSettings}>{children}</SiteSettingsContext.Provider>;
}

export function useInitialSiteSettingsContext() {
  return useContext(SiteSettingsContext);
}
