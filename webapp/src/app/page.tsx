"use client";

import classNames from "classnames";
import { lazy, Suspense, useState } from "react";
import AirlinesTab from "@/app/tabs/airlines";

const OraclesTab = lazy(() => import("@/app/tabs/oracles"));
const PassengersTab = lazy(() => import("@/app/tabs/passengers"));
const HistoryTab = lazy(() => import("@/app/tabs/HistoryTab"));

const tabs = ["Airlines", "Oracles", "Passengers", "History"];

export default function Home() {
  const [index, setIndex] = useState(0);

  return (
    <div>
      <div>
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
          <select
            id="tabs"
            name="tabs"
            className="block w-full rounded-md border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
            onChange={(e) => setIndex(e.target.selectedIndex)}
          >
            {tabs.map((tab, index) => (
              <option value={index} key={tab}>
                {tab}
              </option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav
            className="isolate flex divide-x divide-gray-200 rounded-lg shadow"
            aria-label="Tabs"
          >
            {tabs.map((tab, tabIdx) => (
              <button
                key={tab}
                className={classNames(
                  "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10",

                  {
                    "text-gray-900": index === tabIdx,
                    "text-gray-500 hover:text-gray-700": index !== tabIdx,
                    "rounded-l-lg": tabIdx === 0,
                    "rounded-r-lg": tabIdx === tabs.length - 1,
                  },
                )}
                onClick={() => setIndex(tabIdx)}
              >
                <span>{tab}</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    index === tabIdx ? "bg-emerald-500" : "bg-transparent",
                    "absolute inset-x-0 bottom-0 h-0.5",
                  )}
                />
              </button>
            ))}
          </nav>
        </div>
      </div>
      <div className="mt-8">
        <Suspense fallback={<div>Loading...</div>}>
          {index === 0 && <AirlinesTab />}
          {index === 1 && <OraclesTab />}
          {index === 2 && <PassengersTab />}
          {index === 3 && <HistoryTab />}
        </Suspense>
      </div>
    </div>
  );
}
