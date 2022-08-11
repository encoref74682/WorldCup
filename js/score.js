var dataUrl= "https://py.bodan2020.com/worldCup/score/json.php"
var xhr = new XMLHttpRequest()
xhr.open('GET',dataUrl, true)
xhr.send()
xhr.onload = function(){
    let jArray = JSON.parse(this.responseText);
    document.getElementById("matchScore").appendChild(generateTable(jArray))
    filterButton();
}


function generateTable (jArray) {

    let ul = document.createElement('ul');
    ul.setAttribute('id','portfolio-flters');
    let li1 = document.createElement('li');
    li1.textContent = "全部";
    li1.classList.add('filterBtn','filter-active');
    li1.setAttribute('id','filter-allButton');
    let li2 = document.createElement('li');
    li2.textContent = "小組賽第一輪";
    li2.classList.add('filterBtn');
    li2.setAttribute('id','filter-groupFirstRoundButton');
    let li3 = document.createElement('li');
    li3.textContent = "小組賽第二輪";
    li3.classList.add('filterBtn');
    li3.setAttribute('id','filter-groupSecondRoundButton');
    let li4 = document.createElement('li');
    li4.textContent = "小組賽第三輪";
    li4.classList.add('filterBtn');
    li4.setAttribute('id','filter-groupThirdRoundButton');
    let li5 = document.createElement('li');
    li5.textContent = "16強賽";
    li5.classList.add('filterBtn');
    li5.setAttribute('id','filter-roundOf16Button');
    let li6 = document.createElement('li');
    li6.textContent = "8強賽";
    li6.classList.add('filterBtn');
    li6.setAttribute('id','filter-quarterFinalsButton');
    let li7 = document.createElement('li');
    li7.textContent = "4強賽";
    li7.classList.add('filterBtn');
    li7.setAttribute('id','filter-semiFinalsButton');
    let li8 = document.createElement('li');
    li8.textContent = "季軍戰";
    li8.classList.add('filterBtn');
    li8.setAttribute('id','filter-thirdPlacePlayoffButton');
    let li9 = document.createElement('li');
    li9.textContent = "冠軍戰";
    li9.classList.add('filterBtn');
    li9.setAttribute('id','filter-finalButton');
    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4);
    ul.appendChild(li5);
    ul.appendChild(li6);
    ul.appendChild(li7);
    ul.appendChild(li8);
    ul.appendChild(li9);

    let tbody = document.createElement('tbody');
    let thead = document.createElement('thead');
    let table = document.createElement('table');
    let newDiv1 = document.createElement("div");
    let newDiv2 = document.createElement("div");
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
        let matchTypeP = document.createElement("p");
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
            //td.textContent = row[tdName];
            if(row["進行中"] === "1"){
                td.textContent += "比賽進行中";
                td.appendChild(soccerPlayingImg);
            }else if(row["進行中"] === "2"){
                td.textContent += "比賽結束";
            }else{
              setInterval(function(){ matchTimeUntil.textContent = compareMatchDate (matchMonth,matchDate,matchHour,matchMin,matchSec); },1000);
              matchTime.textContent = matchType(matchTypeName);
              matchTypeP.textContent = row["時間"];
              td.appendChild(matchTime).appendChild(matchTypeP).appendChild(matchTimeUntil);
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
        
        tr.classList.add('tr_'+matchNumber,'trMatch');
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
    newDiv2.appendChild(ul);
    newDiv2.appendChild(newDiv1)
    return newDiv2;
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

function matchType(matchName){
  
  if(matchName.includes("小組賽")){
    let rule = /[A-H]/;
    groupNameSearch = matchName.search(rule);
    group = matchName.substr(groupNameSearch,groupNameSearch-2);
    return group;
  }else if(matchName.includes("16強賽")){
    return '16強賽';
  }else if(matchName.includes("8強賽")){
    return '8強賽';
  }else if(matchName.includes("準決賽")){
    return '4強賽';
  }else if(matchName.includes("第三名")){
    return '季軍戰';
  }else if(matchName.includes("決賽")){
    return '冠軍戰';
  }
}

function filterButton(){
  var allMatchTr = document.getElementsByClassName("trMatch");
  var groupFirstRound = document.getElementsByClassName("filter-groupFirstRound");
  var groupSecondRound = document.getElementsByClassName("filter-groupSecondRound");
  var groupThirdRound = document.getElementsByClassName("filter-groupThirdRound");
  var roundOf16 = document.getElementsByClassName("filter-roundOf16");
  var quarterFinals = document.getElementsByClassName("filter-quarterFinals");
  var semiFinals = document.getElementsByClassName("filter-semiFinals");
  var thirdPlacePlayoff = document.getElementsByClassName("filter-thirdPlacePlayoff");
  var final = document.getElementsByClassName("filter-final");
  var allButton = document.getElementsByClassName("filterBtn");
  var allMatchButton = document.getElementById("filter-allButton");
  var groupFirstRoundButton = document.getElementById("filter-groupFirstRoundButton");
  var groupSecondRoundButton = document.getElementById("filter-groupSecondRoundButton");
  var groupThirdRoundButton = document.getElementById("filter-groupThirdRoundButton");
  var roundOf16Button = document.getElementById("filter-roundOf16Button");
  var quarterFinalsButton = document.getElementById("filter-quarterFinalsButton");
  var semiFinalsButton = document.getElementById("filter-semiFinalsButton");
  var thirdPlacePlayoffButton = document.getElementById("filter-thirdPlacePlayoffButton");
  var finalButton = document.getElementById("filter-finalButton");
  allMatchButton.onclick = function(){
    for(var i=0; i<allButton.length;i++){allButton[i].classList.remove('filter-active');};
    allMatchButton.classList.add('filter-active');
    for(var i=0; i<allMatchTr.length;i++){allMatchTr[i].style.display="table-row";};
  }
  groupFirstRoundButton.onclick = function(){
    for(var i=0; i<allButton.length;i++){allButton[i].classList.remove('filter-active');};
    groupFirstRoundButton.classList.add('filter-active');
    for(var i=0; i<allMatchTr.length;i++){allMatchTr[i].style.display="none";};
    for(var i=0; i<groupFirstRound.length;i++){groupFirstRound[i].style.display="table-row";};
  }
  groupSecondRoundButton.onclick = function(){
    for(var i=0; i<allButton.length;i++){allButton[i].classList.remove('filter-active');};
    groupSecondRoundButton.classList.add('filter-active');
      for(var i=0; i<allMatchTr.length;i++){allMatchTr[i].style.display="none";};
    for(var i=0; i<groupSecondRound.length;i++){groupSecondRound[i].style.display="table-row";};
  }
  groupThirdRoundButton.onclick = function(){
    for(var i=0; i<allButton.length;i++){allButton[i].classList.remove('filter-active');};
    groupThirdRoundButton.classList.add('filter-active');
    for(var i=0; i<allMatchTr.length;i++){allMatchTr[i].style.display="none";};
    for(var i=0; i<groupThirdRound.length;i++){groupThirdRound[i].style.display="table-row";};
  }
  roundOf16Button.onclick = function(){
    for(var i=0; i<allButton.length;i++){allButton[i].classList.remove('filter-active');};
    roundOf16Button.classList.add('filter-active');
    for(var i=0; i<allMatchTr.length;i++){allMatchTr[i].style.display="none";};
    for(var i=0; i<roundOf16.length;i++){roundOf16[i].style.display="table-row";};
  }
  quarterFinalsButton.onclick = function(){
    for(var i=0; i<allButton.length;i++){allButton[i].classList.remove('filter-active');};
    quarterFinalsButton.classList.add('filter-active');
    for(var i=0; i<allMatchTr.length;i++){allMatchTr[i].style.display="none";};
    for(var i=0; i<quarterFinals.length;i++){quarterFinals[i].style.display="table-row";};
  }
  semiFinalsButton.onclick = function(){
    for(var i=0; i<allButton.length;i++){allButton[i].classList.remove('filter-active');};
    semiFinalsButton.classList.add('filter-active');
    for(var i=0; i<allMatchTr.length;i++){allMatchTr[i].style.display="none";};
    for(var i=0; i<semiFinals.length;i++){semiFinals[i].style.display="table-row";};
  }
  thirdPlacePlayoffButton.onclick = function(){
    for(var i=0; i<allButton.length;i++){allButton[i].classList.remove('filter-active');};
    thirdPlacePlayoffButton.classList.add('filter-active');
    for(var i=0; i<allMatchTr.length;i++){allMatchTr[i].style.display="none";};
    for(var i=0; i<thirdPlacePlayoff.length;i++){thirdPlacePlayoff[i].style.display="table-row";};
  }
  finalButton.onclick = function(){
    for(var i=0; i<allButton.length;i++){allButton[i].classList.remove('filter-active');};
    finalButton.classList.add('filter-active');
    for(var i=0; i<allMatchTr.length;i++){allMatchTr[i].style.display="none";};
    for(var i=0; i<final.length;i++){final[i].style.display="table-row";};
  }
}