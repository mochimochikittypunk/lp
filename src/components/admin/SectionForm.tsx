'use client'

import { useFormStatus } from 'react-dom'
import { useState, useTransition } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { updateSection } from "@/app/actions/cms"

interface SectionFormProps {
    sectionId: string
    sectionKey: string
    label: string
    content: string
}

// マルチライン編集が必要なキー
const multilineKeys = [
    'hero_desc', 'vision_text_1', 'vision_text_2',
    'contact_desc', 'mission_card_1_desc', 'mission_card_2_desc', 'mission_card_3_desc'
]

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button
            type="submit"
            disabled={pending}
            style={{
                padding: '12px 32px',
                borderRadius: '8px',
                backgroundColor: pending ? '#888' : '#FAFAFA',
                color: '#050505',
                fontWeight: '600',
                fontSize: '14px',
                border: 'none',
                cursor: pending ? 'not-allowed' : 'pointer'
            }}
        >
            {pending ? '保存中...' : '💾 保存する'}
        </Button>
    )
}

export default function SectionForm({ sectionId, sectionKey, label, content }: SectionFormProps) {
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
    const [isPending, startTransition] = useTransition()

    async function handleSubmit(formData: FormData) {
        setMessage(null)
        startTransition(async () => {
            try {
                await updateSection(sectionKey, formData.get("content") as string)
                setMessage({ type: 'success', text: '✅ 保存されました' })
                // Trigger preview refresh
                window.dispatchEvent(new CustomEvent('preview-refresh'))
                // Clear message after 3 seconds
                setTimeout(() => setMessage(null), 3000)
            } catch (error) {
                setMessage({ type: 'error', text: '❌ 保存に失敗しました' })
            }
        })
    }

    return (
        <form
            action={handleSubmit}
            style={{
                padding: '24px',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: 'rgba(255,255,255,0.03)'
            }}
        >
            <label style={{
                display: 'block',
                marginBottom: '12px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#FAFAFA'
            }}>
                {label}
            </label>
            <p style={{
                fontSize: '12px',
                color: '#666',
                marginBottom: '16px',
                fontFamily: 'monospace'
            }}>
                キー: {sectionKey}
            </p>

            {multilineKeys.includes(sectionKey) || content.length > 50 ? (
                <Textarea
                    name="content"
                    defaultValue={content}
                    style={{
                        width: '100%',
                        minHeight: '120px',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        color: '#FAFAFA',
                        fontSize: '14px',
                        marginBottom: '16px'
                    }}
                />
            ) : (
                <Input
                    name="content"
                    defaultValue={content}
                    style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        color: '#FAFAFA',
                        fontSize: '14px',
                        marginBottom: '16px'
                    }}
                />
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <SubmitButton />
                {message && (
                    <span style={{
                        fontSize: '14px',
                        color: message.type === 'success' ? '#4ade80' : '#ef4444',
                        fontWeight: '500'
                    }}>
                        {message.text}
                    </span>
                )}
            </div>
        </form>
    )
}
