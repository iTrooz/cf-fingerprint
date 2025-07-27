/**
 * cf-fingerprint v0.1.0
 * GNU General Public License v3.0
 * https://github.com/arschedev/cf-fingerprint
 */

export function cf_fingerprint(rawBuffer) {
  const multiplex = 1540483477;

  const filteredBuffer = filterWhitespace(rawBuffer);
  let filteredLength = filteredBuffer.length;
  let fingerprint = (1 ^ filteredLength) >>> 0;

  let chunkFingerprint = 0;
  let chunkAcc = 0;
  for (let i = 0; i < filteredLength; i++) {
    chunkFingerprint |= filteredBuffer[i] << chunkAcc;
    chunkAcc += 8;

    // Once 4 bytes (32 bits) are accumulated, process chunk
    if (chunkAcc === 32) {
      let num6 = Math.imul(chunkFingerprint, multiplex) >>> 0;
      let num7 = Math.imul(num6 ^ (num6 >>> 24), multiplex) >>> 0;

      fingerprint = (Math.imul(fingerprint, multiplex) ^ num7) >>> 0;

      chunkFingerprint = 0;
      chunkAcc = 0;
    }
  }

  // process last chunk
  if (chunkAcc > 0) {
    fingerprint = (Math.imul(fingerprint ^ chunkFingerprint, multiplex)) >>> 0;
  }

  let num6 = Math.imul(fingerprint ^ (fingerprint >>> 13), multiplex) >>> 0;
  let result = num6 ^ (num6 >>> 15);

  return result >>> 0;
}

function filterWhitespace(buffer) {
  const ws = new Set([9, 10, 13, 32]);
  const filtered = [];
  for (let i = 0; i < buffer.length; i++) {
    if (!ws.has(buffer[i])) filtered.push(buffer[i]);
  }
  return filtered;
}
