import styles from "../../styles/pages/home.module.css";
import Image from "next/image";

export default function HomePage() {
    return (
        <div className={styles.home_container}>
            <div className={styles.hero_image}>
                <Image
                    src="/island.svg"
                    alt="Island illustration"
                    width={1200}
                    height={1200}
                    priority
                    className={`${styles.file_svg} ${styles.levitate}`}
                />
            </div>
        </div>
    );
} 