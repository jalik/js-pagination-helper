/*
 * The MIT License (MIT)
 * Copyright (c) 2024 Karl STEIN
 */

export type OffsetPaginationOptions = {
  limit: number
  maxLimit?: number
  minPage?: number
  offset?: number
  page?: number
  totalElements: number
}

export class OffsetPagination {
  private limit!: number
  private readonly maxLimit: number | null
  private readonly minPage: number
  private offset!: number
  private totalElements!: number

  constructor (options: OffsetPaginationOptions) {
    this.maxLimit = options.maxLimit != null && !Number.isNaN(options.maxLimit)
      ? options.maxLimit
      : null

    this.minPage = options.minPage != null && !Number.isNaN(options.minPage)
      ? options.minPage
      : 1

    this.setLimit(options.limit)
    this.setTotalElements(options.totalElements)

    // Set the offset using the page number
    if (options.page != null && !Number.isNaN(options.page)) {
      this.setPage(options.page)
    } else if (options.offset != null && !Number.isNaN(options.offset)) {
      this.setOffset(options.offset)
    } else {
      this.offset = 0
    }
  }

  /**
   * Compares with another pagination to see if they are equals.
   * @param pagination
   */
  equals (pagination: OffsetPagination): boolean {
    return this.getLimit() === pagination.getLimit() &&
      this.getOffset() === pagination.getOffset() &&
      this.getTotalElements() === pagination.getTotalElements()
  }

  /**
   * Returns the closest valid page number.
   * @param page
   */
  getClosestPage (page: number): number {
    let closest = page
    const firstPage = this.getFirstPage()
    const lastPage = this.getLastPage()

    if (page > lastPage) {
      closest = lastPage
    } else if (page < firstPage) {
      closest = firstPage
    }
    return closest
  }

  /**
   * Returns the first page.
   */
  getFirstPage (): number {
    return this.minPage
  }

  /**
   * Returns the last page.
   */
  getLastPage (): number {
    const shift = Math.abs(1 - this.minPage)
    return this.getTotalPages() - shift
  }

  /**
   * Returns the number of elements per page.
   */
  getLimit (): number {
    return this.limit
  }

  /**
   * Returns the max limit.
   */
  getMaxLimit (): number | null {
    return this.maxLimit
  }

  /**
   * Returns the next page.
   */
  getNextPage (increment: number = 1): number {
    return Math.min(this.getLastPage(), this.getPage() + Math.max(1, increment))
  }

  /**
   * Returns the page offset.
   */
  getOffset (): number {
    return this.offset
  }

  /**
   * Returns the offset from a page.
   * @param page
   */
  getOffsetFromPage (page: number): number {
    return this.limit * (page - this.minPage)
  }

  /**
   * Returns the page number.
   */
  getPage (): number {
    return this.getPageFromOffset(this.offset)
  }

  /**
   * Returns a page from an offset.
   * @param offset
   */
  getPageFromOffset (offset: number): number {
    return offset > 0 && this.limit > 0
      ? Math.round(offset / this.limit) + this.minPage
      : this.minPage
  }

  /**
   * Returns the previous page.
   */
  getPreviousPage (increment: number = 1): number {
    return Math.max(this.minPage, this.getPage() - Math.max(1, increment))
  }

  /**
   * Returns the number of elements.
   */
  getTotalElements (): number {
    return this.totalElements
  }

  /**
   * Returns the number of pages.
   */
  getTotalPages (): number {
    return this.totalElements > 0 && this.limit > 0
      ? Math.ceil(this.totalElements / this.limit)
      : 0
  }

  /**
   * Checks if there is a page after.
   */
  hasNext (increment: number = 1): boolean {
    return this.getPage() < this.getNextPage(increment)
  }

  /**
   * Checks if there is a page before.
   */
  hasPrevious (increment: number = 1): boolean {
    return this.getPage() > this.getPreviousPage(increment)
  }

  /**
   * Checks if the page is valid.
   * @param page
   */
  isPageValid (page: number): boolean {
    return page >= this.getFirstPage() && page <= this.getLastPage()
  }

  /**
   * Moves to the next page.
   */
  next () {
    if (this.hasNext()) {
      this.offset += this.limit
    }
  }

  /**
   * Moves to the previous page.
   */
  previous () {
    if (this.hasPrevious()) {
      this.offset -= this.limit
    } else {
      this.offset = 0
    }
  }

  /**
   * Sets the number of elements per page.
   * @param limit
   */
  setLimit (limit: number) {
    if (!Number.isNaN((limit))) {
      const value = Math.max(0, Math.round(limit))
      if (this.maxLimit != null) {
        this.limit = Math.min(this.maxLimit, value)
      } else {
        this.limit = value
      }
    }
  }

  /**
   * Sets the page offset.
   * @param offset
   */
  setOffset (offset: number) {
    if (!Number.isNaN((offset))) {
      this.offset = Math.max(0, Math.round(offset))
    }
  }

  /**
   * Sets the page number and update the offset accordingly.
   * @param page
   */
  setPage (page: number) {
    if (!Number.isNaN((page))) {
      this.setOffset(this.getOffsetFromPage(page))
    }
  }

  /**
   * Sets the total number of elements.
   * @param total
   */
  setTotalElements (total: number) {
    if (!Number.isNaN((total))) {
      this.totalElements = Math.max(0, Math.round(total))
    }
  }
}
