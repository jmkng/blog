import Link from 'next/link';
import fs from 'node:fs';
import matter from 'gray-matter';

export default function Home({ posts }) {
  return (
    <main>
      <h2>Me</h2>
      <p>
        I’m Jon, an IT Analyst at ARUP Laboratories.
      </p>

      <h2 class="posts">Posts</h2>
      {posts.map(post => {
        const { slug, frontmatter } = post
        const { title, date } = frontmatter
        return (
          <div key={slug} className='post-ln'>
            <Link href={`/posts/${slug}`} className="title">{title}</Link>
            <span class="date">{date}</span>
          </div>
        )
      })}
    </main>
  )
}

export async function getStaticProps() {
  const files = fs.readdirSync('posts');

  let posts = files.map((fileName) => {
    const { data: frontmatter } = matter(fs.readFileSync(`posts/${fileName}`, 'utf-8'));

    return {
      slug: fileName.replace('.md', ''),
      frontmatter,
    };
  })

  posts = posts.sort((a, b) => {
    return new Date(b.frontmatter.date) - new Date(a.frontmatter.date);
  })

  return {
    props: {
      posts,
    },
  };
}