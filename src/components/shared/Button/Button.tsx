import React, { HTMLAttributes, PropsWithChildren, ReactElement } from 'react'

import styles from './button.module.sass'

export type ButtonPropsType = PropsWithChildren<HTMLAttributes<HTMLButtonElement>>

function Button(props: ButtonPropsType): ReactElement {
  const { children, className, ...rest } = props
  return <button className={`${styles.button} ${className}`} {...rest}>
    {children}
  </button>
}

export default Button
