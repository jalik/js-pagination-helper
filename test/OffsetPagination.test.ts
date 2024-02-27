/*
 * The MIT License (MIT)
 * Copyright (c) 2020 Karl STEIN
 */

import { describe, expect, it } from '@jest/globals'
import { OffsetPagination } from '../src'

describe('new OffsetPagination()', () => {
  describe('with offset = null and page = null', () => {
    const p = new OffsetPagination({ limit: 10, totalElements: 0 })

    it('should set offset to 0', () => {
      expect(p.getOffset()).toBe(0)
    })
  })

  describe('with page', () => {
    const p0 = new OffsetPagination({
      limit: 10,
      minPage: 0,
      page: 5,
      totalElements: 100
    })
    const p1 = new OffsetPagination({
      limit: 10,
      minPage: 1,
      page: 5,
      totalElements: 100
    })
    it('should set offset', () => {
      expect(p0.getOffset()).toBe(50)
      expect(p1.getOffset()).toBe(40)
    })
  })

  describe('with offset', () => {
    const p0 = new OffsetPagination({
      limit: 10,
      minPage: 0,
      offset: 50,
      totalElements: 100
    })
    const p1 = new OffsetPagination({
      limit: 10,
      minPage: 1,
      offset: 50,
      totalElements: 100
    })
    it('should set offset', () => {
      expect(p0.getOffset()).toBe(50)
      expect(p1.getOffset()).toBe(50)
    })
  })
})

describe('equals(pagination)', () => {
  const p1 = new OffsetPagination({
    limit: 10,
    page: 1,
    totalElements: 100
  })
  const p2 = new OffsetPagination({
    limit: 10,
    offset: 0,
    totalElements: 100
  })

  it('should return true if paginations limit, offset and total are equals', () => {
    expect(p1.equals(p2)).toEqual(true)
  })

  it('should return true if paginations limit are different', () => {
    const p3 = new OffsetPagination({
      limit: 20,
      page: 1,
      totalElements: 100
    })
    expect(p1.equals(p3)).toEqual(false)
  })

  it('should return true if paginations page are different', () => {
    const p4 = new OffsetPagination({
      limit: 10,
      page: 2,
      totalElements: 100
    })
    expect(p1.equals(p4)).toEqual(false)
  })

  it('should return true if paginations total are different', () => {
    const p5 = new OffsetPagination({
      limit: 10,
      page: 1,
      totalElements: 50
    })
    expect(p1.equals(p5)).toEqual(false)
  })
})

describe('getClosestPage(page)', () => {
  describe('with minPage = 1', () => {
    const p0 = new OffsetPagination({
      limit: 10,
      minPage: 0,
      totalElements: 100
    })
    const p1 = new OffsetPagination({
      limit: 10,
      minPage: 1,
      totalElements: 100
    })

    describe('with page < first page', () => {
      it('should return the first page', () => {
        expect(p0.getClosestPage(-1)).toEqual(0)
        expect(p1.getClosestPage(0)).toEqual(1)
      })
    })

    describe('with page > last page', () => {
      it('should return the last page', () => {
        expect(p0.getClosestPage(10)).toEqual(9)
        expect(p1.getClosestPage(11)).toEqual(10)
      })
    })

    describe('with page >= first page and page <= last page', () => {
      it('should return the same page', () => {
        expect(p0.getClosestPage(0)).toEqual(0)
        expect(p0.getClosestPage(9)).toEqual(9)
        expect(p1.getClosestPage(1)).toEqual(1)
        expect(p1.getClosestPage(10)).toEqual(10)
      })
    })
  })
})

describe('getFirstPage()', () => {
  describe('with minPage = 1', () => {
    const p0 = new OffsetPagination({
      limit: 10,
      minPage: 0,
      totalElements: 100
    })
    const p1 = new OffsetPagination({
      limit: 10,
      minPage: 1,
      totalElements: 100
    })

    it('should return value of minPage', () => {
      expect(p0.getFirstPage()).toEqual(0)
      expect(p1.getFirstPage()).toEqual(1)
    })
  })
})

describe('getLastPage()', () => {
  describe('with minPage = 1', () => {
    const p0 = new OffsetPagination({
      limit: 10,
      minPage: 0,
      totalElements: 100
    })
    const p1 = new OffsetPagination({
      limit: 10,
      minPage: 1,
      totalElements: 100
    })

    it('should return the last page', () => {
      expect(p0.getLastPage()).toEqual(9)
      expect(p1.getLastPage()).toEqual(10)
    })
  })
})

