import { ServerResponse } from 'http'

export const redirectTo = (
  res: ServerResponse,
  Location: string,
  statusCode = 307
): void => {
  res.writeHead(statusCode, { Location })
  res.end()
}
