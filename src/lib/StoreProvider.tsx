"use client";

import { Provider } from "react-redux";
import { store } from "@/lib/index";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
