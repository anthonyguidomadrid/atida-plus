export interface StorageMechanism {
  get: (value: string) => string | null | undefined
  set: (name: string, value: string, options?: unknown) => void
  remove: (name: string, options?: unknown) => void
}
