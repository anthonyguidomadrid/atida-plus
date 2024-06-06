//Third-party code provided by Webloyalty: https://tag.webloyalty.com/v3/react/3633839eb5a848a52e1c495be4b5f92a

export const pushToWindowProdIDAArray = (ckw: string, hash: string): void => {
  window.prodID.a.push({
    h: encode(hash),
    ckw: ckw,
    r: false
  })
}

export const getWebloyalty = (): void => {
  ;(function (i) {
    if (i && i.a.length > 0) {
      const c = document
      const d = function d(e: string) {
        let r
        let a
        for (r = '', a = 0; a < e.length; a++) {
          r += '' + e.charCodeAt(a).toString(16)
        }
        return r
      }
      const v = function v(e: string) {
        let r
        let a
        let n
        for (
          r = e.toString(), a = '', n = 0;
          n < r.length && '00' !== r.substr(n, 2);
          n += 2
        ) {
          a += String.fromCharCode(parseInt(r.substr(n, 2), 16))
        }
        return a
      }
      const u = function u() {
        for (let e = 0; e < i.a.length; e++) {
          const r = Math.floor(Date.now() / 1e3)
          let a = ''
          let n = ''
          if (i.a[e].ckw !== undefined) {
          }
          if (n.slice(-1) !== ';' && n.slice(-1) !== '') {
            n += ';'
          }
          if (i.a[e].k !== undefined) {
            a = 'kw=' + i.a[e].k + ';'
          }
          const t = a + n
          const f =
            v(i.u) +
            '/' +
            r +
            '/' +
            s +
            '/' +
            l +
            '/' +
            (i.a[e].a && window.atob(i.a[e].a)) +
            '/' +
            i.b +
            '/' +
            i.c +
            '/' +
            d(t)
          const o = c.createElement('script')
          o.async = true
          o.src = f
          c.getElementById('w' + v(i.a[e].h))?.appendChild(o)
        }
      }
      const f = function f() {
        let e = []
        for (let r = 0; r < i.a.length; r++) {
          e.push(i.a[r].r)
        }
        if (e.indexOf(true) > -1 && i.hasOwnProperty('b')) {
          i.r = true
        }
        e = []
        if (i.r) {
          u()
        }
      }
      const a = function a() {
        function e() {
          if (c.getElementById('Adwl') !== null) {
            i.b = 0
          } else {
            i.b = 1
          }
        }
        function r(e: string, r: () => void) {
          const a = c.getElementsByTagName('body')[0]
          const n = c.createElement('script')
          n.src = v(e)
          if (typeof r !== 'undefined') {
            n.onload = r
            n.onerror = r
          }
          a.appendChild(n)
          o()
        }
        if (typeof e === 'function') {
          r(
            '68747470733a2f2f6433646835633772777a6c69776d2e636c6f756466726f6e742e6e65742f6164766572746973656d656e742e6a733f6466703d31',
            e
          )
        }
      }
      const o = function o() {
        const e =
          '68747470733a2f2f643332313036726c6864636f676f2e636c6f756466726f6e742e6e65742f'
        let r = ''
        const a = Math.floor(Date.now() / 1e3)
        for (let n = 0; n < i.a.length; n++) {
          r += i.a[n].h
          if (n < i.a.length - 1) {
            r += '/'
          }
        }
        const t = c.createElement('script')
        t.async = true
        t.src = v(e) + a + '/' + s + '/' + l + '/' + r
        t.onload = f
        c.body.appendChild(t)
      }
      const l = '2'
      const s = '33'
      a()
    }
  })(
    (function () {
      const e = 'dDropI'
      //@ts-ignore
      const r = window[e[4] + e[2] + e[3] + e[0] + e[5] + e[1]]
      return typeof r !== undefined ? r : false
    })()
  )
}

const encode = (v: string): string => {
  let hex = ''
  for (let i = 0; i < v.length; i++) {
    hex += '' + v.charCodeAt(i).toString(16)
  }
  return hex
}
