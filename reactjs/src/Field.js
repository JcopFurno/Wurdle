import React from "react";

function Field({
  isInput,
  id,
  handleLetter,
  secondId,
  fieldLetter,
  isGreen,
  isOrange,
  isBlack,
  restartButton,
}) {
  return (
    <div
      style={{
        width: "100px",
        height: "100px",
        border: "1px solid",
        display: "flex",
        backgroundColor: isGreen
          ? "#00FF00"
          : isOrange
          ? "orange"
          : isBlack
          ? "#595055"
          : "darkgray",
      }}
    >
      {fieldLetter.match(/[A-Za-z]/i) ? (
        <h1
          style={{
            fontSize: "45px",
            display: "flex",
            marginTop: "auto",
            marginBottom: "auto",
            marginLeft: "auto",
            marginRight: "auto",
            //justifyContent: "center",
          }}
        >
          {fieldLetter}
        </h1>
      ) : (
        <div></div>
      )}

      {isInput === true ? (
        <input
          type="text"
          id={id}
          onChange={(event) => handleLetter(id, event.target.value)}
          maxLength={1}
          style={{
            width: "40px",
            height: "30px",
            display: "flex",
            justifyContent: "center",
            marginTop: "auto",
            marginBottom: "auto",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        ></input>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Field;
