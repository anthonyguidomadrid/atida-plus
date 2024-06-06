interface IRefreshTokenConsts {
  isRefreshing: boolean
  failedQueue: {
    resolve: (value: string | null) => void
    reject: (reason?: Error | null) => void
  }[]
}

const REFRESH_TOKEN_CONSTS: IRefreshTokenConsts = {
  isRefreshing: false,
  failedQueue: []
}

export default REFRESH_TOKEN_CONSTS
