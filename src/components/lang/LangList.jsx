export default function LangList({
  children,
  selectedLang,
  handler,
  languages,
}) {
  return (
    <select
      className="form-select me-2"
      style={{ width: "auto" }}
      value={selectedLang || ""}
      onChange={handler}
    >
      <option value="" disabled>
        {children}
      </option>
      {languages.map((lang, index) => (
        <option key={index} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
}
