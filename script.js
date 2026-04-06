let state = {
  diabetes: 30,
  liver: 20,
  lipid: 20,
  pressure: 20,
  glucose: 30
};

function clamp(v){
  return Math.max(0, Math.min(100, v));
}

function getState(val){
  if(val >= 80) return "🚨 발병";
  if(val >= 50) return "⚠️ 위험";
  if(val >= 30) return "😐 주의";
  return "🙂 정상";
}

function updateUI(){
  for(let key of ["diabetes","liver","lipid","pressure"]){
    state[key] = clamp(state[key]);

    document.getElementById(key).style.height = state[key]+"%";
    document.getElementById(key+"Val").innerText = state[key];
    document.getElementById(key+"State").innerText = getState(state[key]);
  }

  let msg = "🙂 정상 상태";

  if(state.diabetes >= 80) msg = "🚨 당뇨 발병!";
  else if(state.pressure >= 80) msg = "🚨 고혈압 위험!";
  else if(state.lipid >= 80) msg = "🚨 고지혈 위험!";
  else if(state.liver >= 80) msg = "🚨 지방간 위험!";

  document.getElementById("status").innerText = msg;
}

// ===== 나쁜 행동 =====
function eatSugar(){
  state.glucose += 15;
  state.diabetes += 10;
  updateUI();
}

function fastFood(){
  state.liver += 15;
  state.lipid += 15;
  updateUI();
}

function noExercise(){
  state.lipid += 10;
  state.pressure += 10;
  updateUI();
}

function badSleep(){
  state.pressure += 10;
  updateUI();
}

function stressUp(){
  state.diabetes += 5;
  state.pressure += 10;
  updateUI();
}

function drink(){
  state.liver += 20;
  updateUI();
}

// ===== 좋은 행동 =====
function exercise(){
  state.diabetes -= 10;
  state.lipid -= 10;
  state.pressure -= 8;
  updateUI();
}

function healthyFood(){
  state.diabetes -= 8;
  state.liver -= 10;
  updateUI();
}

function goodSleep(){
  state.pressure -= 10;
  updateUI();
}

function relax(){
  state.pressure -= 8;
  updateUI();
}

function water(){
  state.liver -= 5;
  updateUI();
}

// 자동 진행
setInterval(()=>{
  state.diabetes += 1;
  state.lipid += 1;
  state.pressure += 1;
  updateUI();
},3000);

// 설명
function info(type){
  let text = "";

  if(type==="diabetes") text="당뇨: 혈당량이 비정상적으로 높은 상태가 지속되는 질환 \n \n 오줌에서 포도당이 검출되며, 혈액순환장애 등 여러 합병증을 유발할수 있다.";
  if(type==="liver") text="지방간: 간에 지방이 비정상적으로 많이 축적된 상태 \n \n 비만,당뇨병과 연관성이 높으며, 간염 간경변으로 진행될수 있다.";
  if(type==="lipid") text="고지혈: 혈액속에 지질 성분이 필요 이상으로 많이 존재하는 상태 \n \n 콜레스테롤이 혈관벽에 쌓이면 동맥경화를 일으키고 심혈관계 질환의 위험을 높인다.";
  if(type==="pressure") text="고혈압: 혈압이 정상범위보다 높은 만성질환 \n \n 뇌졸중, 심혈관계 질환, 콩팥 질환의 원인이 된다.";

  document.getElementById("popupText").innerText = text;
  document.getElementById("popup").classList.remove("hidden");
}

function closePopup(){
  document.getElementById("popup").classList.add("hidden");
}

updateUI();


// 설명 열기
function openExplain() {
  const box = document.getElementById("explainContent");
  box.innerHTML = "";

  function add(text){
    let div = document.createElement("div");
    div.className = "info-tag";
    div.innerText = text;
    box.appendChild(div);
  }


// ===== 나쁜 행동 =====
add("🍩 당 폭식 → 혈당이 급격히 상승하면서 인슐린 기능이 약해짐 \n 👉 당뇨 위험도 +10 증가, 고지혈 위험도 +5 증가");

add("🍔 패스트푸드 → 지방과 트랜스지방이 축적되어 혈관과 간에 부담 \n 👉 지방간 위험도 +15 증가, 고지혈 위험도 +15 증가, 고혈압 위험도 +5 증가");

add("🛋️ 운동 부족 → 에너지 소비 감소로 지방이 쌓이고 혈액순환 저하 \n 👉 고지혈 위험도 +10 증가, 고혈압 위험도 +10 증가");

add("😴 수면 부족 → 호르몬 불균형으로 혈압과 혈당 조절 기능 약화 \n 👉 고혈압 위험도 +10 증가, 당뇨 위험도 +5 증가");

add("😡 스트레스 → 스트레스 호르몬(코르티솔) 증가 → 혈당과 혈압 상승 \n 👉 당뇨 위험도 +5 증가, 고혈압 위험도 +10 증가");

add("🍺 음주 → 간에서 지방 분해 기능 저하 → 지방 축적 \n 👉 지방간 위험도 +20 증가");


// ===== 좋은 행동 =====
add("🏃 운동 → 혈당을 에너지로 사용하고 지방을 태움 \n 👉 당뇨 위험도 -10 감소, 고지혈 위험도 -10 감소, 고혈압 위험도 -8 감소");

add("🥗 건강식 → 당과 지방 섭취 감소 + 영양 균형 \n 👉 당뇨 위험도 -8 감소, 지방간 위험도 -10 감소");

add("😴 숙면 → 호르몬 균형 회복 → 혈압 안정 \n 👉 고혈압 위험도 -10 감소, 당뇨 위험도 -3 감소");

add("🧘 휴식 → 스트레스 감소 → 혈압과 혈당 안정 \n 👉 고혈압 위험도 -8 감소");

add("💧 물 섭취 → 신진대사 촉진 + 간 해독 도움 \n 👉 지방간 위험도 -5 감소");
  
  document.getElementById("explainModal").classList.remove("hidden");
}

// 닫기
function closeExplain(){
  document.getElementById("explainModal").classList.add("hidden");
}

let auto = true;

function toggleAuto(){
  auto = !auto;
}

setInterval(()=>{
  if(!auto) return;

  state.diabetes += state.glucose * 0.02;
  state.lipid += 1;
  state.pressure += 1;
  updateUI();
},3000);
