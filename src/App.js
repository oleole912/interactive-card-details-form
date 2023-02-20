import CardFront from "./components/CardFront/CardFront";
import CardBack from "./components/CarbBack/CardBack";
import styles from './App.module.css'
import Form from "./components/Form/Form";
import SuccessMessage from "./components/SuccessMessage/SuccessMessage";
import { useState } from "react";



function App() {
  const [name, setName] = useState();
  const [cardNumber, setCardNumber] = useState();
  const [expMonth, setExpMonth] = useState();
  const [expYear, setExpYear] = useState();
  const [cvc, setCvc] = useState();
  const [isFormValid, setIsFormValid] = useState();



  return (
    <div className={styles.body}>
      <CardFront name={name} cardNumber={cardNumber} expMonth={expMonth} expYear={expYear} />
      <CardBack cvc={cvc} />
      {!isFormValid ? <Form name={name} setName={setName} cardNumber={cardNumber} setCardNumber={setCardNumber} expMonth={expMonth} setExpMonth={setExpMonth} expYear={expYear} setExpYear={setExpYear} cvc={cvc} setCvc={setCvc} setIsFormValid={setIsFormValid} />
 : <SuccessMessage />}
    </div>
  );
}

export default App;
