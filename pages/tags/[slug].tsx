import type { GetStaticProps, GetStaticPaths } from "next";
import styles from './[slug].module.css';
import { getEntries } from "../../lib/data";
import Ref from "../../components/Ref";

export default function TagPage({ slug, entries }) {
    return (
        <div>
            <h1>Tagged with "{ slug }"</h1>
            <div className={styles['tag-list']}>
            {entries.map(post => <Ref key={slug} text={post.data.title} date={post.data.date} href={`/posts/${post.slug}`} />)}
            </div>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params as { slug: string };
    const entries = getEntries('posts').filter((post) => post.data.tags.includes(slug));

    return {
        props: {
            slug,
            entries,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const tags = new Set(getEntries('posts').map((post) => post.data.tags).flat());
    const paths = Array.from(tags).map((tag) => ({ params: { slug: tag } }));

    return {
        paths,
        fallback: false,
    };
};