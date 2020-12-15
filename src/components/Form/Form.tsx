/* eslint-disable sonarjs/no-duplicate-string */
import React, { AllHTMLAttributes, PropsWithChildren, ReactElement, ReactNode, Ref }
  from 'react'

import styles from './form.module.sass'

interface ILoginFormWrapperProps {
  children: ReactNode
  title?: string
}

export type FieldWithErrorType = PropsWithChildren<{error?: string}>
export type FieldPropsType = FieldWithErrorType &
AllHTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>

const Wrapper = ({ children, title }: ILoginFormWrapperProps): ReactElement =>
  <div className={`${styles['card-form']}`}>
    <h4 className={`${styles['card-title']}`}>
      {title}
    </h4>
    <div className={`${styles['card-body']}`}>
      {children}
    </div>
  </div>

const FieldWithError = (props: FieldWithErrorType): ReactElement => {
  const { error, children } = props
  return <div className={`${styles['field']}`}>
    {children}
    {error && <div className={styles.error}>{error}</div>}
  </div>
}

const FieldInput = React.forwardRef(
  (props: FieldPropsType, ref: Ref<HTMLInputElement>): ReactElement =>
    <FieldWithError error={props.error}>
      <input {...props} ref={ref}/>
    </FieldWithError>)

const FieldCheckbox = React.forwardRef(
  (props: FieldPropsType, ref: Ref<HTMLInputElement>): ReactElement => {
    const { children, error, ...rest } = props

    return <FieldWithError error={error}>
      <div className={styles.checkbox}>
        <label htmlFor={props?.name}>{children}</label>
        <input {...rest} ref={ref} type={'checkbox'} id={props.name}/>
      </div>
    </FieldWithError>
  })

const FieldTextarea = React.forwardRef(
  (props: FieldPropsType, ref: Ref<HTMLTextAreaElement>): ReactElement =>
    <FieldWithError error={props.error}>
      <textarea {...props} ref={ref}/>
    </FieldWithError>)

const FieldSelect = React.forwardRef(
  (props: FieldPropsType, ref: Ref<HTMLSelectElement>): ReactElement =>
    <FieldWithError error={props.error}>
      <select {...props} ref={ref}/>
    </FieldWithError>)

const FieldSubmit = React.forwardRef(
  (props: FieldPropsType, ref: Ref<HTMLInputElement>): ReactElement =>
    <FieldWithError error={props.error}>
      <input {...props} ref={ref} type={'submit'}
        className={styles.submit}/>
    </FieldWithError>)

const TaskForm = {
  Wrapper,
  FieldInput,
  FieldCheckbox,
  FieldTextarea,
  FieldSelect,
  FieldSubmit,
}

export default TaskForm
