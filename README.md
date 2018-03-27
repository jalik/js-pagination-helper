# PaginationHelper

A helper to handle pagination easily.

## Introduction

Pagination is not a complex thing, but it is tedious when you have to repeat the same code everywhere, plus it can be a pain to maintain, so using a helper is the best thing to do if you don't want to waste your time.

**This library is tested with unit tests.**

## Creating a pagination helper

To create your first pagination helper, see the code below.

```js
import PaginationHelper from "@jalik/pagination-helper";

const pager = new PaginationHelper({
    // The limit per page
    limit: 10,
    // The results offset
    offset: 0,
    // The current page
    page: 1,
    // The result count
    total: 100
});

// Then do what you want with the available methods
pager.getCurrentPage();
pager.getLastPage();
pager.getLimit();
pager.getNextPage();
pager.getOffset();
pager.getPageCount();
pager.getPreviousPage();
pager.getTotal();
pager.hasNext();
pager.hasPrevious();
pager.setCurrentPage(2);
pager.setLimit(25);
pager.setOffset(50);
pager.setTotal(999);
```

## Changelog

History of releases is in the [changelog](./CHANGELOG.md).

## License

The code is released under the [MIT License](http://www.opensource.org/licenses/MIT).