describe('getLimit()', () => {
  const p = new OffsetPagination({
    limit: 5,
    totalElements: 100
  })

  it('should return the limit per page', () => {
    expect(p.getLimit()).toEqual(5)
  })
})

describe('getNextPage()', () => {
  describe('with pages after', () => {
    const p0 = new OffsetPagination({
      limit: 10,
      page: 5,
      minPage: 0,
      totalElements: 100
    })
    const p1 = new OffsetPagination({
      limit: 10,
      page: 5,
      minPage: 1,
      totalElements: 100
    })

    it('should return the next page', () => {
      expect(p0.getNextPage()).toEqual(6)
      expect(p1.getNextPage()).toEqual(6)
    })

    describe('with argument > 1', () => {
      it('should return the next page', () => {
        expect(p0.getNextPage(2)).toEqual(7)
        expect(p1.getNextPage(2)).toEqual(7)
      })
    })
  })

  describe('with no pages after', () => {
    const p0 = new OffsetPagination({
      limit: 10,
      minPage: 0,
      page: 9,
      totalElements: 100
    })
    const p1 = new OffsetPagination({
      limit: 10,
      minPage: 1,
      page: 10,
      totalElements: 100
    })

    it('should return the last page', () => {
      expect(p0.getNextPage()).toEqual(9)
      expect(p1.getNextPage()).toEqual(10)
    })

    describe('with argument > 1', () => {
      it('should return the last page', () => {
        expect(p0.getNextPage(2)).toEqual(9)
        expect(p1.getNextPage(2)).toEqual(10)
      })
    })
  })
})

describe('getOffset()', () => {
  describe('on first page', () => {
    const p0 = new OffsetPagination({
      limit: 10,
      minPage: 0,
      page: 0,
      totalElements: 100
    })
    const p1 = new OffsetPagination({
      limit: 10,
      minPage: 1,
      page: 1,
      totalElements: 100
    })

    it('should return the offset', () => {
      expect(p0.getOffset()).toEqual(0)
      expect(p1.getOffset()).toEqual(0)
    })
  })

  describe('on last page', () => {
    const p0 = new OffsetPagination({
      limit: 10,
      minPage: 0,
      page: 9,
      totalElements: 100
    })
    const p1 = new OffsetPagination({
      limit: 10,
      minPage: 1,
      page: 10,
      totalElements: 100
    })

    it('should return the offset', () => {
      expect(p0.getOffset()).toEqual(90)
      expect(p1.getOffset()).toEqual(90)
    })
  })
})

describe('getPage()', () => {
  const p0 = new OffsetPagination({
    limit: 10,
    minPage: 0,
    page: 3,
    totalElements: 100
  })
  const p1 = new OffsetPagination({
    limit: 10,
    minPage: 1,
    page: 3,
    totalElements: 100
  })

  it('should return the current page', () => {
    expect(p0.getPage()).toEqual(3)
    expect(p1.getPage()).toEqual(3)
  })
})

describe('getPreviousPage()', () => {
  describe('with pages before', () => {
    const p0 = new OffsetPagination({
      limit: 10,
      minPage: 0,
      page: 5,
      totalElements: 100
    })
    const p1 = new OffsetPagination({
      limit: 10,
      minPage: 1,
      page: 5,
      totalElements: 100
    })

    it('should return the previous page', () => {
      expect(p0.getPreviousPage()).toBe(4)
      expect(p1.getPreviousPage()).toBe(4)
    })

    describe('with argument > 1', () => {
      it('should return the previous page', () => {
        expect(p0.getPreviousPage(2)).toBe(3)
        expect(p1.getPreviousPage(2)).toBe(3)
      })
    })
  })

  describe('with no pages before', () => {
    const p0 = new OffsetPagination({
      limit: 10,
      minPage: 0,
      page: 0,
      totalElements: 100
    })
    const p1 = new OffsetPagination({
      limit: 10,
      minPage: 1,
      page: 1,
      totalElements: 100
    })

    it('should return the first page', () => {
      expect(p0.getPreviousPage()).toBe(0)
      expect(p1.getPreviousPage()).toBe(1)
    })

    describe('with argument > 1', () => {
      it('should return the first page', () => {
        expect(p0.getPreviousPage(2)).toBe(0)
        expect(p1.getPreviousPage(2)).toBe(1)
      })
    })
  })
})

