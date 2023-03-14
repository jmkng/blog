import styles from './index.module.css';
import { getEntries } from "../../lib/data";

interface TagIndexProps {
    tags: string[]
}

export default function TagIndex({ tags }: TagIndexProps) {
    return (
        <div>
            <h1>Tags</h1>
            <div className={styles['tag-list']}>
                {tags.map(tag => <a href={`/tags/${tag}`}>{tag}</a>)}
            </div>
        </div>
    )
}

export async function getStaticProps() {
    const tags = new Set(getEntries('posts').map((post) => post.data.tags).flat())
    return {
      props: {
        tags: Array.from(tags),
      },
    };
}