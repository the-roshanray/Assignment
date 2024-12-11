import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";

export default function Home() {
  const categories = [
    { name: "Fresh Vegetables", image: "/vegetable.avif" },
    { name: "Fresh Fruits", image: "/fruits.avif" },
    { name: "Dairy, Bread and Eggs", image: "/dairy.avif" },
    { name: "Rice, Atta and Dals", image: "/rice.avif" },
    { name: "Masalas and Dry Fruits", image: "/masalas.avif" },
    { name: "Oils and Ghee", image: "/oils.avif" },
    { name: "Munchies", image: "/munches.avif" },
    { name: "Sweet Tooth", image: "/sweet.avif" },
    { name: "Cold Drinks and Juices", image: "/drink.avif" },
    { name: "Biscuits and Cakes", image: "/biscuit.avif" },
    { name: "Instant and Frozen Food", image: "/frozen.avif" },
    { name: "Meat and Seafood", image: "/meat.avif" },
    { name: "Cereals and Breakfast", image: "/cereals.avif" },
    { name: "Sauces and Spreads", image: "/souces.avif" },
    { name: "Tea, Coffee and More", image: "/tea.avif" },
    { name: "Cleaning Essentials", image: "/cleaning.avif" },
    { name: "Pharma and Hygiene", image: "/pharma.avif" },
    { name: "Bath, Body and Hair", image: "/bath.avif" },
    { name: "Paan Corner", image: "/paan.avif" },
    { name: "Home and Kitchen", image: "/kitchen.avif" },
    { name: "Office and Electricals", image: "/office.avif" },
    { name: "Baby Care", image: "/babycare.avif" },
    { name: "Pet Supplies", image: "/pet.avif" },
    { name: "Beauty and Grooming", image: "/beauty.avif" },
  ];

  return (
    <>
      <Header />
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="text-center bg-white shadow-lg rounded-lg p-4 hover:scale-105 transition-transform"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  className="w-full h-32 object-cover rounded-md mb-4"
                  width={160}
                  height={128}
                />
                <h3 className="text-sm font-medium">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}
