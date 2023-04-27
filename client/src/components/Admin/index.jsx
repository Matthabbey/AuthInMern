import { useState } from "react";
import styles from "./styles.module.css";

const Admin = ({ children }) => {

    const [data, setData] = useState("")

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
      };


  return <>
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>User payment</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          approve
        </button>
        <button className={styles.white_btn} onClick={handleLogout}>
          reject
        </button>
      </nav>
    
    The Admin page
    </div>
  </>
};

export default Admin;
