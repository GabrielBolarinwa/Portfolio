"use client";
import React, { createContext, useContext, useMemo, useState } from "react";

interface NavSection {
  id: string;
  label: string;
}

interface NavContextValue {
  sections: NavSection[];
  setSections: (sections: NavSection[]) => void;
}

const NavContext = createContext<NavContextValue>({
  sections: [],
  setSections: () => {},
});

export default function NavProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sections, setSections] = useState<NavSection[]>([]);
  const value = useMemo(() => ({ sections, setSections }), [sections]);

  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
}

export function useNav() {
  return useContext(NavContext);
}
