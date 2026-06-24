import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Search, User, Heart, ShoppingCart, Flame, ChevronRight, ShieldCheck, Truck, Warehouse, ImageIcon } from "lucide-react";
import heroImg from "@/assets/hero-warehouse.jpg";

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
  { name: "Grocery", count: "3,200+ items", items: ["Basmati Rice 20 lb Bag", "Extra Virgin Olive Oil 3 L", "Whole Wheat Flour 25 lb", "Raw Wildflower Honey 5 lb", "Medjool Dates 5 lb Tray"] },
  { name: "Electronics & Computers", count: "1,840+ items", items: ["55\" 4K QLED Smart TV", "16\" Laptop, 16GB / 1TB", "Noise-Cancelling Headphones", "Wireless Mesh Wi-Fi 6 (3-pk)", "Portable SSD 2TB USB-C"] },
  { name: "TV & Home Theater", count: "520+ items", items: ["75\" OLED 4K TV", "5.1.2 Dolby Atmos Soundbar", "Universal TV Wall Mount", "4K UHD Blu-ray Player", "Wireless Surround Speakers"] },
  { name: "Appliances", count: "760+ items", items: ["French Door Refrigerator 26 cu ft", "Front-Load Washer 5.0 cu ft", "Electric Dryer 7.4 cu ft", "Slide-In Gas Range", "Dishwasher Stainless Steel"] },
  { name: "Home & Furniture", count: "2,150+ items", items: ["3-Seat Fabric Sofa", "Queen Memory Foam Mattress", "6-Drawer Dresser Walnut", "Recliner Power Lift Chair", "Bookshelf 5-Tier Oak"] },
  { name: "Kitchen & Dining", count: "1,380+ items", items: ["12-pc Stainless Cookware Set", "Stand Mixer 6-Quart", "Espresso Machine Pump-Driven", "20-pc Flatware Set", "Cast Iron Skillet 12\""] },
  { name: "Health & Personal Care", count: "940+ items", items: ["Multivitamin 365 ct", "Omega-3 Fish Oil 300 ct", "Electric Toothbrush Pro", "Digital BP Monitor", "Probiotic 60 Billion CFU"] },
  { name: "Beauty & Skincare", count: "430+ items", items: ["Vitamin C Serum 2 oz", "Hyaluronic Acid Moisturizer", "Mineral SPF 50 Sunscreen", "Argan Oil Hair Mask", "Retinol Night Cream"] },
  { name: "Sports & Fitness", count: "680+ items", items: ["Adjustable Dumbbell Set 5–52 lb", "Folding Treadmill 3.0 HP", "Yoga Mat Pro 6mm", "Mountain Bike 27.5\"", "Whey Protein 5 lb"] },
  { name: "Outdoor & Patio", count: "510+ items", items: ["6-Burner Propane Grill", "7-pc Patio Dining Set", "10×12 ft Hardtop Gazebo", "Charcoal Smoker XL", "Outdoor Lounge Sectional"] },
  { name: "Tires & Auto", count: "1,120+ items", items: ["All-Season Tire 235/55R18", "Marine Battery Deep Cycle", "Cordless Impact Wrench Kit", "Synthetic Motor Oil 5W-30 5qt", "Roof Cargo Carrier 18 cu ft"] },
  { name: "Pharmacy", count: "650+ items", items: ["Pain Relief Tablets 500 ct", "Allergy Relief 24 hr 365 ct", "Cough & Cold Daytime 200 ct", "Sleep Aid Softgels 192 ct", "First Aid Kit 300 pcs"] },
  { name: "Optical", count: "210+ items", items: ["Anti-Fatigue Reading Glasses", "Blue-Light Computer Glasses", "Polarized Sunglasses", "Contact Lens Solution 24 oz", "Daily Disposable Contacts 90 pk"] },
  { name: "Baby & Toddler", count: "470+ items", items: ["Diapers Mega Pack Size 3", "Baby Formula Stage 1 2-pk", "Convertible Car Seat", "Folding Travel Stroller", "Wooden Activity Cube"] },
  { name: "Pet Supplies", count: "390+ items", items: ["Dry Dog Food 40 lb", "Cat Litter Clumping 38 lb", "Salmon Dog Treats 3 lb", "Heated Pet Bed Large", "Auto Pet Water Fountain"] },
  { name: "Office & Stationery", count: "560+ items", items: ["Ergonomic Mesh Office Chair", "Sit-Stand Desk 60\"", "Multipurpose Paper 5,000 sheets", "Laser Printer All-in-One", "Heavy-Duty Shredder 18-Sheet"] },
  { name: "Clothing & Apparel", count: "1,260+ items", items: ["Men's Quilted Jacket", "Women's Performance Leggings", "Merino Wool Crew Socks 6-pk", "Kids' Pajama Set 4-pk", "Classic Denim Jeans"] },
  { name: "Jewelry & Watches", count: "180+ items", items: ["Diamond Stud Earrings 1ct", "14K Gold Rope Chain 22\"", "Sapphire & Diamond Ring", "Pearl Strand Necklace 18\"", "Automatic Dress Watch"] },
  { name: "Toys & Hobbies", count: "740+ items", items: ["1000-pc Building Block Set", "Electric Ride-On Truck 12V", "Dollhouse Wooden 3-Story", "Family Board Game Bundle", "STEM Robotics Kit"] },
  { name: "Seasonal & Holiday", count: "320+ items", items: ["7.5 ft Pre-Lit Christmas Tree", "Inflatable Yard Decor 8 ft", "String Lights 100 ft", "Halloween Costume Bundle", "Outdoor Holiday Wreath 30\""] },
];

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top utility bar */}
      <div className="border-b border-border bg-cream">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs">
          <div className="flex items-center gap-5 text-muted-foreground">
            <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-primary" /> Warehouse: Brooklyn, NY</span>
            <a href="#business" className="hover:text-foreground">For Business</a>
            <a href="#services" className="hover:text-foreground">Services</a>
          </div>
          <div className="flex items-center gap-5 text-muted-foreground">
            <a href="#orders" className="hover:text-foreground">Order Status</a>
            <a href="#help" className="hover:text-foreground">Help</a>
            <a href="#signin" className="hover:text-foreground">Sign in</a>
            <a href="#join" className="flex items-center gap-1 font-semibold text-primary">Join Members <ChevronRight className="h-3 w-3" /></a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-border bg-cream">
        <div className="mx-auto flex max-w-7xl items-center gap-8 px-6 py-5">
          <a href="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded bg-primary text-primary-foreground font-serif text-lg font-bold">A</div>
            <div className="leading-tight">
              <div className="font-serif text-lg font-bold tracking-tight">AK ZAMZAM LLC</div>
              <div className="text-[10px] font-semibold tracking-[0.18em] text-muted-foreground">WHOLESALE & RETAIL WAREHOUSE</div>
            </div>
          </a>
          <div className="flex flex-1 items-center overflow-hidden rounded-full border border-border bg-background pl-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input className="flex-1 bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground" placeholder="Search bulk groceries, electronics, tires..." />
            <button className="m-1 rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">Search</button>
          </div>
          <div className="flex items-center gap-6 text-xs">
            <a href="#account" className="flex flex-col items-center gap-0.5 hover:text-primary"><User className="h-5 w-5" /> Account</a>
            <a href="#lists" className="flex flex-col items-center gap-0.5 hover:text-primary"><Heart className="h-5 w-5" /> Lists</a>
            <a href="#cart" className="flex items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm font-semibold text-background">
              <ShoppingCart className="h-4 w-4" /> Cart <span className="grid h-5 w-5 place-items-center rounded-full bg-gold text-[10px] text-gold-foreground">3</span>
            </a>
          </div>
        </div>
        {/* Nav */}
        <nav className="mx-auto flex max-w-7xl items-center gap-7 px-6 pb-3 text-sm font-medium">
          <a href="#shop" className="font-semibold text-primary">Shop</a>
          <a href="#deals">Deals</a>
          <a href="#grocery">Grocery</a>
          <a href="#pharmacy">Pharmacy</a>
          <a href="#optical">Optical</a>
          <a href="#services">Services</a>
          <a href="#travel">Travel</a>
          <a href="#membership">Membership</a>
          <span className="ml-auto h-5 w-px bg-border" />
          <a href="#weekly" className="flex items-center gap-1.5 font-semibold text-[oklch(0.45_0.15_45)]"><Flame className="h-4 w-4" /> Weekly Deals</a>
          <a href="#new" className="font-semibold text-[oklch(0.38_0.13_160)]">What's New</a>
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
            <a key={d.name} href={`#cat-${slug(d.name)}`} className="group relative aspect-[5/4] overflow-hidden rounded-xl border border-border bg-cream">
              <div className="absolute inset-0 grid place-items-center text-muted-foreground/50">
                <ImageIcon className="h-8 w-8" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.18_0.02_50/0.85)] via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-primary-foreground">
                <div className="font-serif text-lg font-bold leading-tight">{d.name}</div>
                <div className="mt-0.5 text-[11px] text-[oklch(0.97_0_0/0.8)]">{d.count}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Per-category items */}
      <section className="border-t border-border bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-10">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Featured This Week</div>
            <h2 className="mt-2 font-serif text-4xl font-bold">Five top picks from every department</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Warehouse-direct pricing across all 20 departments. Member-exclusive savings on every haul.
            </p>
          </div>

          <div className="space-y-14">
            {departments.map((d) => (
              <div key={d.name} id={`cat-${slug(d.name)}`}>
                <div className="mb-4 flex items-end justify-between border-b border-border pb-3">
                  <h3 className="font-serif text-2xl font-bold">{d.name}</h3>
                  <a href={`#shop-${slug(d.name)}`} className="text-xs font-semibold text-primary hover:underline">Shop all {d.count} ›</a>
                </div>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                  {d.items.map((item, i) => (
                    <article key={item} className="group overflow-hidden rounded-xl border border-border bg-background transition hover:shadow-lg">
                      <div className="grid aspect-square place-items-center bg-cream text-muted-foreground/40">
                        <ImageIcon className="h-10 w-10" />
                      </div>
                      <div className="space-y-2 p-4">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-primary">Member Price</div>
                        <h4 className="line-clamp-2 min-h-[2.5rem] font-serif text-[15px] font-semibold leading-snug">{item}</h4>
                        <div className="flex items-baseline gap-2">
                          <span className="font-serif text-xl font-bold">${price(d.name, i)}</span>
                          <span className="text-xs text-muted-foreground line-through">${priceRetail(d.name, i)}</span>
                        </div>
                        <button className="w-full rounded-full bg-foreground py-2 text-xs font-semibold text-background transition hover:bg-primary">Add to cart</button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
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
    </div>
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
