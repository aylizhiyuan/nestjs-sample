import * as bcrypt from 'bcrypt'
import * as _ from 'lodash'
import * as fs from 'fs'
export class UtilsService {
    /**
     * generate hash from password or string
     * @param {string} password
     * @returns {string}
     */
    static generateHash(password: string): string {
        return bcrypt.hashSync(password, 10)
    }

    /**
     * generate random string
     * @param length
     */
    static generateRandomString(length: number): string {
        return Math.random()
            .toString(36)
            .replace(/[^a-zA-Z0-9]+/g, '')
            .substr(0, length)
    }
    /**
     * validate text with hash
     * @param {string} password
     * @param {string} hash
     * @returns {Promise<boolean>}
     */
    static validateHash(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash)
    }
    /**
     * validate file is readable
     * @param {string} path
     * @returns {Promise<boolean>}
     */
    static isFile(path: string): boolean {
        try {
            fs.accessSync(path, fs.constants.R_OK | fs.constants.W_OK)
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    }
}
