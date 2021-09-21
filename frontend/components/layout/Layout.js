import styles from './Layout.module.css';
import Image from "next/image"

function Layout(props) {
  return (
    <>
    <div className={styles.grid}>
      <header className={styles.header}>
        <Image src="/logo.jpg" width="200" height="64"/>
        <div>Student Management System</div>
      </header>
      <main className={styles.body}>
        {props.children}
      </main>
      <footer className={styles.footer}>
        Made with &#x1F499; by Will
      </footer>
    </div>

    </>
  )
}

export default Layout;
