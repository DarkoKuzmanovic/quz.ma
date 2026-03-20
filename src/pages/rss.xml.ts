import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const blog = (await getCollection('blog', ({ data }) => !data.draft))
    .map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.id}/`,
    }));

  const til = (await getCollection('til'))
    .map((entry) => ({
      title: `TIL: ${entry.data.title}`,
      pubDate: entry.data.date,
      description: entry.data.title,
      link: `/til/${entry.id}/`,
    }));

  const items = [...blog, ...til].sort(
    (a, b) => b.pubDate.valueOf() - a.pubDate.valueOf()
  );

  return rss({
    title: 'quz.ma',
    description: 'Blog and TIL from quz.ma',
    site: context.site!,
    items,
  });
}
