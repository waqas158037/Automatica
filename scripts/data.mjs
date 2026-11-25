// Site content. Edit this file to change text, then run `npm run build`.

export const site = {
  name: "Automatica",
  tagline: "Automation · Security · Access",
  email: "support@automatica.com",
  phone: "+92 300 0000000", // TODO: replace with the client's real number
  phoneHref: "+923000000000",
  whatsapp: "923000000000", // TODO: replace with the client's WhatsApp number
  city: "Lahore, Pakistan",
  address: "Lahore, Punjab, Pakistan", // TODO: add full street address
  hours: "Mon – Sat: 9:00 – 18:00",
  social: { facebook: "#", youtube: "#", linkedin: "#", instagram: "#" },
  description:
    "Comprehensive solutions for every sector. Discover a wide range of automation, security, access control, safety and industrial products from Automatica, Lahore.",
};

export const usp = ["Excellent After Sales Services", "Guaranteed Best Products", "Premium Brands for an Affordable Price"];

export const categories = [
  { slug: "automatic-entry-systems", name: "Automatic Entry Systems", icon: "door", subs: ["Automatic Gates", "Automatic Doors", "Automatic Shutters"] },
  { slug: "physical-security-equipment", name: "Physical Security Equipment", icon: "shield", subs: ["Automatic Road Blocker", "Tyre Killer / Road Spikes", "Under Vehicle Surveillance Systems", "Manual Delta Barriers", "Walkthrough Gates & Metal Detectors", "Concrete & Plastic Road Blockers"] },
  { slug: "access-control-systems", name: "Access Control Systems", icon: "lock", subs: ["Attendance and Access Devices", "Automatic Road Barriers", "E-Tag Vehicle Access Control", "Electric Locks", "RFID Cards and Tags", "RFID Readers", "Turnstile Gates"] },
  { slug: "industrial-doors", name: "Industrial Doors", icon: "warehouse", subs: ["Fire Rated Doors", "MS Steel Doors", "Stainless Steel Doors", "Louver Doors", "Emergency Exit Doors"] },
  { slug: "loading-bay-equipment", name: "Loading Bay Equipment", icon: "truck", subs: ["Dock Levelers", "Dock Doors", "Dock Bumpers", "Wheel Stoppers"] },
  { slug: "fabrication", name: "Fabrication", icon: "wrench", subs: ["Steel Structures", "Custom Gates", "Railings & Grills"] },
  { slug: "safety-protection", name: "Safety & Protection", icon: "hardhat", subs: ["Safety Barriers", "Bollards", "Signage"] },
  { slug: "industrial-it-communication", name: "Industrial IT & Comm. Systems", icon: "cpu", subs: ["Industrial PCs", "Software Development", "Embedded Systems", "Communication Systems"] },
  { slug: "accessories", name: "Accessories", icon: "plug", subs: ["Movement Sensors", "Push Buttons", "Safety Sensors", "Signal Lights", "Spare Parts", "Vehicle Detectors"] },
];

