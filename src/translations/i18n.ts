import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      'app-name': 'Pokedex',
      error: 'Error occurred',
      history: 'Search history',
      'history-empty': 'Search history is empty',
      loading: 'Loading',
      loadmore: 'Load more »',
      'nothing-found': 'Nothing found',
      pokemon: {
        abilities: 'Abilities:',
        back: 'Go back',
        evolution: 'Evolution chain:',
        moves: 'Moves:',
        spieces: 'Spieces:',
        sprites: 'Sprites:',
      },
      search: 'Search »',
      searchfor: 'Searching for: ',
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    interpolation: {
      escapeValue: false, // react already safes from xss
    },

    lng: 'en',

    resources,
  });

// default language
i18n.changeLanguage('en-US');
export default i18n;
