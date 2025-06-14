/**
 * cf-fingerprint v0.0.1
 * GNU General Public License v3.0
 * https://github.com/arschedev/cf-fingerprint
 */

export function cf_fingerprint(buffer) {
	const multiplex = uint32_t(1540483477)
	const length = uint32_t(buffer.length)

	const num1 = uint32_t(compute_normalized_length(buffer))

	let num2 = uint32_t(1) ^ num1
	let num3 = uint32_t(0)
	let num4 = uint32_t(0)

	for (let index = uint32_t(0); index < length; index++) {
		const byte = uint32_t(buffer[index])

		if (!is_whitespace_character(byte)) {
			num3 |= byte << num4
			num4 += uint32_t(8)
			if (num4 === uint32_t(32)) {
				const num6 = uint32_t(num3 * multiplex)
				const num7 = uint32_t((num6 ^ (num6 >> uint32_t(24))) * multiplex)

				num2 = uint32_t((num2 * multiplex) ^ num7)
				num3 = uint32_t(0)
				num4 = uint32_t(0)
			}
		}
	}

	if (num4 > 0) {
		num2 = uint32_t((num2 ^ num3) * multiplex)
	}

	const num6 = uint32_t((num2 ^ (num2 >> uint32_t(13))) * multiplex)

	// result
	return parseInt(uint32_t(num6 ^ (num6 >> uint32_t(15))))

	function uint32_t(num) {
		return BigInt.asUintN(32, BigInt(num))
	}

	function compute_normalized_length(buffer) {
		let num1 = 0
		const length = buffer.length

		for (let index = 0; index < length; index++) {
			if (!is_whitespace_character(buffer[index])) {
				num1++
			}
		}

		return num1
	}

	function is_whitespace_character(b) {
		return b == 9 || b == 10 || b == 13 || b == 32
	}
}
