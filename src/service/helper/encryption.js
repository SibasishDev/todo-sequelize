'use strict';

const crypto = require("crypto-js");

/**
 * PasswordEncoderDecoder class
 * Encoder function Encrypt password using security key and aes-256-cbc alogorithm.
 * Decoder function Decrypt password by using security key
 */
class EncoderDecoder {

    /**
     * Encrypts Password using Securities Key and aes-256-cbc Alogorithm.
     *
     * @param {String} text to be encrypted.
     * @param {String} key Securities Key.
     * @returns {Object} - error and encoded value.
     * @default error
     * @memberof EncoderDecoder
     */
    encrypt(text, key) {
        try {
            const encoded = crypto.AES.encrypt(text, key).toString();
            return { error: null, encoded: encoded }
        } catch (err) {
            return { error: err, encoded: null }
        }
    }

    /**
     * Decrypts password using security key.
     *
     * @param {String} text to be decrypted.
     * @param {String} key Securities Key.
     * @returns {Object} - error and decoded value.
     * @default error
     * @memberof EncoderDecoder
     */
    decrypt(text, key) {
        try {
            const bytes = crypto.AES.decrypt(text, key);

            const decryptedData = bytes.toString(crypto.enc.Utf8);

            return { error: null, decoded: decryptedData }
        } catch (err) {
            return { error: err, decoded: null }
        }
    }
}

module.exports = new EncoderDecoder;