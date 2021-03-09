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
    img.src = url
  })
}
/**
 * @param {string} url URL of the JSON resource
 * @returns {Promise}
 */
export function getJson(url) {
  return fetch(url).then(res => res.json())
}
