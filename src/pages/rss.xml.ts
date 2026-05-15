import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
  const writeups = await getCollection('writeups');
  return rss({
    title: 'Khaos Collective | Writeups',
    description: 'Deep dives into vulnerabilities, exploits, and CTF challenges by the Khaos team.',
    site: context.site,
    items: writeups.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: post.data.externalUrl ? post.data.externalUrl : `/writeups/${post.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
