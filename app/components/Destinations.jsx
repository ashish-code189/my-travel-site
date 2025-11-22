"use client";
import styles from "./Destinations.module.css";

const destinations = [
  { id: 1, name: "Maldives Beaches", image: "/images/maldives_beach.jpg", description: "Crystal-blue water, white sand beaches, and luxury overwater villas." },
  { id: 2, name: "Bali Island", image: "/images/bali_island.jpg", description: "Iconic temples, rice terraces, waterfalls and a peaceful tropical vibe." },
  { id: 3, name: "Swiss Alps, Switzerland", image: "/images/swiss_alps.jpg", description: "Majestic snow-covered mountains, lakes and Europe’s most scenic views." },
  { id: 4, name: "New York City, USA", image: "/images/newyork_city.jpg", description: "The city that never sleeps — Times Square, Statue of Liberty & skyscrapers." },
  { id: 5, name: "Great Wall of China", image: "/images/great_wall.jpg", description: "One of the Seven Wonders — breathtaking mountain views and history." },
];

export default function Destinations() {
  return (
    <section className={styles.destinations}>
      <h2 className={styles.title}>Popular Destinations</h2>

      <div className={styles.grid}>
        {destinations.map((place) => (
          <div
            key={place.id}
            className={styles.card}
            onClick={() => (window.location.href = "/destinations")}
          >
            <img src={place.image} alt={place.name} className={styles.image} />
            <div className={styles.info}>
              <h3>{place.name}</h3>
              <p>{place.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
