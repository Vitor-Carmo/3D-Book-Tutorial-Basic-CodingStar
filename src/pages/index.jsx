import { useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Container } from "../styles/pages/home";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function Home() {
  const [currentLocation, setCurrentLocation] = useState(1);
  const [numOfPapers, setNumOfPapers] = useState(1);

  let maxLocation = numOfPapers + 1;

  const book = useRef(null);
  const prevBtn = useRef(null);
  const nextBtn = useRef(null);

  const openBook = () => {
    book.current.style.transform = "translateX(50%)";
    prevBtn.current.style.transform = "translateX(-180px)";
    nextBtn.current.style.transform = "translateX(180px)";
  };

  const closeBook = (isAtBeginning) => {
    if (isAtBeginning) {
      book.current.style.transform = "translateX(0%)";
    } else {
      book.current.style.transform = "translateX(100%)";
    }

    prevBtn.current.style.transform = "translateX(0px)";
    nextBtn.current.style.transform = "translateX(0px)";
  };

  const goNextPage = () => {
    const pageRef = document.getElementById(`paper-${currentLocation}`);
    if (currentLocation < maxLocation) {
      if (currentLocation == 1) {
        openBook();
      }
      pageRef.classList.add("flipped");
      setTimeout(() => {
        pageRef.style.zIndex = currentLocation;
      }, 200);

      if (currentLocation === numOfPapers) {
        closeBook(false);
      }

      setCurrentLocation((currentLocation) => currentLocation + 1);
    }
  };

  const goPrevPage = () => {
    const pageRef = document.getElementById(`paper-${currentLocation - 1}`);

    if (currentLocation > 1) {
      if (currentLocation === 2) {
        closeBook(true);
      }

      pageRef.classList.remove("flipped");
      setTimeout(() => {
        pageRef.style.zIndex = Math.ceil(numOfPapers - (currentLocation - 2));
      }, 200);

      if (numOfPapers === currentLocation - 1) {
        openBook();
      }
      setCurrentLocation((currentLocation) => currentLocation - 1);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumOfPapers(Math.ceil(numPages / 2));
  };

  const runCallback = (cb) => {
    return cb();
  };

  return (
    <Container>
      <button ref={prevBtn} id="prev-btn" onClick={goPrevPage}>
        <i className="fas fa-arrow-circle-left" />
      </button>

      <Document
        file="https://cors-anywhere.herokuapp.com/https://admin.gosp.app/uploads/revista-luzes_ed-58.pdf"
        id="book"
        inputRef={book}
        className="book"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {runCallback(() => {
          const pages = [];
          for (let index = 0; index < numOfPapers; index++) {
            pages.push(
              <div
                style={{
                  zIndex: Math.ceil(numOfPapers - index),
                }}
                className="paper"
                id={`paper-${index + 1}`}
                key={index}
              >
                <div className="front">
                  <Page
                    id="f1"
                    pageNumber={index * 2 - 1 + 2}
                    height={500}
                    width={350}
                    className={`front-content ${index * 2 - 1 + 2}`}
                  />
                </div>
                <div className="back">
                  <Page
                    id="b1"
                    pageNumber={index * 2 + 2}
                    height={500}
                    width={350}
                    className={`back-content ${index * 2 + 2}`}
                  />
                </div>
              </div>
            );
          }
          return pages;
        })}
      </Document>

      <button ref={nextBtn} id="next-btn" onClick={goNextPage}>
        <i className="fas fa-arrow-circle-right" />
      </button>
    </Container>
  );
}
