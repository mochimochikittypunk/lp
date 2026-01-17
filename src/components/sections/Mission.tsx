import { Section } from "@/components/ui/section";
import { CheckCircle2 } from "lucide-react";
import { getSections, getContent } from "@/lib/cms";

export default async function Mission() {
    const sections = await getSections();

    // Missionカードの内容をCMSから取得
    const missions = [
        {
            title: getContent(sections, "mission_card_1_title", "User-Centric Perfection"),
            description: getContent(sections, "mission_card_1_desc", "Obsessing over every micro-interaction to ensure delight.")
        },
        {
            title: getContent(sections, "mission_card_2_title", "Technical Excellence"),
            description: getContent(sections, "mission_card_2_desc", "Writing scalable, maintainable, and performant code.")
        },
        {
            title: getContent(sections, "mission_card_3_title", "Avant-Garde Design"),
            description: getContent(sections, "mission_card_3_desc", "Pushing the boundaries of what's possible on the web.")
        }
    ];

    return (
        <Section id="mission" className="space-y-12">
            <div className="">
                <h2 className="text-sm font-medium uppercase tracking-widest text-neutral-500">
                    {getContent(sections, "mission_label", "02. Mission")}
                </h2>
                <h3 className="mt-4 text-3xl font-light text-white md:text-5xl">
                    {getContent(sections, "mission_title", "What I Deliver")}
                </h3>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                {missions.map((item, index) => (
                    <div key={index} className="space-y-3">
                        <h4 className="text-xl font-medium text-white">{item.title}</h4>
                        <p className="text-neutral-400 leading-relaxed">{item.description}</p>
                    </div>
                ))}
            </div>
        </Section>
    );
}
