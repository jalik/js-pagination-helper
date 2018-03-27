/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2018 Karl STEIN
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import {extendRecursively as extend} from "@jalik/extend";

class PaginationHelper {

    /**
     * Pagination helper
     * @param options
     * @constructor
     */
    constructor(options) {
        options = extend({
            limit: 0,
            offset: 0,
            page: 1,
            total: 0
        }, options);

        this._limit = options.limit;
        this._offset = options.offset;
        this._total = options.total;
    }

    /**
     * Returns the current page
     * @return {number}
     */
    getCurrentPage() {
        return this._offset > 0 && this._limit > 0 ? Math.round(this._offset / this._limit) + 1 : 1;
    }

    /**
     * Returns the last page
     * @return {number}
     */
    getLastPage() {
        return this._total > 0 && this._limit > 0 ? Math.ceil(this._total / this._limit) : 1;
    }

    /**
     * Returns the pagination limit
     * @return {number}
     */
    getLimit() {
        return this._limit;
    }

    /**
     * Returns the next page
     * @return {number}
     */
    getNextPage() {
        return this.getPageCount() <= this.getCurrentPage() ? this.getLastPage() : this.getCurrentPage() + 1;
    }

    /**
     * Returns the current pagination offset
     * @return {number}
     */
    getOffset() {
        return this._offset;
    }

    /**
     * Returns the page count
     * @return {number}
     */
    getPageCount() {
        return this.getLastPage();
    }

    /**
     * Returns the previous page
     * @return {number}
     */
    getPreviousPage() {
        return Math.max(1, this.getCurrentPage() - 1);
    }

    /**
     * Returns the result count
     * @return {number}
     */
    getTotal() {
        return this._total;
    }

    /**
     * Checks if there is a page after the current page
     * @return {boolean}
     */
    hasNext() {
        return this.getCurrentPage() < this.getNextPage();
    }

    /**
     * Checks if there is a page before the current page
     * @return {boolean}
     */
    hasPrevious() {
        return this.getCurrentPage() > this.getPreviousPage();
    }

    /**
     * Moves to the next page
     * @return {PaginationHelper}
     */
    next() {
        if (this.hasNext()) {
            this._offset += this._limit;
        }
        return this;
    }

    /**
     * Moves to the previous page
     * @return {PaginationHelper}
     */
    previous() {
        if (this._offset - this._limit >= 0) {
            this._offset -= this._limit;
        } else {
            this._offset = 0;
        }
        return this;
    }

    /**
     * Sets the current page
     * @param number
     * @return {PaginationHelper}
     */
    setCurrentPage(number) {
        let page = Number.parseInt(Number(number));

        if (page > 0) {
            this._offset = this.setOffset((page - 1) * this._limit);
        }
        return this;
    }

    /**
     * Sets the limit per page
     * @param number
     * @return {PaginationHelper}
     */
    setLimit(number) {
        this._limit = Math.max(0, Number.parseInt(Number(number)));
        return this;
    }

    /**
     * Sets the pagination offset
     * @param number
     * @return {PaginationHelper}
     */
    setOffset(number) {
        this._offset = Math.max(0, Number.parseInt(Number(number)));
        return this;
    }

    /**
     * Sets the result count
     * @param number
     * @return {PaginationHelper}
     */
    setTotal(number) {
        this._total = Number.parseInt(Number(number));
        return this;
    }
}

export default PaginationHelper;
