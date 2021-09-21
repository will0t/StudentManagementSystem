import styles from './Card.module.css';

function Card(props) {
  return (
    <div className={styles.cardContainer} style={props.style}>
      {props.children}
    </div>
  )
}

export default Card;
