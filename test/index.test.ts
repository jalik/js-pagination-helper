/*
 * The MIT License (MIT)
 * Copyright (c) 2024 Karl STEIN
 */

import { describe, expect, it } from 'vitest'
import { OffsetPagination } from '../src'

describe('OffsetPagination', () => {
  it('should be importable from package', () => {
    expect(typeof OffsetPagination).toEqual('function')
  })
})
