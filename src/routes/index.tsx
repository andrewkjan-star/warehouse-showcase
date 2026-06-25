import { createFileRoute } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { MapPin, Search, User, Heart, ShoppingCart, ChevronRight, ShieldCheck, Truck, Warehouse, ImageIcon, Upload, X, Plus, Minus, Trash2 } from "lucide-react";
import heroImg from "@/assets/hero-warehouse.jpg";
import logoAsset from "@/assets/ak-zamzam-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AK ZAMZAM LLC — Wholesale & Retail Warehouse" },
      { name: "description", content: "Bulk savings, member perks, warehouse prices — groceries, electronics, home essentials and more across 20 departments." },
      { property: "og:title", content: "AK ZAMZAM LLC — Wholesale & Retail Warehouse" },
      { property: "og:description", content: "Bulk savings, member perks, warehouse prices — all in one haul." },
    ],
  }),
  component: Home,
});

const departments: { name: string; items: string[]; count: string }[] = [
  { name: "Grocery, Household & Pet", count: "3,200+ items", items: ["Royal Basmati White Rice, 20 lb Burlap Bag", "Bertolli Extra Virgin Olive Oil, 3 Liter Bottle", "King Arthur Unbleached All-Purpose Flour, 25 lb Bag", "Nature Nate's 100% Pure Raw & Unfiltered Honey, 80 oz", "Bard Valley Natural Delights Medjool Dates, 5 lb Tray"] },
  { name: "Electronics & Computers", count: "1,840+ items", items: ["Samsung 55\" Class QN90C Neo QLED 4K Smart TV", "HP Pavilion 16\" Laptop, Intel Core i7, 16GB RAM, 1TB SSD", "Sony WH-1000XM5 Wireless Noise-Cancelling Headphones", "TP-Link Deco XE75 Pro Wi-Fi 6E Mesh System, 3-Pack", "SanDisk Extreme Portable SSD 2TB USB-C, Up to 1050 MB/s"] },
  { name: "TV & Home Theater", count: "520+ items", items: ["LG 75\" Class C3 Series OLED evo 4K Smart TV", "Bose Smart Ultra 5.1.2 Channel Dolby Atmos Soundbar", "Sanus Full-Motion Universal TV Wall Mount, 42\"–90\"", "Sony UBP-X800M2 4K Ultra HD Blu-ray Disc Player", "Klipsch Reference Wireless Surround Sound Speakers, Pair"] },
  { name: "Appliances", count: "760+ items", items: ["LG 26 cu ft Smart French Door Refrigerator with InstaView", "Samsung 5.0 cu ft Front Load Washer with Super Speed", "Whirlpool 7.4 cu ft Smart Electric Dryer with Steam", "GE Profile 30\" Slide-In Gas Range with Convection", "Bosch 800 Series 24\" Stainless Steel Top Control Dishwasher"] },
  { name: "Home & Furniture", count: "2,150+ items", items: ["Thomasville Lowell 3-Seat Fabric Sofa with Power Recline", "Sealy Posturepedic Plus Hybrid Queen 14\" Memory Foam Mattress", "Bayside Furnishings 6-Drawer Solid Walnut Dresser", "Pulaski Power Lift Recliner Chair with USB Port, Leather", "Bayside Furnishings 5-Tier Solid Oak Bookshelf, 72\""] },
  { name: "Kitchen & Dining", count: "1,380+ items", items: ["All-Clad D3 Stainless Steel 12-Piece Cookware Set", "KitchenAid Professional 600 Series 6-Quart Bowl-Lift Stand Mixer", "Breville Barista Express Espresso Machine, Stainless Steel", "Oneida Voss 20-Piece 18/10 Stainless Steel Flatware Set", "Lodge Pre-Seasoned 12\" Cast Iron Skillet with Helper Handle"] },
  { name: "Health & Personal Care", count: "940+ items", items: ["Nature Made Multivitamin Complete Tablets, 365 Count", "Nordic Naturals Ultimate Omega 1280 mg Fish Oil, 180 Softgels", "Oral-B iO Series 9 Rechargeable Electric Toothbrush, 2-Pack", "Omron Platinum Bluetooth Upper Arm Blood Pressure Monitor", "Garden of Life Dr. Formulated Probiotics 50 Billion CFU, 60 Capsules"] },
  { name: "Beauty & Skincare", count: "430+ items", items: ["SkinCeuticals C E Ferulic Vitamin C Antioxidant Serum, 1 oz", "Neutrogena Hydro Boost Hyaluronic Acid Gel Moisturizer, 1.7 oz", "EltaMD UV Clear Broad-Spectrum SPF 46 Facial Sunscreen, 1.7 oz", "OGX Renewing + Argan Oil of Morocco Deep Hair Mask, 8 oz", "RoC Retinol Correxion Deep Wrinkle Anti-Aging Night Cream, 1 oz"] },
  { name: "Sports & Fitness", count: "680+ items", items: ["Bowflex SelectTech 552 Adjustable Dumbbells, Pair (5–52.5 lb)", "NordicTrack EXP 7i Folding Smart Treadmill with 7\" Touchscreen", "Manduka PRO Yoga Mat 6mm Premium Non-Slip, 71\"", "Schwinn High Timber ALX 27.5\" Mountain Bike, 21-Speed", "Optimum Nutrition Gold Standard 100% Whey Protein Powder, 5 lb"] },
  { name: "Outdoor & Patio", count: "510+ items", items: ["Weber Genesis II E-435 6-Burner Liquid Propane Grill", "Sunjoy 7-Piece Wicker Patio Dining Set with Cushions", "Sojag Mykonos 10 ft x 12 ft Aluminum Hardtop Gazebo", "Pit Boss Pro Series II 4-Series Vertical XL Wood Pellet Smoker", "Agio Conway 6-Piece Outdoor Deep Seating Sectional Set"] },
  { name: "Tires & Auto", count: "1,120+ items", items: ["Michelin Defender 2 All-Season Tire 235/55R18, Set of 4 Installed", "Interstate Marine Deep Cycle Battery, Group 27DC, 12V", "Milwaukee M18 FUEL 1/2\" Cordless Impact Wrench Kit with 2 Batteries", "Mobil 1 Extended Performance Full Synthetic 5W-30 Motor Oil, 5 qt", "Thule Force XT XL 18 cu ft Rooftop Cargo Carrier Box"] },
  { name: "Pharmacy", count: "650+ items", items: ["Tylenol Extra Strength Acetaminophen 500 mg Caplets, 500 Count", "Zyrtec 24-Hour Allergy Relief 10 mg Tablets, 365 Count", "Mucinex DM Maximum Strength 12-Hour Cough Suppressant, 84 Tablets", "ZzzQuil Nighttime Sleep-Aid Diphenhydramine HCl 50 mg, 192 LiquiCaps", "Adventure Medical Kits Mountain Series Comprehensive First Aid Kit, 300 Pieces"] },
  { name: "Optical", count: "210+ items", items: ["Foster Grant Anti-Fatigue Reading Glasses, 3-Pack Assorted", "Gunnar Optiks Intercept Blue-Light Blocking Computer Glasses", "Ray-Ban RB2132 New Wayfarer Polarized Sunglasses, 55mm", "Bausch + Lomb Renu Advanced Multi-Purpose Contact Lens Solution, 24 oz", "Acuvue Oasys 1-Day with HydraLuxe Daily Disposable Contact Lenses, 90 Pack"] },
  { name: "Baby & Toddler", count: "470+ items", items: ["Huggies Little Movers Diapers Size 3 Mega Pack, 220 Count", "Enfamil NeuroPro Infant Formula Stage 1 Powder, 31.4 oz, 2-Pack", "Graco Extend2Fit 3-in-1 Convertible Car Seat, Gotham", "UPPAbaby Minu V2 Compact Folding Travel Stroller", "Melissa & Doug Deluxe Wooden Multi-Activity Cube"] },
  { name: "Pet Supplies", count: "390+ items", items: ["Blue Buffalo Life Protection Chicken & Brown Rice Dry Dog Food, 38 lb Bag", "Fresh Step Multi-Cat Clumping Cat Litter with Febreze, 38 lb", "Zuke's Mini Naturals Salmon Recipe Soft Dog Training Treats, 3 lb", "K&H Pet Products Thermo-Snuggly Sleeper Heated Pet Bed, Large", "PetSafe Drinkwell 360 Stainless Steel Pet Fountain, 128 oz"] },
  { name: "Office & Stationery", count: "560+ items", items: ["Steelcase Series 1 Ergonomic Mesh Office Chair with Lumbar Support", "Tresanti 60\" Adjustable Height Electric Sit-Stand Desk", "Hammermill Premium Multipurpose Printer Paper, 8.5\" x 11\", 10 Reams (5,000 Sheets)", "HP LaserJet Pro MFP M428fdw All-in-One Wireless Laser Printer", "Royal 1840MX 18-Sheet Cross-Cut Heavy-Duty Paper Shredder"] },
  { name: "Clothing & Apparel", count: "1,260+ items", items: ["Eddie Bauer Men's Cirruslite Down Quilted Jacket", "32 Degrees Heat Women's High-Waist Performance Leggings", "Smartwool Hike Light Cushion Merino Wool Crew Socks, 6-Pack", "Carter's Toddler Pajama Set, 4-Pack 100% Cotton", "Levi's Men's 505 Regular Fit Classic Denim Jeans"] },
  { name: "Jewelry & Watches", count: "180+ items", items: ["1 ct tw Round Brilliant Diamond Stud Earrings in 14K White Gold", "14K Yellow Gold 5mm Solid Diamond-Cut Rope Chain Necklace, 22\"", "Blue Sapphire & 1/2 ct tw Diamond Halo Ring in 14K White Gold", "Mikimoto Akoya Cultured Pearl 18\" Strand Necklace, 7.0–7.5mm", "Citizen Eco-Drive Corso Men's Black Leather Dress Watch BM7251-53L"] },
  { name: "Toys & Hobbies", count: "740+ items", items: ["LEGO Creator 3-in-1 Deep Sea Creatures Building Set, 1,000 Pieces", "Power Wheels Ford F-150 Raptor 12V Battery-Powered Ride-On Truck", "KidKraft Majestic Mansion Wooden 3-Story Dollhouse with 34 Pieces", "Hasbro Family Game Night Bundle: Monopoly, Scrabble & Clue", "LEGO Education SPIKE Prime STEM Robotics Learning Kit"] },
  { name: "Seasonal & Holiday", count: "320+ items", items: ["GE 7.5 ft Pre-Lit Aspen Fir Artificial Christmas Tree, 800 Color-Changing LEDs", "Gemmy 8 ft Airblown Inflatable Animated Santa with Reindeer", "Govee Smart RGBIC 100 ft Outdoor String Lights with App Control", "Spirit Halloween Family Costume Bundle, Set of 4 Assorted Sizes", "National Tree Company 30\" Pre-Lit Outdoor Holiday Wreath with Bow"] },
];

