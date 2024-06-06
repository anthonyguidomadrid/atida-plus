const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const { loadEnvConfig } = require('@next/env')
const morgan = require('morgan')
const finalhandler = require('finalhandler')

const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })
const handle = app.getRequestHandler()
const logger = morgan(
  '":remote-addr REMOTE_USER::remote-user USER_AGENT::user-agent" [DATE::date[iso]] [RESPONSE_TIME::response-time ms] [TOTAL_TIME::total-time ms] "METHOD::method :url HTTP::http-version STATUS::status" "CONTENT_LENGTH::res[content-length] REFERRER::referrer"'
)
loadEnvConfig(process.cwd())

global.newrelic = require('newrelic')

app.prepare().then(() => {
  createServer((req, res) => {
    const errorHandler = finalhandler(req, res)
    logger(req, res, err => {
      if (err) return errorHandler(err)
      const parsedUrl = parse(req.url, true)

      handle(req, res, parsedUrl)
    })
  }).listen(3000, err => {
    if (err) throw err
    console.info(
      '> Configuration',
      JSON.stringify({ cacheDisabled: process.env.DISABLE_CACHE })
    )
    console.log('> Ready on http://localhost:3000')
  })
})
