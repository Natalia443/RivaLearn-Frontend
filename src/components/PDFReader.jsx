import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFReader() {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isReading, setIsReading] = useState(false);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setIsReading(true);
    setNumPages(numPages);
    setPageNumber(1);
  };

  const renderPagination = () => {
    return (
      <div>
        <button
          className="btn btn-primary me-2 my-2"
          disabled={pageNumber <= 1}
          onClick={() => setPageNumber(pageNumber - 1)}
        >
          Volver
        </button>
        <button
          className="btn btn-primary"
          disabled={pageNumber >= numPages}
          onClick={() => setPageNumber(pageNumber + 1)}
        >
          Siguiente
        </button>
        <p className="text-body-secondary">
          {" "}
          Página {pageNumber} de {numPages}
        </p>
      </div>
    );
  };

  return (
    <div className="container">
      {!isReading && (
        <div className="mb-3">
          <h1 className="form-label">Subir Texto PDF</h1>
          <input
            className="form-control"
            type="file"
            accept="application/pdf"
            onChange={onFileChange}
          />
        </div>
      )}
      {numPages && renderPagination()}
      {file && (
        <div className="container card">
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} scale={1.8} />
          </Document>
        </div>
      )}
      {numPages && renderPagination()}
    </div>
  );
}
