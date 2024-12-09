import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ReadonlyURLSearchParams } from 'next/navigation';

export default interface navProps {
  searchParams: ReadonlyURLSearchParams;
  replace: (href: string, options?: NavigateOptions) => void;
  pathname: string;
}
