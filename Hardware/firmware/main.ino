#include <SPI.h>
#include <WiFiNINA.h>
#include <Wire.h>
#include <Arduino_APDS9960.h>

// Wi-Fi AP credentials (the network the board creates)
char ssid[] = "MyVegaAP";        // AP name
char pass[] = "myAPpassword";    // AP password (min. 8 characters)
int status = WL_IDLE_STATUS;

// Sensor Pins
#define PH_SENSOR A1
#define TDS_SENSOR A0
#define TURBIDITY_SENSOR A3
#define THERMISTOR A7
#define BUZZER 7  

TwoWire Wire(8);    //I2C connection  

// Constants for TDS calculation
#define VREF 3.3
#define SCOUNT 10
#define TDS_FACTOR 0.5

// Temperature Constants
#define RT0 10000
#define B 3977
#define R 10000
#define T0 298.15

WiFiServer server(80);

void setup() {
  Serial.begin(115200);
  while (!Serial);

  // Begin Access Point mode
  Serial.print("Setting AP (Access Point) ...");
  status = WiFi.beginAP(ssid, pass);
  if (status != WL_AP_LISTENING) {
    Serial.println("AP failed!");
    while (true); // Halt if AP mode not initiated
  }
  Serial.println("AP started.");
  
  // Start the web server
  server.begin();
  printWifiStatus();
}
void loop() {
  WiFiClient client = server.available();
  if (client) {
    Serial.println("New client connected");
    boolean currentLineIsBlank = true;
    String request = "";
    
    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
        request += c;
        Serial.write(c);
        
        if (c == '\n' && currentLineIsBlank) {
          if (request.indexOf("/buzzer") != -1) {
            activateBuzzer();
          } else {
            float turbidity = map(analogRead(TURBIDITY_SENSOR), 0, 4095, 0, 100);
            float temperature = readTemperature();
            float phValue = readPH();
            float tdsValue = readTDS(temperature);

            checkWaterQuality(phValue, turbidity, tdsValue);

            float ambientLightValue = readAmbientLight();
            float gasValue = readGas();
            float humidityValue = readHumidity();
            int irValue = readIR();
            float pressureValue = readPressure();
            int proximityValue = readProximity();
            float temperatureValue = readTemperatureValue();
            String timestamp = getTimestamp();
            
            // Build and send JSON response
            client.println("HTTP/1.1 200 OK");
            client.println("Content-Type: application/json");
            client.println("Connection: close");
            client.println("Access-Control-Allow-Origin: *");
            client.println();
            client.print("{");
            client.print("\"ambientLightValue\":"); client.print(ambientLightValue, 2); client.print(",");
            client.print("\"gasValue\":"); client.print(gasValue, 2); client.print(",");
            client.print("\"humidityValue\":"); client.print(humidityValue, 2); client.print(",");
            client.print("\"irValue\":"); client.print(irValue); client.print(",");
            client.print("\"phValue\":"); client.print(phValue, 2); client.print(",");
            client.print("\"pressureValue\":"); client.print(pressureValue, 2); client.print(",");
            client.print("\"proximityValue\":"); client.print(proximityValue); client.print(",");
            client.print("\"tdsValue\":"); client.print(tdsValue, 2); client.print(",");
            client.print("\"temperature\":"); client.print(temperature, 2); client.print(",");
            client.print("\"temperatureValue\":"); client.print(temperatureValue, 2); client.print(",");
            client.print("\"timestamp\":\""); client.print(timestamp); client.print("\",");
            client.print("\"turbidity\":"); client.print(turbidity, 2);
            client.println("}");
          }
          break;
        }
        if (c == '\n') currentLineIsBlank = true;
        else if (c != '\r') currentLineIsBlank = false;
      }
    }
    client.stop();
    Serial.println("Client disconnected");
  }
}

void activateBuzzer() {
  Serial.println("Buzzer Activated via /buzzer API");
  tone(BUZZER, 1000); // Start buzzer at 1kHz
  delay(2000);        // Keep ON for 2 seconds
  noTone(BUZZER);     // Stop buzzer
}

void checkWaterQuality(float pH, float turbidity, float tds) {
  if (pH < 6.5 || pH > 8.5 || turbidity > 50 || tds > 3000) {
    activateBuzzer();
  }
}

float readPH() {
  int buf[SCOUNT];
  for (int i = 0; i < SCOUNT; i++) {
    buf[i] = analogRead(PH_SENSOR);
    delay(10);
  }
  for (int i = 0; i < SCOUNT - 1; i++) {
    for (int j = 0; j < SCOUNT - i - 1; j++) {
      if (buf[j] > buf[j + 1]) {
        int temp = buf[j];
        buf[j] = buf[j + 1];
        buf[j + 1] = temp;
      }
    }
  }
  int avgValue = 0;
  for (int i = 2; i < 8; i++) avgValue += buf[i];
  float voltage = (float)avgValue * VREF / 4095 / 6;
  return 3.5 * voltage;
}

float readTemperature() {
  float VRT = analogRead(THERMISTOR) * (VREF / 4095.0);
  float VR = VREF - VRT;
  float RT = VRT / (VR / R);
  float lnRT = log(RT / RT0);
  float tempK = 1 / ((lnRT / B) + (1 / T0));
  return tempK - 273.15;
}

float readTDS(float temp) {
  int raw = analogRead(TDS_SENSOR);
  float voltage = raw * VREF / 4095.0;
  float ecValue = (voltage / TDS_FACTOR) * 1000;
  float tdsValue = ecValue / (1.0 + 0.02 * (temp - 25));
  return tdsValue;
}

float readAmbientLight() {
  return 6660;
}

float readGas() {
  return 9.91;
}

float readHumidity() {
  return 49.1;
}

int readIR() {
  return 0;
}

float readPressure() {
  return 1037.48;
}

int readProximity() {
  if (APDS.proximityAvailable()) {
    // read the proximity
    // - 0   => close
    // - 255 => far
    // - -1  => error
    int proximity = APDS.readProximity();

  return proximity
}

float readTemperatureValue() {
  return 24.0;
}

String getTimestamp() {
  // Replace with actual timestamp retrieval (e.g., via RTC or NTP) if available
  return "2025-03-30T10:21:03.421703";
}

void printWifiStatus() {
  Serial.print("SSID: "); Serial.println(WiFi.SSID());
  Serial.print("IP Address: "); Serial.println(WiFi.localIP());
  Serial.print("Signal strength (RSSI): "); Serial.print(WiFi.RSSI()); Serial.println(" dBm");
}
