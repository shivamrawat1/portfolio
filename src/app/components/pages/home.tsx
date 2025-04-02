import styles from "../../styles/pages/home.module.css";
import Image from "next/image";

export default function HomePage() {
    return (
        <div className={styles.home_container}>
            <div className={styles.hero_image}>
                <Image
                    src="/file1.svg"
                    alt="File illustration"
                    width={950}
                    height={100}
                    priority
                    className={styles.file_svg}
                />
            </div>
        </div>
    );
} 