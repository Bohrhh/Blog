import { PAGINATION } from "./constants"

export type PageItem = number | typeof PAGINATION.ELLIPSIS

/**
 * Generate the sequence of page numbers and ellipsis markers for a pagination UI.
 *
 * The algorithm always shows the first and last page numbers. When the total
 * page count exceeds `maxVisible`, it truncates the middle range and inserts
 * ellipsis markers around the current page.
 *
 * @param currentPage - The currently active page (1-indexed)
 * @param totalPages  - Total number of pages available
 * @param options     - Optional config: `maxVisible` (default 5)
 * @returns            An ordered array of page numbers or `PAGINATION.ELLIPSIS`
 *
 * @example
 * getPageNumbers(1, 10)         // => [1, 2, 3, "ellipsis", 10]
 * getPageNumbers(5, 10)         // => [1, "ellipsis", 4, 5, 6, "ellipsis", 10]
 * getPageNumbers(3, 3)          // => [1, 2, 3]
 * getPageNumbers(1, 1)          // => [1]
 */
export function getPageNumbers(
  currentPage: number,
  totalPages: number,
  options?: { maxVisible?: number }
): PageItem[] {
  const { maxVisible = PAGINATION.MAX_VISIBLE_PAGES } = options ?? {}

  if (totalPages <= 0) return []
  if (totalPages === 1) return [1]

  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const pages: PageItem[] = [1]

  if (currentPage > 3) {
    pages.push(PAGINATION.ELLIPSIS)
  }

  const start = Math.max(2, currentPage - 1)
  const end = Math.min(totalPages - 1, currentPage + 1)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (currentPage < totalPages - 2) {
    pages.push(PAGINATION.ELLIPSIS)
  }

  pages.push(totalPages)

  return pages
}
