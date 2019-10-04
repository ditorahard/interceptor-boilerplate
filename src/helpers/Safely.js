/**
 * Get object value safely if the object is deeply nested
 * @param {Array<String>} keys - Object key you want to traverse
 * @param {Object} object - The targeted object
 */
export default function getSafely (keys, object) {
	return keys.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, object);
}