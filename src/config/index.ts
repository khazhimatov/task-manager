import { config, TConfig } from './config'

export function
get<T extends keyof TConfig = keyof TConfig,
  K = keyof NodeJS.ProcessEnv>(key: T | K): TConfig[T] {
  return config[key as string] || ''
}

export function
set<T extends string>(key: keyof TConfig | T, value: string): void {
  config[key as string] = value
}

export default {
  get,
  set,
}
