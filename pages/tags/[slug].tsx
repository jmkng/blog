import type { GetStaticProps, GetStaticPaths } from "next";
import { getEntries } from "../../lib/data";

export default function TagPage({ slug, posts }) {
    return (
        <div>
            <h1>{ slug }</h1>
            {posts.map(post => {
                return <a key={post.data.title} href={`/posts/${post.slug}`}>{post.data.title}</a>
            })}
        </div>
    )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params as { slug: string };
    const posts = getEntries('posts').filter((post) => post.data.tags.includes(slug));

    return {
        props: {
            slug,
            posts,
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