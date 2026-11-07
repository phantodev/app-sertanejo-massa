import { delay } from "../../../shared/lib/delay.ts";
import type { TopHitsCharts, TopHitsScopeId } from "../types/top-hits.types.ts";
import { getMockTopHitsCharts } from "./top-hits.mock.ts";

export async function getTopHitsCharts(scope: TopHitsScopeId = "brasil"): Promise<TopHitsCharts> {
  await delay(120);
  const data = getMockTopHitsCharts();
  if (scope !== "brasil") throw new Error("Escopo não disponível no mock");
  return data;
}
