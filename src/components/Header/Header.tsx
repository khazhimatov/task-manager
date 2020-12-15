import React, { ReactElement } from 'react'

import styles from './header.module.sass'
import commonStyles from '../../styles/_.module.sass'
import { NavLink } from 'react-router-dom'
import Button from '../shared/Button'

export type HeaderPropsType = {
  isAuth: boolean,
  onLogout: () => void
}

function Header({ isAuth, onLogout }: HeaderPropsType): ReactElement {
  return (
    <header className={styles.main}>
      <div className={commonStyles.row}>
        <div className={`${commonStyles.row} ${commonStyles}`}>
          <div className={styles.title}>
            {'Task Manager'}
          </div>
        </div>
        <div className={`${commonStyles.row} ${styles.actions}`}>
          { isAuth
            ? <Button onClick={onLogout}>{'Выйти'}</Button>
            : <NavLink to="/login">
              <Button>{'Авторизоваться'}</Button>
            </NavLink> }

        </div>
      </div>
    </header>
  )
}

export default Header
