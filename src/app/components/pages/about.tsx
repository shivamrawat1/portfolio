"use client"

import styles from "../../styles/pages/about.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function AboutPage() {
    const [currentHead, setCurrentHead] = useState(0);
    const heads = ["/head-left.svg", "/head-center.svg", "/head-right.svg"];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHead((prev) => (prev + 1) % heads.length);
        }, 1200); // Change every 1.2 second

        return () => clearInterval(interval); // Cleanup on unmount
    }, [heads.length]);

    return (
        <div className={styles.about_container}>
            <div className={styles.about_content}>
                <div className={styles.image_container}>
                    <Image
                        src={heads[currentHead]}
                        alt={`head animation frame ${currentHead + 1}`}
                        width={200}
                        height={200}
                        priority
                        className={styles.profile_image}
                    />
                </div>
                <div className={styles.text_container}>
                    <p className={styles.intro}>
                        I&apos;m <span className={styles.name}>Shivam Rawat</span>, a designer and developer
                        focused on creating digital experiences that are both functional and beautiful.
                    </p>
                    <p>
                        I&apos;ve been working in the tech industry for over 5 years...
                    </p>
                    <p>
                        When I&apos;m not coding or designing, you can find me...
                    </p>
                    <p>
                        I grew up near the mountains in Uttarakhand, India, where I'd finish schoolwork early
                        and spend the rest of the year replicating experiments from shows like{' '}
                        <Link href="https://en.wikipedia.org/wiki/Backyard_Science" className={styles.highlight_link}>Backyard Science</Link> and{' '}
                        <Link href="https://www.imdb.com/title/tt2314205/" className={styles.highlight_link}>FAQ</Link>. When home experiments
                        weren't enough to satistfy my curiosity, I reached out to over 100 professors at a
                        nearby university, hoping to work in their labs. Surprisingly, the cold outreach
                        worked, and I ended up conducting bioinformatics research and winning{' '}
                        <Link href="https://x.com/mygovindia/status/1485643062001172484" className={styles.highlight_link}>national</Link> and{' '}
                        <Link href="https://abstracts.societyforscience.org/Home/FullAbstract?ISEFYears=0%2C&Category=Any%20Category&Finalist=rawat&AllAbstracts=True&FairCountry=Any%20Country&FairState=Any%20State&ProjectId=20163" className={styles.highlight_link}>
                            international
                        </Link>{' '}
                        awards—and even a{' '}
                        <Link href="https://x.com/narendramodi/status/1485612096130002946?lang=en" className={styles.highlight_link}>tweet</Link> from
                        the President of India.
                    </p>
                    <p>
                        For university, I made a last-minute decision to attend{' '}
                        <Link href="https://www.minerva.edu/about/" className={styles.highlight_link}>Minerva</Link>, where studying in a different
                        country each semester—including the US, South Korea, Taiwan, India, Argentina, the UK,
                        and Germany—broadened my academic and cultural experiences. I initially pursued
                        Natural Science but, after discovering wet labs weren't for me, switched to Computer
                        Science as my major.
                    </p>
                    <p>
                        Now, I strive to become a{' '}
                        <Link href="https://www.urbandictionary.com/define.php?term=Cracked" className={styles.highlight_link}>cracked</Link>{' '}
                        developer and build products and services that can positively impact millions of
                        people.
                    </p>
                </div>
            </div>
        </div>
    );
} 