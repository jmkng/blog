import styles from './Ref.module.css';
import Link from 'next/link';

interface RefProps {
    text: string
    date: string
    href: string
}

export default function Ref({ text, date, href }: RefProps) {
    return (
        <div className={styles.ref}>
            <Link href={ href }>{ text }</Link>
            <span className={styles.date}>{date}</span>
        </div>
    )
}