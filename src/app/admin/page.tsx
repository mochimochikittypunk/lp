import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/db"
import SectionForm from "@/components/admin/SectionForm"
import SortableProjectList from "@/components/admin/SortableProjectList"
import LivePreview from "@/components/admin/LivePreview"

// セクションキーの日本語ラベル（フロントエンドの表示順）
const keyLabels: Record<string, string> = {
    // Hero
    hero_title_1: "Hero: タイトル1行目",
    hero_title_2: "Hero: タイトル2行目",
    hero_desc: "Hero: 説明文",
    // Vision
    vision_label: "Vision: ラベル",
    vision_title: "Vision: タイトル",
    vision_text_1: "Vision: テキスト（左）",
    vision_text_2: "Vision: テキスト（右）",
    // Mission
    mission_label: "Mission: ラベル",
    mission_title: "Mission: タイトル",
    mission_card_1_title: "Mission: カード1 タイトル",
    mission_card_1_desc: "Mission: カード1 説明",
    mission_card_2_title: "Mission: カード2 タイトル",
    mission_card_2_desc: "Mission: カード2 説明",
    mission_card_3_title: "Mission: カード3 タイトル",
    mission_card_3_desc: "Mission: カード3 説明",
    // Process
    process_label: "Process: ラベル",
    process_title: "Process: タイトル",
    process_step_1_title: "Process: ステップ1 タイトル",
    process_step_1_desc: "Process: ステップ1 説明",
    process_step_2_title: "Process: ステップ2 タイトル",
    process_step_2_desc: "Process: ステップ2 説明",
    process_step_3_title: "Process: ステップ3 タイトル",
    process_step_3_desc: "Process: ステップ3 説明",
    process_step_4_title: "Process: ステップ4 タイトル",
    process_step_4_desc: "Process: ステップ4 説明",
    process_tech_label: "Process: 技術スタック見出し",
    process_tech_stack: "Process: 技術スタック（カンマ区切り）",
    // Works
    works_label: "Works: ラベル",
    works_title: "Works: タイトル",
    // Contact
    contact_label: "Contact: ラベル",
    contact_title: "Contact: タイトル",
    contact_desc: "Contact: 説明文",
    x_username: "SNS: X (Twitter) ユーザー名",
    instagram_username: "SNS: Instagram ユーザー名",
    contact_email: "連絡先: 問い合わせ受信メール",
}

// フロントエンドの表示順序を定義
const keyOrder = [
    "hero_title_1", "hero_title_2", "hero_desc",
    "vision_label", "vision_title", "vision_text_1", "vision_text_2",
    "mission_label", "mission_title", "mission_card_1_title", "mission_card_1_desc",
    "mission_card_2_title", "mission_card_2_desc", "mission_card_3_title", "mission_card_3_desc",
    "process_label", "process_title",
    "process_step_1_title", "process_step_1_desc", "process_step_2_title", "process_step_2_desc",
    "process_step_3_title", "process_step_3_desc", "process_step_4_title", "process_step_4_desc",
    "process_tech_label", "process_tech_stack",
    "works_label", "works_title",
    "contact_label", "contact_title", "contact_desc",
    "x_username", "instagram_username", "contact_email"
]

export default async function AdminPage() {
    const session = await auth()
    if (!session) {
        redirect("/api/auth/signin")
    }

    const sectionsRaw = await prisma.section.findMany()
    const projects = await prisma.project.findMany({ orderBy: { displayOrder: 'asc' } })

    // フロントエンドの表示順にソート
    const sections = sectionsRaw.sort((a, b) => {
        const indexA = keyOrder.indexOf(a.key)
        const indexB = keyOrder.indexOf(b.key)
        if (indexA === -1) return 1
        if (indexB === -1) return -1
        return indexA - indexB
    })

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            backgroundColor: '#050505',
            color: '#FAFAFA'
        }}>
            {/* Left Panel - Editor */}
            <div style={{
                width: '50%',
                padding: '32px',
                overflowY: 'auto',
                borderRight: '1px solid rgba(255,255,255,0.1)'
            }}>
                <header style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '24px', marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>コンテンツ管理</h1>
                    <p style={{ color: '#888', fontSize: '14px' }}>
                        ログイン中: {session.user?.email}
                    </p>
                </header>

                <section>
                    <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px' }}>セクション編集</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {sections.map((section) => (
                            <SectionForm
                                key={section.id}
                                sectionId={section.id}
                                sectionKey={section.key}
                                label={keyLabels[section.key] || section.key}
                                content={section.content}
                            />
                        ))}
                    </div>
                </section>

                {/* Project Editing Section with Drag & Drop */}
                <section style={{ marginTop: '48px' }}>
                    <SortableProjectList initialProjects={projects} />
                </section>

                <footer style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
                    <p style={{ color: '#666', fontSize: '12px' }}>
                        保存後、右側のプレビューが自動更新されます
                    </p>
                </footer>
            </div>

            {/* Right Panel - Live Preview */}
            <div style={{
                width: '50%',
                position: 'sticky',
                top: 0,
                height: '100vh',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{
                    padding: '12px 16px',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>📱 ライブプレビュー</span>
                    <span style={{ fontSize: '12px', color: '#888' }}>保存すると自動更新</span>
                </div>
                <LivePreview />
            </div>
        </div>
    )
}
