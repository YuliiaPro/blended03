import { Link } from 'react-router-dom';
import styles from './GoBackBtn.module.css';
export const GoBackBtn = ({ pass, children }) => {
  return (
    <Link className={styles.link} to={pass}>
      {children}
    </Link>
  );
};
