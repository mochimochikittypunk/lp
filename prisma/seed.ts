import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Seed Sections - ordered by frontend display order
    const sections = [
        // Hero
        { key: "hero_title_1", content: "Frontend" },
        { key: "hero_title_2", content: "Architect" },
        { key: "hero_desc", content: "Crafting digital experiences where minimal aesthetics meet robust engineering." },
        // Vision
        { key: "vision_label", content: "01. Vision" },
        { key: "vision_title", content: "Why I Create" },
        { key: "vision_text_1", content: "In a world saturated with digital noise, clarity is power. I believe that true elegance lies in subtraction—removing the non-essential to reveal the core purpose. My work is driven by a desire to bring order, beauty, and seamless functionality to the chaotic web." },
        { key: "vision_text_2", content: "Code is not just logic; it's the medium through which we shape human perception. I strive to build interfaces that feel inevitable, intuitive, and profoundly human." },
        // Mission
        { key: "mission_label", content: "02. Mission" },
        { key: "mission_title", content: "What I Deliver" },
        { key: "mission_card_1_title", content: "User-Centric Perfection" },
        { key: "mission_card_1_desc", content: "Obsessing over every micro-interaction to ensure delight." },
        { key: "mission_card_2_title", content: "Technical Excellence" },
        { key: "mission_card_2_desc", content: "Writing scalable, maintainable, and performant code." },
        { key: "mission_card_3_title", content: "Avant-Garde Design" },
        { key: "mission_card_3_desc", content: "Pushing the boundaries of what's possible on the web." },
        // Process
        { key: "process_label", content: "03. How" },
        { key: "process_title", content: "Process & Tech" },
        { key: "process_step_1_title", content: "Discover" },
        { key: "process_step_1_desc", content: "Understanding the core problem and user needs." },
        { key: "process_step_2_title", content: "Design" },
        { key: "process_step_2_desc", content: "Crafting visual systems and interaction models." },
        { key: "process_step_3_title", content: "Develop" },
        { key: "process_step_3_desc", content: "Building scalable solutions with modern stacks." },
        { key: "process_step_4_title", content: "Deploy" },
        { key: "process_step_4_desc", content: "Optimizing for performance and global reach." },
        { key: "process_tech_label", content: "Technologies I Use" },
        { key: "process_tech_stack", content: "Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Shadcn UI, Node.js, Vercel" },
        // Works
        { key: "works_label", content: "04. Works" },
        { key: "works_title", content: "Selected Projects" },
        // Contact
        { key: "contact_label", content: "05. Contact" },
        { key: "contact_title", content: "Get In Touch" },
        { key: "contact_desc", content: "Interested in working together? Or just want to say hi? I'm always open to new opportunities and collaborations." },
        { key: "x_username", content: "" },
        { key: "instagram_username", content: "" },
        { key: "contact_email", content: "hello@example.com" },
    ]

    for (const s of sections) {
        await prisma.section.upsert({
            where: { key: s.key },
            update: {},
            create: s,
        })
    }

    // Seed Projects
    const projects = [
        {
            title: "Coffee Cost Accounting",
            desc: "Streamlit App",
            url: "https://coffeecostaccounting-salvadorcoffee.streamlit.app/",
            thumbnail: "/projects/coffee-cost.png",
            displayOrder: 1
        },
        {
            title: "AI Salva Chat",
            desc: "Vercel AI SDK Integration",
            url: "https://ai-salva-chat.vercel.app/",
            displayOrder: 2
        },
        {
            title: "Roulette Rho One",
            desc: "Interactive Game",
            url: "https://roulette-rho-one.vercel.app/",
            displayOrder: 3
        },
        {
            title: "Salva Coffee Shindan",
            desc: "Google Sites Project",
            url: "https://sites.google.com/view/salvacoffeeshindan?pli=1",
            thumbnail: "/projects/coffee-shindan.png",
            displayOrder: 4
        },
        {
            title: "Super Pacamara Bros",
            desc: "Xmas Edition Game",
            url: "https://super-pacamara-bros-xmas.vercel.app/",
            displayOrder: 5
        },
        {
            title: "Time Shock",
            desc: "GitHub Pages Game",
            url: "https://mochimochikittypunk.github.io/time-shock/",
            displayOrder: 6
        }
    ]

    // Clear existing projects and recreate
    await prisma.project.deleteMany({});
    for (const p of projects) {
        await prisma.project.create({ data: p });
    }

    console.log("Seeding completed.")
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
