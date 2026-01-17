/* eslint-disable @next/next/no-img-element */
import { Section } from "@/components/ui/section";
import { getProjects, getSections, getContent } from "@/lib/cms";

interface Project {
    title: string;
    desc: string;
    url: string;
    thumbnail: string | null;
}

export default async function Works() {
    const projects = await getProjects();
    const sections = await getSections();

    return (
        <Section id="works" className="space-y-12">
            <div className="">
                <h2 className="text-sm font-medium uppercase tracking-widest text-neutral-500">
                    {getContent(sections, "works_label", "04. Works")}
                </h2>
                <h3 className="mt-4 text-3xl font-light text-white md:text-5xl">
                    {getContent(sections, "works_title", "Selected Projects")}
                </h3>
            </div>

            <div className="grid gap-20 md:grid-cols-2 lg:grid-cols-3">
                {(projects as Project[]).map((project, index: number) => {
                    // カスタムサムネイルがあればそれを使用、なければMicrolinkのスクリーンショット
                    const imageUrl = project.thumbnail
                        ? project.thumbnail
                        : `https://api.microlink.io/?url=${encodeURIComponent(project.url)}&screenshot=true&meta=false&embed=screenshot.url`;

                    return (
                        <div key={index} className="space-y-4">
                            {/* Text Content - 上に配置 */}
                            <div className="space-y-1">
                                <h4 className="text-lg font-medium">
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline"
                                        style={{ color: '#FFFFFF' }}
                                    >
                                        {project.title}
                                    </a>
                                </h4>
                                <p className="text-sm text-neutral-400">{project.desc}</p>
                            </div>
                            {/* Image Container */}
                            <div className="relative aspect-video overflow-hidden rounded-lg bg-neutral-900">
                                <a href={project.url} target="_blank" rel="noopener noreferrer">
                                    <img
                                        src={imageUrl}
                                        alt={project.title}
                                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                        loading="lazy"
                                    />
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Section>
    );
}
