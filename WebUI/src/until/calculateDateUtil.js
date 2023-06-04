export function DateDifference(faultDate, completeTime) {
    // let d1 = new Date(faultDate);
    // let d2 = new Date(completeTime);
    let stime = new Date(faultDate).getTime();
    let etime = new Date(completeTime).getTime();
    let usedTime = etime - stime;  //两个时间戳相差的毫秒数
    let days = Math.floor(usedTime / (24 * 3600 * 1000));
    //计算出小时数
    let leave1 = usedTime % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
    let hours = Math.floor(leave1 / (3600 * 1000));
    //计算相差分钟数
    let leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
    let minutes = Math.floor(leave2 / (60 * 1000));
    // let time = days + "天"+hours+"时"+minutes+"分";
    return days;
}
export function addDate(startTime,days){
    let stime = new Date(startTime).getTime();
    let endTime =stime+days*(24 * 3600 * 1000);  //两个时间戳相差的毫秒数
    let time=new Date(endTime).Format("yyyy-MM-dd");
    return time
}
Date.prototype.Format = function (fmt) {
    let o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(/(yyyy)/, function(match) {
            return (this.getFullYear() + "").substring(4 - match.length);
        }.bind(this));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) {
            const match = fmt.match(new RegExp("(" + k + ")"))[0];
            fmt = fmt.replace(match, match.length === 1 ? o[k] : ("00" + o[k]).slice(-match.length));
        }
    return fmt;
}
