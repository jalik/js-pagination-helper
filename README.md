# @jalik/pagination-helper

![GitHub package.json version](https://img.shields.io/github/package-json/v/jalik/js-pagination-helper.svg)
[![Build Status](https://travis-ci.com/jalik/js-pagination-helper.svg?branch=master)](https://travis-ci.com/jalik/js-pagination-helper)
![GitHub](https://img.shields.io/github/license/jalik/js-pagination-helper.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/jalik/js-pagination-helper.svg)
[![GitHub issues](https://img.shields.io/github/issues/jalik/js-pagination-helper.svg)](https://github.com/jalik/js-pagination-helper/issues)
![npm](https://img.shields.io/npm/dt/@jalik/pagination-helper.svg)

Create and manipulate paginations fast and easy.

## Features

* Handle offset based paginations
* Get calculated page numbers (first, previous, next, last)
* Get calculated total pages
* TypeScript declarations ♥
* 50+ tests

## Creating an offset pagination

```ts
import { OffsetPagination } from '@jalik/pagination-helper'

// Creates the pagination.
const pagination = new OffsetPagination({
  // Set the limit per page.
  limit: 10,
  // (optional) Set the maxmimum value for limit.
  // maxLimit will be used if limit is above when calling setLimit().
  maxLimit: 100,
  // (optional) Set the first page (1 by default)
  minPage: 1,
  // (optional) Set the initial offset (0 by default).
  offset: 0,
  // (optional) set the initial offset using a page number.
  // If present, it will be used instead of offset.
  page: 1,
  // Set the total number of elements.
  // Pass 0 if you don't have the value initially, then call setTotalElements() later.
  totalElements: 200
})

// Returns a boolean indicating if both paginations are equal.
pagination.equals(new OffsetPagination({ limit: 15, page: 1, totalElements: 200 }))

// Returns the closest valid page (first/last), or the input page if valid.
pagination.getClosestPage(42)

// Returns the first page (see minPage option)
pagination.getFirstPage()

// Returns the last page.
pagination.getLastPage()

// Returns the current limit.
pagination.getLimit()

// Returns the maximum value for limit.
pagination.getMaxLimit()

// Returns the next page.
pagination.getNextPage()
// Returns the next nth page.
pagination.getNextPage(2)

// Returns the current offset.
pagination.getOffset()

// Returns the corresponding offset of a page.
pagination.getOffsetFromPage(5)

// Returns the current page.
pagination.getPage()

// Returns the corresponding page of an offset.
pagination.getPageFromOffset(20)

// Returns the previous page.
pagination.getPreviousPage()
// Returns the previous nth page.
pagination.getPreviousPage(2)

// Returns the total number of elements of the pagination.
pagination.getTotalElements()

// Returns the page count.
pagination.getTotalPages()

// Checks if there is a page after.
pagination.hasNext()
// Checks if there are two pages after.
pagination.hasNext(2)

// Checks if there is a page before.
pagination.hasPrevious()
// Checks if there are two pages before.
pagination.hasPrevious(2)

// Checks if page is between first page (included) and last page (included).
pagination.isPageValid(50)

// Update offset using next page (if available).
pagination.next()

// Update offset using previous page (if available).
pagination.previous()

// Sets the pagination limit (used to calculate page count).
pagination.setLimit(25)

// Sets the offset (used to calculate the page.
// Note: you may prefer to use setPage() instead of setOffset().
pagination.setOffset(20)

// Sets the current page (same as setOffset(20)).
pagination.setPage(2)

// Sets the total number of elements.
pagination.setTotalElements(999)
```

## Changelog

History of releases is in the [changelog](./CHANGELOG.md).

## License

The code is released under the [MIT License](http://www.opensource.org/licenses/MIT).
