import { defineCollection, z } from 'astro:content';

const averagedCourse = z.object({
	professor: z.string(),
	A: z.number(),
	B: z.number(),
	C: z.number(),
	D: z.number(),
	F: z.number(),
	P: z.number(),
	'F(P)': z.number(),
	W: z.number()
});

const course = z.object({
		department: z.string(),
		number: z.number(),
		section: z.number(),
		title: z.string(),
		professor: z.string(),
		A: z.number(),
		B: z.number(),
		C: z.number(),
		D: z.number(),
		F: z.number(),
		P: z.number(),
		'F(P)': z.number(),
		W: z.number(),
		honors: z.boolean(),
		year: z.number()
});

const courses = defineCollection({
	type: 'data',
	schema: z.object({
		department: z.string(),
		number: z.number(),
		averages: averagedCourse.array(),
		details: course.array()
	})
});

export const collections = { courses };
