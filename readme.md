# Hemanth Narsingoju - Conversational Portfolio Website

A modern, responsive conversational portfolio website built with HTML, CSS, and JavaScript. Features a chatbot interface that showcases professional background, skills, projects, and achievements.

## 🚀 Features

- **Data-Driven**: All content loads from `data.json` for easy updates
- **Conversational Interface**: Interactive chatbot experience
- **Mobile-First Design**: Fully responsive across all devices
- **Professional Contact System**: Direct email, phone, WhatsApp integration
- **Modern UI/UX**: Clean, professional design with smooth animations
- **SEO Optimized**: Proper meta tags and structured content

## 📁 Project Structure

```
portfolio-website/
├── index.html          # Main HTML file
├── style.css           # Styling and responsive design  
├── app.js              # JavaScript application logic
├── data.json           # Portfolio data (easy to update!)
└── README.md           # This file
```

## 🛠️ Setup & Deployment

### Option 1: Netlify (Recommended - Easiest)
1. Drag the entire folder to [netlify.com](https://netlify.com)
2. Get instant live website!
3. Custom domain available

### Option 2: GitHub Pages
1. Create GitHub repository
2. Upload all files
3. Enable Pages in Settings
4. Access at `https://yourusername.github.io`

### Option 3: Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import project
3. Deploy with one click

### Option 4: Local Development
1. Open `index.html` in web browser
2. Or use local server: `python -m http.server 8000`

## 📝 Updating Content

### Easy Updates
Just modify `data.json` and the entire website updates automatically!

### Key Sections in data.json:
- `personal`: Name, title, location, status
- `contact`: Email, phone, social links
- `skills`: Technical skills by category
- `experience`: Work history with achievements
- `education`: Academic background
- `projects`: Portfolio projects with tech stacks
- `achievements`: Awards and recognitions
### Key Sections in data.json:
- `personal`: Name, title, location, status
- `contact`: Email, phone, social links
- `skills`: Technical skills by category
- `experience`: Work history with achievements
- `education`: Academic background
- `projects`: Portfolio projects with tech stacks
- `achievements`: Awards and recognitions

### Example Update:
```json
{
  "personal": {
    "name": "Your Name",
    "title": "Your Title", 
    "status": "Available Immediately"
  }
}
```

## 🎯 Key Features

### Conversational Chatbot
- Smart suggestion buttons
- Contextual responses
- Easy navigation between sections
- Mobile-optimized interactions

### Professional Contact Integration
- **Email**: `mailto:` links with subject lines
- **Phone**: `tel:` links for direct calling
- **WhatsApp**: Direct messaging integration
- **LinkedIn**: Professional profile links
- **Resume**: Portfolio website access

### Responsive Design
- Mobile-first approach
- Touch-friendly interface
- Optimized for all screen sizes
- Fast loading performance

## 🔧 Customization

### Colors & Branding
Edit CSS custom properties in `style.css`:
```css
:root {
  --color-primary: #your-color;
  --color-accent: #your-accent;
}
```

### Adding New Sections
1. Add data to `data.json`
2. Update chatbot responses in `app.js`
3. Add suggestion buttons

### SEO Optimization
- Update meta tags in `index.html`
- Modify title and description
- Add structured data if needed

## 📱 Mobile Optimization

- Touch-friendly buttons (44px minimum)
- Responsive typography
- Optimized spacing and layout
- Fast mobile performance

## 🚀 Performance

- Lightweight codebase
- Minimal dependencies
- Fast loading times
- Optimized for mobile

## 📄 License

Free to use and modify for personal portfolio purposes.

## 🤝 Support

For customization or deployment help:
- Email: hemanth.narsingoju@outlook.com
- LinkedIn: linkedin.com/in/narsingojuhemanth

---

**Ready to showcase your expertise with a professional conversational portfolio?**
Deploy this website and start attracting opportunities today!
