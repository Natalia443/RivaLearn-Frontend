import faq from "./faq.js";

export default function Faq() {
  return (
    <div
      className="row  flex-grow-1"
      style={{ backgroundColor: "#212121", color: "white", padding: "20px" }}
    >
      <div className="col-md-6 offset-md-3">
        <h2 className="text-center mb-4">Preguntas Frecuentes</h2>
        <div
          className="accordion"
          id="faqAccordion"
          style={{
            "--bs-accordion-btn-color": "#35aad1",
            "--bs-accordion-btn-bg": "#212121",
            "--bs-accordion-active-color": "#212121",
            "--bs-accordion-active-bg": "#35aad1",
            "--bs-accordion-border-color": "#35aad1",
          }}
        >
          {faq.map((item, index) => (
            <div className="accordion-item" key={index}>
              <h3 className="accordion-header" id={`faqHeading${index}`}>
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#faqCollapse${index}`}
                  aria-expanded="false"
                  aria-controls={`faqCollapse${index}`}
                >
                  {item.question}
                </button>
              </h3>
              <div
                id={`faqCollapse${index}`}
                className="accordion-collapse collapse"
                aria-labelledby={`faqHeading${index}`}
                data-bs-parent="#faqAccordion"
              >
                <div
                  className="accordion-body"
                  style={{ backgroundColor: "#212121", color: "white" }}
                >
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