export const products = [
  { slug: "fire-rated-doors", name: "Fire Rated Doors", cat: "industrial-doors", art: "door", badge: "Hot", tags: "doors popular", rating: 5,
    short: "Certified fire rated steel doors that hold back fire and smoke, built for factories, plazas, hospitals and high-rise buildings.",
    specs: { "Fire rating": "60 / 90 / 120 minutes", "Material": "Galvanised steel with insulated core", "Finish": "Powder coated, any RAL colour", "Options": "Vision panel, panic bar, door closer" } },
  { slug: "high-speed-pvc-roll-up-doors", name: "High Speed PVC Roll Up Doors", cat: "industrial-doors", art: "shutter", badge: "New", tags: "doors new", rating: 5,
    short: "Fast opening PVC curtain doors that keep warehouses clean, save energy and handle hundreds of cycles a day.",
    specs: { "Opening speed": "Up to 1.5 m/s", "Curtain": "Reinforced PVC with vision strip", "Drive": "Servo motor with inverter", "Safety": "Photocell and soft bottom edge" } },
  { slug: "automatic-road-barrier", name: "Automatic Road Barrier AX-6", cat: "access-control-systems", art: "barrier", badge: "Sale", tags: "access popular", rating: 5,
    short: "Heavy duty boom barrier for car parks, housing societies and toll points, with a brushless motor for all day traffic.",
    specs: { "Boom length": "Up to 6 m", "Opening time": "1.5 – 6 s adjustable", "Motor": "24V DC brushless", "Duty cycle": "100%" } },
  { slug: "hydraulic-road-blocker", name: "Hydraulic Road Blocker", cat: "physical-security-equipment", art: "blocker", badge: "Hot", tags: "security popular", rating: 5,
    short: "Crash rated hydraulic road blocker that stops unauthorised vehicles at sensitive entrances in seconds.",
    specs: { "Blocking height": "1000 mm", "Raise time": "2 – 4 s", "Emergency raise": "1.5 s (EFO)", "Control": "Push button, remote, access control" } },
  { slug: "automatic-roller-shutter", name: "Automatic Roller Shutter", cat: "automatic-entry-systems", art: "shutter", tags: "entry popular", rating: 4,
    short: "Motorised aluminium or steel roller shutters for shops, warehouses and garages with remote control operation.",
    specs: { "Material": "Aluminium / galvanised steel", "Drive": "Tubular or side motor", "Control": "Remote, wall switch, app", "Backup": "Manual override and UPS option" } },
  { slug: "automatic-swing-door-system", name: "Automatic Swing Door System", cat: "automatic-entry-systems", art: "door", tags: "entry", rating: 5,
    short: "Low energy automatic swing door operator for offices, clinics and accessible entrances.",
    specs: { "Door weight": "Up to 200 kg", "Opening angle": "Up to 110°", "Activation": "Push button, sensor, card", "Safety": "Obstacle detection" } },
  { slug: "dock-leveler", name: "Dock Leveler", cat: "loading-bay-equipment", art: "dock", badge: "Sale", tags: "loading popular", rating: 5,
    short: "Hydraulic dock levelers custom built to bridge trucks and loading docks, with capacities up to 12 tons.",
    specs: { "Capacity": "6 – 12 tons", "Lip": "Hinged or telescopic", "Operation": "Electro-hydraulic", "Build": "Custom sizes on request" } },
  { slug: "automatic-sliding-door-system", name: "Automatic Sliding Door System", cat: "automatic-entry-systems", art: "slidingDoor", badge: "New", tags: "entry new", rating: 5,
    short: "Smooth and quiet automatic sliding glass doors for malls, banks, hotels and hospitals.",
    specs: { "Leaf weight": "2 × 150 kg", "Speed": "Adjustable open / close", "Sensors": "Microwave + infrared safety", "Modes": "Auto, exit only, open, lock" } },
  { slug: "swing-gate-operator", name: "Swing Gate Operator", cat: "automatic-entry-systems", art: "swingGate", tags: "entry", rating: 4,
    short: "Electromechanical arm operator for residential and commercial swing gates, with soft start and soft stop.",
    specs: { "Leaf length": "Up to 4 m", "Motor": "24V DC", "Accessories": "Photocells, flashing light", "Backup": "Battery option" } },
  { slug: "wifi-sliding-gate-operator", name: "WiFi Sliding Gate Operator", cat: "automatic-entry-systems", art: "slidingGate", badge: "New", tags: "entry new", rating: 5,
    short: "Sliding gate motor with WiFi control so you can open the gate from your phone from anywhere.",
    specs: { "Gate weight": "Up to 500 kg", "Control": "Mobile app, remote, keypad", "Limit": "Magnetic limit switch", "Safety": "Auto reverse on obstruction" } },
  { slug: "panic-escape-emergency-exit-doors", name: "Panic Escape & Emergency Exit Doors", cat: "industrial-doors", art: "exitDoor", tags: "doors", rating: 5,
    short: "Emergency exit doors fitted with panic bars for quick and safe evacuation, built to safety codes.",
    specs: { "Hardware": "Push bar panic device", "Material": "Steel, fire rated option", "Signage": "Glow exit signage", "Use": "Factories, malls, schools" } },
  { slug: "uhf-rfid-long-range-reader", name: "UHF RFID Long Range Reader", cat: "access-control-systems", art: "reader", tags: "access", rating: 5,
    short: "High performance UHF RFID reader for hands-free vehicle identification at gates and car parks.",
    specs: { "Read range": "Up to 12 m", "Frequency": "860 – 960 MHz", "Interface": "Wiegand, RS485, TCP/IP", "Rating": "IP65 weatherproof" } },
  { slug: "tripod-turnstile-gate", name: "Tripod Turnstile Gate", cat: "access-control-systems", art: "turnstile", tags: "access", rating: 4,
    short: "Stainless steel tripod turnstiles that control people flow at factories, offices and stadiums.",
    specs: { "Body": "SS 304 stainless steel", "Throughput": "Up to 30 persons / min", "Integration": "Card, face, fingerprint", "Fail safe": "Arms drop in power failure" } },
  { slug: "tyre-killer-road-spikes", name: "Tyre Killer / Road Spikes", cat: "physical-security-equipment", art: "spikes", tags: "security", rating: 5,
    short: "One way tyre killers that deflate tyres of vehicles entering the wrong way at secured gates.",
    specs: { "Type": "Surface or flush mounted", "Operation": "Manual or hydraulic", "Material": "Hardened steel spikes", "Width": "Custom to lane size" } },
  { slug: "under-vehicle-surveillance-system", name: "Under Vehicle Surveillance System", cat: "physical-security-equipment", art: "uvss", badge: "Hot", tags: "security", rating: 5,
    short: "Scans the underside of every vehicle at the gate and flags anything suspicious to the guard.",
    specs: { "Cameras": "High resolution line scan", "Lighting": "LED, day and night", "Software": "Plate + under-carriage records", "Install": "Fixed or portable" } },
  { slug: "walkthrough-metal-detector", name: "Walkthrough Metal Detector Gate", cat: "physical-security-equipment", art: "detector", tags: "security", rating: 4,
    short: "Multi zone walkthrough metal detectors for offices, events, schools and government buildings.",
    specs: { "Zones": "6 / 18 / 33 zones", "Alarm": "Sound + light per zone", "Counter": "People and alarm counter", "Power": "AC with battery backup" } },
  { slug: "dock-shelter-bumpers", name: "Dock Shelter & Bumpers", cat: "loading-bay-equipment", art: "dock", tags: "loading", rating: 4,
    short: "Dock shelters and rubber bumpers that seal the gap around trucks and protect your building.",
    specs: { "Shelter": "PVC curtain on steel frame", "Bumpers": "Moulded rubber", "Sizes": "Made to order", "Use": "Cold store, warehouses" } },
  { slug: "safety-photocell-sensor", name: "Safety Photocell Sensor", cat: "accessories", art: "sensor", tags: "accessories", rating: 4,
    short: "Infrared safety photocells that stop gates and doors when someone or something is in the way.",
    specs: { "Range": "Up to 20 m", "Type": "Transmitter + receiver", "Voltage": "12 – 24V AC/DC", "Rating": "IP54" } },
  { slug: "industrial-panel-pc", name: "Industrial Panel PC", cat: "industrial-it-communication", art: "pc", tags: "it", rating: 5,
    short: "Rugged touch panel PCs for factory floors, control rooms and machine automation.",
    specs: { "Screen": "10 – 21 inch touch", "Build": "Fanless, IP65 front", "I/O": "COM, LAN, USB", "OS": "Windows / Linux" } },
  { slug: "stainless-steel-doors", name: "Stainless Steel Doors", cat: "industrial-doors", art: "steelDoor", tags: "doors", rating: 5,
    short: "Hygienic stainless steel doors for pharma, food processing, hospitals and clean rooms.",
    specs: { "Material": "SS 304 / 316", "Core": "Honeycomb or PU foam", "Options": "Vision panel, auto operator", "Finish": "Hairline or mirror" } },
];

