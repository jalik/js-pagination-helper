/*
 * The MIT License (MIT)
 * Copyright (c) 2020 Karl STEIN
 */

import deepExtend from '@jalik/deep-extend';

/**
 * A helper for pagination.
 */
class PaginationHelper {
  /**
   * Pagination helper
   * @param options
   * @constructor
   */
  constructor(options) {
    this.options = deepExtend({
      limit: 0,
      offset: 0,
      page: 1,
      total: NaN,
    }, options);

    /**
     * The limit per page
     * @type {number}
     * @private
     */
    this.limit = options.limit;

    /**
     * The pagination offset
     * @type {number}
     * @private
     */
    this.offset = options.offset;

    /**
     * The total of the pagination
     * @type {number}
     * @private
     */
    this.total = options.total;

    // Set the offset using the page number
    if (options.page) {
      this.setPage(options.page);
    }
  }

  /**
   * Returns the closest valid page number
   * @param page
   * @return {number}
   */
  getClosestPage(page) {
    let closest = page;

    if (typeof page !== 'number') {
      closest = Number(page);
    }

    if (!Number.isNaN(closest)) {
      const count = this.getPageCount();

      if (page > count) {
        closest = count;
      } else if (closest < 1) {
        closest = 1;
      }
    }
    return closest;
  }

  /**
   * Compares with another pagination to see if they are equals.
   * @param pagination
   * @return {boolean}
   */
  equal(pagination) {
    return this.getLimit() === pagination.getLimit()
      && this.getOffset() === pagination.getOffset()
      && this.getTotal() === pagination.getTotal();
  }

  /**
   * Returns the last page
   * @return {number}
   */
  getLastPage() {
    return this.getPageCount();
  }

  /**
   * Returns the pagination limit
   * @return {number}
   */
  getLimit() {
    return this.limit;
  }

  /**
   * Returns the next page
   * @return {number}
   */
  getNextPage() {
    return this.getPage() < this.getPageCount() ? this.getPage() + 1 : this.getLastPage();
  }

  /**
   * Returns the current pagination offset
   * @return {number}
   */
  getOffset() {
    return this.offset;
  }

  /**
   * Returns an offset from a page
   * @param page
   * @return {number}
   */
  getOffsetFromPage(page) {
    return this.limit * (page - 1);
  }

  /**
   * Returns the current page
   * @return {number}
   */
  getPage() {
    return this.getPageFromOffset(this.offset);
  }

  /**
   * Returns the page count
   * @return {number}
   */
  getPageCount() {
    return this.total > 0 && this.limit > 0 ? Math.ceil(this.total / this.limit) : 1;
  }

  /**
   * Returns a page from an offset
   * @param offset
   * @return {number}
   */
  getPageFromOffset(offset) {
    return offset > 0 && this.limit > 0 ? Math.round(offset / this.limit) + 1 : 1;
  }

  /**
   * Returns the previous page
   * @return {number}
   */
  getPreviousPage() {
    return Math.max(1, this.getPage() - 1);
  }

  /**
   * Returns the result count
   * @return {number}
   */
  getTotal() {
    return this.total;
  }

  /**
   * Checks if there is a page after the current page
   * @return {boolean}
   */
  hasNext() {
    return this.getPage() < this.getNextPage();
  }

  /**
   * Checks if there is a page before the current page
   * @return {boolean}
   */
  hasPrevious() {
    return this.getPage() > this.getPreviousPage();
  }

  /**
   * Checks if the page is valid
   * @param page
   * @return {boolean}
   */
  isPageValid(page) {
    return typeof page === 'number'
      && !Number.isNaN(page)
      && page > 0
      && page <= this.getPageCount();
  }

  /**
   * Moves to the next page
   * @return {PaginationHelper}
   */
  next() {
    if (this.hasNext()) {
      this.offset += this.limit;
    }
    return this;
  }

  /**
   * Moves to the previous page
   * @return {PaginationHelper}
   */
  previous() {
    if (this.hasPrevious()) {
      this.offset -= this.limit;
    } else {
      this.offset = 0;
    }
    return this;
  }

  /**
   * Sets the limit per page
   * @param limit
   * @return {PaginationHelper}
   */
  setLimit(limit) {
    const number = Number(limit);

    if (!Number.isNaN(number)) {
      this.limit = Math.max(0, Math.round(number));
    }
    return this;
  }

  /**
   * Sets the pagination offset
   * @param offset
   * @return {PaginationHelper}
   */
  setOffset(offset) {
    const number = Number(offset);

    if (!Number.isNaN(number)) {
      this.offset = Math.max(0, Math.round(number));
    }
    return this;
  }

  /**
   * Sets the current page
   * @param page
   * @return {PaginationHelper}
   */
  setPage(page) {
    const number = Number(page);

    if (!Number.isNaN(number)) {
      this.setOffset(this.getOffsetFromPage(number));
    }
    return this;
  }

  /**
   * Sets the result count
   * @param total
   * @return {PaginationHelper}
   */
  setTotal(total) {
    const number = Number(total);

    if (!Number.isNaN(number)) {
      this.total = Math.max(0, Math.round(number));
    }
    return this;
  }
}

export default PaginationHelper;
