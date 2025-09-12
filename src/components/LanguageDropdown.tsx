import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';
import { Languages, Check } from 'lucide-react';

const LanguageDropdown: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'English', flag: '🇨🇦' },
    { code: 'fr', label: 'Français', flag: '⚜️' },
    { code: 'bn', label: 'বাংলা', flag: '🇧🇩' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode as 'en' | 'fr' | 'bn');
    setOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="language-dropdown-trigger bg-background/20 backdrop-blur-sm border border-white/20 hover:bg-background/30 hover:border-white/30 transition-all duration-300 shadow-lg"
            aria-label="Select language"
          >
            <Languages className="w-4 h-4 mr-2" />
            <span className="font-medium text-sm">
              {currentLanguage.flag} {currentLanguage.label}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="language-dropdown-content bg-background/90 backdrop-blur-sm border border-white/20 shadow-xl min-w-[160px]"
        >
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className="language-dropdown-item cursor-pointer hover:bg-primary/10 focus:bg-primary/10 transition-colors"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{lang.flag}</span>
                  <span className="font-medium">{lang.label}</span>
                </div>
                {language === lang.code && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageDropdown;
