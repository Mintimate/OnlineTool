<template>
    <div id="notfound">
        <div class="notfound">
            <div class="notfound-404">
                <h1>4<span></span>4</h1>
            </div>
            <h2>Oops! Page Not Be Found</h2>
            <p>嘿嘿＼(◎◎)／，内容没有找到~~</p>
            <a class ="mt-5" href="/">回到首页</a>
        </div>
    </div>
</template>
<script setup>
</script>
<style scoped>
#notfound {
    position: relative;
    height: 100vh
}

#notfound .notfound {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%)
}

.notfound {
    max-width: 520px;
    width: 100%;
    text-align: center;
    line-height: 1.4
}

.notfound .notfound-404 {
    height: 190px
}

.notfound .notfound-404 h1 {
    font-size: 146px;
    font-weight: 700;
    margin: 0;
    color: var(--color-text-1);
}

.notfound .notfound-404 h1>span {
    display: inline-block;
    width: 120px;
    height: 120px;
    background-image: url(/404-emoji.png);
    background-size: cover;
    -webkit-transform: scale(1.4);
    -ms-transform: scale(1.4);
    transform: scale(1.4);
    z-index: -1
}

.notfound h2 {
    font-family: montserrat,sans-serif;
    font-size: 22px;
    font-weight: 700;
    margin: 0;
    text-transform: uppercase;
    color: var(--color-text-1);
}

.notfound p {
    font-family: montserrat,sans-serif;
    color: var(--color-text-3);
    font-weight: 300
}

.notfound a {
    font-family: montserrat,sans-serif;
    display: inline-block;
    padding: 12px 30px;
    font-weight: 700;
    background-color: #f99827;
    color: #fff;
    border-radius: 40px;
    text-decoration: none;
    -webkit-transition: .2s all;
    transition: .2s all
}

.notfound a:hover {
    opacity: .8
}

@media only screen and (max-width: 767px) {
    .notfound .notfound-404 {
        height:115px
    }

    .notfound .notfound-404 h1 {
        font-size: 86px
    }

    .notfound .notfound-404 h1>span {
        width: 86px;
        height: 86px
    }
}
</style>
