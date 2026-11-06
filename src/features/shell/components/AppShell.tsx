import type { ReactNode } from "react";

type AppShellProps = {
  topBar?: ReactNode;
  sideNav?: ReactNode;
  main: ReactNode;
  rightRail?: ReactNode;
  bottomNav?: ReactNode;
};

export function AppShell({ topBar, sideNav, main, rightRail, bottomNav }: AppShellProps) {
  return (
    <div className="min-h-dvh bg-massa-bg text-massa-text">
      {topBar}
      <div className="mx-auto flex w-full max-w-[1280px] justify-center gap-0 lg:px-4">
        {sideNav}
        <div className="flex min-w-0 flex-1 justify-center gap-6 pb-16 lg:pb-0">
          <main className="w-full max-w-[598px] border-[#322923] bg-[#0e0c0b] lg:border-x">
            {main}
          </main>
          {rightRail ? (
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
