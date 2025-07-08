import { useAuth } from "../../features/auth";
import styles from "./home.module.css";

export function HomePage() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>React Form Example</div>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </header>

      <main className={styles.main}>
        <section className={styles.heroSection}>
          <h1 className={styles.welcomeTitle}>Welcome, {user?.name || "User"}!</h1>
          <p className={styles.projectDescription}>
            This is a demonstration of a minimal passwordless authentication form built with React and TypeScript. This
            project demonstrates a modern, user-friendly authentication approach that eliminates the need for passwords
            while maintaining security.
          </p>
        </section>

        <section className={styles.testDataSection}>
          <h2 className={styles.testDataTitle}>Testing Information</h2>
          <p className={styles.testDataDescription}>
            For testing purposes, the following email addresses will return validation errors:
          </p>

          <ul className={styles.credentialsList}>
            <li>error@example.com</li>
            <li>invalid@test.com</li>
            <li>fail@demo.com</li>
          </ul>

          <p className={styles.testDataDescription}>
            The verification code is always <span className={styles.testDataCode}>123456</span> for all successful email
            submissions.
          </p>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.authorInfo}>
          <span>Created by </span>
          <span className={styles.authorName}>Evgeniy Podivilov</span>
        </div>
        <a
          href="https://epodivilov.github.io/curriculum-vitae/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.resumeLink}
        >
          View Resume & Portfolio
        </a>
      </footer>
    </div>
  );
}
