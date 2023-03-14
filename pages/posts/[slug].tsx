import fs from "fs";
import matter from "gray-matter";
import { markdownToHtml } from "../../lib/md";

export default function Post({ frontmatter, content }) {
  const { title } = frontmatter;

  return (
    <main className='post'>
      <div className="grouped-header">
        <h1>{title}</h1>
      </div>
      <div className="post-content">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </main>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync("posts");
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const fileName = fs.readFileSync(`posts/${slug}.md`, 'utf-8');
  const { data: frontmatter, content } = matter(fileName);

  return {
    props: {
      frontmatter,
      content: await markdownToHtml(content)
    },
  };
}