import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error;
  }

  return context;
}

export default useLanguage;