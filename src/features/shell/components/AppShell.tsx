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
export const APP_SHELL_STRETCH_MAIN_CLASS =
  "w-full max-w-[598px] lg:max-w-[min(972px,100%)] xl:max-w-[972px]";

export function AppShell({
  topBar,
  sideNav,
  main,
  rightRail,
  bottomNav,
  stretchMain = false,
}: AppShellProps) {
  const hasBottomNav = Boolean(bottomNav);
  const hasRightRail = Boolean(rightRail);
  const mainAlignClass = stretchMain && !hasRightRail ? "justify-start" : "justify-center";
  const mainClasses = stretchMain
    ? [
        "flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden border-fm-purple/20 bg-fm-yellow-light lg:border-x",
        APP_SHELL_STRETCH_MAIN_CLASS,
        hasBottomNav
          ? "max-lg:h-[calc(100%-3.25rem)] max-lg:max-h-[calc(100%-3.25rem)]"
          : "max-lg:min-h-0 max-lg:flex-1",
      ].join(" ")
    : "w-full max-w-[598px] border-fm-purple/20 bg-fm-yellow-light lg:border-x";

  const rootClasses = stretchMain
    ? "fixed inset-0 z-30 flex h-dvh max-h-dvh w-full min-h-0 flex-col overflow-hidden bg-massa-bg text-massa-text"
    : "min-h-dvh bg-massa-bg text-massa-text";

  return (
    <div className={rootClasses} {...(stretchMain ? { "data-app-shell": "stretch" as const } : {})}>
      {topBar}
      <div className="mx-auto flex h-full min-h-0 w-full max-w-[1280px] flex-1 gap-0 overflow-hidden lg:px-4">
        {sideNav}
        <div
          className={`flex h-full min-h-0 min-w-0 flex-1 items-stretch gap-6 overflow-hidden ${mainAlignClass} ${
            stretchMain ? "" : "pb-16 lg:pb-0"
          }`}
        >
          <main className={mainClasses}>{main}</main>
          {!stretchMain && rightRail ? (
            <aside className="hidden w-[350px] shrink-0 self-start overflow-visible py-2 xl:block">
              {rightRail}
            </aside>
          ) : null}
        </div>
      </div>
      {bottomNav}
    </div>
  );
}
