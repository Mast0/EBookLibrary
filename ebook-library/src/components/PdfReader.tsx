import { useParams, useNavigate } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import { useEffect, useState,  } from "react";
import { getBookPdf } from "../services/api";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import '../styles/PdfReader.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
};

const MAX_RETRIES = 5;

export interface Reading {
  user_id: string;
  book_id: string;
  current_page: number;
}

const PdfReader = () => {
    const { id } = useParams<{ id: string }>();
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [file, setFile] = useState<string | null>(null);
    const [retryCount, setRetryCount] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const fetchPdf = async (attempt = 1) => {
        try {
          if (!id) {
            setError("No book ID provided");
            return;
          }
    
          const timeout = new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), 5000)
          );
    
          const blobUrl = await Promise.race([getBookPdf(id), timeout]);
    
          setFile(blobUrl);
          setError(null);
        } catch (err) {
          if (attempt < MAX_RETRIES) {
            console.warn(`Retrying to load PDF... Attempt ${attempt + 1}`);
            setTimeout(() => fetchPdf(attempt + 1), 1000 * attempt);
          } else {
            console.error("Failed to load PDF after retries:", err);
            setError("Failed to load PDF.");
          }
        }
      };
    

    useEffect(() => {
        fetchPdf();
    }, [id]);

    const onDocumentLoadSuccess = ({numPages}: {numPages: number}) => {
        setNumPages(numPages);
        setPageNumber(1);
    };

    const onDocumentLoadError = (err: Error) => {
        console.error("PDF render error:", err);
        if (retryCount < MAX_RETRIES) {
          setRetryCount(retryCount + 1);
          fetchPdf(retryCount + 1);
        } else {
          setError("Unable to load PDF document.");
        }
      };

      const handlePageClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const bounds = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX;
      
        if (clickX < bounds.left + bounds.width / 2) {
          setPageNumber((prev) => Math.max(prev - 1, 1));
        } else {
          setPageNumber((prev) => (numPages && prev < numPages ? prev + 1 : prev));
        }
      };
      

      return (
        <div className="pdf-reader">
          {file ? (
            <>
              <div className="page-clickable-area" onClick={handlePageClick}>
                <Document
                  file={file}
                  options={options}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                >
                  <Page pageNumber={pageNumber} />
                </Document>
              </div>
      
              <div className="controls">
                <button onClick={() => setPageNumber(p => Math.max(p - 1, 1))} disabled={pageNumber <= 1}>←</button>
                <span>Page {pageNumber} of {numPages}</span>
                <button onClick={() => setPageNumber(p => (numPages && p < numPages ? p + 1 : p))} disabled={pageNumber === numPages}>→</button>
              </div>
            </>
          ) : (
            <p>Loading PDF...</p>
          )}
        </div>
      );
      
};

export default PdfReader;