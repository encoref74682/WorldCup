window.onload = function () {
    demo();
}
let domain = 'https://api.mdzz.pro/';

const demo = () => {
    let filterBv = location.pathname.replace('/', '').replace('.html', '');
    let dp = null;
    let scrollFlag = 0;
    let map = {
        bv: filterBv, //视频BV号 
        p: 1 //视频分P
    };
    //拉取视频地址
    fetch(domain + '/bilibili/parse/video?bv=' + map['bv'] + '&p=' + map['p']).then(res => res.json()).then(data => {
        if (check(data)) {
            return false;
        }
        let url = data.url;
        //拉取视频信息
        fetch(domain + '/bilibili/parse/detail?bv=' + map['bv'] + '&p=' + map['p']).then(res => res.json()).then(data => {
            if (check(data)) {
                return false;
            }
            let detail = data.data;
            //应用获取到的视频信息
            document.getElementsByTagName('h2')[0].innerHTML = detail.title;
            document.getElementById('videoTitle').innerHTML = detail.title;
            layout();
            dp = new DPlayer({
                element: document.getElementById('dplayer1'),
                loop: true, //自动循环播放
                lang: 'zh-cn', //播放器语言
                hotkey: true, //开启热键控制
                autoplay: true, //自动播放
                volume: 1, //音量大小
                playbackSpeed: [0.5,0.75,1,1.25,1.5,2], //播放速度调节
                preload: 'auto', //预加载方式
                video: {
                    url: url, //视频链接
                    pic: detail.pic //视频封面
                }
            });
            document.title = detail.title;
        });
    });
    fetch(domain + '/bilibili/parse/chain?bv=' + map['bv'] + '&p=' + map['p']).then(res => res.json()).then(data => {
        if (check(data)) {
            return false;
        }
        let chain = data.data;
        document.getElementById('aid').setAttribute('value', chain.aid);
        //拉取视频tag
        fetch(domain + '/bilibili/parse/tag?aid=' + chain.aid).then(res => res.json()).then(data => {
            if (check(data)) {
                return false;
            }
            let tag = data.data;
            let tagLength = tag.length;
            let htm = '';
            for (let i = 0; tagLength > i; i++) {
                htm = htm + '<span class="tag-text">' + tag[i].name + '</span>';
            }
            document.getElementsByClassName('tag')[0].innerHTML = htm;
            layout();
        });
        flashList(chain.aid, 1);
    });
}

const flashList = (aid, page) => {
    fetch(domain + '/bilibili/parse/reply?aid=' + aid + '&page=' + page).then(res => res.json()).then(data => {
        if (check(data)) {
            return false;
        }
        let reply = data.data;
        let replyLength = reply.length;
        let htm = '';
        for (let i = 0; replyLength > i; i++) {
            let comment = reply[i].comment;
            let commentLength = comment.length;
            let htmComment = '';
            for (let n = 0; commentLength > n; n++) {
                htmComment = htmComment +
                    '<p><span class="reply-comment-name">' + comment[n].name + '：</span>' +
                    '<span>' + comment[n].content + '</span>' +
                    '</p>';
            }
            if (htmComment != '') {
                htmComment = '<div class="reply-comment-box">' +
                    htmComment +
                    '</div>';
            }
            htm = htm + '<li class="replies">' +
                '<img class="reply-head" src="' + reply[i].avatar + '">' +
                '<div class="reply-box">' +
                '<div class="reply-user">' +
                '<div class="reply-user-name">' +
                reply[i].name +
                '</div>' +
                '<div class="reply-user-level">LV' + reply[i].level + '</div>' +
                '</div>' +
                '<div class="reply-content">' + reply[i].content.replace(/\n/g, '<br>') + '</div>' +
                htmComment +
                '</div>' +
                '</li>';
        }
        document.getElementsByTagName('ul')[0].innerHTML = document.getElementsByTagName('ul')[0].innerHTML + htm;
        document.getElementsByTagName('ul')[0].removeEventListener('scroll', scrollList);
        document.getElementsByTagName('ul')[0].addEventListener('scroll', scrollList);
        scrollFlag = 0;
        layout();
    });
}

