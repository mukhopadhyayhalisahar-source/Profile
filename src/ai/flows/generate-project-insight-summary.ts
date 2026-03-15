'use server';
/**
 * @fileOverview A Genkit flow for generating AI-powered summaries and key innovation highlights for complex projects.
 *
 * - generateProjectInsightSummary - A function that handles the generation of project insights.
 * - GenerateProjectInsightSummaryInput - The input type for the generateProjectInsightSummary function.
 * - GenerateProjectInsightSummaryOutput - The return type for the generateProjectInsightSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectInsightSummaryInputSchema = z.object({
  projectName: z.string().describe('The name of the project.'),
  projectDescription: z
    .string()
    .describe('A detailed description of the project, including its purpose and technologies.'),
  keyFeatures: z
    .array(z.string())
    .optional()
    .describe('An optional list of key features or components of the project.'),
  targetAudience: z
    .string()
    .optional()
    .describe(
      'An optional description of the target audience for the summary, e.g., technical users, general public.'
    ),
});
export type GenerateProjectInsightSummaryInput = z.infer<
  typeof GenerateProjectInsightSummaryInputSchema
>;

const GenerateProjectInsightSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise, AI-generated summary of the project.'),
  keyInnovations: z
    .array(z.string())
    .describe('A list of key innovation highlights or unique aspects of the project.'),
});
export type GenerateProjectInsightSummaryOutput = z.infer<
  typeof GenerateProjectInsightSummaryOutputSchema
>;

export async function generateProjectInsightSummary(
  input: GenerateProjectInsightSummaryInput
): Promise<GenerateProjectInsightSummaryOutput> {
  return generateProjectInsightSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProjectInsightSummaryPrompt',
  input: {schema: GenerateProjectInsightSummaryInputSchema},
  output: {schema: GenerateProjectInsightSummaryOutputSchema},
  prompt: `You are an expert AI project summarizer and innovation highlight extractor.
Your task is to analyze the provided project details and generate a concise summary and a list of key innovations.
Focus on making the information easy to understand for a website visitor, highlighting the project's core concepts and significance.

Project Name: {{{projectName}}}
Project Description: {{{projectDescription}}}

{{#if keyFeatures}}
Key Features: {{#each keyFeatures}}- {{{this}}}{{/each}}
{{/if}}

{{#if targetAudience}}
Target Audience for Summary: {{{targetAudience}}}
{{/if}}

Based on the information above, provide a 'summary' of the project and a list of 'keyInnovations'.`,
});

const generateProjectInsightSummaryFlow = ai.defineFlow(
  {
    name: 'generateProjectInsightSummaryFlow',
    inputSchema: GenerateProjectInsightSummaryInputSchema,
    outputSchema: GenerateProjectInsightSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
