let tips = '';
/*最小长度*/
let minLength = 6;
/*最大长度*/
let maxLength = 128;
/*字符重复次数*/
let repeatCount = 0;
/*连续字符*/
let seriesCount = 3;

/*特定过滤字符串*/
let filter = [
    "qaz",
    "wsx",
    "edc",
    "qwe",
    "asd",
    "zxc"
];

/*允许的字符串*/
let arrRegex = ['[0-9]', '[a-z]', '[A-Z]', '[!@#$%^&*()_-]'];

export function checkPWD(PWD) {

    /**
     * 验证密码
     * @param pwd      密码
     * @returns {boolean}
     */

    verify(PWD);
    if (tips === '') {
        tips = '太强了，这个密码牢不可破～～'
    }
    return tips;
}

export function getScorePWD(pwd){
    const arrRegex = [
        /[a-z]/, // 匹配小写字母
        /[A-Z]/, // 匹配大写字母
        /\d/,    // 匹配数字
        /[^a-zA-Z\d]/, // 匹配非字母和数字的字符
    ];

    if (pwd.length < minLength) {
        return 1;
    }

    if (arrRegex.some((regex) => !regex.test(pwd))) {
        return 3;
    }

    if (/(.)\1{2,}/.test(pwd)) {
        return 4;
    }
    return 5;
}

function verify(pwd) {
    if (pwd.length < minLength) {
        tips = '密码长度至少需要' + minLength + '位';
        return false;
    }

    if (pwd.length > maxLength) {
        tips = '密码长度超过' + maxLength + '位';
        return false;
    }


    if (!eval('/' + arrRegex[0] + '/').test(pwd)) {
        tips = '密码最好包含数字嗷～';
        return false;
    }

    if (!eval('/' + arrRegex[1] + '/').test(pwd)) {
        tips = '密码最好包含小写字母嗷～';
        return false;
    }

    if (!eval('/' + arrRegex[2] + '/').test(pwd)) {
        tips = '密码最好包含大写字母嗷～';
        return false;
    }

    if (!eval('/' + arrRegex[3] + '/').test(pwd)) {
        tips = '密码最好包含特殊字符嗷～';
        return false;
    }

    /*判断是否存在过滤性字符串*/
    if (filter.length > 0) {
        for (let i = 0, length = filter.length; i < length; i++) {
            let value = filter[i];

            if (pwd.indexOf(value) < 0) {
                continue;
            }

            tips = "密码中最好不含有" + value;

            return false;
        }
    }

    /*判断是否存在重复字符串*/
    if (isRepeate(pwd)) {
        tips = '密码中最好不要出现重复字符';
        return false;
    }

    /*判断是否存在连续性字符串*/
    if (isSeries(pwd)) {
        tips = '密码中最后不要存在' + seriesCount + '个以上的连续字符';
        return false;
    }

    return true;
}

/**
 * 是否存在重复字符串
 * @param pwd    密码
 * @returns {boolean}
 */
function isRepeate(pwd) {
    if (pwd && pwd.length > 0) {
        for (let i = 0, length = pwd.length; i < length; i++) {
            let currentChar = pwd.charAt(i);
            let prevChar = i == 0 ? "" : pwd.charAt(i - 1);

            if (currentChar === prevChar) {
                return true;
            }
        }
    }
    return false;
}

/**
 * 是否存在连续性字符串
 * @param pwd    密码
 * @returns {boolean}
 */
function isSeries(pwd) {
    if (pwd && pwd.length > 0) {
        /*自身算起*/
        let ascSeriesCount = 1;
        let descSeriesCount = 1;

        /*存在顺序型的连续性的字符串*/
        for (let i = 0, length = pwd.length; i < length; i++) {
            let currentCharCode = pwd.charCodeAt(i);
            let prevCharCode = i == 0 ? "" : pwd.charCodeAt(i - 1);
            if (currentCharCode === prevCharCode + 1) {
                ascSeriesCount++;
                if (ascSeriesCount === seriesCount) {
                    return true;
                }
            } else {
                ascSeriesCount = 1;
            }
        }

        /*存在逆序性的连续性的字符串*/
        for (let i = pwd.length - 1; i >= 0; i--) {
            let currentCharCode = pwd.charCodeAt(i);
            let prevCharCode = (i - 1) >= 0 ? pwd.charCodeAt(i - 1) : "";
            if (currentCharCode + 1 === prevCharCode) {
                descSeriesCount++;

                if (descSeriesCount === seriesCount) {
                    return true;
                }
            } else {
                descSeriesCount = 1;
            }
        }
    }
    return false;
}