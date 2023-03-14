import styles from './Tag.module.css';
import Ref from '../components/Ref';

interface TagProps {
    text: string
    link: string
}

const Tag = ({ text, link }: TagProps) => <a className={styles.tag} href={ link }>{ text }</a>

export default Tag;