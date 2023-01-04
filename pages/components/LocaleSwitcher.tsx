import Link from "next/link";
import { useRouter } from "next/router";

export default function LocaleSwitcher() {
  const { locales, locale, pathname, query, asPath } = useRouter();
  if (!locales) {
    return <></>;
  }
  //const otherLocales = locales.filter((l) => l !== locale);

  function convertLocaleToCultureName(locale: string) {
    switch (locale) {
      case "en":
        return "English";
      case "fr":
        return "French";
      case "es":
        return "Spanish";
      case "de":
        return "German";
      case "nl":
        return "Dutch";
      case "it":
        return "Italian";
      case "pt":
        return "Portuguese";
      case "en":
        return "English";
    }
  }

  return (
    <>
      {locales.map((locale) => {
        return (
          <Link
            key={locale}
            href={{ pathname, query }}
            as={asPath}
            locale={locale}
          >
            <a>{convertLocaleToCultureName(locale)}</a>
          </Link>
        );
      })}
    </>
  );
}
