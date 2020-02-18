/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2020 Karl STEIN
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
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import PaginationHelper from '../src/pagination-helper';

describe('PaginationHelper', () => {
  it('should be importable from package', () => {
    expect(typeof PaginationHelper).toEqual('function');
  });
});

describe('equal(pagination)', () => {
  const p1 = new PaginationHelper({ limit: 10, page: 1, total: 100 });
  const p2 = new PaginationHelper({ limit: 10, page: 1, total: 100 });

  it('should return true if paginations limit, offset and total are equals', () => {
    expect(p1.equal(p2)).toEqual(true);
  });

  it('should return true if paginations limit are differents', () => {
    const p3 = new PaginationHelper({ limit: 20, page: 1, total: 100 });
    expect(p1.equal(p3)).toEqual(false);
  });

  it('should return true if paginations page are differents', () => {
    const p4 = new PaginationHelper({ limit: 10, page: 2, total: 100 });
    expect(p1.equal(p4)).toEqual(false);
  });

  it('should return true if paginations total are differents', () => {
    const p5 = new PaginationHelper({ limit: 10, page: 1, total: 50 });
    expect(p1.equal(p5)).toEqual(false);
  });
});

describe('getClosestPage(page)', () => {
  const p = new PaginationHelper({ limit: 10, page: 1, total: 100 });

  it('should return 1 if page is 0', () => {
    expect(p.getClosestPage(0)).toEqual(1);
  });

  it('should return the last page if page is above page count', () => {
    expect(p.getClosestPage(25)).toEqual(10);
  });

  it('should return the same page if there nothing to fix', () => {
    expect(p.getClosestPage(5)).toEqual(5);
  });
});

describe('getLastPage()', () => {
  const p = new PaginationHelper({ limit: 10, page: 1, total: 100 });

  it('should return the last page', () => {
    expect(p.getLastPage()).toEqual(10);
  });
});

describe('getLimit()', () => {
  const p = new PaginationHelper({ limit: 5, page: 1, total: 100 });

  it('should return the limit per page', () => {
    expect(p.getLimit()).toEqual(5);
  });
});

describe('getNextPage()', () => {
  it('should return the next page if there is a page after', () => {
    const p = new PaginationHelper({ limit: 10, page: 5, total: 100 });
    expect(p.getNextPage()).toEqual(6);
  });

  it('should return the last page if there is no page after', () => {
    const p = new PaginationHelper({ limit: 10, page: 10, total: 100 });
    expect(p.getNextPage()).toEqual(10);
  });
});

describe('getOffset()', () => {
  it('should return the offset', () => {
    const p1 = new PaginationHelper({ limit: 10, page: 1, total: 100 });
    const p2 = new PaginationHelper({ limit: 10, page: 5, total: 100 });
    expect(p1.getOffset()).toEqual(0);
    expect(p2.getOffset()).toEqual(40);
  });
});

describe('getPage()', () => {
  const p = new PaginationHelper({ limit: 10, page: 3, total: 100 });

  it('should return the current page', () => {
    expect(p.getPage()).toEqual(3);
  });
});

describe('getPageCount()', () => {
  const p = new PaginationHelper({ limit: 10, page: 1, total: 100 });

  it('should return the page count', () => {
    expect(p.getPageCount()).toEqual(10);
  });
});

describe('getPreviousPage()', () => {
  it('should return the previous page if there is a page before', () => {
    const p = new PaginationHelper({ limit: 10, page: 5, total: 100 });
    expect(p.getPreviousPage()).toEqual(4);
  });

  it('should return the first page if there is no page before', () => {
    const p = new PaginationHelper({ limit: 10, page: 1, total: 100 });
    expect(p.getPreviousPage()).toEqual(1);
  });
});

describe('getTotal()', () => {
  const p = new PaginationHelper({ limit: 10, page: 1, total: 100 });

  it('should return the total', () => {
    expect(p.getTotal()).toEqual(100);
  });
});

describe('hasNext()', () => {
  it('should return true if there is a page after', () => {
    const p = new PaginationHelper({ limit: 10, page: 1, total: 100 });
    expect(p.hasNext()).toEqual(true);
  });

  it('should return false if there is no page after', () => {
    const p = new PaginationHelper({ limit: 10, page: 10, total: 100 });
    expect(p.hasNext()).toEqual(false);
  });
});

describe('hasPrevious()', () => {
  it('should return true if there is a page before', () => {
    const p = new PaginationHelper({ limit: 10, page: 5, total: 100 });
    expect(p.hasPrevious()).toEqual(true);
  });

  it('should return false if there is no page before', () => {
    const p = new PaginationHelper({ limit: 10, page: 1, total: 100 });
    expect(p.hasPrevious()).toEqual(false);
  });
});

describe('isPageValid(page)', () => {
  const p = new PaginationHelper({ limit: 10, page: 1, total: 100 });

  it('should return false if page is below 1', () => {
    expect(p.isPageValid(0)).toEqual(false);
  });

  it('should return true if page is in valid range', () => {
    expect(p.isPageValid(1)).toEqual(true);
  });

  it('should return false if page is above page count', () => {
    expect(p.isPageValid(300)).toEqual(false);
  });
});

describe('next()', () => {
  it('should increase offset if there is a page after', () => {
    const p = new PaginationHelper({ limit: 10, page: 5, total: 100 });
    p.next();
    expect(p.getOffset()).toEqual(50);
  });

  it('should not increase offset if there is no page after', () => {
    const p = new PaginationHelper({ limit: 10, page: 10, total: 100 });
    p.next();
    expect(p.getOffset()).toEqual(90);
  });
});

describe('previous()', () => {
  it('should decrease offset if there is a page before', () => {
    const p = new PaginationHelper({ limit: 10, page: 2, total: 100 });
    p.previous();
    expect(p.getOffset()).toEqual(0);
  });

  it('should not decrease offset if there is no page before', () => {
    const p = new PaginationHelper({ limit: 10, page: 1, total: 100 });
    p.previous();
    expect(p.getOffset()).toEqual(0);
  });
});

describe('setLimit(limit)', () => {
  it('should change the limit per page', () => {
    const p = new PaginationHelper({ limit: 10, page: 1, total: 100 });
    p.setLimit(25);
    expect(p.getLimit()).toEqual(25);
  });

  it('should change the limit to 0 if limit is negative', () => {
    const p = new PaginationHelper({ limit: 10, page: 1, total: 100 });
    p.setLimit(-1);
    expect(p.getLimit()).toEqual(0);
  });
});

describe('setOffset(offset)', () => {
  it('should change the offset', () => {
    const p = new PaginationHelper({ limit: 10, page: 1, total: 100 });
    p.setOffset(25);
    expect(p.getOffset()).toEqual(25);
  });

  it('should change the offset to 0 if offset is negative', () => {
    const p = new PaginationHelper({ limit: 10, page: 1, total: 100 });
    p.setLimit(-1);
    expect(p.getOffset()).toEqual(0);
  });
});

describe('setPage(page)', () => {
  it('should change the page', () => {
    const p = new PaginationHelper({ limit: 10, page: 1, total: 100 });
    p.setPage(5);
    expect(p.getPage()).toEqual(5);
  });
});
