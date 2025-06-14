/**
 * Calculates the CurseForge fingerprint for a given buffer (jar mod file).
 * @param buffer The file content as a Uint8Array, Buffer, or Array of numbers.
 * @returns The calculated fingerprint as a number.
 */
export declare function cf_fingerprint(buffer: Uint8Array | Buffer | number[]): number;
