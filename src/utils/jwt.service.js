const jwt = require("jsonwebtoken");
// const config = require("../../config/config");
const EncoderDecoder = require("../service/helper/encryption");


class JwtAuth {
    constructor() {
        this.accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
        this.refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET_KEY;
        this.tokenLife = +process.env.JWT_ACCESS_KEY_EXPIRY;
        this.CRYPTO_PASSWORD = process.env.CRYPTO_PASSWORD;
    }


    /**
   * 1. Encrypt the JSON of the user  (but encryption function only accepts String)
   *      - So parse JSON as string using JSON.stringify
   * 2. Generate Token using JWT.sign (key and expiry present in /config/token file)
   * 3. Again Encrypt the token data
   *
   * Here we will encode the user-agent so the the token is valid for a particular user-agent only.
   *
   * @param {Object} user
   * @param {String} userAgent
   */
    generateAccessToken({id,role_id,permission}) {
        return new Promise((resolve, reject) => {
            
            jwt.sign({ id,role_id,permission }, this.accessTokenSecret, { algorithm: 'HS256', expiresIn: 1 * 60 * 60  }, (err, token) => {

                if (err) reject(err);
                
                    const encryptedToken = EncoderDecoder.encrypt(token, this.CRYPTO_PASSWORD);

                    if (encryptedToken.error) {
                        return reject(encryptedToken.error);
                    }
                    
                    resolve(encryptedToken.encoded);
            });
        });
    }


    /**
     * 1. Decrypt the encrypted token string of the user  (basically in authentication Middleware)
     * 2. Decode Token using JWT.verify (key present in /config/token file)
     * 3. Again Decrypt the decoded token data
     *      - parse string as JSON using JSON.parse
     * Here we are also checking if the token is generated using the same user-agent from which it is being accessed or not
     *
     * @param {*} token
     * @param {*} header
     * @memberof JwtAuth
     */

    verify(token) {
        return new Promise((resolve, reject) => {

            const decryptedToken = EncoderDecoder.decrypt(token, process.env.CRYPTO_PASSWORD);

            if (decryptedToken.error) {
                return reject(decryptedToken.error);
            }

            token = decryptedToken.decoded;
            jwt.verify(token, this.accessTokenSecret, (err, decoded) => {
                if (err) reject(err);
                resolve(decoded);

            });
        });
    }

     /**
   * 1. Encrypt the JSON of the user  (but encryption function only accepts String)
   *      - So parse JSON as string using JSON.stringify
   * 2. Generate Token using JWT.sign (key and expiry present in /config/token file)
   * 3. Again Encrypt the token data
   *
   * Here we will encode the user-agent so the the token is valid for a particular user-agent only.
   *
   * @param {Object} user
   * @param {String} userAgent
   */
     generateRefreshToken({id,email}) {
        return new Promise((resolve, reject) => {

            jwt.sign({ id, email}, this.refreshTokenSecret, { algorithm: 'HS256', expiresIn: 1 * 60 * 60  }, (err, token) => {

                if (err) reject(err);
                
                    const encryptedToken = EncoderDecoder.encrypt(token, this.CRYPTO_PASSWORD);

                    if (encryptedToken.error) {
                        return reject(encryptedToken.error);
                    }
                    
                    resolve(encryptedToken.encoded);
            });
        });
    }

     /**
     * 1. Decrypt the encrypted token string of the user  (basically in authentication Middleware)
     * 2. Decode Token using JWT.verify (key present in /config/token file)
     * 3. Again Decrypt the decoded token data
     *      - parse string as JSON using JSON.parse
     * Here we are also checking if the token is generated using the same user-agent from which it is being accessed or not
     *
     * @param {*} token
     * @param {*} header
     * @memberof JwtAuth
     */

     verifyRefreshToken(token) {
        return new Promise((resolve, reject) => {

            const decryptedToken = EncoderDecoder.decrypt(token, process.env.CRYPTO_PASSWORD);
            
            if (decryptedToken.error) {
                return reject(decryptedToken.error);
            }

            token = decryptedToken.decoded;
            jwt.verify(token, this.refreshTokenSecret, (err, decoded) => {
                if (err) reject(err);
                resolve(decoded);

            });
        });
    }

    

}

module.exports = new JwtAuth();