'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import ProjectForm from './ProjectForm'

interface Project {
    id: string
    title: string
    desc: string
    url: string
}

interface SortableProjectItemProps {
    project: Project
    index: number
}

export default function SortableProjectItem({ project, index }: SortableProjectItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: project.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    }

    return (
        <div ref={setNodeRef} style={style}>
            <div style={{ display: 'flex', gap: '12px' }}>
                <div
                    {...attributes}
                    {...listeners}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40px',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        borderRadius: '8px',
                        cursor: 'grab',
                        flexShrink: 0
                    }}
                >
                    <GripVertical style={{ color: '#888', width: '20px', height: '20px' }} />
                </div>
                <div style={{ flex: 1 }}>
                    <ProjectForm
                        projectId={project.id}
                        title={project.title}
                        desc={project.desc}
                        url={project.url}
                        index={index}
                    />
                </div>
            </div>
        </div>
    )
}
