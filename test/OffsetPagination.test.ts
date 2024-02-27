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
  const p = new OffsetPagination({
    limit: 10,
    page: 1,
    totalElements: 100
  })

  it('should return 1 if page is 0', () => {
    expect(p.getClosestPage(0)).toEqual(1)
  })

  it('should return the last page if page is above page count', () => {
    expect(p.getClosestPage(25)).toEqual(10)
  })

  it('should return the same page if there nothing to fix', () => {
    expect(p.getClosestPage(5)).toEqual(5)
  })
})

describe('getLastPage()', () => {
  const p = new OffsetPagination({
    limit: 10,
    page: 1,
    totalElements: 100
  })

  it('should return the last page', () => {
    expect(p.getLastPage()).toEqual(10)
  })
})

describe('getLimit()', () => {
  const p = new OffsetPagination({
    limit: 5,
    page: 1,
    totalElements: 100
  })

  it('should return the limit per page', () => {
    expect(p.getLimit()).toEqual(5)
  })
})

describe('getNextPage()', () => {
  it('should return the next page if there is a page after', () => {
    const p = new OffsetPagination({
      limit: 10,
      page: 5,
      totalElements: 100
    })
    expect(p.getNextPage()).toEqual(6)
  })

  it('should return the last page if there is no page after', () => {
    const p = new OffsetPagination({
      limit: 10,
      page: 10,
      totalElements: 100
    })
    expect(p.getNextPage()).toEqual(10)
  })

  describe('with argument > 1', () => {
    it('should return the page + N if there is a page after', () => {
      const p = new OffsetPagination({
        limit: 10,
        page: 5,
        totalElements: 100
      })
      expect(p.getNextPage(2)).toEqual(7)
    })
  })
})

describe('getOffset()', () => {
  it('should return the offset', () => {
    const p1 = new OffsetPagination({
      limit: 10,
      page: 1,
      totalElements: 100
    })
    const p2 = new OffsetPagination({
      limit: 10,
      page: 5,
      totalElements: 100
    })
    expect(p1.getOffset()).toEqual(0)
    expect(p2.getOffset()).toEqual(40)
  })
})

describe('getPage()', () => {
  const p = new OffsetPagination({
    limit: 10,
    page: 3,
    totalElements: 100
  })

  it('should return the current page', () => {
    expect(p.getPage()).toEqual(3)
  })
})

describe('getPreviousPage()', () => {
  it('should return the previous page if there is a page before', () => {
    const p = new OffsetPagination({
      limit: 10,
      page: 5,
      totalElements: 100
    })
    expect(p.getPreviousPage()).toEqual(4)
  })

  it('should return the first page if there is no page before', () => {
    const p = new OffsetPagination({
      limit: 10,
      page: 1,
      totalElements: 100
    })
    expect(p.getPreviousPage()).toEqual(1)
  })

  describe('with argument > 1', () => {
    it('should return the page - N if there is a page before', () => {
      const p = new OffsetPagination({
        limit: 10,
        page: 5,
        totalElements: 100
      })
      expect(p.getPreviousPage(2)).toEqual(3)
    })
  })
})

describe('getTotalElements()', () => {
  const p = new OffsetPagination({
    limit: 10,
    page: 1,
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
      page: 1,
      totalElements: 100
    })
    it('should return the page count', () => {
      expect(p.getTotalPages()).toEqual(10)
    })
  })

  describe('with totalElements = 0', () => {
    const p = new OffsetPagination({
      limit: 10,
      page: 1,
      totalElements: 0
    })
    it('should return 0', () => {
      expect(p.getTotalPages()).toEqual(0)
    })
  })
})

describe('hasNext()', () => {
  it('should return true if there is a page after', () => {
    const p = new OffsetPagination({
      limit: 10,
      page: 5,
      totalElements: 100
    })
    expect(p.hasNext()).toEqual(true)
  })

  it('should return false if there is no page after', () => {
    const p = new OffsetPagination({
      limit: 10,
      page: 10,
      totalElements: 100
    })
    expect(p.hasNext()).toEqual(false)
  })

  describe('with argument > 1', () => {
    it('should return true if there is a page after', () => {
      const p = new OffsetPagination({
        limit: 10,
        page: 5,
        totalElements: 100
      })
      expect(p.hasNext(2)).toEqual(true)
    })
  })
})

describe('hasPrevious()', () => {
  it('should return true if there is a page before', () => {
    const p = new OffsetPagination({
      limit: 10,
      page: 5,
      totalElements: 100
    })
    expect(p.hasPrevious()).toEqual(true)
  })

  it('should return false if there is no page before', () => {
    const p = new OffsetPagination({
      limit: 10,
      page: 1,
      totalElements: 100
    })
    expect(p.hasPrevious()).toEqual(false)
  })

  describe('with argument > 1', () => {
    it('should return true if there is a page before', () => {
      const p = new OffsetPagination({
        limit: 10,
        page: 5,
        totalElements: 100
      })
      expect(p.hasPrevious(2)).toEqual(true)
    })
  })
})

describe('isPageValid(page)', () => {
  const p = new OffsetPagination({
    limit: 10,
    page: 1,
    totalElements: 100
  })

  it('should return false if page is below 1', () => {
    expect(p.isPageValid(0)).toEqual(false)
  })

  it('should return true if page is in valid range', () => {
    expect(p.isPageValid(1)).toEqual(true)
  })

  it('should return false if page is above page count', () => {
    expect(p.isPageValid(300)).toEqual(false)
  })
})

describe('next()', () => {
  it('should increase offset if there is a page after', () => {
    const p = new OffsetPagination({
      limit: 10,
      page: 5,
      totalElements: 100
    })
    p.next()
    expect(p.getOffset()).toEqual(50)
  })

  it('should not increase offset if there is no page after', () => {
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
    const p = new OffsetPagination({
      limit: 10,
      page: 2,
      totalElements: 100
    })
    p.previous()
    expect(p.getOffset()).toEqual(0)
  })

  it('should not decrease offset if there is no page before', () => {
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
  it('should change the limit per page', () => {
    const p = new OffsetPagination({
      limit: 10,
      page: 1,
      totalElements: 100
    })
    p.setLimit(25)
    expect(p.getLimit()).toEqual(25)
  })

  it('should change the limit to 0 if limit is negative', () => {
    const p = new OffsetPagination({
      limit: 10,
      page: 1,
      totalElements: 100
    })
    p.setLimit(-1)
    expect(p.getLimit()).toEqual(0)
  })
})

describe('setOffset(offset)', () => {
  it('should change the offset', () => {
    const p = new OffsetPagination({
      limit: 10,
      page: 1,
      totalElements: 100
    })
    p.setOffset(25)
    expect(p.getOffset()).toEqual(25)
  })

  it('should change the offset to 0 if offset is negative', () => {
    const p = new OffsetPagination({
      limit: 10,
      page: 1,
      totalElements: 100
    })
    p.setLimit(-1)
    expect(p.getOffset()).toEqual(0)
  })
})

describe('setPage(page)', () => {
  it('should change the page', () => {
    const p = new OffsetPagination({
      limit: 10,
      page: 1,
      totalElements: 100
    })
    p.setPage(5)
    expect(p.getPage()).toEqual(5)
  })
})

describe('setTotalElements(total)', () => {
  it('should change the total of pages', () => {
    const p = new OffsetPagination({
      limit: 10,
      page: 1,
      totalElements: 0
    })
    p.setTotalElements(50)
    expect(p.getTotalElements()).toEqual(50)
    expect(p.getTotalPages()).toEqual(5)
  })
})
