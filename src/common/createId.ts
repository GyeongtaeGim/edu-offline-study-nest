import * as nanoid from 'nanoid';

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/**
 * 랜덤 id를 생성하는 함수
 * @param length 생성하고자 하는 랜덤 id의 길이, 기본값 16
 * @returns 생성된 랜덤 id
 */
const createId = (length: number = 16) => nanoid.customAlphabet(alphabet, length)();

export default createId;
