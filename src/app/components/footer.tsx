import Link from 'next/link';
import styles from '../styles/footer.module.css';
import mainStyles from '../styles/main.module.css';
import { FaInstagram, FaTwitter, FaYoutube, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className={`${styles.footer} ${mainStyles.main_footer}`}>
            <div className={styles.footer_container}>
                <div className={styles.footer_section}>
                    <h3>Email</h3>
                    <a href="mailto:hello@worksinprogress.co" className={styles.email_link}>
                        hello@worksinprogress.co
                    </a>
                </div>

                <div className={styles.footer_section}>
                    <h3>Socials</h3>
                    <div className={styles.social_links}>
                        <Link href="https://instagram.com" aria-label="Instagram">
                            <FaInstagram className={styles.social_icon} />
                        </Link>
                        <Link href="https://twitter.com" aria-label="Twitter">
                            <FaTwitter className={styles.social_icon} />
                        </Link>
                        <Link href="https://youtube.com" aria-label="YouTube">
                            <FaYoutube className={styles.social_icon} />
                        </Link>
                        <Link href="https://linkedin.com" aria-label="LinkedIn">
                            <FaLinkedin className={styles.social_icon} />
                        </Link>
                    </div>
                </div>
            </div>

            <div className={styles.footer_bottom}>
                <p>Works in Progress © {new Date().getFullYear()} | Designed by And-Now</p>
            </div>
        </footer>
    );
} 