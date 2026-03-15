import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type LocationLike = {
  pathname: string;
  search: string;
  hash: string;
};

type NavigateOptions = {
  replace?: boolean;
};

type SearchParamValue = string | number | boolean | null | undefined;
type SearchParamsInit = URLSearchParams | string | Record<string, SearchParamValue>;

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> &
  Omit<NextLinkProps, "href"> & {
    to: string;
  };

type NavLinkProps = Omit<LinkProps, "className"> & {
  className?: string | ((state: { isActive: boolean }) => string);
  end?: boolean;
  children: ReactNode;
};

function parsePath(asPath: string): LocationLike {
  const [pathAndSearch, hashPart = ""] = asPath.split("#");
  const [pathname = "/", searchPart = ""] = pathAndSearch.split("?");

  return {
    pathname: pathname || "/",
    search: searchPart ? `?${searchPart}` : "",
    hash: hashPart ? `#${hashPart}` : "",
  };
}

function buildSearchParams(init: SearchParamsInit) {
  if (init instanceof URLSearchParams) {
    return new URLSearchParams(init);
  }

  if (typeof init === "string") {
    return new URLSearchParams(init);
  }

  const params = new URLSearchParams();
  Object.entries(init).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }
    params.set(key, String(value));
  });
  return params;
}

function isRootPath(pathname: string) {
  return pathname === "/";
}

export function Link({ to, children, ...props }: LinkProps) {
  return (
    <NextLink href={to} {...props}>
      {children}
    </NextLink>
  );
}

export function NavLink({ to, className, end = false, children, ...props }: NavLinkProps) {
  const location = useLocation();
  const isActive = end || isRootPath(to)
    ? location.pathname === to
    : location.pathname === to || location.pathname.startsWith(`${to}/`);
  const resolvedClassName = typeof className === "function" ? className({ isActive }) : className;

  return (
    <Link to={to} className={resolvedClassName} {...props}>
      {children}
    </Link>
  );
}

export function useLocation(): LocationLike {
  const router = useRouter();
  return parsePath(router.asPath || router.pathname || "/");
}

export function useNavigate() {
  const router = useRouter();

  return useCallback((to: string, options?: NavigateOptions) => {
    const method = options?.replace ? router.replace : router.push;
    return method(to);
  }, [router]);
}

export function useParams<T extends Record<string, string | string[] | undefined> = Record<string, string | string[] | undefined>>() {
  const router = useRouter();
  return router.query as T;
}

export function useSearchParams(): [URLSearchParams, (nextInit: SearchParamsInit) => Promise<boolean>] {
  const router = useRouter();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const setSearchParams = (nextInit: SearchParamsInit) => {
    const nextParams = buildSearchParams(nextInit);
    const nextSearch = nextParams.toString();
    const nextUrl = nextSearch ? `${location.pathname}?${nextSearch}` : location.pathname;
    return router.push(nextUrl, undefined, { shallow: true, scroll: false });
  };

  return [searchParams, setSearchParams];
}
