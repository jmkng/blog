import { Entry, getEntries } from '../lib/data';
import styles from './_index.module.css';
import Tag from '../components/Tag';
import Ref from '../components/Ref';

interface HomeProps {
  tags: string[]
  entries: Entry[]
}

export default function Home({ tags, entries }: HomeProps) {
  return (
    <main>
      <h2>Me</h2>
      <p>
        I’m Jon, an IT Analyst at ARUP Laboratories.
      </p>

      <h2 className="posts">Posts</h2>
      {entries.map(e => <Ref key={e.data.title} text={e.data.title} date={e.data.date} href={`/posts/${e.slug}`} />)}

      <h2 className={styles.tags}>Tags</h2>
      <div className={styles['tag-list']}>
        {tags.map(t => <Tag key={t} text={t} link={`/tags/${t}`} />)}
      </div>
    </main>
  )
}

export async function getStaticProps() {
  const entries = getEntries('posts');
  const tags = new Set(entries.map((post) => post.data.tags).flat())
  return {
    props: {
      tags: Array.from(tags),
      entries: entries,
    },
  };
}