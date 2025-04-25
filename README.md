# Score no more 🚫🏀🏈⚽️

<!-- TODO: Replace EXTENSION_ID -->

[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/EXTENSION_ID?style=for-the-badge)](https://chrome.google.com/webstore/detail/EXTENSION_ID)

Hide potential sport score spoilers on YouTube titles and thumbnails based on your custom keywords. Keep your feed safe from unwanted results!

## Features ✨

- **Keyword-Based Filtering:** Add keywords (teams, players, leagues, event names) to hide videos containing them in the title.
- **Thumbnail Blurring:** Blurs the thumbnails of videos matching your keywords.
- **Title Obscuring:** Removes the scores from the titles of matching videos.
- **YouTube Integration:** Works seamlessly on the YouTube homepage, search results, and subscription feeds.
- **Simple Popup UI:** Easily add and manage your keywords through the extension popup.

## How it Works 🤔

The extension monitors YouTube pages for video titles and thumbnails. When a video's title matches one of your specified keywords, the extension will:

1.  Blur the video thumbnail.
2.  Remove the score from the video title.

## Installation 🚀

1.  **Chrome Web Store:** (Coming Soon!) You'll be able to install the extension directly from the Chrome Web Store.
2.  **Manual Installation (for Development):**
    - Clone this repository: `git clone https://github.com/your-username/score-no-more-extension.git` <!-- TODO: Update repository URL -->
    - Install dependencies: `bun install`
    - Build the extension: `bun run build`
    - Open Chrome and navigate to `chrome://extensions/`.
    - Enable "Developer mode" (top right corner).
    - Click "Load unpacked" and select the `dist` folder generated in the previous step.

## Usage 🧑‍💻

1.  Click the Score no more extension icon in your Chrome toolbar.
2.  Enter keywords (e.g., "betis", "summary", "laliga") into the input field in the popup.
3.  Press Enter or click the "Add" button.
4.  Keywords will be saved, and the extension will start filtering YouTube content immediately. You might have to reload the YouTube page if it is already open.

## Technologies Used 💻

- [Preact](https://preactjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Chrome Extension Manifest V3](https://developer.chrome.com/docs/extensions/mv3/)

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

[MIT](./LICENSE)
