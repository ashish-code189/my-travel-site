"use client";

import { useEffect, useState } from "react";
import styles from "../Destinations.module.css";
import { useRouter } from "next/navigation";

export default function DestinationDetails({ params }) {
  const [place, setPlace] = useState(null);
  const router = useRouter();

  // Same list as in main page (kept local for demo)
  const destinations = [
    { id: 1, name: "Manali, India", country: "India", image: "https://images.unsplash.com/photo-1602081115720-74b41a6b8659?auto=format&fit=crop&w=900&q=60", price: 8999, duration: "3 Days / 2 Nights", description: "Snow mountains, river rafting, and cozy stays." },
    { id: 2, name: "Goa Beach, India", country: "India", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=60", price: 12499, duration: "4 Days / 3 Nights", description: "Beautiful beaches and nightlife." },
    { id: 3, name: "Jaipur, India", country: "India", image: "https://images.unsplash.com/photo-1598946423468-9b1e3b2667d1?auto=format&fit=crop&w=900&q=60", price: 7499, duration: "2 Days / 1 Night", description: "Forts, palaces & royal heritage." },
    { id: 4, name: "Dubai, UAE", country: "UAE", image: "https://images.unsplash.com/photo-1504271863819-d1db49bfe1c2?auto=format&fit=crop&w=900&q=60", price: 45000, duration: "5 Days / 4 Nights", description: "Skyscrapers, desert safari & luxury." },
    { id: 5, name: "Paris, France", country: "France", image: "https://images.unsplash.com/photo-1522098543979-ffc7f79d25ac?auto=format&fit=crop&w=900&q=60", price: 65000, duration: "5 Days / 4 Nights", description: "Eiffel Tower, museums, and romance." },
    { id: 6, name: "Bali, Indonesia", country: "Indonesia", image: "https://images.unsplash.com/photo-1502786129293-79981df4e689?auto=format&fit=crop&w=900&q=60", price: 40000, duration: "5 Days / 4 Nights", description: "Beaches, temples & nature." },
    { id: 7, name: "New York, USA", country: "USA", image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=60", price: 90000, duration: "6 Days / 5 Nights", description: "City of skyscrapers & Times Square." },
    { id: 8, name: "Tokyo, Japan", country: "Japan", image: "https://images.unsplash.com/photo-1505066896365-2a3b5aeea1d0?auto=format&fit=crop&w=900&q=60", price: 85000, duration: "6 Days / 5 Nights", description: "Technology, culture & temples." },
    { id: 9, name: "Sydney, Australia", country: "Australia", image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=900&q=60", price: 78000, duration: "5 Days / 4 Nights", description: "Harbour, Opera House & beaches." },
    { id: 10, name: "Egypt Pyramids", country: "Egypt", image: "https://images.unsplash.com/photo-1505731132164-cca2d34bb209?auto=format&fit=crop&w=900&q=60", price: 55000, duration: "4 Days / 3 Nights", description: "Pyramids and ancient mysteries." },
    { id: 11, name: "Switzerland Alps", country: "Switzerland", image: "https://images.unsplash.com/photo-1508264165352-258a6b3f29e2?auto=format&fit=crop&w=900&q=60", price: 120000, duration: "6 Days / 5 Nights", description: "Heavenly mountains & snowy views." },
    { id: 12, name: "London, UK", country: "UK", image: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=900&q=60", price: 95000, duration: "5 Days / 4 Nights", description: "Big Ben, London Eye & museums." },
    { id: 13, name: "Singapore", country: "Singapore", image: "https://images.unsplash.com/photo-1532347231060-25d69a3a3c56?auto=format&fit=crop&w=900&q=60", price: 60000, duration: "4 Days / 3 Nights", description: "Marina Bay & futuristic city." },
    { id: 14, name: "Thailand", country: "Thailand", image: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=900&q=60", price: 28000, duration: "4 Days / 3 Nights", description: "Islands, beaches and nightlife." },
    { id: 15, name: "Venice, Italy", country: "Italy", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=60", price: 85000, duration: "5 Days / 4 Nights", description: "Canals & romantic gondola rides." },
    { id: 16, name: "Maldives", country: "Maldives", image: "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?auto=format&fit=crop&w=900&q=60", price: 95000, duration: "4 Days / 3 Nights", description: "Crystal clear waters & villas." },
    { id: 17, name: "Hong Kong", country: "Hong Kong", image: "https://images.unsplash.com/photo-1541421533588-6ba6f0bcd3c5?auto=format&fit=crop&w=900&q=60", price: 70000, duration: "5 Days / 4 Nights", description: "Skyline & theme parks." },
    { id: 18, name: "Nepal Himalayas", country: "Nepal", image: "https://images.unsplash.com/photo-1509644851191-0f9d4c5fb916?auto=format&fit=crop&w=900&q=60", price: 14000, duration: "3 Days / 2 Nights", description: "Himalayan mountains & trekking." },
    { id: 19, name: "Sri Lanka", country: "Sri Lanka", image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=900&q=60", price: 35000, duration: "4 Days / 3 Nights", description: "Nature, beaches & culture." },
    { id: 20, name: "China Great Wall", country: "China", image: "https://images.unsplash.com/photo-1511818966892-d7d671e0b63c?auto=format&fit=crop&w=900&q=60", price: 60000, duration: "5 Days / 4 Nights", description: "Historic Great Wall experience." },
  ];

  // params may be a Promise in some Next versions — unwrap safely
  useEffect(() => {
    if (!params) return;
    // params can be plain object or Promise — handle both:
    if (params.then) {
      params.then((p) => {
        const id = Number(p.id);
        const found = destinations.find((d) => d.id === id);
        setPlace(found || null);
      });
    } else {
      const id = Number(params.id);
      const found = destinations.find((d) => d.id === id);
      setPlace(found || null);
    }
  }, [params]);

  if (!place) {
    return <div className={styles.detailsPage}><div className={styles.detailsContent}><h2>Destination not found</h2></div></div>;
  }

  return (
    <div className={styles.detailsPage}>
      <img className={styles.detailsImage} src={place.image} alt={place.name} />
      <div className={styles.detailsContent}>
        <h1>{place.name}</h1>
        <p className={styles.description}>{place.description}</p>
        <p><strong>Duration:</strong> {place.duration}</p>
        <p><strong>Price:</strong> ₹{place.price.toLocaleString()}</p>

        <div style={{ marginTop: 18 }}>
          <button className={styles.bookBtn} onClick={() => window.location.href = `/booking?destination=${encodeURIComponent(place.name)}&price=${encodeURIComponent(place.price)}`}>Book Now</button>
          <button style={{ marginLeft: 12 }} className={styles.viewBtn} onClick={() => router.back()}>← Back</button>
        </div>
      </div>
    </div>
  );
}