// ============ Cart ============
type CartItem = { id: string; category: string; name: string; price: number; qty: number };
type CartCtx = {
  items: CartItem[];
  add: (i: Omit<CartItem, "qty">) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};
const CartContext = createContext<CartCtx | null>(null);
const useCart = () => {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart outside provider");
  return c;
};

function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const loaded = useRef(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("akz:cart");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    try { localStorage.setItem("akz:cart", JSON.stringify(items)); } catch {}
  }, [items]);

  const value = useMemo<CartCtx>(() => ({
    items,
    add: (i) => setItems((cur) => {
      const found = cur.find((x) => x.id === i.id);
      if (found) return cur.map((x) => x.id === i.id ? { ...x, qty: x.qty + 1 } : x);
      return [...cur, { ...i, qty: 1 }];
    }),
    setQty: (id, qty) => setItems((cur) => qty <= 0 ? cur.filter((x) => x.id !== id) : cur.map((x) => x.id === id ? { ...x, qty } : x)),
    remove: (id) => setItems((cur) => cur.filter((x) => x.id !== id)),
    clear: () => setItems([]),
    count: items.reduce((n, x) => n + x.qty, 0),
    subtotal: items.reduce((n, x) => n + x.qty * x.price, 0),
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function Home() {
  return (
    <CartProvider>
      <HomeInner />
    </CartProvider>
  );
}

function HomeInner() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const { count } = useCart();

  useEffect(() => {
    try {
      const u = localStorage.getItem("akz:user");
      if (u) setUser(u);
    } catch {}
  }, []);

  const q = query.trim().toLowerCase();
  const filtered = departments
    .filter((d) => !activeCat || d.name === activeCat)
    .map((d) => ({
      ...d,
      items: q
        ? d.items.filter(
            (it) => it.toLowerCase().includes(q) || d.name.toLowerCase().includes(q),
          )
        : d.items,
    }))
    .filter((d) => d.items.length > 0);

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const el = document.getElementById("shop");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top utility bar */}
      <div className="border-b border-border bg-cream">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs">
          <div className="flex items-center gap-5 text-muted-foreground">
            <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-primary" /> Warehouse: Brooklyn, NY</span>
            <span>Customer Service</span>
            <span>Get Email Offers</span>
          </div>
          <div className="flex items-center gap-5">
            {user ? (
              <button
                type="button"
                onClick={() => { localStorage.removeItem("akz:user"); setUser(null); }}
                className="font-semibold text-muted-foreground hover:text-primary"
              >
                Sign out ({user})
              </button>
            ) : (
              <button type="button" onClick={() => setShowLogin(true)} className="font-semibold text-muted-foreground hover:text-primary">
                Sign in
              </button>
            )}
            <a href="#join" className="flex items-center gap-1 font-semibold text-primary">Join Members <ChevronRight className="h-3 w-3" /></a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-border bg-cream">
        <div className="mx-auto flex max-w-7xl items-center gap-8 px-6 py-5">
          <a href="/" className="flex shrink-0 items-center">
            <img src={logoAsset.url} alt="AK ZAMZAM LLC — Wholesale & Retail Warehouse" className="h-14 w-auto object-contain" />
          </a>
          <form onSubmit={onSearchSubmit} className="flex flex-1 items-center overflow-hidden rounded-full border border-border bg-background pl-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
              placeholder="Search bulk groceries, electronics, tires..."
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} className="px-2 text-muted-foreground hover:text-foreground" aria-label="Clear">
                <X className="h-4 w-4" />
              </button>
            )}
            <button type="submit" className="m-1 rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">Search</button>
          </form>
          <div className="flex items-center gap-6 text-xs">
            <button type="button" onClick={() => user ? null : setShowLogin(true)} className="flex flex-col items-center gap-0.5 hover:text-primary">
              <User className="h-5 w-5" /> {user ? user.slice(0, 8) : "Account"}
            </button>
            <a href="#lists" className="flex flex-col items-center gap-0.5 hover:text-primary"><Heart className="h-5 w-5" /> Lists</a>
            <button
              type="button"
              onClick={() => setShowCart(true)}
              className="flex items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm font-semibold text-background hover:bg-primary"
            >
              <ShoppingCart className="h-4 w-4" /> Cart
              <span className="grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-gold px-1 text-[10px] text-gold-foreground">{count}</span>
            </button>
          </div>
        </div>
        {/* Categories nav */}
        <nav className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-6 pb-3 text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveCat(null)}
            className={`rounded-full border px-3 py-1.5 transition ${!activeCat ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary hover:text-primary"}`}
          >
            All
          </button>
          {departments.map((d) => (
            <button
              key={d.name}
              type="button"
              onClick={() => {
                setActiveCat(d.name);
                document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`rounded-full border px-3 py-1.5 transition ${activeCat === d.name ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary hover:text-primary"}`}
            >
              {d.name}
            </button>
          ))}
        </nav>
      </header>


      {/* Hero */}
      <section className="relative overflow-hidden">
        <img src={heroImg} alt="Warehouse bulk goods" width={1920} height={1024} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.2_0.04_50/0.55)] via-[oklch(0.2_0.04_50/0.25)] to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 text-primary-foreground">
          <span className="inline-flex items-center gap-2 rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-foreground">⌧ Member Pricing All June</span>
          <h1 className="mt-5 max-w-2xl font-serif text-5xl font-bold leading-[1.05] md:text-6xl">
            Bulk savings, member perks, warehouse prices — all in one haul.
          </h1>
          <p className="mt-5 max-w-xl text-base text-[oklch(0.97_0_0/0.9)]">
            Join 4.2 million members saving every week on groceries, electronics, home essentials and seasonal goods. New deals drop every Monday.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#join" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">Become a member — $65 <ChevronRight className="h-4 w-4" /></a>
            <a href="#deals" className="inline-flex items-center rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground hover:bg-cream">Browse weekly deals</a>
          </div>
          <div className="mt-6 flex flex-wrap gap-6 text-xs font-medium">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-gold" /> Money-back guarantee</span>
            <span className="flex items-center gap-1.5"><Truck className="h-4 w-4 text-gold" /> Free shipping $75+</span>
            <span className="flex items-center gap-1.5"><Warehouse className="h-4 w-4 text-gold" /> 230+ warehouses</span>
          </div>

          <div className="absolute bottom-8 right-8 hidden w-80 rounded-xl bg-background p-5 text-foreground shadow-2xl md:block">
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="tracking-wider text-muted-foreground">TODAY ONLY</span>
              <span className="text-muted-foreground">Ends 11:59 PM</span>
            </div>
            <div className="mt-2 font-serif text-xl font-bold">$40 off Executive upgrade</div>
            <p className="mt-1 text-xs text-muted-foreground">Earn 2% back on every qualifying haul.</p>
            <a href="#upgrade" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">Upgrade now <ChevronRight className="h-3.5 w-3.5" /></a>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section id="shop" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Shop All Departments</div>
            <h2 className="mt-2 font-serif text-4xl font-bold">Everything you need, all in one place</h2>
          </div>
          <a href="#all" className="text-sm font-semibold text-foreground hover:text-primary">View all departments ▾</a>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {departments.map((d) => (
            <button
              key={d.name}
              type="button"
              onClick={() => {
                setActiveCat(d.name);
                setTimeout(() => document.getElementById(`cat-${slug(d.name)}`)?.scrollIntoView({ behavior: "smooth" }), 50);
              }}
              className={`group relative aspect-[5/4] overflow-hidden rounded-xl border bg-cream text-left transition ${activeCat === d.name ? "border-primary ring-2 ring-primary/30" : "border-border hover:border-primary"}`}
            >
              <div className="absolute inset-0 grid place-items-center text-muted-foreground/50">
                <ImageIcon className="h-8 w-8" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.18_0.02_50/0.85)] via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-primary-foreground">
                <div className="font-serif text-lg font-bold leading-tight">{d.name}</div>
                <div className="mt-0.5 text-[11px] text-[oklch(0.97_0_0/0.8)]">{d.count}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Per-category items */}
      <section className="border-t border-border bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                {q ? `Search results for "${query}"` : activeCat ? activeCat : "Featured This Week"}
              </div>
              <h2 className="mt-2 font-serif text-4xl font-bold">
                {q || activeCat ? `${filtered.reduce((n, d) => n + d.items.length, 0)} item${filtered.reduce((n, d) => n + d.items.length, 0) === 1 ? "" : "s"} found` : "Five top picks from every department"}
              </h2>
              {!q && !activeCat && (
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                  Warehouse-direct pricing across all 20 departments. Member-exclusive savings on every haul.
                </p>
              )}
            </div>
            {(q || activeCat) && (
              <button
                type="button"
                onClick={() => { setQuery(""); setActiveCat(null); }}
                className="rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold hover:border-primary hover:text-primary"
              >
                Clear filters
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-background p-12 text-center text-sm text-muted-foreground">
              No items match "{query}". Try a different search.
            </div>
          ) : (
            <div className="space-y-14">
              {filtered.map((d) => (
                <div key={d.name} id={`cat-${slug(d.name)}`}>
                  <div className="mb-4 flex items-end justify-between border-b border-border pb-3">
                    <h3 className="font-serif text-2xl font-bold">{d.name}</h3>
                    <span className="text-xs font-semibold text-muted-foreground">{d.count}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                    {d.items.map((item, i) => (
                      <ProductCard
                        key={item}
                        category={d.name}
                        item={item}
                        price={price(d.name, i)}
                        retail={priceRetail(d.name, i)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Membership CTA */}
      <section id="membership" className="bg-foreground py-16 text-background">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-2 md:items-center">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Membership</div>
            <h2 className="mt-2 font-serif text-4xl font-bold">Two ways to save more at the warehouse.</h2>
            <p className="mt-3 text-sm text-[oklch(0.97_0_0/0.7)]">Choose the plan that fits your household. Both unlock member pricing across all 20 departments.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-[oklch(1_0_0/0.15)] bg-[oklch(1_0_0/0.04)] p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-gold">Standard</div>
              <div className="mt-2 font-serif text-3xl font-bold">$65<span className="text-base font-normal text-[oklch(0.97_0_0/0.7)]">/yr</span></div>
              <ul className="mt-4 space-y-2 text-sm text-[oklch(0.97_0_0/0.85)]">
                <li>• Warehouse + online access</li>
                <li>• Free household card</li>
                <li>• Member-only fuel pricing</li>
              </ul>
              <button className="mt-6 w-full rounded-full bg-primary py-2.5 text-sm font-semibold text-primary-foreground">Join Standard</button>
            </div>
            <div className="rounded-xl border border-gold bg-[oklch(1_0_0/0.06)] p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-gold">Executive</div>
              <div className="mt-2 font-serif text-3xl font-bold">$130<span className="text-base font-normal text-[oklch(0.97_0_0/0.7)]">/yr</span></div>
              <ul className="mt-4 space-y-2 text-sm text-[oklch(0.97_0_0/0.85)]">
                <li>• Everything in Standard</li>
                <li>• 2% reward on qualifying hauls</li>
                <li>• Extra savings on services</li>
              </ul>
              <button className="mt-6 w-full rounded-full bg-gold py-2.5 text-sm font-semibold text-gold-foreground">Join Executive</button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-cream py-10">
        <div className="mx-auto max-w-7xl px-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} AK ZAMZAM LLC. Wholesale & Retail Warehouse. All prices subject to change.
        </div>
      </footer>

      {showLogin && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/60 p-4" onClick={() => setShowLogin(false)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm rounded-2xl bg-background p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">Member sign in</div>
                <h3 className="mt-1 font-serif text-2xl font-bold">Welcome back</h3>
              </div>
              <button type="button" onClick={() => setShowLogin(false)} aria-label="Close" className="rounded-full p-1 hover:bg-cream">
                <X className="h-4 w-4" />
              </button>
            </div>
            <form
              className="mt-5 space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget as HTMLFormElement);
                const email = String(fd.get("email") || "").trim();
                if (!email) return;
                localStorage.setItem("akz:user", email);
                setUser(email);
                setShowLogin(false);
              }}
            >
              <label className="block text-xs font-semibold">Email
                <input name="email" type="email" required className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" placeholder="you@example.com" />
              </label>
              <label className="block text-xs font-semibold">Password
                <input name="password" type="password" required className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" placeholder="••••••••" />
              </label>
              <button type="submit" className="mt-2 w-full rounded-full bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">Sign in</button>
              <p className="text-center text-[11px] text-muted-foreground">New here? <a href="#join" className="font-semibold text-primary">Join Members</a></p>
            </form>
          </div>
        </div>
      )}

      {showCart && <CartDrawer onClose={() => setShowCart(false)} />}
    </div>
  );
}

function CartDrawer({ onClose }: { onClose: () => void }) {
  const { items, setQty, remove, clear, subtotal, count } = useCart();
  const [checkout, setCheckout] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-foreground/60" onClick={onClose}>
      <aside
        onClick={(e) => e.stopPropagation()}
        className="flex h-full w-full max-w-md flex-col bg-background shadow-2xl"
      >
        <header className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">Your cart</div>
            <h3 className="mt-0.5 font-serif text-xl font-bold">{count} item{count === 1 ? "" : "s"}</h3>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-full p-1.5 hover:bg-cream">
            <X className="h-5 w-5" />
          </button>
        </header>

        {done ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <h4 className="font-serif text-2xl font-bold">Order placed!</h4>
            <p className="text-sm text-muted-foreground">Thanks for shopping with AK ZAMZAM. A confirmation will be sent to you shortly.</p>
            <button type="button" onClick={onClose} className="mt-3 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground">Continue shopping</button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center text-muted-foreground">
            <ShoppingCart className="h-10 w-10" />
            <p className="text-sm">Your cart is empty.</p>
            <button type="button" onClick={onClose} className="mt-2 rounded-full border border-border px-4 py-2 text-xs font-semibold hover:border-primary hover:text-primary">Browse departments</button>
          </div>
        ) : checkout ? (
          <CheckoutForm
            subtotal={subtotal}
            onBack={() => setCheckout(false)}
            onComplete={() => { clear(); setDone(true); setCheckout(false); }}
          />
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="space-y-4">
                {items.map((it) => (
                  <li key={it.id} className="flex gap-3 border-b border-border pb-4 last:border-0">
                    <div className="grid h-16 w-16 shrink-0 place-items-center rounded-md bg-cream text-muted-foreground/60">
                      <ImageIcon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{it.category}</div>
                      <div className="line-clamp-2 font-serif text-sm font-semibold leading-snug">{it.name}</div>
                      <div className="mt-1.5 flex items-center justify-between">
                        <div className="flex items-center gap-1 rounded-full border border-border">
                          <button type="button" onClick={() => setQty(it.id, it.qty - 1)} className="grid h-7 w-7 place-items-center hover:text-primary" aria-label="Decrease">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-semibold">{it.qty}</span>
                          <button type="button" onClick={() => setQty(it.id, it.qty + 1)} className="grid h-7 w-7 place-items-center hover:text-primary" aria-label="Increase">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="text-sm font-bold">${(it.price * it.qty).toFixed(2)}</div>
                      </div>
                    </div>
                    <button type="button" onClick={() => remove(it.id)} aria-label="Remove" className="text-muted-foreground hover:text-primary">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <footer className="space-y-3 border-t border-border bg-cream px-5 py-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Shipping</span>
                <span>{subtotal >= 75 ? "FREE" : "Calculated at checkout"}</span>
              </div>
              <button
                type="button"
                onClick={() => setCheckout(true)}
                className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Checkout — ${subtotal.toFixed(2)}
              </button>
              <button type="button" onClick={clear} className="w-full text-center text-[11px] font-semibold text-muted-foreground hover:text-primary">
                Clear cart
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}

function CheckoutForm({ subtotal, onBack, onComplete }: { subtotal: number; onBack: () => void; onComplete: () => void }) {
  const [processing, setProcessing] = useState(false);
  const shipping = subtotal >= 75 ? 0 : 9.99;
  const tax = subtotal * 0.0875;
  const total = subtotal + shipping + tax;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setProcessing(true);
        setTimeout(() => onComplete(), 900);
      }}
      className="flex flex-1 flex-col overflow-hidden"
    >
      <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
        <button type="button" onClick={onBack} className="text-xs font-semibold text-muted-foreground hover:text-primary">← Back to cart</button>

        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">Shipping</div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <input required placeholder="First name" className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
            <input required placeholder="Last name" className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
            <input required placeholder="Address" className="col-span-2 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
            <input required placeholder="City" className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
            <input required placeholder="ZIP" className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
          </div>
        </div>

        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">Payment — Card</div>
          <div className="mt-2 space-y-2">
            <input required placeholder="Cardholder name" className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
            <input
              required
              inputMode="numeric"
              placeholder="Card number"
              maxLength={19}
              onChange={(e) => {
                e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
              }}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
            <div className="grid grid-cols-2 gap-2">
              <input required placeholder="MM / YY" maxLength={7} className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
              <input required placeholder="CVC" maxLength={4} inputMode="numeric" className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
            </div>
            <p className="text-[10px] text-muted-foreground">Demo checkout — no real charges. Connect a payment provider to accept live cards.</p>
          </div>
        </div>

        <div className="space-y-1.5 rounded-md border border-border bg-cream p-3 text-xs">
          <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span>${tax.toFixed(2)}</span></div>
          <div className="mt-1 flex justify-between border-t border-border pt-1.5 text-sm font-bold"><span>Total</span><span>${total.toFixed(2)}</span></div>
        </div>
      </div>
      <footer className="border-t border-border bg-cream px-5 py-4">
        <button
          type="submit"
          disabled={processing}
          className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60"
        >
          {processing ? "Processing…" : `Pay $${total.toFixed(2)}`}
        </button>
      </footer>
    </form>
  );
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
function price(cat: string, i: number) {
  const base = (cat.length * 7 + i * 13) % 380 + 9;
  return base.toFixed(2);
}
function priceRetail(cat: string, i: number) {
  return (parseFloat(price(cat, i)) * 1.25).toFixed(2);
}

function ProductCard({ category, item, price, retail }: { category: string; item: string; price: string; retail: string }) {
  const storageKey = `akz:img:${slug(category)}:${slug(item)}`;
  const [img, setImg] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { add } = useCart();

  useEffect(() => {
    try {
      const v = localStorage.getItem(storageKey);
      if (v) setImg(v);
    } catch {}
  }, [storageKey]);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const url = String(reader.result);
      setImg(url);
      try { localStorage.setItem(storageKey, url); } catch {}
    };
    reader.readAsDataURL(file);
  };

  const clearImg = () => {
    setImg(null);
    try { localStorage.removeItem(storageKey); } catch {}
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleAdd = () => {
    add({ id: `${slug(category)}:${slug(item)}`, category, name: item, price: parseFloat(price) });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-background transition hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-cream">
        {img ? (
          <>
            <img src={img} alt={item} className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={clearImg}
              aria-label="Remove image"
              className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-background/90 text-foreground shadow hover:bg-background"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold text-foreground shadow hover:bg-background"
            >
              <Upload className="h-3 w-3" /> Replace
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground/70 transition hover:bg-cream/60 hover:text-primary"
          >
            <ImageIcon className="h-9 w-9" />
            <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 text-[11px] font-semibold text-background">
              <Upload className="h-3 w-3" /> Add photo
            </span>
          </button>
        )}
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
      </div>
      <div className="space-y-2 p-4">
        <div className="text-[10px] font-bold uppercase tracking-wider text-primary">Member Price</div>
        <h4 className="line-clamp-2 min-h-[2.5rem] font-serif text-[15px] font-semibold leading-snug">{item}</h4>
        <div className="flex items-baseline gap-2">
          <span className="font-serif text-xl font-bold">${price}</span>
          <span className="text-xs text-muted-foreground line-through">${retail}</span>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className={`w-full rounded-full py-2 text-xs font-semibold transition ${added ? "bg-primary text-primary-foreground" : "bg-foreground text-background hover:bg-primary"}`}
        >
          {added ? "✓ Added" : "Add to cart"}
        </button>
      </div>
    </article>
  );
}
