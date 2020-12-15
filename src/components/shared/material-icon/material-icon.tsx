import React, { ReactElement } from 'react'

import styles from '../../../styles/_.module.sass'

export type MaterialIconType =
  {icon: string, size?: number, className?: string, color?: string}

export const MaterialIcon = ({ icon, size, className, color }: MaterialIconType)
: ReactElement =>
  <span className={`material-icons ${styles.icon} ${className}`}
    style={{ fontSize: size ? `${size}px` : '', color }}
  >{icon}</span>
