import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';

const writeups = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./content/writeups" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.date(),
		category: z.enum(['Web', 'Pwn', 'Crypto', 'OSINT', 'Reverse Engineering', 'Forensics']),
		author: z.string(),
		tags: z.array(z.string()),
		image: z.string().optional(),
		externalUrl: z.string().url().optional(),
	}),
});

const events = defineCollection({
	loader: glob({ pattern: '**/[^_]*.json', base: "./content/events" }),
	schema: z.object({
		name: z.string(),
		date: z.string(),
		placement: z.string(),
		score: z.number().optional(),
		link: z.string().url().optional(),
		status: z.enum(['upcoming', 'completed']),
	}),
});

export const collections = { writeups, events };
