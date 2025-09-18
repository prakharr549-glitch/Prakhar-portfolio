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
  animationDataUri: z
    .string()
    .describe(
      'The animated background pattern as a data URI, suitable for use in a website.'
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
  prompt: `You are an AI that generates animated background patterns based on user preferences.

  Based on the following preferences: {{{preferences}}}, create an animated background pattern.

  Return the animation data as a data URI.
  The data URI should be optimized for use on a website, balancing visual appeal with performance.
  The animation should loop seamlessly.
  The animation should use the following color palette:
  Primary color: Midnight Blue (#2C3E50)
  Background color: Light Gray (#F4F4F4)
  Accent color: Teal (#20C997)}`,
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
