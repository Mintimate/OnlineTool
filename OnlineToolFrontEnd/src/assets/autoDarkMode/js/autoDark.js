// 监听暗色、亮色切换Start
let lightMedia = window.matchMedia('(prefers-color-scheme: light)');
let darkMedia = window.matchMedia('(prefers-color-scheme: dark)');
let callback = (e) => {
    let prefersDarkMode = e.matches;
    if (prefersDarkMode) {
        checkNightMode();
    }
};
if (typeof darkMedia.addEventListener === 'function' || typeof lightMedia.addEventListener === 'function') {
    lightMedia.addEventListener('change', callback);
    darkMedia.addEventListener('change', callback);
}
// 监听暗色、亮色切换End
// 切换暗亮模式Start
function switchNightMode() {
    var Mode = localStorage.getItem("DarkMode"); //获取暗色标示
    if (Mode == null || Mode == "undefined" || Mode == "") {
        if (document.documentElement.getAttribute("data-user-color-scheme") == "undefined") {
            document.documentElement.setAttribute("data-user-color-scheme", "light");
            localStorage.setItem("DarkMode", "light");
            document.getElementById('nightMode').classList.remove("icon-yueliang");
            document.getElementById('nightMode').classList.add("icon-zhishifufeiqiapianicon-");
        } else {
            document.documentElement.setAttribute("data-user-color-scheme", "dark");
            localStorage.setItem("DarkMode", "dark");
            document.getElementById('nightMode').classList.remove("icon-zhishifufeiqiapianicon-");
            document.getElementById("nightMode").classList.add("icon-yueliang");
        }
    } else if (Mode == 'light') {
      document.documentElement.setAttribute("data-user-color-scheme", "dark");
        localStorage.setItem("DarkMode", "dark");
      document.getElementById("nightMode").classList.remove("icon-zhishifufeiqiapianicon-");
      document.getElementById("nightMode").classList.add("icon-yueliang");
    } else {
      document.documentElement.setAttribute("data-user-color-scheme", "light");
        localStorage.setItem("DarkMode", "light");
      document.getElementById('nightMode').classList.remove("icon-yueliang");
      document.getElementById("nightMode").classList.add("icon-zhishifufeiqiapianicon-");
    }
    // (DarkMode == '0') ? ($("body").addClass("night"), document.cookie = "DarkMode=1;path=/" + ";expires=" + cookiesExp.toGMTString(), $('#nightMode').removeClass(
    // 	"icon-yueliang").addClass("icon-zhishifufeiqiapianicon-")) : ($("body").removeClass(
    // 	"night"), document.cookie = "DarkMode=0;path=/" + ";expires=" + cookiesExp.toGMTString(), $('#nightMode').removeClass("icon-zhishifufeiqiapianicon-").addClass(
    // 	"icon-yueliang"));
}

// 切换暗亮模式End

//检查当前主题模式和图标是否对应Start
function checkNightMode() {
    var Mode = localStorage.getItem("DarkMode"); //获取暗色标示
    if (Mode == 'dark') {
      document.documentElement.setAttribute("data-user-color-scheme", "dark");
        document.getElementById("nightMode").classList.remove("icon-zhishifufeiqiapianicon-");
        document.getElementById("nightMode").classList.add("icon-yueliang");
    } else if (Mode == null || Mode == "undefined" || Mode == "") {
        // 第一次检查是否用暗色模式
        if (localStorage.getItem('theme') === 'dark') {
            // document.cookie = "DarkMode=1;path=/"+";expires=" + cookiesExp.toGMTString();
            document.documentElement.setAttribute("data-user-color-scheme", "dark");
        } else if (matchMedia('(prefers-color-scheme: dark)').matches) {
            // document.cookie = "DarkMode=1;path=/"+";expires=" + cookiesExp.toGMTString();
            document.documentElement.setAttribute("data-user-color-scheme", "dark");
        } else if (matchMedia('(prefers-color-scheme: light)').matches) {
            // document.cookie = "DarkMode=1;path=/"+";expires=" + cookiesExp.toGMTString();
            document.documentElement.setAttribute("data-user-color-scheme", "light");
        } else if (new Date().getHours() >= 21 || new Date().getHours() < 7) {
            // document.cookie = "DarkMode=1;path=/"+";expires=" + cookiesExp.toGMTString();
            document.documentElement.setAttribute("data-user-color-scheme", "dark");
        }
    } else {
        document.documentElement.setAttribute("data-user-color-scheme", "light");
    }

}

export default {
  switchNightMode,
  checkNightMode
}
