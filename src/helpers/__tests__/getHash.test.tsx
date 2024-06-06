import { getUuidHash } from '../getHash'

describe(getUuidHash, () => {
  it('returns a uuid hash for PT', () => {
    ;(getUuidHash as jest.Mock).mockReturnValue(
      '9a584740b5963bf0b4c78714fb6a1d1f57017d46f1a445d69e339fddbed439da'
    )

    expect(getUuidHash('pt-pt')).toEqual(
      '9a584740b5963bf0b4c78714fb6a1d1f57017d46f1a445d69e339fddbed439da'
    )
  })

  it('returns a uuid hash for ES', () => {
    ;(getUuidHash as jest.Mock).mockReturnValue(
      '7a584740b5963bf0b4c78714fb6a1d1f57017d46f1a445d69e339fddbed439db'
    )

    expect(getUuidHash('es-es')).toEqual(
      '7a584740b5963bf0b4c78714fb6a1d1f57017d46f1a445d69e339fddbed439db'
    )
  })
})
