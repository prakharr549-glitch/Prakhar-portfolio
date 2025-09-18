import { generateAnimatedBackground } from '@/ai/flows/generate-animated-background';
import { SocialLinks } from '@/components/social-links';

export default async function Home() {
  let animationDataUri = '';
  try {
    // As per the prompt for the AI flow, it will use the portfolio's color palette.
    const result = await generateAnimatedBackground({
      preferences: 'subtle, professional animation with flowing, geometric lines that are not too distracting',
    });
    animationDataUri = result.animationDataUri;
  } catch (error) {
    console.error('Failed to generate animated background:', error);
    // Fallback to a simple background if AI flow fails.
    // The background color is handled by globals.css.
  }

  const backgroundStyle = animationDataUri
    ? { backgroundImage: `url("${animationDataUri}")` }
    : {};

  return (
    <div className="relative isolate min-h-screen w-full">
      <div
        className="absolute inset-0 -z-10 h-full w-full bg-background bg-cover bg-center"
        style={backgroundStyle}
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-t from-background/80 via-background/50 to-transparent" />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4 text-center">
        <div className="flex flex-col items-center gap-6">
          <h1 className="font-headline text-6xl font-bold tracking-tight text-primary md:text-8xl lg:text-9xl">
            Prakhar Ri
          </h1>
          <SocialLinks />
        </div>
      </main>
    </div>
  );
}
