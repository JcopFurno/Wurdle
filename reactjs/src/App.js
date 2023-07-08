import logo from "./logo.svg";
import "./App.css";
import Field from "./Field";
import { words } from "./words";
import { useEffect, useState } from "react";

function App() {
  const row = Array(6).fill();
  const column = Array(5).fill();

  const [word, setWord] = useState("");
  const [activeRow, setActiveRow] = useState(0);
  const [letters, setLetters] = useState(["", "", "", "", ""]);
  const [fieldLetters, setFieldLetters] = useState(Array(30).fill(""));
  const [green, setGreen] = useState(Array(30).fill(false));
  const [orange, setOrange] = useState(Array(30).fill(false));
  const [black, setBlack] = useState(Array(30).fill(false));
  const [countLetters, setCountLetters] = useState(Array(26).fill(0));
  const [restartButton, setRestartButton] = useState(false);

  //console.log(row);
  //console.log(column);

  useEffect(() => {
    const temporaryWord = words[Math.floor(Math.random() * words.length)];
    let newCountLetters = newArray(countLetters, 26);
    for (let i = 0; i < 5; i++) {
      newCountLetters[temporaryWord[i].charCodeAt(0) - 97]++;
    }
    setCountLetters(newCountLetters);
    setWord(temporaryWord);
  }, [restartButton]);

  function reset() {
    let newGreen = newArray(green, 30);
    let newOrange = newArray(orange, 30);
    let newBlack = newArray(black, 30);
    let newFieldLetters = newArray(fieldLetters, 30);
    let newCountLetters = newArray(countLetters, 26);
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 5; j++) {
        newGreen[j + i * 5] = false;
        newOrange[j + i * 5] = false;
        newBlack[j + i * 5] = false;
        newFieldLetters[j + i * 5] = "";
      }
    }
    for (let i = 0; i < 26; i++) {
      newCountLetters[i] = 0;
    }
    setCountLetters(newCountLetters);
    setGreen(newGreen);
    setOrange(newOrange);
    setBlack(newBlack);
    setFieldLetters(newFieldLetters);
    setActiveRow(0);
    setRestartButton(false);
  }

  function newArray(state, arrayLength) {
    let newArray = Array(arrayLength).fill();
    for (let i = 0; i < arrayLength; i++) {
      newArray[i] = state[i];
    }
    return newArray;
  }

  function submitClick() {
    let letter = "";
    let newWord = "";
    for (let i = 0; i < 5; i++) {
      letter = letters[i];
      if (isLetter(letter) === true) {
        newWord = newWord + letter;
      } else {
        console.log("Ten wyraz nie składa się z samych liter");
        return;
      }
    }
    newWord = newWord.toLowerCase();

    console.log(newWord);
    if (words.includes(newWord) === true) {
      setActiveRow((activeRow) => activeRow + 1);
    } else {
      console.log("Ten wyraz nie jest w słowniku");
      return;
    }

    let newFieldLetters = newArray(fieldLetters, 30);
    let newGreen = newArray(green, 30);
    let newOrange = newArray(orange, 30);
    let newBlack = newArray(black, 30);
    let newCountLetters = newArray(countLetters, 26);

    //console.log(newFieldLetters);

    for (let i = 0; i < 5; i++) {
      newFieldLetters[i + activeRow * 5] = newWord[i];
    }
    setFieldLetters(newFieldLetters);
    let check = 0;
    for (let i = 0; i < 5; i++) {
      if (newWord[i] === word[i]) {
        newGreen[i + activeRow * 5] = true;
        check++;
        if (newOrange[i + activeRow * 5] === true) {
          newOrange[i + activeRow * 5] = false;
        }
        newCountLetters[newWord[i].charCodeAt(0) - 97]--;
      }
    }
    if (check === 5 || activeRow >= 5) {
      setActiveRow(6);
      setRestartButton(true);
    }
    check = 0;
    setGreen(newGreen);

    console.log(newCountLetters, "Po Green");

    for (let i = 0; i < 5; i++) {
      if (
        newCountLetters[newWord[i].charCodeAt(0) - 97] > 0 &&
        newGreen[i + activeRow * 5] === false
      ) {
        newOrange[i + activeRow * 5] = true;
        newCountLetters[newWord[i].charCodeAt(0) - 97]--;
      }
    }

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j <= activeRow; j++) {
        if (newOrange[j * 5 + i] === false && newGreen[j * 5 + i] === false) {
          newBlack[j * 5 + i] = true;
        }
      }
    }
    console.log(newCountLetters, "Po Orange");
    setBlack(newBlack);
    setOrange(newOrange);
    //console.log(newGreen);
    let newLetters = Array(5).fill("");
    setLetters(newLetters);
    console.log(countLetters);
  }
  console.log(word);
  function isLetter(letter) {
    if (letter.match(/[A-Za-z]/i)) {
      return true;
    }
    return false;
  }

  function handleLetter(id, letter) {
    let newLetters = newArray(letters, 5);
    newLetters[id] = letter;
    setLetters(newLetters);
    console.log(newLetters);
  }

  return (
    <div
      className="App"
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#333333",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <h1
          style={{
            color: "#00FF00",
            fontSize: "50px",
          }}
        >
          WURDLE
        </h1>
        {row.map((j, key_j) => (
          <div style={{ display: "flex" }}>
            {column.map((i, key_i) => (
              <Field
                isInput={key_j === activeRow}
                id={key_i}
                handleLetter={handleLetter}
                secondId={key_j * 5 + key_i}
                fieldLetter={fieldLetters[key_j * 5 + key_i]}
                isGreen={green[key_j * 5 + key_i]}
                isOrange={orange[key_j * 5 + key_i]}
                isBlack={black[key_j * 5 + key_i]}
                restartButton={restartButton}
              />
            ))}
          </div>
        ))}
      </div>
      {restartButton === false ? (
        <button
          onClick={submitClick}
          style={{
            borderRadius: "5px",
            height: "70px",
            width: "110px",
            display: "flex",
            marginLeft: "10vw",
          }}
        >
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              justifyItems: "center",
            }}
          >
            Submit
          </h1>
        </button>
      ) : (
        <button
          onClick={reset}
          style={{
            borderRadius: "5px",
            height: "70px",
            width: "110px",
            display: "flex",
            marginLeft: "10vw",
          }}
        >
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              justifyItems: "center",
            }}
          >
            Restart
          </h1>
        </button>
      )}
    </div>
  );
}

export default App;
