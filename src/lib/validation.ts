/**
 * Lightweight user uuid v4 format
 *
 * @param {string} uuid
 * @returns {boolean}
 */
function isUserIdFormat(id: string): boolean {
  return Boolean(id.match(/^[0-9a-f]{8}\-[0-9a-f]{4}\-[0-9a-f]{4}\-[0-9a-f]{4}\-[0-9a-f]{12}$/));
}

export default {
  isUserIdFormat
};
