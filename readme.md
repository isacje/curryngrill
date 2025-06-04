# Curry & Grill Restaurant Website

A modern, responsive website for Curry & Grill, an authentic Indo-American restaurant located in Fayetteville, NC. The website features dynamic content, interactive elements, and a seamless user experience.

## 🌟 Features

### Core Functionality
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dynamic Daily Menu**: Automatically rotating daily specials based on the day of the week
- **Interactive Contact Form**: Google Sheets integration for form submissions
- **Smooth Animations**: Fade-in effects, parallax scrolling, and hover interactions
- **Modern UI/UX**: Clean design with contemporary styling and micro-interactions

### Sections
1. **Hero Section**: Eye-catching landing area with restaurant logo and call-to-action
2. **About**: Restaurant story and philosophy
3. **Menu**: American menu items, daily specials, combo deals, add-ons, and desserts
4. **Gallery**: Visual showcase of food categories
5. **Contact**: Contact information, embedded Google Maps, and contact form
6. **Social Media Integration**: Links to Facebook, Instagram, Yelp, and Google Reviews

## 🛠 Technology Stack

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with CSS Grid, Flexbox, and animations
- **Vanilla JavaScript**: Interactive functionality and dynamic content
- **Google Apps Script**: Backend form processing
- **Font Awesome**: Icon library
- **Google Maps**: Embedded location map

## 📋 Prerequisites

- Web browser (Chrome, Firefox, Safari, Edge)
- Web server (for local development)
- Google account (for form submission functionality)

## 🚀 Installation & Setup

### 1. Clone/Download Files
```bash
# If using Git
git clone [repository-url]

# Or download and extract the files
```

### 2. File Structure
Ensure your directory structure looks like this:
```
curry-grill-website/
├── index.html (or curryandgrilludpated.html)
├── images/
│   └── logo.png
└── README.md
```

### 3. Image Setup
- Place your restaurant logo in the `images/` folder as `logo.png`
- Recommended logo size: 200x200px or similar square dimensions
- Ensure the logo has a transparent background for best results

### 4. Local Development
For local development, you can use any web server:

**Option 1: Python (if installed)**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Option 2: Node.js (if installed)**
```bash
npx serve .
```

**Option 3: VS Code Live Server Extension**
- Install the Live Server extension in VS Code
- Right-click on the HTML file and select "Open with Live Server"

## ⚙️ Configuration

### Contact Form Setup
The contact form uses Google Apps Script for backend processing. To set up:

1. **Create a Google Spreadsheet**
   - Go to Google Sheets and create a new spreadsheet
   - Add headers: Name, Mobile, Email, Message, Timestamp

2. **Create Google Apps Script**
   - In your spreadsheet, go to Extensions > Apps Script
   - Replace the default code with a web app script to handle form submissions
   - Deploy as a web app and copy the URL

3. **Update Form Action**
   - Replace the URL in the JavaScript fetch request with your Google Apps Script URL

### Customization Options

#### Restaurant Information
Update the following in the HTML:
- Restaurant name and tagline
- Address and contact details
- Operating hours
- Social media links

#### Menu Items
Modify the menu sections:
- American Menu items and prices
- Daily specials array in JavaScript
- Add-ons and desserts
- Combo deals

#### Styling
Customize the CSS variables in the `:root` section:
```css
:root {
    --primary-color: #ff6b35;    /* Main brand color */
    --secondary-color: #2c3e50;  /* Secondary color */
    --accent-color: #f39c12;     /* Accent color */
    /* ... other variables */
}
```

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🎨 Key Features Explained

### Dynamic Daily Menu
The website automatically displays different menu items based on the day of the week:
- **Monday**: Fried Rice and Chilly Chicken, Vegetable Korma
- **Tuesday**: Jeera Rice and Chicken Curry
- **Wednesday**: Yellow Rice and Chicken Curry
- **Thursday**: Fried Rice with Butter Chicken
- **Friday**: Extended menu with multiple options
- **Saturday-Sunday**: Kottu Parata and Noodles options

### Interactive Elements
- **Smooth Scrolling**: Navigation links smoothly scroll to sections
- **Hover Effects**: Menu items and buttons have engaging hover states
- **Loading Animations**: Form submission includes loading states
- **Parallax Effect**: Hero section moves with scroll
- **Fade-in Animations**: Content appears as user scrolls

### Form Integration
- Real-time form validation
- Success/error message display
- Integration with Google Sheets
- WhatsApp contact option

## 🌐 Deployment

### GitHub Pages
1. Upload files to a GitHub repository
2. Go to Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://yourusername.github.io/repository-name`

### Netlify
1. Drag and drop your project folder to Netlify
2. Your site will be deployed automatically
3. Get a custom domain or use the provided netlify.app URL

### Traditional Web Hosting
1. Upload all files to your web hosting provider
2. Ensure the main HTML file is named `index.html`
3. Upload the images folder with logo.png

## 📞 Contact Information

**Restaurant Details:**
- **Address**: 2064 Strickland Bridge Rd, Fayetteville, NC 28304
- **Phone**: +1-910-366-7561
- **Hours**: Monday-Sunday 11AM - 10PM
- **Rating**: 4.8/5 Stars (Google Reviews)

## 🔧 Maintenance

### Regular Updates
- Update daily menu items seasonally
- Check and update contact information
- Refresh social media links
- Update prices as needed

### Performance Monitoring
- Monitor form submissions
- Check website loading speed
- Test on different devices and browsers
- Update browser compatibility as needed

## 🐛 Troubleshooting

### Common Issues

**Logo not displaying:**
- Check if `images/logo.png` exists
- Verify file path and name are correct
- Ensure image format is supported (PNG, JPG, SVG)

**Form not submitting:**
- Verify Google Apps Script URL is correct
- Check if script is deployed as web app
- Ensure spreadsheet permissions are set correctly

**Mobile menu not working:**
- Check JavaScript console for errors
- Verify mobile menu toggle functionality
- Test on different mobile devices

**Daily menu not updating:**
- Check JavaScript console for errors
- Verify the dailyMenus array is properly formatted
- Test the updateDailyMenu() function

## 📄 License

This project is created for Curry & Grill restaurant. All rights reserved.

## 🤝 Contributing

For updates or modifications to the website, please contact the restaurant directly or the web development team.

---

**Made with ❤️ for food lovers**

*This website showcases the authentic Indo-American cuisine of Curry & Grill, bringing together the rich flavors of India with beloved American favorites.*