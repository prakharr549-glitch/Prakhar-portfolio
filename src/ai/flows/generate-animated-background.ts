'use server';

/**
 * @fileOverview AI flow to generate an animated background pattern based on user preferences.
 *
 * - generateAnimatedBackground - A function that generates an animated background.
 * - GenerateAnimatedBackgroundInput - The input type for the generateAnimatedBackground function.
 * - GenerateAnimatedBackgroundOutput - The return type for the generateAnimatedBackground function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAnimatedBackgroundInputSchema = z.object({
  preferences: z
    .string()
    .describe('User preferences for the animated background.'),
});
export type GenerateAnimatedBackgroundInput = z.infer<
  typeof GenerateAnimatedBackgroundInputSchema
>;

const GenerateAnimatedBackgroundOutputSchema = z.object({
  svgDataUri: z
    .string()
    .describe(
      'The background pattern as a data URI of an SVG, suitable for use in a website.'
    ),
});
export type GenerateAnimatedBackgroundOutput = z.infer<
  typeof GenerateAnimatedBackgroundOutputSchema
>;

export async function generateAnimatedBackground(
  input: GenerateAnimatedBackgroundInput
): Promise<GenerateAnimatedBackgroundOutput> {
  return generateAnimatedBackgroundFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAnimatedBackgroundPrompt',
  input: {schema: GenerateAnimatedBackgroundInputSchema},
  output: {schema: GenerateAnimatedBackgroundOutputSchema},
  prompt: `You are an AI that generates SVG background patterns based on user preferences.

  Based on the following preferences: {{{preferences}}}, create an SVG background pattern.

  Return the svg as a data URI.
  The data URI should be optimized for use on a website, balancing visual appeal with performance.
  The SVG should be seamless and repeatable.
  The SVG should use the following color palette, using the CSS variables:
  Primary color: hsl(var(--primary))
  Background color: hsl(var(--background))
  Accent color: hsl(var(--accent))
  
  Make sure the SVG is self-contained and does not reference external files.
  Do not include XML declaration.
  Return only the data URI for the 'svgDataUri' field.`,
  config: {
    model: 'googleai/gemini-1.5-pro',
  }
});

const generateAnimatedBackgroundFlow = ai.defineFlow(
  {
    name: 'generateAnimatedBackgroundFlow',
    inputSchema: GenerateAnimatedBackgroundInputSchema,
    outputSchema: GenerateAnimatedBackgroundOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
