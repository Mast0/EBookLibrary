import { useParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import { useEffect, useState } from "react";
import { getBookPdf } from "../services/api";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import '../styles/PdfReader.css';
import type { PDFDocumentProxy } from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
};


const PdfReader = () => {
    const { id } = useParams<{ id: string }>();
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [file, setFile] = useState<string | null>(null);

    useEffect(() => {
        const fetchPdf = async () => {
            try{
                if (id){
                    const blobUrl = await getBookPdf(id);
                    setFile(blobUrl);
                }
                else {
                    console.error("Have no ID");
                }
            } catch (error) {
                console.error("Error loading PDF:", error);
            }
        }

        fetchPdf();
    }, [id]);

    const onDocumentLoadSuccess = ({numPages}: {numPages: number}) => {
        setNumPages(numPages);
        setPageNumber(1);
    };

    return (
        <div className="pdf-reader">
            {file ? (
                <>
                    <Document file={file} options={options} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={pageNumber}></Page>
                    </Document>
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