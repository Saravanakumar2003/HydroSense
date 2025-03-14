
# **📡 Simulate Vega Board's Wi-Fi Server on Windows**

The Vega board sends sensor data over Wi-Fi, but how can you test it without the board?

Here's a simple way to **simulate the Vega board's Wi-Fi server** on your Windows PC. You can then connect to it from your phone/laptop and test the data retrieval.

---

# **📝 Requirements**

- **Windows PC** with Wi-Fi capability
- **Python** installed (for the server)
- **Flask** library installed (for the server)
- **Phone/laptop** to connect to the Wi-Fi
- **Notepad** or any text editor

---

# **🚀 Plan**
1. **Create a Wi-Fi Access Point (AP) on Windows** → This acts as "VegaAP".  
2. **Run a Local Python Server** → This mimics the Vega board's behavior, sending random sensor data.  
3. **Connect to the Wi-Fi AP and Test** → Access data on your phone/laptop.  

---

# **🛠️ Step 1: Create a Wi-Fi Hotspot on Windows**
Windows has a built-in feature to create a hotspot, but we’ll configure it manually to **act like a Vega board AP**.

### ✅ **1.1: Enable Wi-Fi Hotspot**
1. Open **Settings** → **Network & Internet** → **Mobile Hotspot**  
2. **Turn ON** "Mobile Hotspot"  
3. Click **Edit**, and set:  
   - **Network name (SSID):** `VegaAP`  
   - **Network password:** `password123`  
   - **Network band:** `2.4 GHz` (for better compatibility)  
4. Click **Save**  

Your PC is now broadcasting a Wi-Fi network named **"VegaAP"** 🎉  

---

# **🛠️ Step 2: Assign a Static IP to Simulate Vega Board**
By default, Windows assigns **random local IPs**, but we need a **fixed** one like `192.168.4.1` to mimic the Vega board.

### ✅ **2.1: Set a Static IP**
1. Open **Control Panel** → **Network and Sharing Center**  
2. Click **Change adapter settings** (on the left)  
3. Find the new adapter (labeled **"Microsoft Wi-Fi Direct Virtual Adapter"**)  
4. Right-click → **Properties**  
5. Select **Internet Protocol Version 4 (TCP/IPv4)** → **Properties**  
6. Click **Use the following IP address** and set:  
   - **IP Address:** `192.168.4.1`  
   - **Subnet mask:** `255.255.255.0`  
   - **Default gateway:** Leave empty  
7. Click **OK**  

This ensures **all connected devices communicate with `192.168.4.1`**, just like they would with a Vega board.  

---

# **🛠️ Step 3: Simulate the Vega Board’s Wi-Fi Server**
Now, we’ll create a **Python server** that mimics Vega's HTTP response.

### ✅ **3.1: Install Python & Flask**
1. Install Python (if not already installed):  
   - Download & install from [Python.org](https://www.python.org/downloads/)  
   - Check installation: Open **CMD** and run:
     ```sh
     python --version
     ```
2. Install Flask (a lightweight web server):  
   ```sh
   pip install flask
   ```

---

### ✅ **3.2: Create the Simulation Server**
1. Open **Notepad** (or VS Code)  
2. Copy & paste this Python script:
   ```python
   from flask import Flask, jsonify
   import random

   app = Flask(__name__)

   def generate_sensor_data():
       return {
           "pH": round(random.uniform(6.5, 8.5), 2),
           "Turbidity": round(random.uniform(0, 100), 2),
           "Temperature": round(random.uniform(20, 35), 2)
       }

   @app.route("/")
   def home():
       return "VegaAP - Sensor Data Server"

   @app.route("/data")
   def send_data():
       return jsonify(generate_sensor_data())

   if __name__ == "__main__":
       app.run(host="192.168.4.1", port=80, debug=True)
   ```
3. Save it as **`vega_sim.py`**  
4. Open **CMD**, navigate to the file location, and run:  
   ```sh
   python vega_sim.py
   ```

**🔥 Now, your PC is running a Wi-Fi server on `192.168.4.1`!**

---

# **🛠️ Step 4: Connect and Test**
### ✅ **4.1: Connect to "VegaAP" Wi-Fi**
1. On your **phone/laptop**, connect to **"VegaAP"** (password: `password123`).  

### ✅ **4.2: Open the Sensor Data Page**
1. Open **any web browser** (Chrome, Edge, etc.)  
2. Type:  
   ```
   http://192.168.4.1/data
   ```
3. You should see **random pH, Turbidity, and Temperature values** like:
   ```json
   {"pH": 7.2, "Turbidity": 45.6, "Temperature": 29.8}
   ```

✅ **Success! Your PC is now simulating the Vega board’s Wi-Fi and sending sensor data!** 🎉

---

# **🔥 Summary of What We Did**
✔️ Created a **Wi-Fi hotspot** named `"VegaAP"`  
✔️ Set a **static IP (`192.168.4.1`)**  
✔️ Built a **Python Flask server** to send fake sensor data  
✔️ Connected a **phone/laptop** and retrieved the data via Wi-Fi  