/**
 * Calculates the CurseForge fingerprint for a given buffer (jar mod file).
 * @param rawBuffer The file content as a Uint8Array, Buffer, or Array of numbers.
 * @returns The calculated fingerprint as a number.
 */
export declare function cf_fingerprint(rawBuffer: Uint8Array | Buffer | number[]): number
