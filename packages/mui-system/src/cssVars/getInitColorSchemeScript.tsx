import * as React from 'react';

export const DEFAULT_MODE_STORAGE_KEY = 'mui-mode';
export const DEFAULT_COLOR_SCHEME_STORAGE_KEY = 'mui-color-scheme';
export const DEFAULT_ATTRIBUTE = 'data-mui-color-scheme';

export default function getInitColorSchemeScript(options?: {
  defaultMode?: 'light' | 'dark' | 'system';
  defaultLightColorScheme?: string;
  defaultDarkColorScheme?: string;
  modeStorageKey?: string;
  colorSchemeStorageKey?: string;
  attribute?: string;
}) {
  const {
    defaultMode = 'light',
    defaultLightColorScheme = 'light',
    defaultDarkColorScheme = 'dark',
    modeStorageKey = DEFAULT_MODE_STORAGE_KEY,
    colorSchemeStorageKey = DEFAULT_COLOR_SCHEME_STORAGE_KEY,
    attribute = DEFAULT_ATTRIBUTE,
  } = options || {};
  return (
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `(function() { try {
        var mode = localStorage.getItem('${modeStorageKey}');
        var colorScheme = '';
        if (mode === 'system' || (!mode && ${defaultMode} === 'system')) {
          // handle system mode
          var mql = window.matchMedia('(prefers-color-scheme: dark)');
          if (mql.matches) {
            colorScheme = localStorage.getItem('${colorSchemeStorageKey}-dark') || ${defaultLightColorScheme};
          } else {
            colorScheme = localStorage.getItem('${colorSchemeStorageKey}-light') || ${defaultDarkColorScheme};
          }
        }
        if (mode === 'light') {
          colorScheme = localStorage.getItem('${colorSchemeStorageKey}-light') || ${defaultLightColorScheme};
        }
        if (mode === 'dark') {
          colorScheme = localStorage.getItem('${colorSchemeStorageKey}-dark') || ${defaultDarkColorScheme};
        }
        if (colorScheme) {
          document.body.setAttribute('${attribute}', colorScheme);
        }
      } catch (e) {} })();`,
      }}
    />
  );
}
