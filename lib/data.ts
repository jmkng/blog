import { readFileSync, readdirSync } from "fs";
import matter from "gray-matter";
import { join } from "path";

export interface Data {
    title: string
    date: string
    tags: string[]
}

export interface Entry {
    data: Data
    content: string
    slug: string
}

export function getEntries(dir: string): Entry[] {
    const ent = readdirSync(dir)
    const result: Entry[] = [];

    for (const e of ent) {
        const raw = readFileSync(join(dir, e));
        const fm = matter(raw);
        const data = {
            title: fm.data.title,
            date: fm.data.date,
            tags: fm.data.tags,
        }
        if (!data.tags || !data.title || !data.date) {
            throw new Error(`missing required information in file frontmatter: ${e}`);
        }
        result.push({ data, content: fm.content, slug: e.replace('.md', '') })
    }

    return result.sort((a, b) => {
        return +new Date(b.data.date) - +new Date(a.data.date);
    });
}