"use client";



// ThemeProvider.tsx
// This component is a wrapper around the NextThemesProvider from the next-themes package. It allows you to provide theme-related context to your application, enabling features like dark mode and theme switching.
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

export function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
