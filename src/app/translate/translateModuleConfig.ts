import { TranslateModuleConfig } from '@ngx-translate/core';
import { translateLoaderProvider } from './translateLoaderProvider';
import { TranslateSettings } from './TranslateSettings';
let lastLanguage: string | any;
if (typeof localStorage !== 'undefined') {
  lastLanguage = localStorage.getItem(`keo-language`);
}

export const translateModuleConfig: TranslateModuleConfig = {
  defaultLanguage: lastLanguage != null ? lastLanguage : TranslateSettings.DEFAULT_LANGUAGE,
  loader: translateLoaderProvider,
  useDefaultLang: TranslateSettings.USE_DEFAULT_LANG,
};
