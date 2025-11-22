"use client";

import { useState, useMemo } from "react";
import styles from "./Destinations.module.css";
import Link from "next/link";

export default function DestinationsPage() {
  // ---------- 20 destinations ----------
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

  // ---------- filter / search / sort / pagination state ----------
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("");
  const [budget, setBudget] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // ---------- derived filtered list ----------
  const filtered = useMemo(() => {
    let list = destinations.slice();

    // search by name or description
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.country.toLowerCase().includes(q)
      );
    }

    // country filter
    if (country) {
      list = list.filter((d) => d.country === country);
    }

    // budget filter
    if (budget) {
      const limit = Number(budget);
      list = list.filter((d) => Number(d.price) <= limit);
    }

    // sorting
    if (sort === "low") {
      list.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sort === "high") {
      list.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return list;
  }, [destinations, query, country, budget, sort]);

  // ---------- pagination ----------
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const goToPage = (p) => {
    setCurrentPage(p);
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  // rebuild available countries for dropdown
  const countries = Array.from(new Set(destinations.map((d) => d.country))).sort();

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>🌍 Popular Destinations</h1>

      {/* search + filters */}
      <div className={styles.controls}>
        <input
          className={styles.searchInput}
          placeholder="Search destination, country or keyword..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); setCurrentPage(1); }}
        />

        <select className={styles.select} value={country} onChange={(e) => { setCountry(e.target.value); setCurrentPage(1); }}>
          <option value="">All Countries</option>
          {countries.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <select className={styles.select} value={budget} onChange={(e) => { setBudget(e.target.value); setCurrentPage(1); }}>
          <option value="">All Budgets</option>
          <option value="10000">Under ₹10,000</option>
          <option value="30000">Under ₹30,000</option>
          <option value="60000">Under ₹60,000</option>
          <option value="100000">Under ₹1,00,000</option>
        </select>

        <select className={styles.select} value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort By</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </select>
      </div>

      {/* cards */}
      <div className={styles.grid}>
        {paginated.map((place) => (
          <div key={place.id} className={styles.card}>
            <img src={place.image} alt={place.name} className={styles.image} />
            <div className={styles.cardContent}>
              <h2 className={styles.title}>{place.name}</h2>
              <p className={styles.description}>{place.description}</p>
              <p className={styles.meta}><strong>Duration:</strong> {place.duration}</p>
              <p className={styles.meta}><strong>Price:</strong> ₹{place.price.toLocaleString()}</p>

              <div className={styles.cardButtons}>
                <button
                  className={styles.viewBtn}
                  onClick={() => window.location.href = `/destinations/${place.id}`}
                >
                  View Details
                </button>

                <button
                  className={styles.bookBtn}
                  onClick={() => window.location.href = `/booking?destination=${encodeURIComponent(place.name)}&price=${encodeURIComponent(place.price)}`}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* pagination UI */}
      <div className={styles.pagination}>
        <button className={styles.pageBtn} disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)}>Prev</button>

        {Array.from({ length: totalPages }).map((_, i) => {
          const p = i + 1;
          return (
            <button
              key={p}
              className={`${styles.pageBtn} ${currentPage === p ? styles.activePage : ""}`}
              onClick={() => goToPage(p)}
            >
              {p}
            </button>
          );
        })}

        <button className={styles.pageBtn} disabled={currentPage === totalPages} onClick={() => goToPage(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
}
