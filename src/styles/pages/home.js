import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: sans-serif;
  background-color: powderblue;

  
  .book {
    position: relative;
    width: 350px;
    height: 500px;
    transition: transform 0.5s;
  }

  .paper {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    perspective: 1500px;
  }

  .front,
  .back {
    background-color: white;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    transform-origin: left;
    transition: transform 0.5s;
  }

  .front {
    z-index: 1;
    backface-visibility: hidden;
    border-left: 3px solid powderblue;
  }

  .back {
    z-index: 0;
  }

  .front-content,
  .back-content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .back-content {
    transform: rotateY(180deg);
  }

  /* Paper flip effect */
  .flipped .front,
  .flipped .back {
    transform: rotateY(-180deg);
  }

  /* Controller Buttons */
  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    margin: 10px;
    transition: transform 0.5s;
  }

  button:focus {
    outline: none;
  }

  button:hover i {
    color: #636363;
  }

  i {
    font-size: 50px;
    color: gray;
  }
`;
