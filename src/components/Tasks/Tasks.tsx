import React, { FC, ReactElement } from 'react'
import moment from 'moment'
import { ITaskData, ITaskDataWithEditingHistory } from '../../types/TaskData'
import config from '../../config'
import Button from '../shared/Button'
import { MaterialIcon } from '../shared/material-icon/material-icon'

import styles from './tasks.module.sass'


export type TaskPropsType =
  ITaskDataWithEditingHistory & Omit<TasksTablePropsType, 'tasks'>

export const TaskRow =
  ({ isAuth, onClickTextEditButton, onClickStatusButton, ...task }: TaskPropsType)
  : ReactElement => {
    const history =
      task.editingHistory?.map(({ type: typeOfChange, date, value: status }) =>
        <div
          key={`${typeOfChange}${date}`}
          className={styles.histryLine}
          title={typeOfChange === 'text'
            ? 'Отредактировано администратором'
            : config.get('statuses')![status ?? 0]
          }
        >
          <MaterialIcon
            icon={
              typeOfChange === 'text'
                ? 'edit'
                : status === 10
                  ? 'done'
                  : 'hourglass_top'
            }
            size={19}
          />
          <span>{moment(date).format('DD-MM-YYYY hh:mm')}</span>
        </div>)

    return <tr
      className={Number(task.status) === 10 ? styles.statusDone : styles.statusNoDone}
    >
      <td><span>{task.username}</span></td>
      <td><span>{task.email}</span></td>
      <td><pre>{task.text}</pre>{isAuth}</td>
      <td><span>{config.get('statuses')![task.status]}</span></td>
      <td><span>{history}</span></td>
      { isAuth &&
        <td>
          { task.status === 0 &&
              <div>
                <Button
                  className={styles.actionButton}
                  onClick={onClickStatusButton(task)}
                >{'Завершить'}</Button>
              </div>
          }
          <div>
            <Button
              className={styles.actionButton}
              onClick={onClickTextEditButton(task)}
            >{'Редактировать'}</Button>
          </div>
        </td>
      }
    </tr>
  }

export type TasksTablePropsType = {
  tasks: ITaskDataWithEditingHistory[],
  isAuth: boolean,
  onClickTextEditButton: (task: ITaskData) => () => void,
  onClickStatusButton: (task: ITaskData) => () => void,
}

let TasksTable: FC<TasksTablePropsType> =
  ({ tasks, isAuth, onClickTextEditButton, onClickStatusButton }
  : TasksTablePropsType): ReactElement => {

    const rows = tasks.map(task =>
      <TaskRow { ...task }
        onClickTextEditButton={onClickTextEditButton}
        onClickStatusButton={onClickStatusButton}
        isAuth={isAuth}
        key={`${task.id}${task.text}${task.status}`}
      />)

    return <table
      className={`${styles.table}`}>
      <thead>
        <tr>
          <th>{'Имя пользователя'}</th>
          <th>{'Email'}</th>
          <th>{'Описание'}</th>
          <th className={styles.status}>{'Статус'}</th>
          <th className={styles.history}>{'История'}</th>
          { isAuth && <th className={styles.actionsColumn}>{'Действия'}</th> }
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  }

TasksTable = React.memo(TasksTable)

export default TasksTable
