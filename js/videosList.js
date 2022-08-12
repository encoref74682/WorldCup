var dataUrl= "https://py.bodan2020.com/worldCup/videos/json.php"
    var xhr = new XMLHttpRequest()
    xhr.open('GET',dataUrl, true)
    xhr.send()
    xhr.onload = function(){
        let jArray = JSON.parse(this.responseText);
        demo(jArray);
    }
    let domain = 'https://api.mdzz.pro/';
    let rowNumber = 4;
    let i = 0;
    const demo = (jArray) => {
        jArray.forEach(row => {
            
            let videosDiv = document.createElement("div");
            let playerDiv = document.createElement("div");
            let videoTitlePTag = document.createElement("p");
            let videoPage = document.createElement("a");
            let title_p = "title" + row["BV"];
            videosDiv.classList.add('worldCupVideosList','col-sm-12','col-md-4');
            playerDiv.setAttribute('id',row["BV"]);
            videoTitlePTag.setAttribute('id',title_p);
            videoTitlePTag.classList.add('bg-secondary','text-truncate');
            videoPage.href = "/" + row["BV"];
            videoPage.textContent = "完整影片";
            videoPage.classList.add('videosPage','btn','btn-primary');
            videosDiv.appendChild(videoTitlePTag);
            videosDiv.appendChild(playerDiv);
            videosDiv.appendChild(videoPage);
            document.getElementsByClassName('worldCupVideos')[0].appendChild(videosDiv);

            var randomVideo = row["BV"];
            let dp = null;
            let scrollFlag = 0;
            let map = {
                bv: randomVideo, //视频BV号
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
                    console.log(detail);
                    //应用获取到的视频信息
                    document.getElementById(title_p).innerHTML = detail.title;
                    dp = new DPlayer({
                        element: document.getElementById(row["BV"]),
                        loop: true, //自动循环播放
                        lang: 'zh-cn', //播放器语言
                        hotkey: true, //开启热键控制
                        autoplay: true, //自动播放
                        volume: 1, //音量大小
                        playbackSpeed: [0.5, 0.75, 1, 1.25, 1.5, 2], //播放速度调节
                        preload: 'auto', //预加载方式
                        video: {
                            url: url, //视频链接
                            pic: detail.pic //视频封面
                        }
                    });
                });
            });
            

        })
    }


//自行定义的检查方法
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

