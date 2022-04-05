/**
 * Lightweight user uuid v4 format
 *
 * @param {string} uuid
 * @returns {boolean}
 */
function isUserIdFormat(id: string): boolean {
  return Boolean(id.match(/^@?(\w){1,15}$/));
}

export default {
  isUserIdFormat
};
