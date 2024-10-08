import React, { memo } from "react";
import LangList from "./LangList";
import sourceLang from "./sourceLang.js";
import targetLang from "./targetLang.js";

const LanguageDropdowns = memo(function LanguageDropdowns({
  isTranslate = true,
  selectedLanguage,
  selectedTranslation,
  handleLanguageChange,
  handleTranslationChange,
}) {
  const sourceLangList = (
    <LangList
      selectedLang={selectedLanguage}
      handler={handleLanguageChange}
      languages={sourceLang}
    >
      Idioma
    </LangList>
  );

  const targetLangList = (
    <LangList
      selectedLang={selectedTranslation}
      handler={handleTranslationChange}
      languages={targetLang}
    >
      Traducción
    </LangList>
  );

  return isTranslate ? (
    <div className="d-flex">
      {sourceLangList}
      {targetLangList}
    </div>
  ) : (
    sourceLangList
  );
});

export default LanguageDropdowns;
