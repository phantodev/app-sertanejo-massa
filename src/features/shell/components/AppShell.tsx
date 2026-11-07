import type { ReactNode } from "react";

type AppShellProps = {
  topBar?: ReactNode;
  sideNav?: ReactNode;
  main: ReactNode;
  rightRail?: ReactNode;
  bottomNav?: ReactNode;
  /**
   * Ocupa a largura total do Feed: main 598 + gap-6 + rail 350 = 972px.
   * Use em telas full-bleed internas (ex.: mensagens) sem rightRail.
   */
  stretchMain?: boolean;
};

/**
 * Largura total do conteúdo do Feed:
 * - < xl: só o main (598)
 * - xl+: main 598 + gap-6 24 + rail 350 = 972
 */
export const APP_SHELL_STRETCH_MAIN_CLASS = "max-w-[598px] xl:max-w-[972px]";

export function AppShell({
  topBar,
  sideNav,
  main,
  rightRail,
  bottomNav,
  stretchMain = false,
}: AppShellProps) {
  const hasBottomNav = Boolean(bottomNav);
  const mainClasses = stretchMain
    ? [
        "flex w-full min-w-0 flex-col overflow-hidden border-fm-purple/20 bg-fm-yellow-light lg:border-x",
        APP_SHELL_STRETCH_MAIN_CLASS,
        hasBottomNav
          ? "max-lg:h-[calc(100%-3.25rem)] max-lg:max-h-[calc(100%-3.25rem)] lg:h-[calc(100dvh-3.25rem)]"
          : "max-lg:min-h-0 max-lg:flex-1 lg:h-dvh",
      ].join(" ")
    : "w-full max-w-[598px] border-fm-purple/20 bg-fm-yellow-light lg:border-x";

  const rootClasses = stretchMain
    ? "fixed inset-0 z-30 flex min-h-0 flex-col overflow-hidden bg-massa-bg text-massa-text lg:static lg:z-auto lg:min-h-dvh lg:overflow-visible"
    : "min-h-dvh bg-massa-bg text-massa-text";

  return (
    <div className={rootClasses}>
      {topBar}
      <div className="mx-auto flex min-h-0 w-full max-w-[1280px] flex-1 justify-center gap-0 overflow-hidden lg:px-4">
        {sideNav}
        <div
          className={`flex min-h-0 min-w-0 flex-1 justify-center gap-6 overflow-hidden ${
            stretchMain ? "" : "pb-16 lg:pb-0"
          }`}
        >
          <main className={mainClasses}>{main}</main>
          {!stretchMain && rightRail ? (
            <aside className="sticky top-0 hidden h-dvh w-[350px] shrink-0 overflow-y-auto py-2 xl:block">
              {rightRail}
            </aside>
          ) : null}
        </div>
      </div>
      {bottomNav}
    </div>
  );
}
