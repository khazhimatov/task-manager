import React, { FC } from 'react'
import { useHistory } from 'react-router'
import { useRequestMutation } from '../../hooks/useRequestMutation'
import { useDispatch } from '../../hooks/useDispatch'
import { login } from '../../store/reducers/Auth'
import useNotification from '../../hooks/useNotification'
import Form from '../../components/Form'
import useForm from '../../hooks/useForm'
import Loader from '../../components/shared/Loader'
import config from '../../config'

const LoginContainer: FC = () => {
  const dispatch = useDispatch()
  const browserHistory = useHistory()
  const addNotification = useNotification()
  const { register, handleSubmit } = useForm()

  const [requestAPI, { isLoading, error, isError }] =
    useRequestMutation<{token: string}>(`login/?developer=${config.get('developer')}`)

  if (isError && error instanceof Error) {
    addNotification({
      title: 'Ошибка',
      type: 'danger',
      message: 'Что-то пошло не так!',
    })
  }

  async function signIn(values: FormData): Promise<void> {
    const data = await requestAPI.post(values)

    if (data?.token) {
      dispatch(login(data.token))
      browserHistory.push('/')
    }
  }

  return <Form.Wrapper title={'Авторизация'}>
    {isLoading && <Loader size={'40px'}/>}
    <form onSubmit={handleSubmit(signIn)} encType={'multipart/form-data'}>
      <Form.FieldInput
        error={error?.username}
        ref={register}
        name={'username'}
        placeholder={'Введите имя пользователя'}
      />
      <Form.FieldInput
        error={error?.password}
        type={'password'}
        ref={register({})}
        name={'password'}
        placeholder={'Введите пароль'}
      />
      <Form.FieldSubmit/>
    </form>
  </Form.Wrapper>
}

export default LoginContainer
