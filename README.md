# Private Server Inspector

A transparent proxy and private server setup for [`Tap Force`](https://play.google.com/store/apps/details?id=com.racecat.fight) to enable traffic inspection, modification, and feature unlocking without the official backend.

## 🚀 Project Goal

- **Inspect** and **modify** all client-server traffic to unlock content and test features.
- Run a **local mock server** that emulates PlayFab/CloudScript responses.
- Provide tooling to streamline development, debugging, and experimentation.

## ⚙️ Current Features

- **MITM Proxy**: `mitmproxy` in transparent mode to capture & inspect HTTPS/TLS requests.
- **Local Server**: Node.js/Express server that replays original server payloads.
- **Traffic Redirect**: `start.bat` spins up the server and redirects Android device traffic to `localhost`.
- **Inspect-Only Mode**: `start_inspect.bat` launches `mitmproxy` alone for passive logging (no redirect).

## 📦 Planned Features

- **Automated Payload Generator**: Scripts to mutate & replay bulk data endpoints.
- **GUI Dashboard**: Real-time request/response viewer with editing capabilities.
- **Scriptable Hooks**: Pre/post request handlers for custom transformations.
- **Multi-Device Support**: Simplify setup for multiple Android versions and emulators.

## 🛠 Setup & Configuration

1. **Requirements**
   - Windows PC
   - [WireGuard](https://www.wireguard.com/) on Android (no root required)
   - [mitmproxy](https://mitmproxy.org/) installed and added to your PC’s `PATH`
   - Node.js (v14+)

2. **Installation**
   ```bash
   git clone https://github.com/your-org/private-server-inspector.git
   cd private-server-inspector
   npm install
   ```

3. **Configuration**
   > There is no `.env` file—simply choose your launch script:
   - `start_inspect.bat`  
     Runs `mitmproxy` in **transparent inspect-only** mode. No traffic redirection; view requests/responses only.
   - `start.bat`  
     Launches the **local mock server** (Express) **and** configures system/WireGuard rules to redirect game traffic to `localhost`.

   > **Note**: Android devices do **not** need to be rooted; they only need WireGuard configured to point to your PC. Ensure `mitmproxy` is on your PATH so the scripts can invoke it directly.

## 🚚 Usage

1. Configure WireGuard on Android to tunnel to your PC’s IP.
2. Trust the mitmproxy certificate on your device (for HTTPS).
3. Run `start.bat` (full intercept + server) or `start_inspect.bat` (log-only).
4. Open the game; traffic will now flow through your proxy/server.

## 🤝 Contributing

1. Fork the repo
2. Create a new branch (`feature/xyz`)
3. Commit your changes and push
4. Open a Pull Request detailing your improvements

Please adhere to [Conventional Commits](https://www.conventionalcommits.org/) and write clear, descriptive PRs (I, on the other hand, won't be writing clear commit descriptions lol).


