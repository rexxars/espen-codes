import type {IncomingMessage} from 'http'
import {UAParser} from 'ua-parser-js'

export function getAssumedPortraitMode(req: IncomingMessage) {
  // The UA mobile header might not be sent, so try user agent too if possible
  let isMobile = req.headers['sec-ch-ua-mobile'] === '?1'
  if (!isMobile) {
    try {
      isMobile = new UAParser(req.headers['user-agent']).getDevice().type === 'mobile'
    } catch (err) {
      /* Intentional noop */
    }
  }

  const assumePortraitMode = isMobile
  return assumePortraitMode
}
