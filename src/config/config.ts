import * as _ from 'lodash'
import { env } from '../env'

const defaultConfig = {
}

export const config = _.assign({}, defaultConfig, process.env, env)

export type TConfig = typeof defaultConfig & typeof env | NodeJS.ProcessEnv
