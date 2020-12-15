import { BaseSyntheticEvent } from 'react'
import { FieldValues, useForm as useFormHook, UseFormMethods } from 'react-hook-form'

export default function useForm<TFieldValues>(): UseFormMethods<TFieldValues> {
  const { handleSubmit, ...rest } = useFormHook()
  const handleSubmitCustom =
  (onValid: (data: FieldValues | FormData, event: BaseSyntheticEvent) => void,
    onInValid?: (data: FieldValues | FormData) => void) =>
    (event: BaseSyntheticEvent): Promise<void> => {
      const onValidCustom = (data: FieldValues): void => {
        if (event.target.enctype === 'multipart/form-data') {
          data = new FormData(event.target)
        }
        onValid(data, event)
      }
      return handleSubmit(onValidCustom, onInValid)(event)
    }

  return { handleSubmit: handleSubmitCustom, ...rest } as UseFormMethods<TFieldValues>
}
