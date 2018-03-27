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

import PaginationHelper from "../src/pagination-helper";

describe("PaginationHelper", () => {

    it(`should be importable from package`, () => {
        expect(typeof PaginationHelper).toEqual("function");
    });

    describe("new PaginationHelper({limit: 10})", () => {
        const p = new PaginationHelper({
            limit: 10,
            offset: 0,
            page: 1,
            total: 95
        });

        describe("getCurrentPage()", () => {
            it(`should return 1`, () => {
                expect(p.getCurrentPage()).toEqual(1);
            });
        });

        describe("getLastPage()", () => {
            it(`should return 10`, () => {
                expect(p.getLastPage()).toEqual(10);
            });
        });

        describe("getLimit()", () => {
            it(`should return 10`, () => {
                expect(p.getLimit()).toEqual(10);
            });
        });

        describe("getNextPage()", () => {
            it(`should return 2`, () => {
                expect(p.getNextPage()).toEqual(2);
            });
        });

        describe("getOffset()", () => {
            it(`should return 0`, () => {
                expect(p.getOffset()).toEqual(0);
            });
        });

        describe("getPageCount()", () => {
            it(`should return 10`, () => {
                expect(p.getPageCount()).toEqual(10);
            });
        });

        describe("getPreviousPage()", () => {
            it(`should return 1`, () => {
                expect(p.getPreviousPage()).toEqual(1);
            });
        });

        describe("getTotal()", () => {
            it(`should return 95`, () => {
                expect(p.getTotal()).toEqual(95);
            });
        });

        describe("hasNext()", () => {
            it(`should return true`, () => {
                expect(p.hasNext()).toEqual(true);
            });
        });

        describe("hasPrevious()", () => {
            it(`should return false`, () => {
                expect(p.hasPrevious()).toEqual(false);
            });
        });
    });
});
