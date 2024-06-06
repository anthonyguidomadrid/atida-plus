/* Implementation taken from https://bobbyhadz.com/blog/typescript-extend-globalthis-node */
/* eslint-disable no-var */
import type NewRelic from 'newrelic'
declare global {
  var newrelic: NewRelic
}

export {}
