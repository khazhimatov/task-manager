import React, { FC, ReactElement, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import useGenerateLink from '../../hooks/useGenerateLink'
import useTaskParams from '../../hooks/useTaskParams'

import styles from './pagination.module.sass'
import notNullObject from '../../utils/notNullObject'

export type PaginationItemType = {
  pageNumber: string | number,
  value: string | number,
}

let PaginationItem: FC<PaginationItemType> =
({ pageNumber, value }: PaginationItemType): ReactElement => {
  const { sort_field = null, sort_direction = null } = useTaskParams()

  const generateLink = useGenerateLink()
  const link =
    generateLink(notNullObject({ page: pageNumber, sort_field, sort_direction }))

  const { page: currentPage } = useTaskParams()

  return <li>
    <NavLink to={link}
      activeClassName={styles.active}
      isActive={() => pageNumber === Number(currentPage)}
    >{value}</NavLink>
  </li>
}

PaginationItem = React.memo(PaginationItem)

export type PaginationPropsType = {
  children: ReactNode
}

export const Pagination = ({ children }: PaginationPropsType): ReactElement =>
  <div className={styles.wrapper}>
    <ul className={styles.list}>
      {children}
    </ul>
  </div>

Pagination.Item = PaginationItem

export default Pagination