const layout = () => {
    let width = document.body.clientWidth;
    let ratio = document.body.clientWidth / document.body.clientHeight;
    let levelSize = null;
    document.getElementsByTagName('body')[0].style.height = width / 855 * 1200;
    if (ratio >= 1) {
        levelSize = '0.8px';
        document.getElementsByClassName('card')[0].style.width = width * 0.6;
        document.getElementsByClassName('card')[1].style.width = width * 0.6;
        descHeight = 0;
        document.getElementsByTagName('h2')[0].setAttribute('style', '');
        document.getElementsByClassName('desc')[0].setAttribute('style', '');
        document.getElementById('reply').setAttribute('style', '');
        setStyle(document.getElementsByClassName('tag-text'), '');
        setStyle(document.getElementsByClassName('reply-head'), '')
        setStyle(document.getElementsByClassName('reply-user-name'), '');
        setStyle(document.getElementsByClassName('reply-content'), '');
        setStyle(document.getElementsByClassName('reply-comment-box'), '');
        document.getElementsByTagName('ul')[0].style.height = document.getElementsByTagName('body')[0].offsetHeight - document.getElementsByClassName('card')[0].clientHeight - 240;
    } else {
        levelSize = '0.2vw';
        document.getElementsByClassName('card')[0].style.width = width * 0.84;
        document.getElementsByClassName('card')[1].style.width = width * 0.84;
        document.getElementsByTagName('h2')[0].setAttribute('style', 'font-size:5vw;float:none;');
        document.getElementsByClassName('desc')[0].setAttribute('style', 'font-size:4vw');
        document.getElementById('reply').setAttribute('style', 'font-size:4vw;');
        setStyle(document.getElementsByClassName('tag-text'), 'font-size:3vw;');
        setStyle(document.getElementsByClassName('reply-head'), 'width:10vw;height:10vw;border-radius:10vw;')
        setStyle(document.getElementsByClassName('reply-user-name'), 'font-size:3vw;');
        setStyle(document.getElementsByClassName('reply-content'), 'font-size:2.7vw;');
        setStyle(document.getElementsByClassName('reply-comment-box'), 'font-size:2.4vw;');
        document.getElementsByTagName('ul')[0].style.height = document.getElementsByTagName('body')[0].offsetHeight - document.getElementsByClassName('card')[0].clientHeight + 300;
    }
    document.getElementById('flex-box').style.height = (document.getElementById('flex-box').clientWidth * 9 / 16);
    document.getElementsByClassName('card')[0].style.height = document.getElementById('flex-box').clientHeight + document.getElementsByClassName('desc')[0].clientHeight + document.getElementsByClassName('video-top')[0].clientHeight + 50;
    let level = document.getElementsByClassName('reply-user-level');
    let levelLength = level.length;
    let color = { 0: '#3CB371', 1: '#00CED1', 2: '#4682B4', 3: '#DAA520', 4: '#9932CC', 5: '#DC143C' };
    for (let i = 0; i < levelLength; i++) {
        let lv = level[i].innerHTML.replace(/LV/g, '');
        let lvColor = color[lv * 1 - 1];
        level[i].setAttribute('style', 'margin-left:10px;-webkit-text-stroke: ' + levelSize + ' ' + lvColor + ';');
    }
}

const scrollList = () => {
    if (document.getElementsByTagName('ul')[0].scrollTop + document.getElementsByTagName('ul')[0].clientHeight + 10 >= document.getElementsByTagName('ul')[0].scrollHeight) {
        if (scrollFlag == 0) {
            let aid = document.getElementById('aid').value;
            let page = document.getElementById('page').value * 1 + 1;
            document.getElementById('page').setAttribute('value', page);
            scrollFlag = 1;
            flashList(aid, page);
        }
    }
}

const check = (data) => {
    let msg = null;
    if (data.code !== 0) {
        try {
            msg = data.msg;
        } catch (e) {
            msg = null;
        }
        if (msg != null) {
            msg = data.msg;
        } else {
            msg = data.message;
        }
        console.log("%c Danmaku %c " + msg, "color: #fff; margin: 1e m 0; padding: 2px 0; background: #F08080;", "margin: 1e m 0; padding: 5 px 0; background_round: #EFEFEF;");
        return true;
    } else {
        return false;
    }
}

const setStyle = (doc, style) => {
    let docLength = doc.length;
    for (let i = 0; i < docLength; i++) {
        doc[i].setAttribute('style', style);
    }
}

const getWindowInfo = () => {
    layout();
}
const debounce = (fn, delay) => {
    let timer;
    return function () {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn();
        }, delay);
    }
};
const cancalDebounce = debounce(getWindowInfo, 500);

window.addEventListener('resize', cancalDebounce);
