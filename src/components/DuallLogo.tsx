import duallLogoUrl from '../assets/images/logo-duall-horizontal.png';
import duallLogoWhiteUrl from '../assets/images/logo-duall-horizontal-branco.png';

interface DuallLogoProps {
  isDark?: boolean;
}

export default function DuallLogo({ isDark = false }: DuallLogoProps) {
  return (
    <img
      src={isDark ? duallLogoWhiteUrl : duallLogoUrl}
      alt="Duall Engenharia"
      className="h-14 w-auto select-none"
    />
  );
}
