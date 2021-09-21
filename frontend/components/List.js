import styles from './List.module.css';
import Card from './UI/Card';

function List(props) {
  // custom CSS for card
  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    padding: "0px"
  };

  return (
    <Card style={cardStyle}>
      <div className={styles.listTitle}>
        {props.listTitle}
      </div>
      <div className={styles.listContainer}>
        {props.listContent.length > 0 ?
          props.listContent.map((content) =>
            <ul>{content}</ul>
          )
          : <ul></ul>}
      </div>
    </Card>
  )
}

export default List;
