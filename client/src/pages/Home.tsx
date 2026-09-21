import { Button } from "@/components/ui/button";
import { MessageCircle, ChefHat, Clock, MapPin, Phone, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Nri Oma Kitchen - Home Page
 * 
 * Design Philosophy: Warm African Heritage + Modern Minimalism
 * - Color Palette: Palm Oil Red (#C84C1A), Burnt Orange (#D97706), Forest Green (#1F4620), Cream (#FBF8F3)
 * - Typography: Playfair Display (headers), Poppins (body)
 * - Layout: Asymmetric, story-driven sections with generous whitespace
 * - Interactions: Smooth scrolling, hover effects, sticky WhatsApp button
 */

const WHATSAPP_NUMBER = "+2347037678940";
const WHATSAPP_MESSAGE = "Hello Nri Oma Kitchen, I'd like to place an order.";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Ofe Nsala",
    description: "White soup made with fresh catfish/goat meat and rich local spices.",
    price: 4500,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663621357497/VyDr6oT7YreoYTMv9UiUgZ/yam-porridge-card-fbLN6tw8NQEa3wzp7S2oor.webp",
  },
  {
    id: "2",
    name: "Oha Soup",
    description: "Traditional Igbo soup with oha leaves, assorted meat, and deep native flavour.",
    price: 4000,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663621357497/VyDr6oT7YreoYTMv9UiUgZ/oha-soup-card-iBVB3wHXdDRaSSDS6Hu5C2.webp",
  },
  {
    id: "3",
    name: "Egusi Soup",
    description: "Melon seed soup cooked with vegetables, meat, stockfish, and spices.",
    price: 3800,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663621357497/VyDr6oT7YreoYTMv9UiUgZ/oha-soup-card-iBVB3wHXdDRaSSDS6Hu5C2.webp",
  },
  {
    id: "4",
    name: "Bitterleaf Soup",
    description: "A rich Eastern Nigerian classic served with your choice of swallow.",
    price: 4200,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663621357497/VyDr6oT7YreoYTMv9UiUgZ/oha-soup-card-iBVB3wHXdDRaSSDS6Hu5C2.webp",
  },
  {
    id: "5",
    name: "Jollof Rice & Chicken",
    description: "Party-style jollof rice served with spicy grilled chicken.",
    price: 3500,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663621357497/VyDr6oT7YreoYTMv9UiUgZ/jollof-rice-card-SiFLWVwNaejLhYs7fsk2US.webp",
  },
  {
    id: "6",
    name: "Native Rice",
    description: "Palm oil rice cooked with local spices, dry fish, and vegetables.",
    price: 3800,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663621357497/VyDr6oT7YreoYTMv9UiUgZ/jollof-rice-card-SiFLWVwNaejLhYs7fsk2US.webp",
  },
  {
    id: "7",
    name: "Abacha",
    description: "African salad made with cassava flakes, ugba, garden egg, and local seasoning.",
    price: 3000,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663621357497/VyDr6oT7YreoYTMv9UiUgZ/abacha-gallery-XzWjDWZvBgUS4GTMCmdQ95.webp",
  },
  {
    id: "8",
    name: "Yam Porridge",
    description: "Soft yam cooked in palm oil sauce with vegetables and fish.",
    price: 3200,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663621357497/VyDr6oT7YreoYTMv9UiUgZ/yam-porridge-card-fbLN6tw8NQEa3wzp7S2oor.webp",
  },
];

