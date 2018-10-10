# Pagination Helper

A helper to handle pagination easily.

## Introduction

Pagination is not a complex thing, but it is tedious when you have to repeat the same code everywhere, plus it can be a pain to maintain, so using a helper is the best thing to do if you don't want to waste your time.

**This library is tested with unit tests.**

## Creating a pagination helper

To create your first pagination helper, take look at the code below.

```js
import PaginationHelper from "@jalik/pagination-helper";

const helper = new PaginationHelper({
    // The limit per page
    limit: 10,
    // The results offset
    offset: 0,
    // The current page
    page: 1,
    // The result count
    total: 200
});

// Then do what you want with the available methods
helper.getClosestPage(256); // returns 200
helper.getLastPage(); // returns 10
helper.getLimit();
helper.getNextPage();
helper.getOffsetFromPage(10); // returns 90
helper.getOffset();
helper.getPage();
helper.getPageCount();
helper.getPageFromOffset(10); // returns 2
helper.getPreviousPage();
helper.getTotal();
helper.hasNext();
helper.hasPrevious();
helper.isPageValid(50); // returns true
helper.setLimit(25);
helper.setOffset(50);
helper.setPage(2);
helper.setTotal(999);
```

## Changelog

History of releases is in the [changelog](./CHANGELOG.md).

## License

The code is released under the [MIT License](http://www.opensource.org/licenses/MIT).
