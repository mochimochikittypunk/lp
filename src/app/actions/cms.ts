'use server'

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

export async function getSections() {
    return await prisma.section.findMany()
}

export async function updateSection(key: string, content: string) {
    const session = await auth()
    if (!session) throw new Error("Unauthorized")

    await prisma.section.update({
        where: { key },
        data: { content },
    })
    revalidatePath("/")
}

export async function getProjects() {
    return await prisma.project.findMany({
        orderBy: { displayOrder: 'asc' }
    })
}

export async function updateProject(id: string, data: { title: string; desc: string; url: string }) {
    const session = await auth()
    if (!session) throw new Error("Unauthorized")

    await prisma.project.update({
        where: { id },
        data,
    })
    revalidatePath("/")
}

export async function reorderProjects(orderedIds: string[]) {
    const session = await auth()
    if (!session) throw new Error("Unauthorized")

    // Update each project's displayOrder based on its position in the array
    for (let i = 0; i < orderedIds.length; i++) {
        await prisma.project.update({
            where: { id: orderedIds[i] },
            data: { displayOrder: i },
        })
    }
    revalidatePath("/")
}
