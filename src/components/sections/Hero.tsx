import { Section } from "@/components/ui/section";
import { getSections, getContent } from "@/lib/cms";

export default async function Hero() {
    const sections = await getSections();

    return (
        <Section className="flex min-h-screen flex-col justify-center">
            <h1 className="text-6xl font-bold tracking-tighter sm:text-8xl md:text-9xl lg:text-[10rem]">
                <span className="block text-neutral-500">{getContent(sections, "hero_title_1", "Frontend")}</span>
                <span className="block text-white">{getContent(sections, "hero_title_2", "Architect")}</span>
            </h1>
            <p
                className="mt-8 max-w-2xl text-xl text-neutral-400 md:text-2xl"
                style={{ whiteSpace: 'pre-line' }}
            >
                {getContent(sections, "hero_desc", "Crafting digital experiences where minimal aesthetics meet robust engineering.")}
            </p>
        </Section>
    );
}
