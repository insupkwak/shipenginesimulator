let count = 0;  // 현재 카운터 값
let interval;   // 인터벌을 저장할 변수
const activeButtons = new Set();  // 활성화된 버튼들을 저장할 Set




const displays = [
    document.getElementById('display1'),
    document.getElementById('display2'),
    document.getElementById('display4')
];
const alarms = [
    document.getElementById('alarm1'),
    document.getElementById('alarm2'),
    document.getElementById('alarm3')
];

const button1 = document.getElementById('button1');  // Button 1 요소
const button2 = document.getElementById('button2');  // Button 2 요소
const button3 = document.getElementById('button3');  // Button 3 요소







// 디스플레이를 현재 카운터 값으로 업데이트하는 함수
const updateDisplay = () => {
    display4.textContent = count;
    checkAlarm();  // 알람을 확인하는 함수 호출
};









// 활성화된 버튼들의 총 증가량을 계산하는 함수
const calculateTotalIncrement = () => {
    let totalIncrement = 0;
    activeButtons.forEach(button => {
        if (button === button1) totalIncrement += 2;
        if (button === button2 || button === button3) totalIncrement -= 1;
    });
    return totalIncrement;
};

// 인터벌을 시작하는 함수
const startInterval = () => {
    clearInterval(interval);  // 기존 인터벌을 제거
    interval = setInterval(() => {
        count += calculateTotalIncrement();  // 총 증가량을 카운터에 더함
        updateDisplay();  // 디스플레이 업데이트
    }, 1000);  // 1초마다 실행
};

// 버튼 클릭 이벤트 핸들러
const handleButtonClick = (button) => {
    if (activeButtons.has(button)) {  // 이미 활성화된 버튼을 클릭한 경우
        activeButtons.delete(button);  // 버튼을 활성화된 Set에서 제거
        button.classList.remove('active');  // 버튼 스타일에서 활성화 클래스를 제거
    } else {  // 비활성화된 버튼을 클릭한 경우
        activeButtons.add(button);  // 버튼을 활성화된 Set에 추가
        button.classList.add('active');  // 버튼 스타일에 활성화 클래스를 추가
    }
    if (activeButtons.size > 0) {  // 활성화된 버튼이 하나라도 있는 경우
        startInterval();  // 인터벌 시작
    } else {  // 활성화된 버튼이 없는 경우
        clearInterval(interval);  // 인터벌 제거
    }
};

// 알람을 확인하고 표시하는 함수
const checkAlarm = () => {
    if (count >= 20) {
        alarm.textContent = "High temperature";
    } else {
        alarm.textContent = "";
    }
};

// 각 버튼에 클릭 이벤트 리스너 추가
button1.addEventListener('click', () => handleButtonClick(button1));
button2.addEventListener('click', () => handleButtonClick(button2));
button3.addEventListener('click', () => handleButtonClick(button3));
