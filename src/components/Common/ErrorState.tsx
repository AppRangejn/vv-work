interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
  retryText?: string;
}

export function ErrorState({
  message = 'Помилка завантаження даних',
  onRetry,
  retryText = 'Спробувати знову',
}: ErrorStateProps) {
  return (
    <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
      <h3 className="text-base font-bold text-red-900">{message}</h3>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded-lg bg-red-600 px-5 py-2 text-xs font-bold uppercase text-white transition hover:bg-red-700"
      >
        {retryText}
      </button>
    </div>
  );
}