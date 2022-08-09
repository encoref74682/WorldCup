var dataUrl= "https://push.bodan2020.com/worldCupMatch/json.php?f=1"
var xhr = new XMLHttpRequest()
xhr.open('GET',dataUrl, true)
xhr.send()
xhr.onload = function(){
    let jArray = JSON.parse(this.responseText);
    document.getElementById("matchScore").appendChild(generateTable(jArray))
}

function generateTable (jArray) {
    let tbody = document.createElement('tbody');
    let thead = document.createElement('thead');
    let table = document.createElement('table');
    let newDiv1 = document.createElement("div");
    var matchNumber = 0;
    table.classList.add('table' , 'custom-table');
    newDiv1.classList.add('table-responsive' , 'container' , 'content', 'portfolio-container');

    // 將所有資料列的資料轉成tbody
    jArray.forEach(row => {
        let tr = document.createElement('tr');

        Object.keys(row).forEach(tdName => {
        let td = document.createElement('td');
        let teamName = document.createElement('p');
        teamName.textContent = row[tdName];
        let flagDiv = document.createElement("div");
        flagDiv.classList.add('flag');
        let flagImg = document.createElement("img");
        flagImg.classList.add('img-fluid');
        flagImg.src = chooseCountryFlag(row[tdName]);
        let soccerPlayingImg = document.createElement("img");
        soccerPlayingImg.src = "https://push.bodan2020.com/worldCupMatch/images/soccer.gif";
        let matchTime = document.createElement("p");
        let matchTimeUntil = document.createElement("small");
        matchTimeUntil.classList.add('d-block');

        let matchDay = row["時間"];
        let matchMonth = matchDay.slice(5,7);
        let matchDate = matchDay.slice(8,10);
        let matchHour = matchDay.slice(11,13);
        let matchMin = matchDay.slice(14,16);
        let matchSec = matchDay.slice(17,19);

        switch (tdName) {
          case "球隊1":
            td.classList.add('td_team' , compareScore(row["球隊1分數"],row["球隊2分數"]));
            flagDiv.appendChild(flagImg);
            td.appendChild(teamName);
            td.appendChild(flagDiv);
            tr.appendChild(td);
            break;

          case "球隊1分數":
            td.textContent = row[tdName];
            td.classList.add('td_score' , compareScore(row["球隊1分數"],row["球隊2分數"]));
            tr.appendChild(td);
            break;

          case "賽程":
            var matchTypeName = row["賽程"];
            tr.classList.add(matchTypeFilter(matchTypeName));
            if(row["進行中"] === "1"){
                td.textContent += "比賽進行中";
                td.appendChild(soccerPlayingImg);
            }else{
              setInterval(function(){ matchTimeUntil.textContent = compareMatchDate (matchMonth,matchDate,matchHour,matchMin,matchSec); },1000);
              matchTime.textContent = row["時間"];
              td.appendChild(matchTime);
              td.appendChild(matchTimeUntil);
            }

            td.classList.add('td_'+tdName);
            tr.appendChild(td);
            break;

          case "球隊2分數":
            td.textContent = row[tdName];
            td.classList.add('td_score' , compareScore(row["球隊2分數"],row["球隊1分數"]));
            tr.appendChild(td);
            break;

          case "球隊2":
            td.classList.add('td_team' , compareScore(row["球隊2分數"] , row["球隊1分數"]));
            flagDiv.appendChild(flagImg);
            td.appendChild(teamName);
            td.appendChild(flagDiv);
            tr.appendChild(td);
            break;
          default:
            break;
        }
        });

        matchNumber = matchNumber +1;
        tr.classList.add('tr_'+matchNumber , 'portfolio-item', 'fadeInUp');
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    // 將所有資料列的欄位轉成thead
    let headerTr = document.createElement('tr')

    Object.keys(jArray[0]).forEach(header => {
        let th = document.createElement('th');
        switch (header) {
          case "球隊1":
            th.textContent = "國家";
            headerTr.appendChild(th);
            break;
          case "球隊1分數":
            th.textContent = "分數";
            headerTr.appendChild(th);
            break;
          case "賽程":
            th.textContent = header;
            headerTr.appendChild(th);
            break;
          case "球隊2分數":
            th.textContent = "分數";
            headerTr.appendChild(th);
            break;
          case "球隊2":
            th.textContent = "國家";
            headerTr.appendChild(th);
            break;
          default:
            break;
        } 
    });

    // 新增thead到table上
    thead.appendChild(headerTr);
    table.appendChild(thead);
    newDiv1.appendChild(table);
    return newDiv1;
}

function compareScore (scoreA , scoreB) {
    if(Number(scoreA) > Number(scoreB)){
        return 'td_winTeam';
    }else if(Number(scoreA) < Number(scoreB)){
        return 'td_loseTeam';
    }else{
        return 'td_equalTeam';
    }
}

function chooseCountryFlag(country){
  switch(country){
    case "卡達":
      return "https://push.bodan2020.com/worldCupMatch/images/country/卡達.png";
    case "巴西":
      return "https://push.bodan2020.com/worldCupMatch/images/country/巴西.png";
    case "比利時":
      return "https://push.bodan2020.com/worldCupMatch/images/country/比利時.png";
    case "法國":
      return "https://push.bodan2020.com/worldCupMatch/images/country/法國.png";
    case "阿根廷":
      return "https://push.bodan2020.com/worldCupMatch/images/country/阿根廷.png";
    case "英格蘭":
      return "https://push.bodan2020.com/worldCupMatch/images/country/英格蘭.png";
    case "西班牙":
      return "https://push.bodan2020.com/worldCupMatch/images/country/西班牙.png";
    case "葡萄牙":
      return "https://push.bodan2020.com/worldCupMatch/images/country/葡萄牙.png";
    case "墨西哥":
      return "https://push.bodan2020.com/worldCupMatch/images/country/墨西哥.png";
    case "荷蘭":
      return "https://push.bodan2020.com/worldCupMatch/images/country/荷蘭.png";
    case "丹麥":
      return "https://push.bodan2020.com/worldCupMatch/images/country/丹麥.png";
    case "德國":
      return "https://push.bodan2020.com/worldCupMatch/images/country/德國.png";
    case "烏拉圭":
      return "https://push.bodan2020.com/worldCupMatch/images/country/烏拉圭.png";
    case "瑞士":
      return "https://push.bodan2020.com/worldCupMatch/images/country/瑞士.png";
    case "美國":
      return "https://push.bodan2020.com/worldCupMatch/images/country/美國.png";
    case "克羅埃西亞":
      return "https://push.bodan2020.com/worldCupMatch/images/country/克羅埃西亞.png";
    case "塞內加爾":
      return "https://push.bodan2020.com/worldCupMatch/images/country/塞內加爾.png";
    case "伊朗":
      return "https://push.bodan2020.com/worldCupMatch/images/country/伊朗.png";
    case "日本":
      return "https://push.bodan2020.com/worldCupMatch/images/country/日本.png";
    case "摩洛哥":
      return "https://push.bodan2020.com/worldCupMatch/images/country/摩洛哥.png";
    case "塞爾維亞":
      return "https://push.bodan2020.com/worldCupMatch/images/country/塞爾維亞.png";
    case "波蘭":
      return "https://push.bodan2020.com/worldCupMatch/images/country/波蘭.png";
    case "南韓":
      return "https://push.bodan2020.com/worldCupMatch/images/country/南韓.png";
    case "突尼西亞":
      return "https://push.bodan2020.com/worldCupMatch/images/country/突尼西亞.png";
    case "喀麥隆":
      return "https://push.bodan2020.com/worldCupMatch/images/country/喀麥隆.png";
    case "加拿大":
      return "https://push.bodan2020.com/worldCupMatch/images/country/加拿大.png";
    case "厄瓜多":
      return "https://push.bodan2020.com/worldCupMatch/images/country/厄瓜多.png";
    case "沙烏地":
      return "https://push.bodan2020.com/worldCupMatch/images/country/沙烏地.png";
    case "迦納":
      return "https://push.bodan2020.com/worldCupMatch/images/country/迦納.png";
    case "威爾斯":
      return "https://push.bodan2020.com/worldCupMatch/images/country/威爾斯.png";
    case "澳大利亞":
      return "https://push.bodan2020.com/worldCupMatch/images/country/澳大利亞.png";
    case "哥斯大黎加":
      return "https://push.bodan2020.com/worldCupMatch/images/country/哥斯大黎加.png";
    default:
      return "https://push.bodan2020.com/worldCupMatch/images/country/normal.png";
  }
}

function compareMatchDate (matchMonth,matchDate,matchHours,matchMinutes,matchSeconds) {
  var matchTime = new Date();
  var nowTime = new Date().getTime();
  matchTime.setMonth(matchMonth - 1); //   獲取當前 月份 (從 '0' 開始算)
  matchTime.setDate(matchDate); //   獲取當前 日
  matchTime.setHours(matchHours); //   獲取當前 時
  matchTime.setMinutes(matchMinutes); //   獲取當前 分
  matchTime.setSeconds(matchSeconds);
  var endTime = matchTime.getTime();
  var offsetTime = (endTime - nowTime) / 1000; // ** 以秒為單位

  var days = parseInt(offsetTime / (24 * 60 * 60));
  var hours = parseInt(offsetTime % (24 * 60 * 60) / (60 * 60));
  var minutes = parseInt(offsetTime % (60 * 60) / 60);
  var seconds = parseInt(offsetTime % 60);
  if (seconds > 0){
    if (days === 0){
      if(hours === 0){
        if(minutes === 0){
          return "倒數" + seconds + "秒";}
        return "倒數" + minutes + "分鐘" + seconds + "秒";}
      return "倒數" + hours + "小時" + minutes + "分鐘" + seconds + "秒";
    }else{
      return "倒數" + days + "天" + hours + "小時" + minutes + "分鐘" + seconds + "秒";
    }
  }
}



function matchTypeFilter(matchName){
  if(matchName.includes("小組賽")){
    if(matchName.includes("第一輪")){
      return 'filter-groupFirstRound';
    }else if(matchName.includes("第二輪")){
      return 'filter-groupSecondRound';
    }else if(matchName.includes("第三輪")){
      return 'filter-groupThirdRound';
    }
  }else if(matchName.includes("16強賽")){
    return 'filter-roundOf16';
  }else if(matchName.includes("8強賽")){
    return 'filter-quarterFinals';
  }else if(matchName.includes("準決賽")){
    return 'filter-semiFinals';
  }else if(matchName.includes("第三名")){
    return 'filter-thirdPlacePlayoff';
  }else if(matchName.includes("決賽")){
    return 'filter-final';
  }
}
