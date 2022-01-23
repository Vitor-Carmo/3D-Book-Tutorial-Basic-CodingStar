import { useRef, useState } from "react";
import { Container } from "../styles/pages/home";

export default function Home() {
  const pages = ["", "", "", "", "", ""];

  const [currentLocation, setCurrentLocation] = useState(1);
  const [numOfPapers, setNumOfPapers] = useState(3);

  let maxLocation = pages.length + 1;

  const book = useRef(null);
  const prevBtn = useRef(null);
  const nextBtn = useRef(null);
  const pageRef = useRef(null);

  const paper1 = useRef(null);
  const paper2 = useRef(null);
  const paper3 = useRef(null);

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
      pageRef.style.zIndex = currentLocation;

      if (currentLocation === pages.length) {
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
      pageRef.style.zIndex = pages.length - (currentLocation - 1);

      if (pages.length === currentLocation - 1) {
        openBook();
      }

      setCurrentLocation((currentLocation) => currentLocation - 1);
    }
  };

  return (
    <Container>
      <button ref={prevBtn} id="prev-btn" onClick={goPrevPage}>
        <i className="fas fa-arrow-circle-left" />
      </button>

      <div id="book" ref={book} className="book">
        {pages.map((page, index) => (
          <div
            style={{
              zIndex: pages.length - index,
            }}
            className="paper"
            id={`paper-${index + 1}`}
            key={index}
          >
            <div className="front">
              <div id="f1" className="front-content">
                <h1>Front {index + 1}</h1>
              </div>
            </div>
            <div className="back">
              <div id="b1" className="back-content">
                <h1>Back {index + 1}</h1>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button ref={nextBtn} id="next-btn" onClick={goNextPage}>
        <i className="fas fa-arrow-circle-right" />
      </button>
    </Container>
  );
}
