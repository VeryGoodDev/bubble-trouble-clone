/**
 * @typedef { import('./layers/PlayerLayer').Player } Player
 */

const PLAYER_VELOCITY = 5.75

/**
 * @param {Player} player The player which the input should affect
 * @returns {Function} A teardown function to remove listeners
 */
export function setupKeyboard(player) {
  const pressedKeys = new Map()
  /**
   * @param {KeyboardEvent} evt
   */
  function handleKeydown(evt) {
    pressedKeys.set(evt.code, true)
    switch (evt.code) {
      case `ArrowLeft`:
        player.velocity = -PLAYER_VELOCITY
        break
      case `ArrowRight`:
        player.velocity = pressedKeys.has(`ArrowLeft`) ? -PLAYER_VELOCITY : PLAYER_VELOCITY
        break
      // TODO: Fire weapon button
    }
  }
  /**
   * @param {KeyboardEvent} evt
   */
  function handleKeyup(evt) {
    pressedKeys.delete(evt.code)
    if (pressedKeys.has(`ArrowLeft`)) {
      player.velocity = -PLAYER_VELOCITY
    } else if (pressedKeys.has(`ArrowRight`)) {
      player.velocity = PLAYER_VELOCITY
    } else {
      player.velocity = 0
    }
  }
  window.addEventListener(`keydown`, handleKeydown)
  window.addEventListener(`keyup`, handleKeyup)
  return () => {
    window.removeEventListener(`keydown`, handleKeydown)
    window.removeEventListener(`keyup`, handleKeyup)
  }
}
