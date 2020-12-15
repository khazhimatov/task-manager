import React, { ChangeEvent, FC, ReactElement, useEffect, useState }
  from 'react'
import { useHistory } from 'react-router'
import _ from 'lodash'
import Select from '../../components/shared/Select'
import Button from '../../components/shared/Button/Button'
import useModal from '../../components/shared/Modal'
import Loader from '../../components/shared/Loader'
import TaskForm from '../../components/Form'
import useGenerateLink from '../../hooks/useGenerateLink'
import useTaskParams, { ITaskParamsResult } from '../../hooks/useTaskParams'
import config from '../../config'
import { useRequestMutation } from '../../hooks/useRequestMutation'
import useNotification from '../../hooks/useNotification'
import useForm from '../../hooks/useForm'
import { ITaskData } from '../../types/TaskData'
import notNullObject from '../../utils/notNullObject'

import styles from './tasks-actions.module.sass'
import commonStyles from '../../styles/_.module.sass'

export type TaskActionsPropsType = {
  displaySort: boolean,
  refetch: () => void,
}

let TaskActions: FC<TaskActionsPropsType> =
({ displaySort, refetch }: TaskActionsPropsType): ReactElement => {

  const { sort_field = null, sort_direction = null } = useTaskParams()
  const history = useHistory()
  const generateLink = useGenerateLink()
  const { handleSubmit, register } = useForm()

  const [sorting, setSorting] =
    useState<ITaskParamsResult>({ sort_field: null, sort_direction: null })
  const addNotification = useNotification()

  const [requestAPI, { error, isLoading, isError, reset: resetError }] =
    useRequestMutation<ITaskData>(`create?developer=${config.get('developer')}`)

  const { Modal, openModal, closeModal } = useModal('root', { onClose: resetError })

  useEffect(() => {
    setSorting({ sort_field, sort_direction })
  }, [])

  useEffect(() => {
    if (!_.isEqual(sorting, { sort_field, sort_direction })) {
      history.push(generateLink(notNullObject(sorting as Record<string, string>)))
    }
  }, [sorting])

  useEffect(() => {
    if (isError && error instanceof Error) {
      addNotification({
        title: 'Ошибка',
        type: 'danger',
      })
    }
  }, [isError])

  async function handleCreateTask(values: FormData): Promise<void> {
    const data = await requestAPI.post(values)
    if (data) {
      closeModal()
      addNotification({
        type: 'success',
        title: 'Задача успешно добавлена',
      })
      refetch()
    }
  }

  function handleSortField(e: ChangeEvent<HTMLSelectElement>): void {
    setSorting((sorting: ITaskParamsResult) =>
      ({ ...sorting, [e.target.name]: e.target.value }))
  }

  return (
    <div className={`${styles.container} ${commonStyles.row}`}>
      {displaySort && <> <span>{'Сортировать по '}</span>
        <Select
          title={'Выберите поле'}
          onChange={handleSortField}
          name={'sort_field'}
          width={'150px'}
          value={sorting.sort_field as string}
          optionsObj={config.get('sort_field') as Record<string, string>}
        />
        <Select
          title={'Как сортировать?'}
          onChange={handleSortField}
          width={'170px'}
          name={'sort_direction'}
          value={sorting.sort_direction as string}
          optionsObj={config.get('sort_direction') as Record<string, string>}
        />
      </>}
      <Button onClick={openModal}>{'Добавить задачу'}</Button>
      <Modal>
        {isLoading && <Loader size={'40px'}/>}
        <TaskForm.Wrapper title={'Добавление задачи'}>
          <form onSubmit={handleSubmit(handleCreateTask)} encType={'multipart/form-data'}>
            <TaskForm.FieldInput
              placeholder={'Введите имя пользователя'}
              ref={register} name={'username'}
              error={error?.username}
            />
            <TaskForm.FieldInput
              placeholder={'Введите email'}
              ref={register} name={'email'}
              error={error?.email}
            />
            <TaskForm.FieldTextarea
              placeholder={'Введите текст'}
              ref={register} name={'text'}
              error={error?.text}
            />
            <TaskForm.FieldSubmit value={'Отправить'}/>
          </form>
        </TaskForm.Wrapper>
      </Modal>
    </div>)
}

TaskActions = React.memo(TaskActions)

export default TaskActions
