import Link from 'next/link';
import { Entry, getEntries } from '../lib/data';

export default function Home({ tags, entries }: { tags, entries: Entry[] }) {
  return (
    <main>
      <h2>Me</h2>
      <p>
        I’m Jon, an IT Analyst at ARUP Laboratories.
      </p>

      <h2 className="posts">Posts</h2>
      {entries.map(e => {
        const { slug, data } = e
        const { title, date } = data
        return (
          <div key={slug} className='post-ln'>
            <Link href={`/posts/${slug}`} className="title">{title}</Link>
            <span className="date">{date}</span>
          </div>
        )
      })}

      <h2>Tags</h2>
      {tags.map(t => {
        return (
          <div key={t.slug} className='post-ln'>
            <Link href={`/tags/${t}`} className="title">{t}</Link>
          </div>
        )
      })}
    </main>
  )
}

export async function getStaticProps() {
  const tags = new Set(getEntries('posts').map((post) => post.data.tags).flat())
  
  
  return {
    props: {
      tags: Array.from(tags),
      entries: getEntries('posts'),
    },
  };
}