const galleryItems = [
  { name: "Oha Soup", image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663621357497/VyDr6oT7YreoYTMv9UiUgZ/oha-soup-card-iBVB3wHXdDRaSSDS6Hu5C2.webp" },
  { name: "Abacha", image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663621357497/VyDr6oT7YreoYTMv9UiUgZ/abacha-gallery-XzWjDWZvBgUS4GTMCmdQ95.webp" },
  { name: "Jollof Rice", image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663621357497/VyDr6oT7YreoYTMv9UiUgZ/jollof-rice-card-SiFLWVwNaejLhYs7fsk2US.webp" },
  { name: "Ofe Nsala", image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663621357497/VyDr6oT7YreoYTMv9UiUgZ/yam-porridge-card-fbLN6tw8NQEa3wzp7S2oor.webp" },
  { name: "Native Rice", image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663621357497/VyDr6oT7YreoYTMv9UiUgZ/jollof-rice-card-SiFLWVwNaejLhYs7fsk2US.webp" },
  { name: "Yam Porridge", image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663621357497/VyDr6oT7YreoYTMv9UiUgZ/yam-porridge-card-fbLN6tw8NQEa3wzp7S2oor.webp" },
];

const openWhatsApp = () => {
  const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
  window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${encodedMessage}`, "_blank");
};

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export default function Home() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FBF8F3]">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between gap-3 py-3 sm:py-4">
          <div className="flex min-w-0 items-center gap-2">
            <ChefHat className="h-7 w-7 shrink-0 text-[#C84C1A] sm:h-8 sm:w-8" />
            <h1 className="truncate text-lg font-bold text-[#C84C1A] sm:text-xl md:text-2xl">Nri Oma Kitchen</h1>
          </div>
          <nav className="hidden md:flex gap-8">
            <button onClick={() => scrollToSection("menu")} className="text-[#1A1A1A] hover:text-[#C84C1A] transition">Menu</button>
            <button onClick={() => scrollToSection("about")} className="text-[#1A1A1A] hover:text-[#C84C1A] transition">About</button>
            <button onClick={() => scrollToSection("contact")} className="text-[#1A1A1A] hover:text-[#C84C1A] transition">Contact</button>
          </nav>
          <Button onClick={openWhatsApp} className="cta-button hidden md:block">Order Now</Button>
          <button
            type="button"
            className="rounded-lg p-2 text-[#C84C1A] transition hover:bg-[#FBF8F3] md:hidden"
            onClick={() => setIsMobileNavOpen((open) => !open)}
            aria-label={isMobileNavOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isMobileNavOpen}
          >
            {isMobileNavOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {isMobileNavOpen && (
          <nav className="border-t border-[#E8DFD5] bg-white px-4 pb-4 md:hidden">
            <div className="container flex flex-col gap-1 pt-2">
              <button onClick={() => { scrollToSection("menu"); setIsMobileNavOpen(false); }} className="rounded-lg px-3 py-3 text-left font-semibold text-[#1A1A1A] hover:bg-[#FBF8F3]">Menu</button>
              <button onClick={() => { scrollToSection("about"); setIsMobileNavOpen(false); }} className="rounded-lg px-3 py-3 text-left font-semibold text-[#1A1A1A] hover:bg-[#FBF8F3]">About</button>
              <button onClick={() => { scrollToSection("contact"); setIsMobileNavOpen(false); }} className="rounded-lg px-3 py-3 text-left font-semibold text-[#1A1A1A] hover:bg-[#FBF8F3]">Contact</button>
              <Button onClick={() => { openWhatsApp(); setIsMobileNavOpen(false); }} className="cta-button mt-2 w-full">Order Now</Button>
            </div>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section className="hero-section py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="badge">Freshly cooked • Homemade • Igbo inspired</div>
                <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A]">
                  Authentic Igbo Flavours, Freshly Made for You.
                </h1>
                <p className="text-lg text-[#4A4A4A] leading-relaxed">
                  Order delicious homemade Eastern Nigerian meals, soups, swallows, rice dishes, and native delicacies directly through WhatsApp.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={openWhatsApp} className="cta-button text-lg py-4">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Order on WhatsApp
                </Button>
                <Button onClick={() => scrollToSection("menu")} className="cta-button-secondary text-lg py-4">
                  View Menu
                </Button>
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="mt-2 block md:mt-0">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663621357497/VyDr6oT7YreoYTMv9UiUgZ/hero-banner-GwCMTkowHbbM3Gq6L6T223.webp"
                alt="Authentic Igbo Food Spread"
                className="h-56 w-full rounded-2xl object-cover shadow-xl sm:h-72 md:h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl space-y-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">About Nri Oma Kitchen</h2>
            <div className="section-divider mx-auto w-24"></div>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-[#4A4A4A]">
              At Nri Oma Kitchen, we celebrate the rich culinary heritage of Eastern Nigeria and Igbo culture. Every meal is prepared with love, using fresh local ingredients and traditional cooking methods passed down through generations.
            </p>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-[#4A4A4A]">
              We believe that authentic food brings people together. Our mission is to deliver the warmth, flavour, and soul of Igbo cuisine directly to your table—homemade quality, every single time.
            </p>
            <div className="grid grid-cols-1 gap-6 pt-10 lg:grid-cols-3 lg:gap-12 md:pt-12">
              <div className="min-w-0 space-y-4 rounded-xl border border-[#E8DFD5] bg-gradient-to-br from-[#FBF8F3] to-[#F5EFE7] p-6 lg:p-8">
                <div className="whitespace-nowrap text-[clamp(2rem,3.3vw,3.75rem)] font-bold leading-tight text-[#C84C1A]">100%</div>
                <p className="text-base font-semibold text-[#1A1A1A]">Fresh Ingredients</p>
              </div>
              <div className="min-w-0 space-y-4 rounded-xl border border-[#E8DFD5] bg-gradient-to-br from-[#FBF8F3] to-[#F5EFE7] p-6 lg:p-8">
                <div className="whitespace-nowrap text-[clamp(2rem,3.3vw,3.75rem)] font-bold leading-tight text-[#C84C1A]">Homemade</div>
                <p className="text-base font-semibold text-[#1A1A1A]">Traditional Recipes</p>
              </div>
              <div className="min-w-0 space-y-4 rounded-xl border border-[#E8DFD5] bg-gradient-to-br from-[#FBF8F3] to-[#F5EFE7] p-6 lg:p-8">
                <div className="whitespace-nowrap text-[clamp(2rem,3.3vw,3.75rem)] font-bold leading-tight text-[#C84C1A]">Fast</div>
                <p className="text-base font-semibold text-[#1A1A1A]">Quick Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Menu Section */}
      <section id="menu" className="py-16 md:py-24 bg-[#FBF8F3]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">Featured Menu</h2>
            <div className="section-divider mx-auto w-24"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {menuItems.map((item) => (
              <div key={item.id} className="menu-card overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                <div className="p-4 space-y-3">
                  <h3 className="text-xl font-bold text-[#1A1A1A]">{item.name}</h3>
                  <p className="text-sm text-[#4A4A4A] line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-2xl font-bold text-[#C84C1A]">₦{item.price.toLocaleString()}</span>
                    <Button onClick={openWhatsApp} size="sm" className="bg-[#C84C1A] hover:bg-[#A83A14] text-white">
                      Order
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Order Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">How to Order</h2>
            <div className="section-divider mx-auto w-24"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: 1, title: "Choose Your Meal", desc: "Browse our authentic menu and pick your favourite dishes." },
              { step: 2, title: "Tap WhatsApp", desc: "Send us your order through WhatsApp with your details." },
              { step: 3, title: "Confirm & Enjoy", desc: "We'll confirm availability, price, and delivery details." },
            ].map((item) => (
              <div key={item.step} className="text-center space-y-4">
                <div className="w-16 h-16 bg-[#C84C1A] text-white rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-[#1A1A1A]">{item.title}</h3>
                <p className="text-[#4A4A4A]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#C84C1A] to-[#D97706]">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Eat?</h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Send us your order on WhatsApp and we'll confirm availability, total price, and delivery/pickup details.
          </p>
          <Button onClick={openWhatsApp} className="bg-white text-[#C84C1A] hover:bg-[#FBF8F3] text-lg py-4 px-8 font-bold">
            <MessageCircle className="w-5 h-5 mr-2" />
            Order on WhatsApp Now
          </Button>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 md:py-24 bg-[#FBF8F3]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">Our Food Gallery</h2>
            <div className="section-divider mx-auto w-24"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, idx) => (
              <div key={idx} className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <h3 className="text-white font-bold text-lg">{item.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">Contact Us</h2>
            <div className="section-divider mx-auto w-24"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <Phone className="w-6 h-6 text-[#C84C1A] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-[#1A1A1A] mb-1">Phone</h3>
                  <p className="text-[#4A4A4A]">07037678940</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <MessageCircle className="w-6 h-6 text-[#C84C1A] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-[#1A1A1A] mb-1">WhatsApp</h3>
                  <p className="text-[#4A4A4A]">07037678940</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <MapPin className="w-6 h-6 text-[#C84C1A] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-[#1A1A1A] mb-1">Location</h3>
                  <p className="text-[#4A4A4A]">Enugu State, Nigeria</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <Clock className="w-6 h-6 text-[#C84C1A] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-[#1A1A1A] mb-1">Opening Hours</h3>
                  <p className="text-[#4A4A4A]">Monday - Saturday, 9:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-[#4A4A4A] mb-4">Follow us on Instagram</p>
            <a href="https://instagram.com/nriomakitchen" target="_blank" rel="noopener noreferrer" className="text-[#C84C1A] font-bold hover:text-[#D97706] transition">
              @nriomakitchen
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-[#D97706] mb-4">Nri Oma Kitchen</h3>
              <p className="text-[#B0A99F]">Authentic Igbo Flavours</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-[#B0A99F]">
                <li><button onClick={() => scrollToSection("menu")} className="hover:text-[#D97706] transition">Menu</button></li>
                <li><button onClick={() => scrollToSection("about")} className="hover:text-[#D97706] transition">About</button></li>
                <li><button onClick={() => scrollToSection("contact")} className="hover:text-[#D97706] transition">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <a href="https://instagram.com/nriomakitchen" target="_blank" rel="noopener noreferrer" className="text-[#B0A99F] hover:text-[#D97706] transition">
                Instagram @nriomakitchen
              </a>
            </div>
          </div>
          <div className="border-t border-[#3A3A3A] pt-8 text-center text-[#B0A99F]">
            <p>&copy; 2026 Nri Oma Kitchen. All rights reserved. Authentic Igbo Flavours.</p>
          </div>
        </div>
      </footer>

      {/* Sticky WhatsApp Button */}
      {isSticky && (
        <button
          onClick={openWhatsApp}
          className="sticky-whatsapp-btn"
          aria-label="Order on WhatsApp"
          title="Order on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
