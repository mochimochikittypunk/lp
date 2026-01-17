import { Section } from "@/components/ui/section";
import { getSections, getContent } from "@/lib/cms";

export default async function Vision() {
    const sections = await getSections();

    return (
        <Section id="vision" className="space-y-12">
            <div className="">
                <h2 className="text-sm font-medium uppercase tracking-widest text-neutral-500">
                    {getContent(sections, "vision_label", "01. Vision")}
                </h2>
                <h3 className="mt-4 text-3xl font-light text-white md:text-5xl">
                    {getContent(sections, "vision_title", "Why I Create")}
                </h3>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
                <p className="text-lg leading-relaxed text-neutral-400">
                    {getContent(sections, "vision_text_1", "In a world saturated with digital noise, clarity is power.")}
                </p>
                <p className="text-lg leading-relaxed text-neutral-400">
                    {getContent(sections, "vision_text_2", "Code is not just logic; it's the medium through which we shape human perception.")}
                </p>
            </div>
        </Section>
    );
}
