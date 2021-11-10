module.exports = {
    sleep: ms => new Promise(resolve=>setTimeout(resolve, ms)),
    Number(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    randomChar(Length) {
        let length
        if (!Length || length == 0) length = 15
        else length = Length
        let res = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        let value = ""
        for (let i = 0, n = res.length; i < length; ++i) {
            value += res.charAt(Math.floor(Math.random() * n))
        }
        return value
    },
    convertDate(date) {
        return parseInt(date.getTime() / 1000)
    }
}