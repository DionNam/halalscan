# HalalScan Web

AI-powered halal food verification web application. Upload product images to instantly check if food items are halal, haram, or uncertain.

## Features

- 🤖 **AI-Powered Analysis**: Advanced ingredient detection using Gemini 2.0 Flash
- ⚡ **Instant Results**: Get verification in seconds
- 📸 **Image Upload**: Drag and drop or select product images
- 🌍 **Multi-language**: English and Korean support
- ✅ **Comprehensive Checks**: Analyzes all ingredients and packaging

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **AI**: Google Gemini via OpenRouter API
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 20+
- OpenRouter API key

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your NEXT_PUBLIC_OPENROUTER_API_KEY to .env

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Environment Variables

```env
NEXT_PUBLIC_OPENROUTER_API_KEY=your_api_key_here
```

Get your API key from [OpenRouter](https://openrouter.ai/).

## Usage

1. Click "Start Scanning" on the home page
2. Upload an image of the product's ingredients label
3. Wait for AI analysis (a few seconds)
4. View detailed results with:
   - Halal/Haram/Unknown status
   - Detected ingredients
   - Confidence score
   - Detailed reasoning

## How It Works

The analysis follows a priority-based approach:

1. **Image Quality Check**: Ensures the image is clear and readable
2. **Halal Mark Detection**: Looks for official halal certification
3. **Red Packaging Rule**: Flags products in red packaging without halal marks
4. **Ingredient Analysis**: Checks all ingredients against halal/haram databases
5. **Conservative Verification**: Applies strict rules for uncertain cases

## Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/DionNam/halalscan)

1. Click the button above or:
   ```bash
   npm install -g vercel
   vercel
   ```

2. Set environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_OPENROUTER_API_KEY`

3. Deploy automatically on every push to main branch

## Project Structure

```
halalscan-web/
├── app/
│   ├── api/
│   │   └── analyze/      # AI analysis API endpoint
│   ├── scan/             # Image upload page
│   ├── result/           # Results display page
│   ├── page.tsx          # Home page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── public/               # Static assets
└── package.json
```

## Related Projects

- **Mobile App**: [HalalScan React Native](https://github.com/your-repo/halalscan-mobile)

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Support

For issues or questions, please open a GitHub issue.
