# Greeting Card Website

A simple interactive website that allows users to generate personalized greeting cards for any occasion. Visitors can enter their name (in any language), and the site dynamically overlays the name onto a pre-designed background image. The final greeting card can be downloaded or shared directly via mobile apps using the Web Share API.

## Features

- **Name Input:** Users can type their name in any language.
- **Dynamic Card Generation:** Uses HTML5 Canvas to overlay the name on a themed background.
- **Download Option:** Allows users to save the generated image (PNG).
- **Share Option:** Users on supported mobile browsers can share the image via social media or other apps.
- **Responsive Design:** Optimized for both mobile and desktop devices.

## Project Structure

```bash
greeting-website/
├── index.html         # Main HTML file
├── style.css          # Custom CSS styles
├── script.js          # JavaScript logic (canvas drawing, sharing, etc.)
├── images/
│   └── greeting-card.png  # Background image for the greeting card
└── fonts/
    └── CustomFont.otf     # Custom font file
```

## Getting Started

1. **Clone or Download** this repository to your local machine.
2. **Open** the `index.html` file in your web browser.
   - Alternatively, you can deploy the project to a static hosting service such as [Vercel](https://vercel.com) or [GitHub Pages](https://pages.github.com).

## Usage

1. **Visit the Site:** Open the website locally or via your hosted URL.
2. **Enter Your Name:** Type your name in the input field.
3. **Generate Card:** Click the **Generate** button to create a personalized greeting card.
4. **Download:** Click the **Download** button to save the generated image (PNG) to your device.
5. **Share:** Click the **Share** button (on supported mobile browsers) to share the image directly via social media or other apps.

## Deployment on Vercel

- **Framework Preset:** Set to **Other** or **No Framework**, as this is a static site.
- **Build Command:** Leave it empty or set to `None`.
- **Output Directory:** Set to `.` if your `index.html` is in the root.
- Once deployed, you can optionally enable [Vercel Web Analytics](https://vercel.com/docs/concepts/analytics) and [Speed Insights](https://vercel.com/docs/concepts/speed-insights) if you have a Pro plan.

## Contributing

Contributions and suggestions are welcome!  
Feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE). See the [LICENSE](LICENSE) file for details.
