export const useModal = () => useState<boolean>('modal', () => false)
export const useEditTaskModal = () => useState<boolean>('editTaskModal', () => false)
export const useDeleteTaskModal = () => useState<boolean>('deleteTaskModal', () => false)
export const useCreateTaskModal = () => useState<boolean>('createTaskModal', () => false)
export const useNewTask = () => useState<string>('newTask', () => '')

export const useCreateProjectModal = () => useState<boolean>('createProjectModal', () => false)
export const useNewProject = () => useState<string>('newProject', () => '')
export const useNewProjectStartDate = () => useState<string>('newProjectStartDate', () => '')