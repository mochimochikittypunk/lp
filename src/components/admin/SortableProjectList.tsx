'use client'

import { useState } from 'react'
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import SortableProjectItem from './SortableProjectItem'
import { reorderProjects } from '@/app/actions/cms'

interface Project {
    id: string
    title: string
    desc: string
    url: string
    displayOrder: number
}

interface SortableProjectListProps {
    initialProjects: Project[]
}

export default function SortableProjectList({ initialProjects }: SortableProjectListProps) {
    const [projects, setProjects] = useState(initialProjects)
    const [isSaving, setIsSaving] = useState(false)
    const [message, setMessage] = useState<string | null>(null)

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    async function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event

        if (over && active.id !== over.id) {
            const oldIndex = projects.findIndex((p) => p.id === active.id)
            const newIndex = projects.findIndex((p) => p.id === over.id)

            const newProjects = arrayMove(projects, oldIndex, newIndex)
            setProjects(newProjects)

            // Save new order to database
            setIsSaving(true)
            setMessage(null)
            try {
                await reorderProjects(newProjects.map(p => p.id))
                setMessage('✅ 順番を保存しました')
                // Trigger preview refresh
                window.dispatchEvent(new CustomEvent('preview-refresh'))
                setTimeout(() => setMessage(null), 3000)
            } catch (error) {
                setMessage('❌ 順番の保存に失敗しました')
            } finally {
                setIsSaving(false)
            }
        }
    }

    return (
        <div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px'
            }}>
                <h2 style={{ fontSize: '18px', fontWeight: '600' }}>作品編集</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {isSaving && <span style={{ fontSize: '12px', color: '#888' }}>保存中...</span>}
                    {message && (
                        <span style={{
                            fontSize: '14px',
                            color: message.includes('✅') ? '#4ade80' : '#ef4444',
                            fontWeight: '500'
                        }}>
                            {message}
                        </span>
                    )}
                </div>
            </div>
            <p style={{ fontSize: '12px', color: '#888', marginBottom: '16px' }}>
                ドラッグ&ドロップで並び替えできます
            </p>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={projects.map(p => p.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {projects.map((project, index) => (
                            <SortableProjectItem
                                key={project.id}
                                project={project}
                                index={index + 1}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    )
}