export const solutions = [
  { slug: "rfid-etag-vehicle-access-control-solution", name: "E-TAG Vehicle Access Control Solution", art: "card", icon: "car",
    intro: "Let residents and staff drive straight in. A windscreen E-Tag is read from a distance and the barrier opens on its own, with no cards and no stopping.",
    points: ["Long range UHF readers and windscreen tags", "Automatic road barriers with loop detectors", "Central software with entry and exit logs", "Blacklist, whitelist and time based rules", "Integration with CCTV and number plate recognition"] },
  { slug: "loading-bay-solution", name: "Loading Bay Solution", art: "dock", icon: "truck",
    intro: "A complete loading dock built around your trucks and your building, so goods move faster and more safely.",
    points: ["Custom dock levelers up to 12 tons", "Insulated sectional and high speed dock doors", "Dock shelters, bumpers and wheel stoppers", "Traffic lights and dock safety interlocks", "Design, fabrication, installation and service"] },
  { slug: "parking-management-guidance-solution", name: "Parking Management Solution", art: "parking", icon: "parking",
    intro: "Ticketing, payment and guidance for car parks of any size, so drivers find a space quickly and you collect every rupee.",
    points: ["Entry and exit ticket stations", "Pay stations and cashier software", "Space sensors and LED guidance displays", "Monthly pass and E-Tag users", "Live occupancy and revenue reports"] },
  { slug: "perimeter-security-solutions", name: "Perimeter Security Solutions", art: "fence", icon: "fence",
    intro: "Protect the boundary before an intruder reaches the building, with layered physical and electronic security.",
    points: ["Road blockers, bollards and tyre killers", "Fence intrusion detection", "Thermal and PTZ camera coverage", "Lighting and alarm integration", "Guard room and control room setup"] },
  { slug: "personnel-access-control-solution", name: "Personnel Access Control", art: "turnstile", icon: "users",
    intro: "Control who goes where and when, from the main gate to the server room, with one system.",
    points: ["Turnstiles, flap and swing barriers", "Card, fingerprint and face readers", "Electric locks and door controllers", "Time attendance with payroll export", "Multi site central management"] },
  { slug: "visitor-identification-and-management-solution", name: "Personnel Identification & Visitor Management", art: "visitor", icon: "idcard",
    intro: "Register, verify and badge every visitor in seconds, and always know who is on site.",
    points: ["CNIC and passport scanning", "Photo capture and printed visitor badges", "Host notification by SMS or email", "Pre-registration and QR invitations", "Watch lists and visit history"] },
  { slug: "road-safety-solutions", name: "Road Safety", art: "road", icon: "road",
    intro: "Products that make roads, car parks and industrial yards safer for drivers and pedestrians.",
    points: ["Speed breakers and wheel stoppers", "Traffic cones, barriers and delineators", "Convex mirrors and reflective signage", "Solar road studs and warning lights", "Supply and installation across Pakistan"] },
];

