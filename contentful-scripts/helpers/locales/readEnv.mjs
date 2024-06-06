import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const readEnv = () => {
  const basicEnv = dotenv.config({ path: __dirname + '/../../.env' }).parsed
  const localEnv = dotenv.config({
    path: __dirname + '/../../.env.local'
  }).parsed

  return { ...basicEnv, ...localEnv }
}
