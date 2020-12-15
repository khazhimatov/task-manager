import React, { ReactElement } from 'react'
import MainLayout from '../../layouts/MainLayout'
import TasksContainer from '../../containers/TasksContainer/TasksContainer'

function TasksPage(): ReactElement {
  return <MainLayout>
    <TasksContainer />
  </MainLayout>
}

export default TasksPage
