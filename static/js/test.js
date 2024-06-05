class ButtonController {
    constructor(button1, button2, button3, display, alarm, initialValue, increment1, increment2, alarmSetting, minValue, maxValue, alarmThreshold) {
        this.button1 = button1;
        this.button2 = button2;
        this.button3 = button3;
        this.display = display;
        this.alarm = alarm;
        this.count = initialValue; // 초기값 설정
        this.interval = null;
        this.activeButtons = new Set();
        this.increment1 = increment1;
        this.increment2 = increment2;
        this.alarmSetting = alarmSetting; // 알람 설정값
        this.minValue = minValue; // 최소값
        this.maxValue = maxValue; // 최대값
        this.alarmThreshold = alarmThreshold; // 알람 발생 임계값

        // 초기 알람 문구 설정
        this.updateAlarmText();

        // 버튼에 이벤트 핸들러 등록
        this.button1.addEventListener('click', () => this.handleButtonClick(this.button1));
        this.button2.addEventListener('click', () => this.handleButtonClick(this.button2));
        this.button3.addEventListener('click', () => this.handleButtonClick(this.button3));
           
        // 디스플레이 초기값 설정
        this.updateDisplay();
    }

    calculateTotalIncrement() {
        let totalIncrement = 0;
        this.activeButtons.forEach(button => {
            if (button === this.button1) totalIncrement += this.increment1;
            if (button === this.button2 || button === this.button3) totalIncrement -= this.increment2;
        });
        return totalIncrement;
    }

    startInterval() {
        clearInterval(this.interval);  // 기존 인터벌을 제거
        this.interval = setInterval(() => {
            this.count += this.calculateTotalIncrement();  // 총 증가량을 카운터에 더함
            this.count = Math.max(Math.min(this.count, this.maxValue), this.minValue); // 최대값 및 최소값 내에서 조정
            this.updateDisplay();  // 디스플레이 업데이트
            this.checkAlarm();  // 알람 확인 및 표시
        }, 1000);  // 1초마다 실행
    }

    handleButtonClick(button) {
        if (this.activeButtons.has(button)) {  // 이미 활성화된 버튼을 클릭한 경우
            this.activeButtons.delete(button);  // 버튼을 활성화된 Set에서 제거
            button.classList.remove('active');  // 버튼 스타일에서 활성화 클래스를 제거
        } else {  // 비활성화된 버튼을 클릭한 경우
            this.activeButtons.add(button);  // 버튼을 활성화된 Set에 추가
            button.classList.add('active');  // 버튼 스타일에 활성화 클래스를 추가
        }
        if (this.activeButtons.size > 0) {  // 활성화된 버튼이 하나라도 있는 경우
            this.startInterval();  // 인터벌 시작
        } else {  // 활성화된 버튼이 없는 경우
            clearInterval(this.interval);  // 인터벌 제거
        }
    }

    updateDisplay() {
        this.display.textContent = this.count.toFixed(1);  // 카운트 값을 디스플레이에 표시 (소수점 2자리로 표시)
    }

    checkAlarm() {
        if (this.count >= this.alarmThreshold) {
            this.alarm.textContent = this.alarmSetting;
        } else {
            this.alarm.textContent = "";
        }
    }

    // 초기 알람 문구 설정 메서드
    updateAlarmText() {
        this.alarm.textContent = this.alarmSetting;
    }
}

// 사용 예시
const buttons = [];
const displays = [];
const alarms = [];


for (let i = 1; i <= 15; i++) {
    buttons.push(document.getElementById(`button${i}`));
    displays.push(document.getElementById(`display${i}`));
    alarms.push(document.getElementById(`alarm${i}`));
}


//button1, button2, button3, display, alarm, initialValue, increment1, increment2, alarmSetting, minValue, maxValue, alarmThreshold
//기기, No.1, No.2, 값 , 알람, 초기값, Button1 증가, Button 2 또는 3 증가, 알람 문구, 최소값, 최대 값, 알람세팅


const controller1 = new ButtonController(button1, button2, button3, display1, alarm1, 0.5, -0.1, 0.5, "L.O Pressure low", 0.0, 4.0, 2.0);
const controller2 = new ButtonController(button1, button12, button13, display2, alarm2, 40, 1, 1, "L.O Temp. High", 0, 70, 60);
const controller3 = new ButtonController(button1, button6, button7, display3, alarm2, 1.0, 0.5, 0.5, "Jacket Pressure Low", 0.0, 5.0, 2.0);
const controller4 = new ButtonController(button1, button6, button7, display4, alarm2, 70, 1, 1, "Jacket Temp. High", 60, 95, 90);
const controller5 = new ButtonController(button1, button8, button9, display5, alarm2, 0.5, 1, 1, "F.O Pressure Low", 0.0, 8.0, 2.0);
const controller6 = new ButtonController(button1, button8, button9, display6, alarm2, 80, 1, 1, "F.O Temp Low", 60, 150, 90);
const controller7 = new ButtonController(button1, button4, button5, display7, alarm2, 80, 10, 10, "Exh. Gas Temp. High", 80, 450, 400);
const controller8 = new ButtonController(button1, button10, button11, display8, alarm2, 0.1, 0.1, 0.1, "SCAV Air Pressure High", 0.1, 2.0, 1.8);
const controller9 = new ButtonController(button1, button10, button11, display9, alarm2, 30, 1, 1, "SCAV Air Temp. High", 20, 80, 50);
const controller10 = new ButtonController(button1, button10, button11, display10, alarm2, 0, 1, 1, "ME OVER SPEED", 0, 110, 105);

// 나머지 컨트롤러들도 같은 방식으로 생성합니다.





//Display 값에 따라서, 계산결과가 반영되는 CLASS 만들기 Ex> ME RPM 올라갈때//
