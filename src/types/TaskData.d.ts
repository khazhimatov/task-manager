import { ChangeType } from '../store/reducers/TaskEditingHistory'
export type taskIdType = number | string
export type taskStatusType = 0 | 10

export interface ITaskData {
  id: taskIdType,
  username: string,
  email: string,
  text: string,
  status: taskStatusType
}

export type ITaskDataWithEditingHistory = ITaskData & {editingHistory: [{
  type: ChangeType,
  date: number
  value?: taskStatusType
}]}
