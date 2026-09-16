import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useDebounce from './useDebounce';

describe('useDebounce hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('повертає початкове значення негайно', () => {
    const { result } = renderHook(() => useDebounce('початкове', 350));
    expect(result.current).toBe('початкове');
  });

  it('не оновлює значення раніше заданого таймуту', () => {
    const { result, rerender } = renderHook(
      ({ val, delay }) => useDebounce(val, delay),
      { initialProps: { val: 'текст 1', delay: 350 } }
    );

    rerender({ val: 'текст 2', delay: 350 });

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe('текст 1');
  });

  it('оновлює значення точно після закінчення таймуту', () => {
    const { result, rerender } = renderHook(
      ({ val, delay }) => useDebounce(val, delay),
      { initialProps: { val: 'перше', delay: 350 } }
    );

    rerender({ val: 'друге', delay: 350 });

    act(() => {
      vi.advanceTimersByTime(350);
    });
    expect(result.current).toBe('друге');
  });

  it('скидає попередній таймер при швидких змінах (debounce behavior)', () => {
    const { result, rerender } = renderHook(
      ({ val, delay }) => useDebounce(val, delay),
      { initialProps: { val: 'a', delay: 300 } }
    );

    rerender({ val: 'ab', delay: 300 });
    act(() => {
      vi.advanceTimersByTime(150);
    });

    rerender({ val: 'abc', delay: 300 });
    act(() => {
      vi.advanceTimersByTime(150);
    });

    expect(result.current).toBe('a');

    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(result.current).toBe('abc');
  });
});