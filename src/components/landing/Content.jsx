export default function Content() {
  const content = [
    {
      title: "Aprendé leyendo",
      text: "Leé textos de dominio público adecuados para estudiantes principiantes o subí textos PDF más adaptados a tus necesidades.",
    },
    {
      title: "Inteligencia Artificial",
      text: "Generá historias con las palabras de tus decks o chateá con una Inteligencia Artificial en el idioma que quieras aprender.",
    },
    {
      title: "Decks",
      text: "Creá decks, guardá flashcards, practicá y obtené un feedback instantáneo con nuestras estadísticas.",
    },
  ];

  return (
    <div className="row my-5">
      {content.map((item, index) => (
        <div className="col-md-4" key={index}>
          <div
            className="card"
            style={{
              backgroundColor: "#35aad1",
              color: "white",
              borderColor: "white",
            }}
          >
            <div className="card-body">
              <h3 className="card-title">{item.title}</h3>
              <hr />
              <h5 className="card-text">{item.text}</h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
