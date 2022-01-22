import { useRef, useState } from "react";
import { Container } from "../styles/pages/home";

export default function Home() {
  const [currentLocation, setCurrentLocation] = useState(1);
  const [numOfPapers, setNumOfPapers] = useState(3);

  let maxLocation = numOfPapers + 1;

  const book = useRef(null);
  const prevBtn = useRef(null);
  const nextBtn = useRef(null);

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
    if (currentLocation < maxLocation) {
      switch (currentLocation) {
        case 1:
          openBook();
          paper1.current.classList.add("flipped");
          paper1.current.style.zIndex = 1;
          break;
        case 2:
          paper2.current.classList.add("flipped");
          paper2.current.style.zIndex = 2;
          break;
        case 3:
          paper3.current.classList.add("flipped");
          paper3.current.style.zIndex = 3;
          closeBook(false);
          break;
        default:
          throw new Error("unkown state");
      }
      setCurrentLocation((currentLocation) => currentLocation + 1);
    }
  };

  const goPrevPage = () => {
    if (currentLocation > 1) {
      switch (currentLocation) {
        case 2:
          closeBook(true);
          paper1.current.classList.remove("flipped");
          paper1.current.style.zIndex = 3;
          break;
        case 3:
          paper2.current.classList.remove("flipped");
          paper2.current.style.zIndex = 2;
          break;
        case 4:
          openBook();
          paper3.current.classList.remove("flipped");
          paper3.current.style.zIndex = 1;
          break;
        default:
          throw new Error("unkown state");
      }

      setCurrentLocation((currentLocation) => currentLocation - 1);
    }
  };

  return (
    <Container>
      <button ref={prevBtn} id="prev-btn" onClick={goPrevPage}>
        <i className="fas fa-arrow-circle-left"></i>
      </button>

      <div id="book" ref={book} className="book">
        <div id="p1" ref={paper1} className="paper">
          <div className="front">
            <div id="f1" className="front-content">
              <h1>Front 1</h1>
            </div>
          </div>
          <div className="back">
            <div id="b1" className="back-content">
              <h1>Back 1</h1>
            </div>
          </div>
        </div>

        <div id="p2" ref={paper2} className="paper">
          <div className="front">
            <div id="f2" className="front-content">
              <h1>Front 2</h1>
            </div>
          </div>
          <div className="back">
            <div id="b2" className="back-content">
              <h1>Back 2</h1>
            </div>
          </div>
        </div>

        <div id="p3" ref={paper3} className="paper">
          <div className="front">
            <div id="f3" className="front-content">
              <h1>Front 3</h1>
            </div>
          </div>
          <div className="back">
            <div id="b3" className="back-content">
              <h1>Back 3</h1>
            </div>
          </div>
        </div>
      </div>

      <button ref={nextBtn} id="next-btn" onClick={goNextPage}>
        <i className="fas fa-arrow-circle-right"></i>
      </button>
    </Container>
  );
}
