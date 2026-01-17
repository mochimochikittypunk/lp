import { Section } from "@/components/ui/section";
import { Code2, Layers, Zap, Palette } from "lucide-react";
import { getSections, getContent } from "@/lib/cms";

export default async function Process() {
    const sections = await getSections();

    // CMSからプロセスステップを取得
    const processes = [
        {
            name: getContent(sections, "process_step_1_title", "Discover"),
            icon: Layers,
            desc: getContent(sections, "process_step_1_desc", "Understanding the core problem and user needs.")
        },
        {
            name: getContent(sections, "process_step_2_title", "Design"),
            icon: Palette,
            desc: getContent(sections, "process_step_2_desc", "Crafting visual systems and interaction models.")
        },
        {
            name: getContent(sections, "process_step_3_title", "Develop"),
            icon: Code2,
            desc: getContent(sections, "process_step_3_desc", "Building scalable solutions with modern stacks.")
        },
        {
            name: getContent(sections, "process_step_4_title", "Deploy"),
            icon: Zap,
            desc: getContent(sections, "process_step_4_desc", "Optimizing for performance and global reach.")
        },
    ];

    // CMSから技術スタックを取得（カンマ区切り）
    const techStackString = getContent(sections, "process_tech_stack", "Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Shadcn UI, Node.js, Vercel");
    const techStack = techStackString.split(",").map((s: string) => s.trim()).filter((s: string) => s);

    return (
        <Section id="process" className="space-y-12">
            <div className="">
                <h2 className="text-sm font-medium uppercase tracking-widest text-neutral-500">
                    {getContent(sections, "process_label", "03. How")}
                </h2>
                <h3 className="mt-4 text-3xl font-light text-white md:text-5xl">
                    {getContent(sections, "process_title", "Process & Tech")}
                </h3>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {processes.map((item, index) => (
                    <div key={index} className="space-y-3 text-center">
                        <h4 className="text-lg font-medium text-white">{item.name}</h4>
                        <p className="text-sm text-neutral-400">{item.desc}</p>
                    </div>
                ))}
            </div>

            <div className="mt-12">
                <h4 className="mb-6 text-xl font-medium text-white">
                    {getContent(sections, "process_tech_label", "Technologies I Use")}
                </h4>
                <p className="text-sm text-neutral-300">
                    {techStack.join(' / ')}
                </p>
            </div>
        </Section>
    );
}
