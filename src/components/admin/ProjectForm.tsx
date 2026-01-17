'use client'

import { useFormStatus } from 'react-dom'
import { useState, useTransition } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { updateProject } from "@/app/actions/cms"

interface ProjectFormProps {
    projectId: string
    title: string
    desc: string
    url: string
    index: number
}

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

export default function ProjectForm({ projectId, title: initialTitle, desc: initialDesc, url: initialUrl, index }: ProjectFormProps) {
    const [title, setTitle] = useState(initialTitle)
    const [desc, setDesc] = useState(initialDesc)
    const [url, setUrl] = useState(initialUrl)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
    const [isPending, startTransition] = useTransition()

    async function handleSubmit(formData: FormData) {
        setMessage(null)
        startTransition(async () => {
            try {
                const newTitle = formData.get("title") as string
                const newDesc = formData.get("desc") as string
                const newUrl = formData.get("url") as string

                await updateProject(projectId, {
                    title: newTitle,
                    desc: newDesc,
                    url: newUrl,
                })

                // Update local state to reflect saved values
                setTitle(newTitle)
                setDesc(newDesc)
                setUrl(newUrl)

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
            <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#FAFAFA',
                marginBottom: '16px'
            }}>
                作品 {index}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                    <label style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#AAA'
                    }}>
                        タイトル
                    </label>
                    <Input
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid rgba(255,255,255,0.2)',
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            color: '#FAFAFA',
                            fontSize: '14px'
                        }}
                    />
                </div>

                <div>
                    <label style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#AAA'
                    }}>
                        説明
                    </label>
                    <Input
                        name="desc"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid rgba(255,255,255,0.2)',
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            color: '#FAFAFA',
                            fontSize: '14px'
                        }}
                    />
                </div>

                <div>
                    <label style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#AAA'
                    }}>
                        URL
                    </label>
                    <Input
                        name="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid rgba(255,255,255,0.2)',
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            color: '#FAFAFA',
                            fontSize: '14px'
                        }}
                    />
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
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
