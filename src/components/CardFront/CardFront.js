import styles from "./CardFront.module.css";

const CardFront = ({name, cardNumber, expMonth, expYear}) => {
  return (
    <div className={styles["card-front"]}>
      <img
        src={`${process.env.PUBLIC_URL}/card-logo.svg`}
        className={styles["card-logo"]} alt="card-logo"
      />
      <p className={styles["card-number"]}>{cardNumber ? cardNumber : '0000 0000 0000 0000'}</p>
      <div className={styles['card-details']} >
        <p className={styles.name} >{name ? name : 'Felicia Appleseed'}</p>
        <p><span>{expMonth ? expMonth : '00'}</span>/<span>{expYear ? expYear : '00'}</span></p>
      </div>
    </div>
  );
};

export default CardFront;
