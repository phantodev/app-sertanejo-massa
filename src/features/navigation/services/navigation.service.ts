import { delay } from "../../../shared/lib/delay.ts";
import { navigationApi } from "../apis/navigation.api.ts";
import type { MobileNavItem, NavItem } from "../types/navigation.types.ts";
import { mockMobileNavItems, mockPublishItem, mockSideNavItems } from "./navigation.mock.ts";

void navigationApi;

export type SideNavigation = {
  items: NavItem[];
  publish: NavItem;
};

export async function getSideNavigation(): Promise<SideNavigation> {
  await delay();
  return {
    items: structuredClone(mockSideNavItems),
    publish: structuredClone(mockPublishItem),
  };
}

export async function getMobileNavigation(): Promise<MobileNavItem[]> {
  await delay();
  return structuredClone(mockMobileNavItems);
}
