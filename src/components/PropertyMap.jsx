import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FALLBACK_IMAGE } from '../data/properties';
import { formatPriceInRupees } from '../utils/formatters';

export default function PropertyMap({ 
  properties = [], 
  singleProperty = null, 
  height = '450px',
  zoom = 13
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Center coordinates
    let initialLat = 40.7128;
    let initialLng = -74.0060;

    if (singleProperty && singleProperty.coordinates) {
      initialLat = singleProperty.coordinates.lat;
      initialLng = singleProperty.coordinates.lng;
    } else if (properties.length > 0 && properties[0].coordinates) {
      initialLat = properties[0].coordinates.lat;
      initialLng = properties[0].coordinates.lng;
    }

    // Cleanup previous map instance if re-rendering
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Initialize Map
    const map = L.map(mapContainerRef.current, {
      center: [initialLat, initialLng],
      zoom: singleProperty ? 14 : zoom,
      scrollWheelZoom: false
    });

    mapInstanceRef.current = map;

    // Add CartoDB Positron tiles for an ultra-clean, elegant real-estate aesthetic
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19
    }).addTo(map);

    const markersGroup = L.featureGroup();

    // SINGLE PROPERTY MODE
    if (singleProperty && singleProperty.coordinates) {
      const { lat, lng } = singleProperty.coordinates;
      
      const singlePinHtml = `
        <div style="
          background-color: #789B83;
          color: white;
          width: 36px;
          height: 36px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(38,51,44,0.3);
        ">
          <svg style="transform: rotate(45deg); width: 18px; height: 18px; fill: currentColor;" viewBox="0 0 24 24">
            <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>
          </svg>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-single-pin',
        html: singlePinHtml,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36]
      });

      const popupHtml = `
        <div style="padding: 10px; max-width: 200px; font-family: inherit;">
          <h4 style="margin: 0 0 4px; font-weight: 700; font-size: 13px; color: #26332C;">
            ${singleProperty.title}
          </h4>
          <p style="margin: 0; font-size: 11px; color: #58675F;">
            ${singleProperty.address}
          </p>
          <div style="margin-top: 6px; font-weight: 800; color: #789B83; font-size: 13px;">
            ${singleProperty.priceFormatted || formatPriceInRupees(singleProperty.price, singleProperty.status === 'for-rent')}
          </div>
        </div>
      `;

      const marker = L.marker([lat, lng], { icon: customIcon })
        .bindPopup(popupHtml)
        .addTo(map);
      
      markersGroup.addLayer(marker);
    } 
    // MULTI-PROPERTY MODE
    else if (properties.length > 0) {
      properties.forEach(prop => {
        if (!prop.coordinates) return;
        const { lat, lng } = prop.coordinates;

        const isRent = prop.status === 'for-rent';
        const priceLabel = formatPriceInRupees(prop.price, isRent, true);

        const pinHtml = `
          <div class="custom-price-marker">
            ${priceLabel}
          </div>
        `;

        const markerIcon = L.divIcon({
          className: 'price-pin-wrapper',
          html: pinHtml,
          iconSize: [60, 24],
          iconAnchor: [30, 12],
          popupAnchor: [0, -14]
        });

        const popupContent = `
          <div style="width: 220px; font-family: inherit; border-radius: 14px; overflow: hidden;">
            <img 
              src="${prop.images && prop.images[0] ? prop.images[0] : FALLBACK_IMAGE}" 
              alt="${prop.title}"
              style="width: 100%; height: 110px; object-fit: cover; display: block;" 
            />
            <div style="padding: 12px; background: white;">
              <div style="font-size: 11px; font-weight: 700; color: #789B83; text-transform: uppercase;">
                ${prop.type} • ${prop.status === 'for-rent' ? 'For Rent' : 'For Sale'}
              </div>
              <div style="font-size: 13px; font-weight: 800; color: #26332C; margin: 2px 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                ${prop.title}
              </div>
              <div style="font-size: 11px; color: #58675F; margin-bottom: 6px;">
                ${prop.city}, ${prop.state}
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #F5F1E9; padding-top: 6px;">
                <span style="font-weight: 800; font-size: 13px; color: #26332C;">
                  ${prop.priceFormatted || formatPriceInRupees(prop.price, isRent)}
                </span>
                <a 
                  href="/property/${prop.id}" 
                  style="font-size: 11px; color: #789B83; font-weight: 700; text-decoration: none;"
                >
                  View Details &rarr;
                </a>
              </div>
            </div>
          </div>
        `;

        const marker = L.marker([lat, lng], { icon: markerIcon })
          .bindPopup(popupContent);

        markersGroup.addLayer(marker);
      });

      markersGroup.addTo(map);

      // Fit bounds if multiple markers exist
      if (properties.length > 1) {
        try {
          map.fitBounds(markersGroup.getBounds(), { padding: [40, 40], maxZoom: 14 });
        } catch (e) {
          // ignore edge case with empty bounds
        }
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [properties, singleProperty, zoom]);

  return (
    <div 
      className="w-full rounded-3xl overflow-hidden shadow-soft border border-beige-200 relative z-0"
      style={{ height }}
    >
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
}

