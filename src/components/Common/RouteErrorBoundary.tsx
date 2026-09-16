import { useNavigate } from 'react-router-dom';

function RouteErrorBoundary() {
  const navigate = useNavigate();

  return (
    <div role="alert" className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-6 text-center">
      <div className="max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-xs">
        <h1 className="text-xl font-black text-zinc-900">Щось пішло не так</h1>
        <p className="mt-2 text-xs text-zinc-500">
          Виникла непередбачена помилка під час завантаження маршруту.
        </p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mt-6 rounded-lg bg-zinc-900 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-zinc-800"
        >
          На головну
        </button>
      </div>
    </div>
  );
}

export default RouteErrorBoundary;