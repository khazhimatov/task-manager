import React, { AllHTMLAttributes, ReactElement } from 'react'

import styles from './select.module.sass'

export type SelectPropsType = AllHTMLAttributes<HTMLSelectElement> & {
  width?: string,
  title: string,
  value: string | number,
  optionsObj: Record<string, string>,
}

function Select(props: SelectPropsType): ReactElement {
  const { width = '', title, value, optionsObj, ...rest } = props

  const options = Object.entries(optionsObj).map(([value, text]) =>
    <option
      key={value}
      value={value}
    >{text}</option>)

  return <label className={styles.label}>
    <select
      className={styles.main}
      value={value ?? 'selectTitle'}
      style={{ width }}
      {...rest}
    ><option disabled value={'selectTitle'}>{title}</option>
      {options}
    </select>
  </label>
}

export default Select
