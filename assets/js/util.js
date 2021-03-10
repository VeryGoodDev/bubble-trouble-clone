/**
 * @param {string} url URL of the image
 * @returns {Promise<HTMLImageElement>}
 */
export function getImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = function onLoadImage() {
      resolve(img)
    }
    img.onerror = function onError() {
      reject(new Error(`Something went wrong loading the image`))
    }
    img.src = fixUrl(url)
  })
}
/**
 * @param {string} url URL of the JSON resource
 * @returns {Promise}
 */
export function getJson(url) {
  return fetch(fixUrl(url)).then(res => res.json())
}

// Internal helpers, not exported
/**
 * @param {string} url The URL to be adjusted for the current location
 * @returns string The URL relative to the current location
 */
function fixUrl(url) {
  try {
    return new URL(url, window.location.href).href
  } catch (err) {
    console.error(`Error trying to fix ${url}:`, err)
    return url
  }
}
