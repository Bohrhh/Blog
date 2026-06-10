import { useState, useEffect } from "react"

/**
 * Debounce a value by the specified delay in milliseconds.
 * Returns the debounced value that updates only after the delay has elapsed
 * since the last change.
 *
 * @example
 * const [query, setQuery] = useState("")
 * const debouncedQuery = useDebounce(query, 300)
 *
 * useEffect(() => {
 *   // perform search with debouncedQuery
 * }, [debouncedQuery])
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
