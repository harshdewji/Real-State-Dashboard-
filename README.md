# EstateEase – Premium Real Estate Listing Platform

EstateEase is a modern, high-performance luxury real estate marketplace built with **React.js**, **Vite**, **Tailwind CSS**, and **Leaflet / OpenStreetMap**.

---

## 🎨 Theme & Palette

- **Primary**: Soft Sage Green (`#789B83`)
- **Secondary**: Warm Beige (`#F5F1E9`)
- **Background**: Off White (`#FAFAF7`)
- **Cards**: Pure White (`#FFFFFF`)
- **Text**: Dark Charcoal (`#26332C`)
- **Accent**: Soft Blue (`#DCEAF2`)

---

## 🚀 Key Features

1. **Curated Property Catalog**:
   - 22+ realistic sample properties across premier US metropolitan and coastal areas (New York, Los Angeles, Miami, Austin, Seattle, Chicago, Denver, Aspen, Scottsdale, Boston).
   - High-resolution architecture & interior photography with automatic fallback handling.
   - Comprehensive specs: Bedrooms, bathrooms, square footage, year built, HOA fees, verified MLS indicators, and amenities.

2. **Interactive Search & Advanced Filters**:
   - Buy / Rent switch.
   - City and neighborhood keyword search.
   - Property type selector (Apartments, Villas, Independent Houses, Luxury Homes, Commercial).
   - Min & Max price filters.
   - Bedroom & bathroom selectors.
   - Square footage range filters.
   - Key amenity toggles (Pool, Wine Cellar, Elevator, EV Charger, Sauna, Gym, etc.).
   - Multi-option sorting (Featured, Price Low to High, Price High to Low, Newest, Largest Sq.Ft.).

3. **Property Details & Interactive Media**:
   - High-res Image Gallery with navigation arrows, thumbnail bar, and Fullscreen Lightbox preview.
   - Interactive Leaflet / OpenStreetMap integration with custom styled map pins and popup previews.
   - Nearby points of interest (Schools, Transit, Hospitals, Shopping, Parks).
   - Dedicated Agent Card with direct contact options.
   - Interactive "Schedule a Visit" modal supporting both In-Person and Live Video tours with date & time slot selection.
   - "Similar Properties" recommendations.

4. **Saved Properties (Favourites)**:
   - Save / remove properties with 1 click.
   - Persisted across browser sessions using `localStorage`.
   - Real-time counter badge in sticky navbar.
   - Total collection valuation estimate.
   - Thoughtfully crafted empty state.

5. **Contact & Advisory Page**:
   - Interactive inquiry form with input validation and feedback alerts.
   - Headquarter details and business hours.
   - Interactive OpenStreetMap showing headquarters location.
   - Accordion FAQ section.

6. **Authentication UI**:
   - Sleek Login and Registration forms.
   - Password visibility toggles.
   - Form validation.
   - 1-Click "Quick Demo Login" button.

---

## 🛠️ Tech Stack

- **React 18** + **Vite**
- **Tailwind CSS**
- **React Router DOM v6**
- **Lucide React** (Icons)
- **Leaflet** & **React-Leaflet** (OpenStreetMap)
- **Context API** (Global state management)
- **LocalStorage API** (Persistent wishlist & user session)

---

## 💻 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` (or the port specified by Vite).

### 3. Production Build
```bash
npm run build
```
Preview the production build:
```bash
npm run preview
```

