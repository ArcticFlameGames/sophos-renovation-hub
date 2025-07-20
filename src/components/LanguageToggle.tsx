import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

export const LanguageToggle = () => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="text-foreground/70 hover:text-foreground"
      aria-label={i18n.language === 'en' ? t('language.french') : t('language.english')}
    >
      <Globe className="h-4 w-4" />
      <span className="ml-2 hidden sm:inline">
        {i18n.language === 'en' ? 'FR' : 'EN'}
      </span>
    </Button>
  );
};