import { createSlice } from '@reduxjs/toolkit'
import { taskIdType } from '../../types/TaskData'

export type ChangeType = 'text' | 'status'

export type taskEditingHistoryType = Record<taskIdType, {
  type: ChangeType
  date: number
}[]>

export interface taskEditingHistoryPayloadType {
  id: taskIdType
  date: number
  value?: string | number
}

const initialState: taskEditingHistoryType = {}

const taskEditingHistorySlice = createSlice({
  name: 'taskEditingHistory',
  initialState,
  reducers: {
    editTaskText(state, { payload }: { payload: taskEditingHistoryPayloadType }) {
      const { id, ...rest } = payload
      if (!state[id]) {
        state[id] = []
      }
      state[id].push({ ...rest, type: 'text' })
    },
    editTaskStatus(state, { payload }: { payload: taskEditingHistoryPayloadType }) {
      const { id, ...rest } = payload
      if (!state[id]) {
        state[id] = []
      }
      state[id].push({ ...rest, type: 'status' })
    },
  },
})

export default taskEditingHistorySlice
export const {
  editTaskText: editTaskTextAction,
  editTaskStatus: editTaskStatusAction,
} = taskEditingHistorySlice.actions
