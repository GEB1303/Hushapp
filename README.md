<p align="center">
  <img src="icons/icon128.png" alt="Hushapp icon" width="96" height="96">
</p>

<h1 align="center">Hushapp</h1>

<p align="center"><strong>Your groups, your focus.</strong></p>

Love your group chats but not every message in them? Add specific members to your quiet list and choose how you see their messages: softly blurred, or hidden completely. Stay in the groups you care about and enjoy the conversations that matter to you.

Hushapp is a lightweight Chrome extension for WhatsApp Web.

## Features

- **Quiet list**: add members by their name as shown in the group, or by phone number.
- **Two modes**:
  - **Soft blur**: their messages appear blurred. Click one to reveal it.
  - **Hidden**: their messages disappear from view entirely.
- **One-click toggle** to turn Hushapp on or off at any time.
- **Private by design**: everything happens in your browser. Nobody is notified, and nothing is sent anywhere.

## Installation

### From the Chrome Web Store
*Coming soon.*

### Manual install (developer mode)
1. Download or clone this repository.
2. Open `chrome://extensions` in Chrome.
3. Turn on **Developer mode** (top right).
4. Click **Load unpacked** and select the project folder.
5. Open or reload [WhatsApp Web](https://web.whatsapp.com).

## How to use

1. Click the Hushapp icon in the Chrome toolbar.
2. Type a member's name exactly as it appears in your group, or their phone number, and click **Add**.
3. Choose how to show their messages: **Softly blurred** or **Hidden completely**.

Changes apply instantly. No page reload needed.

## Privacy

Hushapp does not collect, store, or transmit any personal data. Your quiet list and preferences are saved with Chrome's built-in storage and never leave your browser. The only permission requested is `storage`.

## Limitations

- Works on WhatsApp Web in desktop Chrome (and Chromium-based browsers) only, not on the mobile app.
- Notifications from the group may still arrive.
- Some media messages without text (photos, voice notes, stickers) may not be detected.
- If WhatsApp Web changes its page structure, Hushapp may need an update.

## Project structure

```
hushapp/
├── manifest.json   # Extension config (Manifest V3)
├── content.js      # Finds and blurs/hides messages on WhatsApp Web
├── content.css     # Blur and hide styles
├── popup.html      # Settings popup
├── popup.css
├── popup.js
└── icons/          # App icon (SVG source + PNG sizes)
```

## Contributing

Issues and pull requests are welcome. If something stops working after a WhatsApp Web update, please open an issue.

## Disclaimer

Hushapp is an independent project. It is not affiliated with, endorsed by, or sponsored by WhatsApp or Meta. WhatsApp is a trademark of its respective owner.

## License

[MIT](LICENSE)
