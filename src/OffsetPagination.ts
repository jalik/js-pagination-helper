/*
 * The MIT License (MIT)
 * Copyright (c) 2024 Karl STEIN
 */

export type OffsetPaginationOptions = {
  limit: number
  offset?: number
  // todo add minPage
  // todo rename to number
  page?: number
  totalElements: number
}

export class OffsetPagination {
  private limit!: number
  private offset!: number
  private totalElements!: number

  constructor (options: OffsetPaginationOptions) {
    this.setLimit(options.limit)
    this.setTotalElements(options.totalElements)

    // Set the offset using the page number
    if (options.page != null) {
      this.setPage(options.page)
    } else if (options.offset != null) {
      this.setOffset(options.offset)
    } else {
      this.offset = 0
    }
  }

  /**
   * Returns the closest valid page number.
   * @param page
   */
  getClosestPage (page: number): number {
    let closest = page
    const count = this.getTotalPages()

    if (page > count) {
      closest = count
    } else if (closest < 1) {
      closest = 1
    }
    return closest
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
   * Returns the last page.
   */
  getLastPage (): number {
    return this.getTotalPages()
  }

  /**
   * Returns the number of elements per page.
   */
  getLimit (): number {
    return this.limit
  }

  /**
   * Returns the next page.
   */
  getNextPage (increment: number = 1): number {
    return Math.min(this.getLastPage(), this.getPage() + increment)
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
    return this.limit * (page - 1)
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
      ? Math.round(offset / this.limit) + 1
      : 1
  }

  /**
   * Returns the previous page.
   */
  getPreviousPage (increment: number = 1): number {
    return Math.max(1, this.getPage() - increment)
  }

  /**
   * Returns the number of elements.
   */
  getTotalElements (): number | null {
    return this.totalElements
  }

  /**
   * Returns the number of pages.
   */
  getTotalPages (): number {
    return this.totalElements > 0 && this.limit > 0
      ? Math.ceil(this.totalElements / this.limit)
      : 1
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
    return page > 0 && page <= this.getTotalPages()
  }

  /**
   * Moves to the next page.
   */
  next () {
    if (this.hasNext()) {
      this.offset += this.limit
    }
    return this
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
    return this
  }

  /**
   * Sets the number of elements per page.
   * @param limit
   */
  setLimit (limit: number) {
    this.limit = Math.max(0, Math.round(limit))
    return this
  }

  /**
   * Sets the page offset.
   * @param offset
   */
  setOffset (offset: number) {
    this.offset = Math.max(0, Math.round(offset))
    return this
  }

  /**
   * Sets the page number and update the offset accordingly.
   * @param page
   */
  setPage (page: number) {
    this.setOffset(this.getOffsetFromPage(page))
    return this
  }

  /**
   * Sets the total number of elements.
   * @param total
   */
  setTotalElements (total: number) {
    this.totalElements = Math.max(0, Math.round(total))
    return this
  }
}
