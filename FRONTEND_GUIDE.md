# 🏨 Namaste Stay - Hotel Booking Frontend

A modern, fully-enhanced hotel booking platform for Nepal built with React, Vite, Tailwind CSS, and Framer Motion.

## ✨ Features

### 🎨 Beautiful UI Components
- Hero section with animated search bar
- District cards with smooth hover effects
- Stay/hotel listings with images and ratings
- Responsive navbar with mobile menu
- Dark-themed footer with social links
- Custom badge, rating, and alert components

### 🔍 Advanced Search & Filtering
- Price range slider
- Minimum rating filter
- Multiple amenities selection
- Real-time search by district
- Province-based filtering
- Sorting options (popular, price, rating)

### 🎬 Smooth Animations
- Page load animations with Framer Motion
- Staggered list animations
- Scroll-triggered effects
- Hover animations on all interactive elements
- Smooth transitions between pages
- Loading skeleton screens

### 📱 Responsive Design
- Mobile-first approach
- Collapsible filter sidebar
- Touch-friendly buttons
- Flexible grid layouts
- Adaptive navigation menu

### 💡 User Experience
- Empty states with helpful messages
- Loading states with skeleton screens
- Smooth transitions and feedback
- Clear filter management
- Quick navigation shortcuts

## 📦 Installation

```bash
# Clone the repository
git clone <repo-url>

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 🗂️ Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Alert.jsx       # Notification component
│   ├── Badge.jsx       # Badge/pie component
│   ├── Button.jsx      # Reusable button with variants
│   ├── Card.jsx        # Generic card component
│   ├── DistrictCard.jsx    # District display card
│   ├── Footer.jsx      # Footer with social links
│   ├── Modal.jsx       # Modal dialog
│   ├── Navbar.jsx      # Navigation bar
│   ├── PriceDisplay.jsx    # Price formatting
│   ├── Rating.jsx      # Star rating component
│   ├── SearchBar.jsx   # Search input component
│   ├── Skeleton.jsx    # Loading skeleton
│   └── StayCard.jsx    # Hotel stay card
├── pages/              # Page components
│   ├── Districts.jsx   # Districts exploration page
│   ├── Home.jsx        # Homepage
│   └── Listings.jsx    # Hotel listings page
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles

public/                # Static assets
```

## 🎯 Pages & Features

### 🏠 Home Page (`/`)
- Hero banner with search functionality
- District cards grid
- Statistics showcase
- Why us section with features
- Customer testimonials
- Call-to-action section

### 🗺️ Districts Page (`/districts`)
- Province-based navigation
- District search and filtering
- Quick province selection
- Featured district showcase
- Empty state handling

### 🛏️ Listings Page (`/stays`)
- Hotel card grid with images
- Advanced filtering sidebar
- Sorting options
- Price range slider
- Amenities selection
- Rating filter
- Result counter and empty states

## 🧩 Component Documentation

### Alert
Notification component for messages
```jsx
<Alert type="success|error|warning|info" title="Title" message="Message" />
```

### Badge
Flexible tag/badge component
```jsx
<Badge label="Featured" variant="primary" removable={true} />
```

### Button
Reusable button with variants
```jsx
<Button text="Click me" variant="primary|secondary|outline" size="sm|md|lg" />
```

### Card
Generic content card
```jsx
<Card title="Title" subtitle="Subtitle" variant="default|elevated|minimal" />
```

### Rating
Star rating component
```jsx
<Rating value={4.5} max={5} interactive={true} onChange={handleRating} />
```

### Modal
Dialog/modal component
```jsx
const [isOpen, setIsOpen] = useState(false);
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Dialog Title">
  Content here
</Modal>
```

### PriceDisplay
Consistent price formatting
```jsx
<PriceDisplay amount={18500} currency="NPR" size="md" />
```

### SearchBar
Reusable search input
```jsx
<SearchBar placeholder="Search..." onSearch={handleSearch} />
```

## 🎨 Design System

### Colors
- Primary: Red (#DC2626 - red-700)
- Secondary: Gray shades
- Background: Light pink (#fdf8f9)
- Text: Dark gray (#1f2937)

### Typography
- Font: Inter (body), Serif (headings)
- Sizes: Responsive using Tailwind
- Weights: Regular (400), Semibold (600), Bold (700)

### Spacing
- Based on Tailwind's 4px unit system
- Standard gap/margin: 4, 6, 8, 12, 16, 24px

### Shadows
- Light: shadow-sm
- Medium: shadow-md, shadow-lg
- Heavy: shadow-xl, shadow-2xl

## 📊 Technologies Used

- **React 19**: UI framework
- **Vite 7**: Build tool
- **Tailwind CSS 4.2**: Styling
- **Framer Motion 12.38**: Animations
- **React Router 7.13**: Client-side routing
- **Lucide React 1.7**: Icon library
- **ESLint 9.39**: Code quality

## 🚀 Development Notes

### Adding New Pages
1. Create component in `src/pages/`
2. Add route in `src/App.jsx`
3. Add navigation link in `Navbar.jsx`

### Creating New Components
1. Create component in `src/components/`
2. Export as default
3. Use in pages/other components
4. Consider reusability and props

### Styling Guidelines
- Use Tailwind classes exclusively
- Follow the design system
- Use utility-first approach
- Maintain consistent spacing

### Animation Best Practices
- Use `motion.` components from framer-motion
- Add `whileInView` for scroll animations
- Use `whileHover` for interactive elements
- Keep animations smooth (300-500ms)

## 🔄 Git Workflow

```bash
# Create feature branch
git checkout -b feature/feature-name

# Make changes and commit
git add .
git commit -m "Add feature description"

# Push to remote
git push origin feature/feature-name

# Create pull request
```

## 📈 Future Enhancements

- [ ] User authentication system
- [ ] Booking confirmation modal
- [ ] User profile page
- [ ] Favorites/wishlist functionality
- [ ] Booking history
- [ ] Real-time availability
- [ ] Payment integration
- [ ] Review system
- [ ] Admin dashboard
- [ ] Image carousel component
- [ ] Toast notifications
- [ ] Dark mode support

## 🐛 Troubleshooting

### Animations not working
- Ensure Framer Motion is installed: `npm install framer-motion`
- Check that components are wrapped with `motion.`
- Verify browser supports CSS animations

### Tailwind classes not applying
- Run `npm run dev` to rebuild CSS
- Check that class names follow Tailwind syntax
- Verify PostCSS is configured

### Build errors
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version (>= 16)
- Review error messages carefully

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Review component documentation
3. Check browser console for errors
4. Refer to Tailwind/React/Framer Motion docs

## 📄 License

MIT License - feel free to use for personal and commercial projects

## 👏 Credits

- Built with React, Vite, and Tailwind CSS
- Icons by Lucide React
- Images from Pexels
- Animations with Framer Motion

---

**Happy coding! 🎉**