describe('getTotalElements()', () => {
  const p = new OffsetPagination({
    limit: 10,
    totalElements: 100
  })

  it('should return the total', () => {
    expect(p.getTotalElements()).toEqual(100)
  })
})

describe('getTotalPages()', () => {
  describe('with totalElements > 0', () => {
    const p = new OffsetPagination({
      limit: 10,
      totalElements: 100
    })
    it('should return the total pages', () => {
      expect(p.getTotalPages()).toEqual(10)
    })
  })

  describe('with totalElements = 0', () => {
    const p = new OffsetPagination({
      limit: 10,
      totalElements: 0
    })
    it('should return 0', () => {
      expect(p.getTotalPages()).toEqual(0)
    })
  })
})

describe('hasNext()', () => {
  describe('with pages after', () => {
    const p0 = new OffsetPagination({
      limit: 10,
      minPage: 0,
      page: 5,
      totalElements: 100
    })
    const p1 = new OffsetPagination({
      limit: 10,
      minPage: 1,
      page: 5,
      totalElements: 100
    })

    describe('with argument = 1', () => {
      it('should return true', () => {
        expect(p0.hasNext()).toBe(true)
        expect(p1.hasNext()).toBe(true)
      })
    })

    describe('with argument > 1', () => {
      it('should return true', () => {
        expect(p0.hasNext(2)).toBe(true)
        expect(p1.hasNext(2)).toBe(true)
      })
    })

    describe('with argument < 1', () => {
      it('should return true', () => {
        expect(p0.hasNext(0)).toBe(true)
        expect(p1.hasNext(0)).toBe(true)
      })
    })
  })

  describe('with no pages after', () => {
    const p0 = new OffsetPagination({
      limit: 10,
      minPage: 0,
      page: 9,
      totalElements: 100
    })
    const p1 = new OffsetPagination({
      limit: 10,
      minPage: 1,
      page: 10,
      totalElements: 100
    })

    describe('with argument = 1', () => {
      it('should return false', () => {
        expect(p0.hasNext()).toBe(false)
        expect(p1.hasNext()).toBe(false)
      })
    })

    describe('with argument > 1', () => {
      it('should return false', () => {
        expect(p0.hasNext(2)).toBe(false)
        expect(p1.hasNext(2)).toBe(false)
      })
    })

    describe('with argument < 1', () => {
      it('should return false', () => {
        expect(p0.hasNext(-1)).toBe(false)
        expect(p1.hasNext(-1)).toBe(false)
      })
    })
  })
})

describe('hasPrevious()', () => {
  describe('with pages before', () => {
    const p0 = new OffsetPagination({
      limit: 10,
      minPage: 0,
      page: 5,
      totalElements: 100
    })
    const p1 = new OffsetPagination({
      limit: 10,
      minPage: 1,
      page: 5,
      totalElements: 100
    })

    describe('with argument = 1', () => {
      it('should return true', () => {
        expect(p0.hasPrevious()).toBe(true)
        expect(p1.hasPrevious()).toBe(true)
      })
    })

    describe('with argument > 1', () => {
      it('should return true', () => {
        expect(p0.hasPrevious(2)).toBe(true)
        expect(p1.hasPrevious(2)).toBe(true)
      })
    })

    describe('with argument < 1', () => {
      it('should return true', () => {
        expect(p0.hasPrevious(0)).toBe(true)
        expect(p1.hasPrevious(0)).toBe(true)
      })
    })
  })

  describe('with no pages before', () => {
    const p0 = new OffsetPagination({
      limit: 10,
      minPage: 0,
      page: 0,
      totalElements: 100
    })
    const p1 = new OffsetPagination({
      limit: 10,
      minPage: 1,
      page: 1,
      totalElements: 100
    })

    describe('with argument = 1', () => {
      it('should return false', () => {
        expect(p0.hasPrevious()).toBe(false)
        expect(p1.hasPrevious()).toBe(false)
      })
    })

    describe('with argument > 1', () => {
      it('should return false', () => {
        expect(p0.hasPrevious(2)).toBe(false)
        expect(p1.hasPrevious(2)).toBe(false)
      })
    })

    describe('with argument < 1', () => {
      it('should return false', () => {
        expect(p0.hasPrevious(-1)).toBe(false)
        expect(p1.hasPrevious(-1)).toBe(false)
      })
    })
  })
})

