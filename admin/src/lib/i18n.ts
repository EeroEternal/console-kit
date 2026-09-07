import { useSyncExternalStore } from "react"
import { en } from "@/lib/locales/en"
import { zh } from "@/lib/locales/zh"

export type Language = "zh" | "en"

const STORAGE_KEY = "console_kit.language"
const locales: Record<Language, Record<string, string>> = { en, zh }

function readLanguage(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === "zh" || stored === "en") return stored
  } catch {
    /* ignore */
  }
  return "en"
}

let language: Language = typeof window === "undefined" ? "en" : readLanguage()
const listeners = new Set<() => void>()

function emit() {
  for (const listener of listeners) listener()
}

/** Kit i18n: look up `zh.ts` / `en.ts`, then the visible fallback, then the key. */
export function t(key: string, fallback?: string): string {
  const value = locales[language]?.[key]
  if (value) return value
  if (fallback && fallback !== "zh" && fallback !== "en") return fallback
  return key
}

export function useI18n() {
  const current = useSyncExternalStore(
    (onStoreChange) => {
      listeners.add(onStoreChange)
      return () => listeners.delete(onStoreChange)
    },
    () => language,
    () => "en" as Language,
  )

  return {
    language: current,
    setLanguage: (next: Language) => {
      language = next
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        /* ignore */
      }
      emit()
    },
  }
}
