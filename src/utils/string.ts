/**
 * Decoding HTML Codes / HTML Name Codes to values themselves
 *
 * @param str - String to decode
 * @returns Decoded string
 *
 */
export function decodeHtml(html: string) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}