describe('isPageValid(page)', () => {
  const p0 = new OffsetPagination({
    limit: 10,
    minPage: 0,
    totalElements: 100
  })
  const p1 = new OffsetPagination({
    limit: 10,
    minPage: 1,
    totalElements: 100
  })

  describe('with page >= first page and <= last page', () => {
    it('should return true', () => {
      expect(p0.isPageValid(0)).toBe(true)
      expect(p0.isPageValid(9)).toBe(true)
      expect(p1.isPageValid(1)).toBe(true)
      expect(p1.isPageValid(10)).toBe(true)
    })
  })
  describe('with page < first page', () => {
    it('should return false', () => {
      expect(p0.isPageValid(-1)).toBe(false)
      expect(p1.isPageValid(0)).toBe(false)
    })
  })
  describe('with page > last page', () => {
    it('should return false', () => {
      expect(p0.isPageValid(100)).toBe(false)
      expect(p1.isPageValid(101)).toBe(false)
    })
  })
})

describe('next()', () => {
  it('should increase offset if there is a page after', () => {
    // todo test with minPage = 0
    const p = new OffsetPagination({
      limit: 10,
      page: 5,
      totalElements: 100
    })
    p.next()
    expect(p.getOffset()).toEqual(50)
  })

  it('should not increase offset if there is no page after', () => {
    // todo test with minPage = 0
    const p = new OffsetPagination({
      limit: 10,
      page: 10,
      totalElements: 100
    })
    p.next()
    expect(p.getOffset()).toEqual(90)
  })
})

describe('previous()', () => {
  it('should decrease offset if there is a page before', () => {
    // todo test with minPage = 0
    const p = new OffsetPagination({
      limit: 10,
      page: 2,
      totalElements: 100
    })
    p.previous()
    expect(p.getOffset()).toEqual(0)
  })

  it('should not decrease offset if there is no page before', () => {
    // todo test with minPage = 0
    const p = new OffsetPagination({
      limit: 10,
      page: 1,
      totalElements: 100
    })
    p.previous()
    expect(p.getOffset()).toEqual(0)
  })
})

describe('setLimit(limit)', () => {
  describe('with limit >= 0', () => {
    it('should change the limit', () => {
      const p = new OffsetPagination({
        limit: 10,
        totalElements: 100
      })
      p.setLimit(0)
      expect(p.getLimit()).toEqual(0)
      p.setLimit(25)
      expect(p.getLimit()).toEqual(25)
    })
  })

  describe('with limit < 0', () => {
    it('should set the limit to 0', () => {
      const p = new OffsetPagination({
        limit: 10,
        totalElements: 100
      })
      p.setLimit(-10)
      expect(p.getLimit()).toEqual(0)
    })
  })
})

describe('setOffset(offset)', () => {
  describe('with offset >= 0', () => {
    it('should change the offset', () => {
      const p = new OffsetPagination({
        limit: 10,
        totalElements: 100
      })
      p.setOffset(0)
      expect(p.getOffset()).toEqual(0)
      p.setOffset(10)
      expect(p.getOffset()).toEqual(10)
    })
  })

  describe('with offset < 0', () => {
    it('should change the offset to 0 if offset is negative', () => {
      const p = new OffsetPagination({
        limit: 10,
        totalElements: 100
      })
      p.setLimit(-10)
      expect(p.getOffset()).toEqual(0)
    })
  })
})

describe('setPage(page)', () => {
  const p0 = new OffsetPagination({
    limit: 10,
    minPage: 0,
    totalElements: 100
  })
  const p1 = new OffsetPagination({
    limit: 10,
    minPage: 1,
    totalElements: 100
  })
  it('should change the page', () => {
    p0.setPage(5)
    expect(p0.getPage()).toEqual(5)
    p1.setPage(5)
    expect(p1.getPage()).toEqual(5)
  })
})

describe('setTotalElements(total)', () => {
  it('should change the total of pages', () => {
    const p = new OffsetPagination({
      limit: 10,
      totalElements: 0
    })
    p.setTotalElements(50)
    expect(p.getTotalElements()).toEqual(50)
  })
})
