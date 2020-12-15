import React, { FC, useEffect, useRef } from 'react'
import * as _ from 'lodash'
import { useRequest } from '../../hooks/useRequet'
import Tasks from '../../components/Tasks'
import Pagination from '../../components/Pagination'
import TaskActions from '../TaskActions/TaskActions'
import notNullObject from '../../utils/notNullObject'
import useTaskParams from '../../hooks/useTaskParams'
import calculatePageNumbers from '../../helpers/calculatePageNumbers'
import TaskForm from '../../components/Form'
import Loader from '../../components/shared/Loader'
import useModal from '../../components/shared/Modal'
import { useRequestMutation } from '../../hooks/useRequestMutation'
import useForm from '../../hooks/useForm'
import { useSelector } from '../../hooks/useSelector'
import { ITaskData, ITaskDataWithEditingHistory } from '../../types/TaskData'
import { useDispatch } from '../../hooks/useDispatch'
import { editTaskStatusAction, editTaskTextAction }
  from '../../store/reducers/TaskEditingHistory'
import useNotification from '../../hooks/useNotification'
import config from '../../config'

import commonStyles from '../../styles/_.module.sass'

export type TasksResponseType = {
  tasks: ITaskData[],
  total_task_count: number,
}

// eslint-disable-next-line sonarjs/cognitive-complexity
const TasksContainer: FC = () => {
  const editedTask = useRef<ITaskData | null>(null)
  const { page = 1 , sort_field, sort_direction } = useTaskParams()
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.accessToken)
  const tasksEditingHistory = useSelector(state => state.taskEditingHistory)

  const { handleSubmit, register } = useForm()
  const addNotification = useNotification()
  const [requestAPI, { error, isLoading, isError, reset: resetError }] =
    useRequestMutation(() =>
      `edit/${editedTask.current?.id}/?developer=${config.get('developer')}`)

  const { Modal, openModal, closeModal } = useModal('root', { onClose: resetError })

  const { data, refetch } = useRequest<TasksResponseType>('', {
    data: {
      developer: config.get('developer'),
      ...notNullObject({ page, sort_field, sort_direction }),
    },
  })

  useEffect(() => {
    void refetch()
  }, [page, sort_field, sort_direction, refetch])

  useEffect(() => {
    if (isError && error instanceof Error) {
      addNotification({
        title: 'Ошибка',
        type: 'danger',
        message: 'Что-то пошло не так!',
      })
    }
  }, [isError, error, addNotification])

  const taskEditButtonClick = (task: ITaskData) => () => {
    editedTask.current = task
    openModal()
  }

  async function taskSave(data: FormData): Promise<void> {
    const status = Number(data.get('status'))
    data.set('status', status.toString())

    if (data.get('text') === editedTask.current?.text
      && Number(data.get('status')) === editedTask.current?.status) {
      closeModal()
      return void 0
    }

    data.append('token', token)
    const result = await requestAPI.post(data)

    if (result) {
      const date = Date.now()
      if (data.get('text') !== editedTask.current?.text) {
        dispatch(editTaskTextAction({ id: editedTask.current!.id, date }))
      }

      if (Number(data.get('status')) !== editedTask.current?.status) {
        dispatch(editTaskStatusAction({
          id: editedTask.current!.id,
          date,
          value: status,
        }))
      }

      void refetch()
      closeModal()
      addNotification({
        type: 'success',
        title: 'Задача успешно отредактирована!',
      })
    }
  }

  const handleStatusChange = (task: ITaskData): () => void => async () => {
    editedTask.current = task

    const data = new FormData()
    data.append('token', token)
    data.append('status', '10')

    const result = await requestAPI.post(data)
    if (result) {
      const date = Date.now()
      dispatch(editTaskStatusAction({ id: task.id, date, value: 10 }))

      addNotification({
        type: 'success',
        title: 'Задаче присвоен статус "Выполнено"',
      })
      void refetch()
    }
  }

  const { tasks, total_task_count } = data ?? { tasks: null, total_task_count: null }

  let PaginationItems, tasksWithEditingHistory: ITaskDataWithEditingHistory[] | undefined

  if (total_task_count && total_task_count > 0) {

    const [pageNumbers, [firstPageNumber, lastPageNumber]] =
      calculatePageNumbers(total_task_count, page as number, 3)

    tasksWithEditingHistory = tasks?.map(task => ({
      ...task,
      editingHistory: tasksEditingHistory[task.id],
    } as ITaskDataWithEditingHistory))

    PaginationItems = (pageNumbers as number[]).map((value: number) =>
      <Pagination.Item key={value} pageNumber={value} value={value}/>)

    if (firstPageNumber) {
      PaginationItems.unshift(
        <Pagination.Item
          key={firstPageNumber as number}
          pageNumber={firstPageNumber.toString()}
          value={'<<'}
        />)
    }
    if (lastPageNumber) {
      PaginationItems.push(
        <Pagination.Item
          key={lastPageNumber as number}
          pageNumber={lastPageNumber.toString()}
          value={'>>'}
        />)
    }
  }

  return <div className={commonStyles.container}>
    <TaskActions
      displaySort={total_task_count! > 0}
      refetch={refetch}
    />

    { tasks &&
      <Tasks
        tasks={tasksWithEditingHistory ?? []}
        onClickStatusButton={handleStatusChange}
        onClickTextEditButton={taskEditButtonClick}
        isAuth={Boolean(token)}
      /> }

    <Modal>
      {isLoading && <Loader size={'40px'}/>}
      <TaskForm.Wrapper title={'Редактирование задачи'}>
        <form onSubmit={handleSubmit(taskSave)} encType={'multipart/form-data'}>

          <TaskForm.FieldTextarea
            ref={register}
            placeholder={'Введите текст'}
            name={'text'}
            defaultValue={editedTask.current?.text}
            error={error?.text}
          />

          <TaskForm.FieldCheckbox
            ref={register}
            name={'status'}
            error={error?.status}
            value={'10'}
            defaultChecked={Boolean(editedTask.current?.status)}
          >{'Выполнено'}</TaskForm.FieldCheckbox>

          <TaskForm.FieldSubmit value={'Сохранить'}/>
        </form>
      </TaskForm.Wrapper>
    </Modal>

    <Pagination>{PaginationItems}</Pagination>
  </div>
}

export default TasksContainer
