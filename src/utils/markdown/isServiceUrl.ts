export function isValidUrl(str: string) {
  try {
    const url = new URL(str);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false
  }
}

export function isTwitterUrl(url: string) {
  return /^https:\/\/twitter.com\/\w+\/status\/\d+$/.test(url)
}

export function isYoutube(url: string) {
  return /^https:\/\/www\.youtube\.com\/(?:watch|shorts|clip)\/?[?&=\w]+$/.test(url)
}