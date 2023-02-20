import { useState } from "react";
import styles from "./Form.module.css";
import { containsLettersOnly } from "../utils/containsLettersOnly";

const Form = ({
  name,
  setName,
  cardNumber,
  setCardNumber,
  expMonth,
  setExpMonth,
  expYear,
  setExpYear,
  cvc,
  setCvc,
  setIsFormValid,
}) => {
  const validateNumber = (
    string,
    correctLength,
    funcIsCorrectLenght,
    funcIsValidFormat,
    funcIsBlank
  ) => {
    if (string.length >= 0) {
      if (string.length === 0) {
        // set as an empty field
        funcIsBlank(true);
      } else {
        funcIsBlank(false);
        funcIsValidFormat(true);
        // delete white space from string
        const newString = string.replaceAll(" ", "");
        // check if users input converted to number is a valid number
        if (!isNaN(Number(newString))) {
          // check if input has correct length (2 for month and year, 3 for cvc, 16 for card number)
          if (newString.length === correctLength) {
            funcIsCorrectLenght(true);
            funcIsValidFormat(true);
          } else {
            //funcIsCorrectLenght(false)
          }
        } else {
          funcIsCorrectLenght(false);
          funcIsValidFormat(false);
        }
      }
    } else {
      funcIsValidFormat(false);
      funcIsBlank(true);
      funcIsCorrectLenght(false);
    }
  };

  const [isCorrectLengthNumber, setIsCorrectLengthNumber] = useState(true);
  const [isCorrectLengthMonth, setIsCorrectLengthMonth] = useState(true);
  const [isCorrectLengthYear, setIsCorrectLengthYear] = useState(true);
  const [isCorrectLengthCvc, setIsCorrectLengthCvc] = useState(true);

  const [isValidName, setIsValidName] = useState(true);
  const [isValidNumber, setIsValidNumber] = useState(true);
  const [isValidDate, setIsValidDate] = useState(true);
  const [isValidCvc, setIsValidCvc] = useState(true);

  const [isBlankName, setIsBlankName] = useState();
  const [isBlankNumber, setIsBlankNumber] = useState();
  const [isBlankMonth, setIsBlankMonth] = useState();
  const [isBlankYear, setIsBlankYear] = useState();
  const [isBlankCvc, setIsBlankCvc] = useState();

  const nameHandler = (e) => {
    setName(e.target.value);

    if (e.target.value) {
      setIsBlankName(false);
      if (!containsLettersOnly(e.target.value)) {
        setIsValidName(false);
      } else {
        setIsValidName(true);
      }
    } else {
      setIsBlankName(true);
      setIsValidName(true);
    }
  };

  const keyUpHandler = (e) => {
    const numberLengthCondition =
      e.target.value.length === 4 ||
      e.target.value.length === 9 ||
      e.target.value.length === 14;
    if (numberLengthCondition) {
      if (numberLengthCondition && e.key === "Backspace") {
        const reduced = e.target.value.substring(0, e.target.value.length - 1);
        setCardNumber(reduced);
      } else {
        e.target.value = `${e.target.value} `;
        setCardNumber(e.target.value);
      }
    } else {
      setCardNumber(e.target.value);
    }
  };

  const cardNumberHandler = (e) => {
    setCardNumber(e.target.value);
    validateNumber(
      e.target.value,
      16,
      setIsCorrectLengthNumber,
      setIsValidNumber,
      setIsBlankNumber
    );
  };

  const expMonthHandler = (e) => {
    setExpMonth(e.target.value);
    validateNumber(
      e.target.value,
      2,
      setIsCorrectLengthMonth,
      setIsValidDate,
      setIsBlankMonth
    );
  };

  const expYearHandler = (e) => {
    setExpYear(e.target.value);
    validateNumber(
      e.target.value,
      2,
      setIsCorrectLengthYear,
      setIsValidDate,
      setIsBlankYear
    );
  };

  const cvcHandler = (e) => {
    setCvc(e.target.value);
    validateNumber(
      e.target.value,
      3,
      setIsCorrectLengthCvc,
      setIsValidCvc,
      setIsBlankCvc
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      typeof name !== "undefined" &&
      typeof cardNumber !== "undefined" &&
      typeof expMonth !== "undefined" &&
      typeof expYear !== "undefined" &&
      typeof cvc !== "undefined"
    ) {
      if (
        isValidName &&
        isValidNumber &&
        isValidDate &&
        isValidCvc &&
        isCorrectLengthNumber &&
        isCorrectLengthMonth &&
        isCorrectLengthYear &&
        isCorrectLengthCvc
      ) {
        console.log("success");
        setIsFormValid(true);
      } else {
        console.log("fail");
      }
    } else {
      if (typeof name === "undefined") {
        setIsBlankName(true);
      }
      if (typeof cardNumber === "undefined") {
        setIsBlankNumber(true);
      } else if (cardNumber.length < 16) {
        console.log('cardNumber.length', cardNumber.length)
        setIsCorrectLengthNumber(false);
      }
      if (typeof expMonth === "undefined") {
        setIsBlankMonth(true);
      } else if (expMonth.length < 2) {
        setIsCorrectLengthMonth(false);
      }
      if (typeof expYear === "undefined") {
        setIsBlankYear(true);
      } else if (expYear.length < 2) {
        setIsCorrectLengthYear(false);
      }
      if (typeof cvc === "undefined") {
        setIsBlankCvc(true);
      } else if (cvc.length < 3) {
        setIsCorrectLengthCvc(false);
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles["form-control-group"]}>
        <label className={styles.label}>cardholder name</label>
        <input
          className={`${styles.input} ${
            (!isValidName || isBlankName) && styles.error
          }`}
          type="text"
          maxLength="25"
          value={name}
          onChange={nameHandler}
        />
        {!isValidName ? (
          <p className={styles["error-msg"]}>Wrong format, letters only.</p>
        ) : (
          ""
        )}
        {isBlankName ? (
          <p className={styles["error-msg"]}>Can't be blank.</p>
        ) : (
          ""
        )}
      </div>
      <div className={styles["form-control-group"]}>
        <label className={styles.label}>card number</label>
        <input
          className={`${styles.input} ${
            (!isValidNumber || isBlankNumber || !isCorrectLengthNumber) &&
            styles.error
          }`}
          type="text"
          maxLength="19"
          value={cardNumber}
          onChange={cardNumberHandler}
          onKeyUp={keyUpHandler}
        />
        {!isValidNumber ? (
          <p className={styles["error-msg"]}>Wrong format, numbers only.</p>
        ) : (
          ""
        )}
        {isBlankNumber ? (
          <p className={styles["error-msg"]}>Can't be blank.</p>
        ) : (
          ""
        )}
        {!isCorrectLengthNumber ? (
          <p className={styles["error-msg"]}>Number is too short</p>
        ) : (
          ""
        )}
      </div>
      <div className={styles["form-control-details-group"]}>
        <div
          className={`${styles["form-control-group"]} ${styles["exp-group"]}`}
        >
          <label className={styles.label}>exp. date (mm/yy)</label>
          <div className={styles["input-group"]}>
            <input
              className={`${styles["input-small"]} ${styles.input} ${
                (!isValidDate || isBlankMonth || !isCorrectLengthMonth) &&
                styles.error
              }`}
              type="text"
              maxLength="2"
              value={expMonth}
              onChange={expMonthHandler}
            />
            <input
              className={`${styles["input-small"]} ${styles.input} ${
                (!isValidDate || isBlankYear || !isCorrectLengthYear) &&
                styles.error
              }`}
              type="text"
              maxLength="2"
              value={expYear}
              onChange={expYearHandler}
            />
          </div>
          {!isValidDate ? (
            <p className={styles["error-msg"]}>Wrong format, numbers only.</p>
          ) : (
            ""
          )}
          {isBlankMonth || isBlankYear ? (
            <p className={styles["error-msg"]}>Can't be blank.</p>
          ) : (
            ""
          )}
          {!isCorrectLengthMonth ? (
            <p className={styles["error-msg"]}>Number is too short</p>
          ) : (
            ""
          )}
          {!isCorrectLengthYear ? (
            <p className={styles["error-msg"]}>Number is too short</p>
          ) : (
            ""
          )}
        </div>
        <div
          className={`${styles["form-control-group"]} ${styles["exp-group"]}`}
        >
          <label className={styles.label}>cvc</label>
          <input
            className={`${styles["input-medium"]} ${styles.input} ${
              (!isValidCvc || isBlankCvc || !isCorrectLengthCvc) && styles.error
            }`}
            type="text"
            maxLength="3"
            value={cvc}
            onChange={cvcHandler}
          />
          {!isValidCvc ? (
            <p className={styles["error-msg"]}>Wrong format, numbers only.</p>
          ) : (
            ""
          )}
          {isBlankCvc ? (
            <p className={styles["error-msg"]}>Can't be blank.</p>
          ) : (
            ""
          )}
          {!isCorrectLengthCvc ? (
            <p className={styles["error-msg"]}>Number is too short</p>
          ) : (
            ""
          )}
        </div>
      </div>
      <button className={styles.btn}>Confirm</button>
    </form>
  );
};

export default Form;
