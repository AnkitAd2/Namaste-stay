# Component API Reference

Complete API documentation for all custom components in the Namaste Stay frontend.

## Table of Contents
1. [Alert](#alert)
2. [Badge](#badge)
3. [Button](#button)
4. [Card](#card)
5. [DistrictCard](#districtcard)
6. [Modal](#modal)
7. [Rating](#rating)
8. [SearchBar](#searchbar)
9. [PriceDisplay](#pricedisplay)
10. [Skeleton](#skeleton)

---

## Alert

Notification/alert message component.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'success' \| 'error' \| 'warning' \| 'info'` | `'info'` | Alert type styling |
| `title` | `string` | - | Alert title |
| `message` | `string` | - | Alert message (required) |
| `dismissible` | `boolean` | `true` | Show dismiss button |
| `onDismiss` | `function` | - | Callback when dismissed |

### Examples

```jsx
// Success alert
<Alert 
  type="success"
  title="Booking Confirmed!"
  message="Your room has been reserved for 3 nights."
/>

// Error with dismiss
<Alert 
  type="error"
  title="Payment Failed"
  message="Please check your payment details and try again."
  dismissible={true}
  onDismiss={() => console.log('Dismissed')}
/>

// Info alert
<Alert 
  type="info"
  message="New properties added to your favorites!"
/>
```

---

## Badge

Badge/pill/tag component with optional removal.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Badge text (required) |
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'gray'` | `'primary'` | Color variant |
| `removable` | `boolean` | `false` | Show remove button |
| `onRemove` | `function` | - | Remove callback |
| `icon` | `React.Component` | - | Icon component |

### Examples

```jsx
// Basic badge
<Badge label="Featured" />

// Removable badge with icon
import { Zap } from 'lucide-react';
<Badge 
  label="Premium"
  variant="success"
  removable={true}
  icon={Zap}
  onRemove={() => handleRemove('premium')}
/>

// Different variants
<Badge label="New" variant="secondary" />
<Badge label="Popular" variant="warning" />
```

---

## Button

Reusable button component with multiple variants.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | - | Button text (required) |
| `onClick` | `function` | - | Click handler |
| `variant` | `'primary' \| 'secondary' \| 'outline'` | `'primary'` | Button style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Disabled state |
| `icon` | `React.Component` | - | Icon component |

### Examples

```jsx
// Primary button
<Button text="Book Now" onClick={handleBook} />

// Secondary variant with icon
import { Heart } from 'lucide-react';
<Button 
  text="Add to Favorites"
  variant="secondary"
  icon={Heart}
/>

// Large outline button
<Button 
  text="Learn More"
  variant="outline"
  size="lg"
/>

// Disabled state
<Button text="Processing..." disabled={true} />
```

---

## Card

Generic card container component.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Card title (required) |
| `subtitle` | `string` | - | Card subtitle |
| `onClick` | `function` | - | Click handler |
| `variant` | `'default' \| 'elevated' \| 'minimal'` | `'default'` | Card style |
| `icon` | `React.Component` | - | Icon component |
| `children` | `ReactNode` | - | Card content |

### Examples

```jsx
// Basic card
<Card 
  title="Kathmandu"
  subtitle="15,000+ stays available"
/>

// Card with icon and content
import { MapPin } from 'lucide-react';
<Card 
  title="Popular Destinations"
  subtitle="Explore trending locations"
  icon={MapPin}
  variant="elevated"
>
  <ul>
    <li>Pokhara</li>
    <li>Mustang</li>
  </ul>
</Card>

// Clickable card
<Card 
  title="Browse Deals"
  subtitle="Special offers this week"
  onClick={() => navigate('/deals')}
/>
```

---

## DistrictCard

Specialized card for displaying districts with images.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `province` | `string` | - | Province name (required) |
| `title` | `string` | - | District name (required) |
| `stays` | `string` | - | Stay information (required) |
| `img` | `string` | - | Image URL (required) |

### Examples

```jsx
<DistrictCard
  province="Bagmati"
  title="Kathmandu"
  stays="1,240 Hotels • 45 Heritage Stays"
  img="https://images.pexels.com/..."
/>
```

---

## Modal

Responsive modal/dialog component.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | - | Modal visibility (required) |
| `onClose` | `function` | - | Close callback (required) |
| `title` | `string` | - | Modal title |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Modal width |
| `children` | `ReactNode` | - | Modal content |

### Examples

```jsx
// Confirmation dialog
const [isOpen, setIsOpen] = useState(false);

<Modal 
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Booking"
>
  <p>Are you sure you want to book this room?</p>
  <Button text="Confirm" onClick={handleConfirm} />
  <Button text="Cancel" variant="outline" onClick={() => setIsOpen(false)} />
</Modal>

// Large modal
<Modal 
  isOpen={showDetails}
  onClose={() => setShowDetails(false)}
  title="Room Details"
  size="lg"
>
  {/* Content */}
</Modal>
```

---

## Rating

Star rating display and input component.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | - | Current rating (required) |
| `max` | `number` | `5` | Maximum rating |
| `size` | `number` | `16` | Star size in pixels |
| `interactive` | `boolean` | `false` | Enable click to select |
| `onChange` | `function` | - | Rating change callback |

### Examples

```jsx
// Display rating
<Rating value={4.5} />

// Interactive rating selector
const [rating, setRating] = useState(0);
<Rating 
  value={rating}
  interactive={true}
  onChange={setRating}
/>

// Custom size
<Rating value={3} size={24} />
```

---

## SearchBar

Reusable search input component.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | `'Search...'` | Input placeholder |
| `onSearch` | `function` | - | Search callback |
| `onClear` | `function` | - | Clear callback |
| `icon` | `React.Component` | `Search` | Icon component |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Input size |

### Examples

```jsx
// Basic search
<SearchBar 
  placeholder="Search districts..."
  onSearch={(query) => handleSearch(query)}
/>

// With custom icon and size
import { MapPin } from 'lucide-react';
<SearchBar 
  placeholder="Find a destination..."
  icon={MapPin}
  size="lg"
  onSearch={handleLocationSearch}
  onClear={() => setClear(true)}
/>
```

---

## PriceDisplay

Consistent price formatting component.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `amount` | `number` | - | Price amount (required) |
| `currency` | `string` | `'NPR'` | Currency code |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Text size |
| `showPerNight` | `boolean` | `true` | Show "/ night" text |

### Examples

```jsx
// Basic price display
<PriceDisplay amount={18500} />

// Large price without "per night"
<PriceDisplay 
  amount={55500}
  currency="NPR"
  size="lg"
  showPerNight={false}
/>

// Small price tag
<PriceDisplay 
  amount={8900}
  size="sm"
/>
```

---

## Skeleton

Loading skeleton placeholder component.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `string` | `'w-full'` | Tailwind width class |
| `height` | `string` | `'h-6'` | Tailwind height class |
| `count` | `number` | `1` | Number of skeleton lines |
| `rounded` | `string` | `'rounded-lg'` | Tailwind rounded class |

### Examples

```jsx
// Single skeleton line
<Skeleton width="w-1/2" height="h-4" />

// Multiple skeleton lines (text loading)
<Skeleton 
  count={3}
  height="h-3"
  width="w-full"
/>

// Card skeleton
<Skeleton 
  width="w-full"
  height="h-64"
  rounded="rounded-2xl"
/>

// Avatar skeleton
<Skeleton 
  width="w-12"
  height="h-12"
  rounded="rounded-full"
/>
```

---

## Usage Tips

### Best Practices
1. **Consistency**: Use the same button variant throughout the app
2. **Accessibility**: Always provide meaningful text and labels
3. **Performance**: Use skeleton screens for async data loading
4. **Feedback**: Use alerts for user notifications
5. **Validation**: Show error alerts for form submissions

### Responsive Design
All components are mobile-responsive by default. Adjust sizes and variants for different screen sizes:

```jsx
<Button 
  text="Book"
  size={window.innerWidth < 768 ? 'sm' : 'md'}
/>
```

### Animation Customization
Components use Framer Motion for animations. Customize using props passed to motion elements:

```jsx
// Modify animation in component source code
<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
>
```

### Theme Customization
Modify colors in `index.css` or override Tailwind config in `tailwind.config.js`:

```css
@layer components {
  .btn-primary {
    @apply bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800;
  }
}
```

---

## Component State Management

### Using useState
```jsx
const [isOpen, setIsOpen] = useState(false);
const [selectedRating, setSelectedRating] = useState(0);
const [searchQuery, setSearchQuery] = useState('');
```

### Using useCallback
```jsx
const handleSearch = useCallback((query) => {
  // Expensive operation
  filterResults(query);
}, [dependencies]);
```

### Using useMemo
```jsx
const filteredItems = useMemo(() => {
  return items.filter(item => item.price <= maxPrice);
}, [items, maxPrice]);
```

---

This document provides complete API reference for all custom components. Refer to component source code in `src/components/` for implementation details.
