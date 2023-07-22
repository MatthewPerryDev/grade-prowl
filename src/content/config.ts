import { defineCollection, z } from 'astro:content';

const averagedCourse = z.object({
	Instructor: z.string(),
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
		Section: z.number(),
		Title: z.string(),
		Instructor: z.string(),
		A: z.number(),
		B: z.number(),
		C: z.number(),
		D: z.number(),
		F: z.number(),
		P: z.number(),
		'F(P)': z.number(),
		W: z.number(),
		Honors: z.boolean(),
		Year: z.number()
});

const courses = defineCollection({
	type: 'data',
	schema: z.object({
		department: z.string(),
		number: z.number(),
		title: z.string(),
		averages: averagedCourse.array(),
		details: course.array()
	})
});

export const collections = { courses };
