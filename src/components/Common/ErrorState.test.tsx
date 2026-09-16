import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorState } from './ErrorState';

describe('ErrorState component (Retry logic)', () => {
  it('відображає текст помилки та кнопку ретраю', () => {
    render(<ErrorState message="Помилка мережі" onRetry={() => {}} />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Помилка мережі')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /спробувати знову/i })).toBeInTheDocument();
  });

  it('викликає onRetry колбек при натисканні на кнопку повтору', async () => {
    const user = userEvent.setup();
    const handleRetry = vi.fn();

    render(<ErrorState onRetry={handleRetry} />);
    const retryBtn = screen.getByRole('button', { name: /спробувати знову/i });

    await user.click(retryBtn);
    expect(handleRetry).toHaveBeenCalledTimes(1);
  });
});