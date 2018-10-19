# @jalik/pagination-helper

A helper to handle pagination easily.

## Introduction

Using a helper class to manage your paginations is the best thing you can do to minimize your code, making it simpler and more readable, with the advantage to reduce the risk of creating bugs by writing your own pagination methods.

It works nice with any Javascript environment (browser, nodejs) and framework (React, Angular, Vue).

**This library has been unit tested.**

## Creating a pagination helper

To create your first pagination helper, take look at the code below.

```js
import PaginationHelper from "@jalik/pagination-helper";

// Creates the pagination.
const pagination = new PaginationHelper({
    // Set the limit per page.
    limit: 10,
    // Set the initial offset
    // used to calculate the page.
    offset: 0,
    // Or set the current page,
    // which will calculate the offset automatically.
    page: 1,
    // Set the total number of elements
    // used to calculate page count.
    total: 200
});

// Compares with another pagination.
// In this case, it returns false because the limit is different.
pagination.equal(new PaginationHelper({limit:15, page:1, total:200}));

// Returns the closest valid page.
// In this case, it returns 20 since the last page is 20.
pagination.getClosestPage(42);

// Returns the last page.
// In this case, it returns 20 (20 = 200 / 10).
pagination.getLastPage();

// Returns the current limit.
pagination.getLimit();

// Returns the next page.
pagination.getNextPage();

// Returns the corresponding offset of a page.
// In this case, it returns 40 (40 = (5 * 10) - 10).
pagination.getOffsetFromPage(5);

// Returns the current offset.
pagination.getOffset();

// Returns the current page.
pagination.getPage();

// Returns the page count.
pagination.getPageCount();

// Returns the corresponding page of an offset.
// In this case, it returns 3 (3 = (20 / 10) + 1).
pagination.getPageFromOffset(20);

// Returns the previous page. 
pagination.getPreviousPage();

// Returns the total number of elements of the pagination.
pagination.getTotal();

// Checks if there is a previous page.
// This would return false if page was the last.
pagination.hasNext();

// Checks if there is a previous page.
// This would return false if page was the first.
pagination.hasPrevious();

// Checks if page is between 1 and page count (inclusive).
// In this case, it returns false because limit is 10 and total is 200,
// which gives a total of 20 pages and 50 is above this value.
pagination.isPageValid(50);

// Sets the pagination limit (used to calculate page count).
pagination.setLimit(25);

// Sets the offset (used to calculate the page.
// Note: you may prefer to use setPage() instead of setOffset().
pagination.setOffset(20);

// Sets the current page (same as setOffset(20)).
pagination.setPage(2);

// Sets the total number of elements of the pagination (used to calculate page count).
pagination.setTotal(999);
```

## Changelog

History of releases is in the [changelog](./CHANGELOG.md).

## License

The code is released under the [MIT License](http://www.opensource.org/licenses/MIT).
