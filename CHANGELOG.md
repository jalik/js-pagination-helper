# Changelog

## v3.0.0 (2024-02-27)

- **[BREAKING CHANGE]** Renamed option `total` to `totalElements`
- **[BREAKING CHANGE]** Renamed `getTotal()` to `getTotalElements()`
- **[BREAKING CHANGE]** Renamed `setTotal()` to `setTotalElements()`
- **[BREAKING CHANGE]** Renamed `equal()` to `equals()`
- **[BREAKING CHANGE]** Renamed class `PaginationHelper` to `OffsetPagination`
- **[BREAKING CHANGE]** Use named export for `OffsetPagination` (removed default export)
- Added argument to `getNextPage(increment: number = 1)` to set increment
- Added argument to `getPreviousPage(increment: number = 1)` to set increment
- Added argument to `hasNext(increment: number = 1)` to set increment
- Added argument to `hasPrevious(increment: number = 1)` to set increment
- Added option `minPage?: number`
- Added option `maxLimit?: number`
- Added `getMaxLimit()`
- Added `getFirstPage()`
- Fixed `getTotalPages()` to return `0` when `totalElements` is `0`

## v2.0.6 (2021-09-20)

- Upgraded dependencies

## v2.0.5 (2021-05-18)

- Upgraded dependencies

## v2.0.4 (2021-01-18)

- Upgraded dependencies

## v2.0.3 (2020-11-10)

- Added `esnext` and `sideEffects` in package.json
- Renamed pagination-helper.js to PaginationHelper.js
- Upgraded dependencies

## v2.0.2 (2020-09-17)

- Upgraded dependencies

## v2.0.1 (2020-08-06)

- Upgraded dependencies

## v2.0.0 (2020-04-22)

- **[BREAKING CHANGE]** Removed method `formatPageLink()`
- **[BREAKING CHANGE]** Removed method `preparePageLink()`
- Upgraded dependencies

## v1.2.4 (2020-02-18)

- Upgraded dependencies

## v1.2.3 (2019-12-02)

- Upgraded dependencies

## v1.2.2 (2019-07-24)

- Upgraded dependencies

## v1.2.1 (2019-02-26)

- Upgraded dependencies

## v1.2.0 (2019-02-07)

- Lib available in ES6+ syntax (see `src` folder) to enable auto-completion in IDEs
- Upgraded dependencies

## v1.1.1 (2019-01-17)

- Upgraded dependencies

## v1.1.0 (2018-10-19)

- Added method `pagination.equal(pagination)` to check if two paginations are equals

## v1.0.2 (2018-06-07)

- Upgraded dependencies

## v1.0.1 (2018-03-29)

- Formatted code using `airbnb` ESLint preset

## v1.0.0

- First public release
