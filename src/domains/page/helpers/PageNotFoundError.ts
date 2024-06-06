export class PageNotFoundError extends Error {
  code: number

  constructor(message: string) {
    super(message)
    this.name = 'page.not-found-error'
    this.code = 404
  }
}
