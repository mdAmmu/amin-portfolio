'use client';

import { motion } from 'framer-motion';

interface Task {
  id: string;
  title: string;
  description?: string;
  status?: 'todo' | 'in-progress' | 'done';
}

interface TaskBoardProps {
  tasks?: Task[];
  columns?: { id: string; title: string; status: Task['status'] }[];
  showDescription?: boolean;
  cardAnimationDuration?: number;
}

export function TaskBoard({
  tasks = [
    { id: '1', title: 'Design landing page', description: 'Create initial design mockups', status: 'todo' },
    { id: '2', title: 'Setup database schema', description: 'Define tables and relations', status: 'in-progress' },
    { id: '3', title: 'Deploy to staging', description: 'Deploy the app for internal testing', status: 'done' },
  ],
  columns = [
    { id: 'col1', title: 'To Do', status: 'todo' },
    { id: 'col2', title: 'In Progress', status: 'in-progress' },
    { id: 'col3', title: 'Done', status: 'done' },
  ],
  showDescription = true,
  cardAnimationDuration = 0.3,
}: TaskBoardProps) {
  return (
    <div className="w-full max-w-full overflow-hidden p-4 bg-[var(--bg-primary)] rounded-xl shadow-[var(--shadow-medium)] grid gap-6 sm:grid-cols-1 md:grid-cols-3">
      {columns.map(({ id, title, status }) => {
        const filteredTasks = tasks.filter((task) => task.status === status);
        return (
          <section key={id} className="flex flex-col bg-[var(--bg-secondary)] rounded-lg shadow-[var(--shadow-soft)] p-4 border border-[var(--border)] max-h-[70vh] overflow-y-auto">
            <h2 className="text-[var(--text-primary)] font-semibold text-lg mb-4 border-b border-[var(--border-muted)] pb-2">
              {title}
            </h2>
            <ul className="flex flex-col gap-3">
              {filteredTasks.length === 0 && (
                <li className="text-[var(--text-muted)] italic text-sm select-none">No tasks</li>
              )}
              {filteredTasks.map(({ id: taskId, title: taskTitle, description }) => (
                <motion.li
                  key={taskId}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.03, boxShadow: 'var(--shadow-strong)' }}
                  transition={{ duration: cardAnimationDuration }}
                  className="bg-[var(--bg-tertiary)] border border-[var(--border-muted)] rounded-md p-3 cursor-pointer select-none shadow-[var(--shadow-soft)] flex flex-col"
                  tabIndex={0}
                  aria-label={`${taskTitle}${showDescription && description ? `, ${description}` : ''}`}
                >
                  <h3 className="text-[var(--text-primary)] font-semibold truncate">{taskTitle}</h3>
                  {showDescription && description && (
                    <p className="text-[var(--text-secondary)] text-sm mt-1 line-clamp-3">{description}</p>
                  )}
                </motion.li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

export const componentMetadata = {
  id: 'task-board',
  name: 'Task Board',
  description: 'A responsive, animated task board with draggable-style cards for task management.',
  category: 'data-display' as const,
  tags: ['task', 'board', 'kanban', 'animated', 'responsive', 'framer-motion', 'tailwind'],
  defaultProps: {
    tasks: [
      { id: '1', title: 'Design landing page', description: 'Create initial design mockups', status: 'todo' },
      { id: '2', title: 'Setup database schema', description: 'Define tables and relations', status: 'in-progress' },
      { id: '3', title: 'Deploy to staging', description: 'Deploy the app for internal testing', status: 'done' },
    ],
    columns: [
      { id: 'col1', title: 'To Do', status: 'todo' },
      { id: 'col2', title: 'In Progress', status: 'in-progress' },
      { id: 'col3', title: 'Done', status: 'done' },
    ],
    showDescription: true,
    cardAnimationDuration: 0.3,
  },
  controls: [
    {
      name: 'showDescription',
      type: 'boolean' as const,
      defaultValue: true,
      label: 'Show Descriptions',
    },
    {
      name: 'cardAnimationDuration',
      type: 'number' as const,
      defaultValue: 0.3,
      label: 'Card Animation Duration (seconds)',
    },
    {
      name: 'tasks',
      type: 'text' as const,
      defaultValue:
        '[{ id: "1", title: "Design landing page", description: "Create initial design mockups", status: "todo" }, { id: "2", title: "Setup database schema", description: "Define tables and relations", status: "in-progress" }, { id: "3", title: "Deploy to staging", description: "Deploy the app for internal testing", status: "done" }]',
      label: 'Tasks (JSON string)',
    },
    {
      name: 'columns',
      type: 'text' as const,
      defaultValue:
        '[{ id: "col1", title: "To Do", status: "todo" }, { id: "col2", title: "In Progress", status: "in-progress" }, { id: "col3", title: "Done", status: "done" }]',
      label: 'Columns (JSON string)',
    },
  ],
  code: `<TaskBoard
  tasks={[
    { id: '1', title: 'Design landing page', description: 'Create initial design mockups', status: 'todo' },
    { id: '2', title: 'Setup database schema', description: 'Define tables and relations', status: 'in-progress' },
    { id: '3', title: 'Deploy to staging', description: 'Deploy the app for internal testing', status: 'done' },
  ]}
  columns={[
    { id: 'col1', title: 'To Do', status: 'todo' },
    { id: 'col2', title: 'In Progress', status: 'in-progress' },
    { id: 'col3', title: 'Done', status: 'done' },
  ]}
  showDescription={true}
  cardAnimationDuration={0.3}
/>`,
};