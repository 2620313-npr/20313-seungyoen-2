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
  state.diabetes += state.glucose * 0.02;
  state.lipid += 1;
  state.pressure += 1;
  updateUI();
},3000);

// 설명
function info(type){
  let text = "";

  if(type==="diabetes") text="당뇨: 혈당량이 비정상적으로 높은 상태가 지속되는 질환 <br> 오줌에서 포도당이 검출되며, 혈액순환장애 등 여러 합병증을 유발할수 있다.";
  if(type==="liver") text="지방간: 간에 지방 축적";
  if(type==="lipid") text="고지혈: 혈중 지방 증가";
  if(type==="pressure") text="고혈압: 혈압 상승";

  document.getElementById("popupText").innerText = text;
  document.getElementById("popup").classList.remove("hidden");
}

function closePopup(){
  document.getElementById("popup").classList.add("hidden");
}

updateUI();
