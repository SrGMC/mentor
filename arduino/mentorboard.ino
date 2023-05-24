#include <ESP8266WiFi.h>          //https://github.com/esp8266/Arduino
#include <DNSServer.h>
#include <ESP8266WebServer.h>
#include <WiFiManager.h>

const int LED_PIN = 16;

WiFiManager wm;
ESP8266WebServer server(80);
bool ledStatus = false;

void setup() {
    Serial.begin(115200);

    bool res;
    String apName = String("MentorBoard-");
    apName.concat(wm.getWiFiHostname());
    res = wm.autoConnect(apName.c_str(), "mentorboard");

    if(!res) {
      Serial.println("*wm:Failed to connect");
    } 
    else {
      Serial.printf("*wm:Succesfully Connected\n");
    }

    /*
     * LED setup
     */
    pinMode(LED_PIN, OUTPUT);
    digitalWrite(LED_PIN, LOW);

    /*
     * Server setup
     */
    server.on("/health", []() {
      String status = String("{\"healthcheck\": \"UP\", \"hostname\": \"MentorBoard-");
      status.concat(wm.getWiFiHostname());
      status.concat("\"}");

      server.sendHeader("Access-Control-Allow-Origin", "*");
      server.send(200, "application/json", status);
    });
    server.on("/status", []() {
      String status = String("{\"status\": ");
      status.concat(ledStatus ? "true" : "false");
      status.concat("}");
      server.send(200, "application/json", getJsonLedStatus());
    });

    server.on("/toggle", []() {
      setLedStatus(!ledStatus);
      server.send(200, "application/json", getJsonLedStatus());
    });

    server.on("/on", []() {
      setLedStatus(true);
      server.send(200, "application/json", getJsonLedStatus());
    });
    
    server.on("/off", []() {
      setLedStatus(false);
      server.send(200, "application/json", getJsonLedStatus());
    });
    
    server.onNotFound([]() {
      server.send(404, "text/plain", "Error");
    });
    server.begin();
    Serial.printf("*sv:Server started\n");
}

void setLedStatus(bool status) {
  if(status) {
    digitalWrite(LED_PIN, HIGH);
  } else {
    digitalWrite(LED_PIN, LOW);
  }
  ledStatus = status;
}

String getJsonLedStatus() {
  String status = String("{\"status\": ");
  status.concat(ledStatus ? "true" : "false");
  status.concat("}");

  return status;
}

void loop() {
  server.handleClient();
}
