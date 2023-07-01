import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(localStorage.getItem('language') === 'en'? 'עברית' : 'English')

  const handleLanguageChange = () => {

    if (language === 'עברית') {
      i18n.changeLanguage('he');
      setLanguage('English')
      localStorage.setItem("language", 'he');
    } else {
      i18n.changeLanguage('en');
      setLanguage('עברית')
      localStorage.setItem("language", 'en');
    }
    window.location.reload()
  };

  return (
    <div onClick={handleLanguageChange}>{language}</div>
  );

}