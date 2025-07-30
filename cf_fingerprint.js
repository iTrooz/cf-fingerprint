/**
 * cf-fingerprint v0.2.0
 * GNU General Public License v3.0
 * https://github.com/arschedev/cf-fingerprint
 */

export function cf_fingerprint(rawBuffer) {
	const multiplex = 1540483477

	const filteredBuffer = filterWhitespace(rawBuffer)
	let filteredLength = filteredBuffer.length
	let fingerprint = 1 ^ filteredLength

	let chunkFingerprint = 0
	let chunkAcc = 0

	for (let i = 0; i < filteredLength; i++) {
		chunkFingerprint |= filteredBuffer[i] << chunkAcc
		chunkAcc += 8

		// process chunk once 4 bytes (32 bits) are accumulated
		if (chunkAcc === 32) {
			let num6 = Math.imul(chunkFingerprint, multiplex)
			let num7 = Math.imul(num6 ^ (num6 >>> 24), multiplex)

			fingerprint = Math.imul(fingerprint, multiplex) ^ num7

			chunkFingerprint = 0
			chunkAcc = 0
		}
	}

	// process last chunk
	if (chunkAcc > 0) {
		fingerprint = Math.imul(fingerprint ^ chunkFingerprint, multiplex)
	}

	let num6 = Math.imul(fingerprint ^ (fingerprint >>> 13), multiplex)
	let result = (num6 ^ (num6 >>> 15)) >>> 0

	return result
}

// Filter buffer in-place
function filterWhitespace(buffer) {
	const ws = new Set([9, 10, 13, 32])
	let currentIndex = 0

	for (let i = 0; i < buffer.length; i++) {
		if (!ws.has(buffer[i])) {
			// write non-whitespace byte to the current index
			if (currentIndex !== i) {
				buffer[currentIndex] = buffer[i]
			}

			currentIndex++
		}
	}

	return buffer.subarray(0, currentIndex)
}
