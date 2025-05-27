// #include <Arduino.h>

// void setup() {
//  Serial.begin(9600);
//  randomSeed(analogRead(0));
// }

// void loop() {
//  // int bpm = random(60, 101);  // 가짜 심박수 데이터 생성 (60~100 BPM)
//  int bpm = 78;
//  Serial.print("BPM: ");
//  Serial.println(bpm);
//  delay(1000);
// }


// #include <Wire.h>
// #include "MAX30105.h"
// #include "heartRate.h"

// MAX30105 particleSensor;


// long lastBeat = 0;
// float beatsPerMinute;
// int beatAvg;

// void setup() {
//   Serial.begin(115200);
//   if (!particleSensor.begin(Wire, I2C_SPEED_STANDARD)) {
//     Serial.println("MAX30105 not found. Check wiring/power.");
//     while (1);
//   }

//   // byte ledBrightness = 60;
//   // byte sampleAverage = 4;
//   // int ledMode = 2;
//   // int sampleRate = 100;
//   // int pulseWidth = 411;
//   // int adcRange = 4096;

//   // particleSensor.setup(ledBrightness, sampleAverage, ledMode, sampleRate, pulseWidth, adcRange);

//     particleSensor.setup(); // 기본 설정
//   particleSensor.setPulseAmplitudeRed(0x0A);  // LED 강도 설정
//   particleSensor.setPulseAmplitudeIR(0x0A);
// }

// void loop() {
//   long irValue = particleSensor.getIR();  // 적외선 값 (손 감지 여부용)

//    Serial.println("=== Loop running ===");
//     Serial.print("IR Value: ");
//   Serial.println(irValue);

//   if (irValue < 50000) {
//     Serial.println("손을 센서에 올려주세요.");
//     delay(500);
//     return;
//   }
//  //심박수계산
//   if (checkForBeat(irValue)) {
//     long delta = millis() - lastBeat;
//     lastBeat = millis();

//     beatsPerMinute = 60 / (delta / 1000.0);

//     if (beatsPerMinute < 255 && beatsPerMinute > 20) {
//       beatAvg = (beatAvg * 3 + (int)beatsPerMinute) / 4;
//     }

//     Serial.print("IR=");
//     Serial.print(irValue);
//     Serial.print(", BPM=");
//     Serial.print(beatsPerMinute);
//     Serial.print(", Avg BPM=");
//     Serial.println(beatAvg);
//   }

//   delay(100);
// }
  // if (checkForBeat(irValue)) {
  //   float bpm = particleSensor.getHeartRate();
  //   float spo2 = particleSensor.getSpO2();

  //   Serial.print("BPM:");
  //   Serial.print(bpm);
  //   Serial.print(",SpO2:");
  //   Serial.println(spo2);
  // }

  // delay(1000);

// #include <Arduino.h>
// #include <Wire.h>

// void setup() {
//   Wire.begin();
//   Serial.begin(115200);
//   Serial.println("\nI2C Scanner...");
// }

// void loop() {
//   byte error, address;
//   int devices = 0;

//   for (address = 1; address < 127; address++) {
//     Wire.beginTransmission(address);
//     error = Wire.endTransmission();

//     if (error == 0) {
//       Serial.print("I2C device found at 0x");
//       Serial.println(address, HEX);
//       devices++;
//     }
//   }

//   if (devices == 0)
//     Serial.println("No I2C devices found\n");
//   else
//     Serial.println("Done.\n");

//   delay(5000);
// }

// #include <Wire.h>
// #include "MAX30105.h"

// MAX30105 particleSensor;

// void setup() {
//   Serial.begin(115200);
//   while (!Serial);  // 시리얼 연결 대기 (필요한 보드의 경우)

//   // 센서 초기화
//   if (!particleSensor.begin(Wire, I2C_SPEED_STANDARD)) {
//     Serial.println("MAX30102 not found. Check wiring or power.");
//     while (1);  // 무한 대기
//   }

//   // 센서 설정
//   particleSensor.setup();  // 기본 설정 사용
//   particleSensor.setPulseAmplitudeRed(0x0A); // RED LED 세기
//   particleSensor.setPulseAmplitudeIR(0x0A);  // IR LED 세기
// }

// void loop() {
//   long irValue = particleSensor.getIR();  // 적외선 센서 값 읽기

//   Serial.print("IR Value: ");
//   Serial.println(irValue);

//   // 간단한 손가락 감지
//   if (irValue < 50000) {
//     Serial.println("👉 손가락이 감지되지 않았습니다.");
//   } else {
//     Serial.println("🫱 손가락 감지됨!");
//   }

//   delay(500);
// }


#include <Wire.h>
#include "MAX30105.h"
#include "heartRate.h"

MAX30105 particleSensor;


long lastBeat = 0;
float beatsPerMinute;
int beatAvg;

void setup() {
  Serial.begin(115200);
  if (!particleSensor.begin(Wire, I2C_SPEED_STANDARD)) {
    Serial.println("MAX30105 not found. Check wiring/power.");
    while (1);
  }

  particleSensor.setup(); // 기본 설정
  particleSensor.setPulseAmplitudeRed(0x0A);  // LED 강도 설정
  particleSensor.setPulseAmplitudeIR(0x0A);
}

void loop() {
  long irValue = particleSensor.getIR();  // 적외선 값 (손 감지 여부용)

  if (irValue < 50000) {
    Serial.println("waiting");  // Node.js 측에서 필터링 가능
    delay(500);
    return;
  }

  if (checkForBeat(irValue)) {
    long delta = millis() - lastBeat;
    lastBeat = millis();

    beatsPerMinute = 60 / (delta / 1000.0);

    // if (beatsPerMinute < 255 && beatsPerMinute > 20) {
    //   beatAvg = (beatAvg * 3 + (int)beatsPerMinute) / 4;
    // }

    // ✅ 문자열 포맷 통일 (Node.js가 이걸 파싱하기 쉽게)
    Serial.print("BPM:");
    Serial.print(beatsPerMinute);

  }

  delay(100);
}