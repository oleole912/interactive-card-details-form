import styles from './CardBack.module.css';

const CardBack = ({cvc}) => {
    return (
        <div className={styles['card-back']}>
            <p className={styles['cvc-number']}>{cvc ? cvc : '000'}</p>
        </div>
    )
}

export default CardBack;