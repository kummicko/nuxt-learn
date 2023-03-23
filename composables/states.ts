export const useModal = () => useState<boolean>('modal', () => false)
export const useEditModal = () => useState<boolean>('editModal', () => false)
export const useDeleteModal = () => useState<boolean>('deleteModal', () => false)