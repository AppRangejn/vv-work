import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md';
}

function Logo({ size = 'md' }: LogoProps) {
  const isSm = size === 'sm';

  return (
    <Link to="/" className="group inline-flex items-center gap-2.5 focus:outline-none">
      <img
        src="/logo.png"
        alt="VV Work Logo"
        className={`object-contain transition-transform duration-150 group-hover:scale-105 ${
          isSm ? 'h-7 w-auto' : 'h-9 w-auto'
        }`}
      />
      <span className="font-black tracking-tight text-zinc-900">
        <span className={isSm ? 'text-base' : 'text-xl'}>VV</span>{' '}
        <span className={`font-extrabold text-zinc-900 ${isSm ? 'text-sm' : 'text-lg'}`}>
          Work
        </span>
      </span>
    </Link>
  );
}

export default Logo;