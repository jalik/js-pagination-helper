/*
 * The MIT License (MIT)
 * Copyright (c) 2020 Karl STEIN
 */

export type PaginationHelperOptions = {
  limit: number
  offset?: number
  // todo add minPage
  // todo rename to number
  page?: number
  totalElements: number
}

// todo rename to OffsetPagination
class PaginationHelper {
  private limit!: number
  private offset!: number
  private totalElements!: number

  constructor (options: PaginationHelperOptions) {
    this.setLimit(options.limit)
    this.setTotalElements(options.totalElements)

    // Set the offset using the page number
    if (options.page != null) {
      this.setPage(options.page)
    } else if (options.offset != null) {
      this.setOffset(options.offset)
    }
  }

  /**
   * Returns the closest valid page number
   * @param page
   */
  getClosestPage (page: number): number {
    let closest = page
    const count = this.getPageCount()

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
   * todo rename to equals
   */
  equal (pagination: PaginationHelper): boolean {
    return this.getLimit() === pagination.getLimit() &&
      this.getOffset() === pagination.getOffset() &&
      this.getTotalElements() === pagination.getTotalElements()
  }

  /**
   * Returns the last page.
   */
  getLastPage (): number {
    return this.getPageCount()
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
  getNextPage (): number {
    return this.getPage() < this.getPageCount()
      ? this.getPage() + 1
      : this.getLastPage()
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
   * Returns the number of pages.
   * todo rename to getTotalPages()
   */
  getPageCount (): number {
    return this.totalElements > 0 && this.limit > 0
      ? Math.ceil(this.totalElements / this.limit)
      : 1
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
  getPreviousPage (): number {
    return Math.max(1, this.getPage() - 1)
  }

  /**
   * Returns the number of elements.
   */
  getTotalElements (): number | null {
    return this.totalElements
  }

  /**
   * Checks if there is a page after.
   */
  hasNext (): boolean {
    return this.getPage() < this.getNextPage()
  }

  /**
   * Checks if there is a page before.
   */
  hasPrevious (): boolean {
    return this.getPage() > this.getPreviousPage()
  }

  /**
   * Checks if the page is valid.
   * @param page
   */
  isPageValid (page: number): boolean {
    return page > 0 && page <= this.getPageCount()
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

// todo use named export
export default PaginationHelper
