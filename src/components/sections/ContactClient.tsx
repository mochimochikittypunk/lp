'use client'

import { motion } from "framer-motion";
import { Twitter, Instagram, Mail } from "lucide-react";

interface ContactProps {
    sections: Record<string, string>;
}

function getContent(sections: Record<string, string>, key: string, fallback: string): string {
    return sections[key] || fallback;
}

export default function ContactClient({ sections }: ContactProps) {
    // SNSリンクの生成
    const xUsername = getContent(sections, "x_username", "");
    const instagramUsername = getContent(sections, "instagram_username", "");
    const contactEmail = getContent(sections, "contact_email", "hello@example.com");

    const xLink = xUsername ? `https://x.com/${xUsername}` : "#";
    const instagramLink = instagramUsername ? `https://instagram.com/${instagramUsername}` : "#";

    return (
        <motion.section
            id="contact"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="py-20 space-y-12"
        >
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <h2 className="text-sm font-medium uppercase tracking-widest text-neutral-500">
                    {getContent(sections, "contact_label", "05. Contact")}
                </h2>
                <h3 className="mt-4 text-3xl font-light text-white md:text-5xl">
                    {getContent(sections, "contact_title", "Get In Touch")}
                </h3>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-8"
            >
                <p className="text-lg text-neutral-400" style={{ whiteSpace: 'pre-line' }}>
                    {getContent(sections, "contact_desc", "Interested in working together? Or just want to say hi? I'm always open to new opportunities and collaborations.")}
                </p>

                <div className="flex flex-col gap-6">
                    {xUsername && (
                        <a
                            href={xLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 transition-opacity hover:opacity-70"
                            style={{ color: '#FFFFFF' }}
                        >
                            <Twitter className="h-6 w-6" />
                            <span className="text-lg">@{xUsername}</span>
                        </a>
                    )}
                    {instagramUsername && (
                        <a
                            href={instagramLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 transition-opacity hover:opacity-70"
                            style={{ color: '#FFFFFF' }}
                        >
                            <Instagram className="h-6 w-6" />
                            <span className="text-lg">@{instagramUsername}</span>
                        </a>
                    )}
                    <a
                        href={`mailto:${contactEmail}`}
                        className="flex items-center gap-4 transition-opacity hover:opacity-70"
                        style={{ color: '#FFFFFF' }}
                    >
                        <Mail className="h-6 w-6" />
                        <span className="text-lg">{contactEmail}</span>
                    </a>
                </div>
            </motion.div>
        </motion.section>
    );
}
