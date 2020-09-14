import styles from '../styles/Button.module.css';

export function Button({ color, text, click }) {


    if(color === 'white'){
        return <button type='button' className={styles.white_button} onClick={click}>{text}</button>
    }

    return (
        <button
            type="button"
            className={styles.black_button}
            onClick={click}
        >
            {text}
        </button>
    )
}