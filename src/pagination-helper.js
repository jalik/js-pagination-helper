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
import QueryString from "query-string";

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
            total: NaN
        }, options);

        /**
         * The limit per page
         * @type {number}
         * @private
         */
        this._limit = options.limit;

        /**
         * The pagination offset
         * @type {number}
         * @private
         */
        this._offset = options.offset;

        /**
         * The total of the pagination
         * @type {number}
         * @private
         */
        this._total = options.total;

        // Set the offset using the page number
        if (options.page) {
            this.setPage(options.page);
        }
    }

    /**
     * Formats a page link
     * @param link
     * @param page
     * @param pageVar
     * @return {string}
     */
    static formatPageLink(link, page, pageVar = "_PAGE_") {
        return link.replace(new RegExp(pageVar, "g"), page);
    }

    /**
     * Returns the closest valid page number
     * @param page
     * @return {number}
     */
    getClosestPage(page) {
        if (typeof page !== "number") {
            page = Number(page);
        }

        if (!Number.isNaN(page)) {
            const count = this.getPageCount();

            if (page > count) {
                page = count;
            } else if (page < 1) {
                page = 1;
            }
        }
        return page;
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
        return this._limit;
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
        return this._offset;
    }

    /**
     * Returns an offset from a page
     * @param page
     * @return {number}
     */
    getOffsetFromPage(page) {
        return this._limit * (page - 1);
    }

    /**
     * Returns the current page
     * @return {number}
     */
    getPage() {
        return this.getPageFromOffset(this._offset);
    }

    /**
     * Returns the page count
     * @return {number}
     */
    getPageCount() {
        return this._total > 0 && this._limit > 0 ? Math.ceil(this._total / this._limit) : 1;
    }

    /**
     * Returns a page from an offset
     * @param offset
     * @return {number}
     */
    getPageFromOffset(offset) {
        return offset > 0 && this._limit > 0 ? Math.round(offset / this._limit) + 1 : 1;
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
        return this._total;
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
        return typeof page === "number"
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
            this._offset += this._limit;
        }
        return this;
    }

    /**
     * Adds the page param in a URL
     * @param url
     * @param queryString
     * @param pageVar
     * @return {string}
     */
    static preparePageLink(url, queryString, pageVar = "_PAGE_") {
        const params = QueryString.parse(queryString);
        params.page = "_PAGE_";
        queryString = QueryString.stringify(params);
        return `${url}?${queryString}`;
    }

    /**
     * Moves to the previous page
     * @return {PaginationHelper}
     */
    previous() {
        if (this.hasPrevious()) {
            this._offset -= this._limit;
        } else {
            this._offset = 0;
        }
        return this;
    }

    /**
     * Sets the limit per page
     * @param limit
     * @return {PaginationHelper}
     */
    setLimit(limit) {
        limit = Number(limit);

        if (!Number.isNaN(limit)) {
            this._limit = Math.max(0, Math.round(limit));
        }
        return this;
    }

    /**
     * Sets the pagination offset
     * @param offset
     * @return {PaginationHelper}
     */
    setOffset(offset) {
        offset = Number(offset);

        if (!Number.isNaN(offset)) {
            this._offset = Math.max(0, Math.round(offset));
        }
        return this;
    }

    /**
     * Sets the current page
     * @param page
     * @return {PaginationHelper}
     */
    setPage(page) {
        page = Number(page);

        if (!Number.isNaN(page)) {
            this.setOffset(this.getOffsetFromPage(page));
        }
        return this;
    }

    /**
     * Sets the result count
     * @param total
     * @return {PaginationHelper}
     */
    setTotal(total) {
        total = Number(total);

        if (!Number.isNaN(total)) {
            this._total = Math.max(0, Math.round(total));
        }
        return this;
    }
}

export default PaginationHelper;
