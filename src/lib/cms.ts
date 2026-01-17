import { prisma } from "@/lib/db";
import { cache } from "react";

export const getSections = cache(async () => {
    const sections = await prisma.section.findMany();
    // Transform to map for O(1) access
    const sectionMap = new Map<string, string>();
    sections.forEach((s) => {
        sectionMap.set(s.key, s.content);
    });
    return sectionMap;
});

export const getProjects = cache(async () => {
    return await prisma.project.findMany({
        orderBy: { displayOrder: 'asc' }
    });
});

export function getContent(map: Map<string, string>, key: string, fallback: string) {
    return map.get(key) || fallback;
}