export const projects = [
  { title: "Textile Mill Gate Automation", type: "Automatic Entry", art: "slidingGate" },
  { title: "Industrial Doors and Gates Automation", type: "Industrial Doors", art: "shutter" },
  { title: "Hermetic Door for Hospital OT", type: "Automatic Doors", art: "slidingDoor" },
  { title: "Housing Society E-Tag Entry", type: "Access Control", art: "barrier" },
  { title: "Defence Facility Road Blockers", type: "Physical Security", art: "blocker" },
  { title: "Remote Control Sliding Gate", type: "Automatic Gates", art: "slidingGate" },
  { title: "Motorized Aluminum Roller Shutter", type: "Automatic Shutters", art: "shutter" },
  { title: "University Turnstile Access", type: "Access Control", art: "turnstile" },
  { title: "Packaging Plant Loading Bay", type: "Loading Bay", art: "dock" },
  { title: "Cold Store Dock Levelers", type: "Loading Bay", art: "dock" },
  { title: "Cantonment Perimeter Security", type: "Perimeter Security", art: "fence" },
  { title: "Residential Swing Gate Automation", type: "Automatic Gates", art: "swingGate" },
];

export const brands = ["MOVE", "DEFEND", "POWERTECH", "eVACS", "NORDGATE", "SECURA", "ROLLMAX", "DOCKPRO"];

export const menu = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products/", mega: true },
  { label: "Solutions", href: "/solutions/", children: () => solutions.map((s) => ({ label: s.name, href: `/solutions/${s.slug}/` })) },
  { label: "Projects", href: "/projects/" },
  { label: "Company", href: "/company/", children: () => [
      ["About Us", "about-us"], ["Company History", "company-history"], ["Core Values", "core-values"], ["Our Team", "our-team"],
      ["Brand Partners", "brand-partners"], ["Our Brands", "our-brands"], ["Careers", "careers"], ["Certifications", "certifications"], ["Latest News", "latest-news"],
    ].map(([label, s]) => ({ label, href: `/company/${s}/` })) },
  { label: "Support", href: "/support/", children: () => [
      ["Product Demonstration", "product-demonstration"], ["Technical Support", "technical-support"], ["Warranty", "warranty"],
    ].map(([label, s]) => ({ label, href: `/support/${s}/` })) },
  { label: "Contact Us", href: "/contact-us/" },
];

export const news = [
  { slug: "choosing-the-right-automatic-gate", d: "05", m: "Jan", cat: "Automatic Gates", art: "slidingGate", title: "Choosing the Right Automatic Gate for Your Property",
    excerpt: "Sliding or swing, AC or DC, remote or app? A simple guide to picking a gate operator that lasts." },
  { slug: "why-fire-rated-doors-matter", d: "11", m: "Jan", cat: "Industrial Doors", art: "door", title: "Why Fire Rated Doors Matter in Commercial Buildings",
    excerpt: "Fire rated doors buy people time to get out safely. Here is what the ratings mean and where you need them." },
  { slug: "etag-vs-cards-vehicle-access", d: "12", m: "Jan", cat: "Access Control", art: "card", title: "E-Tags vs Cards: Which Is Better for Vehicle Access?",
    excerpt: "Hands-free E-Tags keep traffic moving. We compare cost, speed and security against proximity cards." },
  { slug: "loading-bay-safety-checklist", d: "17", m: "Jan", cat: "Loading Bay", art: "dock", title: "The Loading Bay Safety Checklist Every Warehouse Needs",
    excerpt: "Dock levelers, wheel stoppers and traffic lights: the essentials for a safe and efficient loading dock." },
];
