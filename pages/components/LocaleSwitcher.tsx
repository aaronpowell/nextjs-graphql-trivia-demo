import Link from "next/link";
import { useRouter } from "next/router";

export default function LocaleSwitcher() {
  const { locales, locale, pathname, query, asPath } = useRouter();
  if (!locales) {
    return <></>;
  }
  const otherLocales = locales.filter((l) => l !== locale);

  return (
    <>
      {otherLocales.map((locale) => {
        return (
          <Link
            key={locale}
            href={{ pathname, query }}
            as={asPath}
            locale={locale}
          >
            <a>Play in &quot;{locale}&quot;</a>
          </Link>
        );
      })}
    </>
  );
}
