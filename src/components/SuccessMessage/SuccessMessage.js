import styles from './SuccessMessage.module.css'

const SuccessMessage = () => {
  return (
    <div className={styles['success-message']}>
      <div>
        <img
          src={`${process.env.PUBLIC_URL}/icon-complete.svg`}
          alt="icon-complete"
          className={styles['icon-complete']}
        />
      </div>
      <h1 className={styles['message-header']}>Thank you!</h1>
      <p className={styles['message-content']}>We've added your card details</p>
      <button className={styles.btn}>Continue</button>
    </div>
  );
};

export default SuccessMessage;
