import mDaily from "../assets/mDaily.webp";
import aliya from "../assets/aliya1.webp";
import sports from "../assets/sports.webp";
import phone from "../assets/phone.webp";
import eduzell from "../assets/eduzell.webp";
import room from "../assets/room1.webp";
import event from "../assets/event1.webp";
import project from "../assets/project1.webp";
import car from "../assets/car1.webp";
import movie from "../assets/movie1.webp";
import nasImg from "../assets/nas1.webp";

export const personalInfo = {
  name: "Naseeh AN",
  role: "Full-Stack Developer",
  location: "United Arab Emirates",
  nationality: "Indian",
  email: "naseehan700@gmail.com",
  phone: "+971 525313774",
  phoneUAE: "+971 525313774",
  phoneIndia: "+91 7034528129",
  phoneList: [
    { label: "UAE", number: "+971 525313774" },
    { label: "IN", number: "+91 7034528129" }
  ],
  status: "Available for opportunities",
  photo: nasImg,
  tagline: "Building digital products that work.",
  summary:
    "I'm Naseeh, a full-stack developer turning ideas into responsive web applications and mobile experiences with React, Next.js, Node.js, and React Native. Focused on clean architecture, thoughtful UX, and reliable software.",
  bio: [
    "I'm a full-stack developer with hands-on experience building modern web applications, client solutions, and mobile apps. I care about writing clean, maintainable code, designing responsive interfaces, and delivering products that feel natural and fast to use.",
    "One of my strengths is taking an idea from initial concept all the way through architecture, API development, and deployment. Whether building bespoke client websites, high-traffic e-commerce stores, or mobile booking systems, I optimize every layer for performance and long-term stability."
  ],
  stats: [
    { label: "Location", value: "UAE / Remote" },
    { label: "Focus", value: "Web & Mobile Engineering" },
    { label: "Availability", value: "Open for Full-Time & Freelance" },
    { label: "Experience", value: "3+ Years Active Building" },
    { label: "Education", value: "MG University (BA) & Bootcamp" },
    { label: "Interests", value: "Football, Video Games" }
  ]
};

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/naseehan",
    icon: "fa-brands fa-github",
    handle: "naseehan"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/naseeh-an2/",
    icon: "fa-brands fa-linkedin-in",
    handle: "naseeh-an2"
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/naseeh10/",
    icon: "fa-brands fa-instagram",
    handle: "@naseeh10"
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/naseehnjk.messi.10/",
    icon: "fa-brands fa-facebook-f",
    handle: "naseehnjk"
  }
];

export const skillsData = [
  // Frontend
  { name: "React", category: "Frontend", level: "Core", icon: "fa-brands fa-react" },
  { name: "Next.js", category: "Frontend", level: "Production", icon: "fa-solid fa-bolt" },
  { name: "JavaScript (ES6+)", category: "Frontend", level: "Advanced", icon: "fa-brands fa-js" },
  { name: "TypeScript", category: "Frontend", level: "Skilled", icon: "fa-solid fa-code" },
  { name: "HTML5 & CSS3", category: "Frontend", level: "Expert", icon: "fa-brands fa-html5" },
  { name: "Tailwind CSS", category: "Frontend", level: "Production", icon: "fa-solid fa-wind" },
  { name: "Redux Toolkit", category: "Frontend", level: "State Mgmt", icon: "fa-solid fa-layer-group" },
  { name: "Responsive UI", category: "Frontend", level: "Design System", icon: "fa-solid fa-mobile-screen-button" },

  // Backend & Databases
  { name: "Node.js", category: "Backend", level: "Runtime", icon: "fa-brands fa-node-js" },
  { name: "Express.js", category: "Backend", level: "REST APIs", icon: "fa-solid fa-server" },
  { name: "MongoDB", category: "Backend", level: "NoSQL DB", icon: "fa-solid fa-database" },
  { name: "Mongoose", category: "Backend", level: "Data Modeling", icon: "fa-solid fa-cubes" },
  { name: "RESTful APIs", category: "Backend", level: "Architecture", icon: "fa-solid fa-network-wired" },
  { name: "JWT & Auth", category: "Backend", level: "Security", icon: "fa-solid fa-shield-halved" },

  // Mobile & Tools
  { name: "React Native", category: "Mobile", level: "Mobile Apps", icon: "fa-solid fa-mobile" },
  { name: "Git & GitHub", category: "Tools", level: "Version Control", icon: "fa-brands fa-git-alt" },
  { name: "Vercel & Render", category: "Tools", level: "Deployment", icon: "fa-solid fa-cloud-arrow-up" },
  { name: "Postman", category: "Tools", level: "API Testing", icon: "fa-solid fa-paper-plane" },
  { name: "Web Performance", category: "Tools", level: "Optimization", icon: "fa-solid fa-gauge-high" }
];

export const skillCategories = ["All", "Frontend", "Backend", "Mobile", "Tools"];

export const projectsData = [
  {
    id: 1,
    name: "M Daily",
    category: "Mobile",
    categoryLabel: "Mobile App",
    badge: "Google Play",
    description:
      "M Daily is a modern grocery delivery app that allows users to browse products, manage their cart, place orders, and track deliveries. It includes secure authentication, address management, online payments, push notifications, rewards, and an admin panel for managing products, inventory, orders, and delivery settings.",
    img: mDaily,
    link: "https://play.google.com/store/apps/details?id=com.adilinte.kada&hl=en&pli=1",
    tags: ["React Native", "Node.js", "MongoDB", "Push Notifications"],
    featured: true
  },
  {
    id: 2,
    name: "Aliya Nizar Studio",
    category: "Client Work",
    categoryLabel: "Client Project",
    badge: "Live Client",
    description:
      "Aliya Nizar Studio showcases the work of Dubai-based artist and interior designer Aliya Nizar. Visitors can explore her curated portfolio, purchase prints and original artworks, or consult her for bespoke design proposals. Content is managed through a Strapi CMS, and 14 original paintings have been sold through the site.",
    img: aliya,
    link: "https://www.aliyanizarstudio.com/",
    tags: ["React", "Strapi CMS", "E-Commerce", "Responsive UI"],
    featured: true
  },
  {
    id: 3,
    name: "Signature Sports",
    category: "Client Work",
    categoryLabel: "Client Project",
    badge: "E-Commerce",
    description:
      "A full MERN-stack e-commerce web application for a modern sports retail store. The platform allows users to browse, search, and purchase a wide range of sports equipment and apparel, backed by a Node.js/Express REST API and MongoDB database. Built with a clean and responsive design, it ensures a seamless shopping experience across all devices.",
    img: sports,
    link: "https://www.signaturesports.shop/",
    tags: ["React", "Node.js", "Express", "MongoDB", "E-Commerce"],
    featured: true
  },
  {
    id: 4,
    name: "hand2hand Mobiles",
    category: "Client Work",
    categoryLabel: "Client Project",
    badge: "Service Portal",
    description:
      "A modern, mobile-first website for a smartphone, tablet, and laptop repair service centre. Features an interactive repair booking and instant quote system, real-time store status, service catalog with pricing, FAQ sections, and WhatsApp inquiry integration. Built with React, TypeScript, and Tailwind CSS, with responsive UI, route-level code splitting, accessibility-focused components, and LocalBusiness Schema.org structured data for local SEO.",
    img: phone,
    link: "https://www.hand2handmobiles.shop/",
    tags: ["React", "TypeScript", "Tailwind CSS", "Local SEO"],
    featured: true
  },
  {
    id: 5,
    name: "Eduzell",
    category: "Client Work",
    categoryLabel: "Client Project",
    badge: "Company Site",
    description:
      "A modern, responsive website for a technology training and software development company. Features dedicated pages for training programs, course curricula, learning approaches, internship opportunities, career support, recruitment services, and company information. Redesigned from a legacy static website using Next.js, TypeScript, and Tailwind CSS, with reusable components, optimized page rendering, SEO-friendly architecture, and a consistent user experience across desktop and mobile devices.",
    img: eduzell,
    link: "https://www.eduzell.in/",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "SSR"],
    featured: true
  },
  {
    id: 6,
    name: "Paradise Hotel",
    category: "Web Apps",
    categoryLabel: "Web Application",
    badge: "Booking Engine",
    description:
      "Simplify room management with an intuitive room booking system tailored to hospitality needs. Administrators can view room availability by date, prevent double-booking, update room statuses, manage maintenance schedules, and cancel bookings with instant status synchronization.",
    img: room,
    link: "https://reservation-system-dun.vercel.app/",
    tags: ["React", "Booking Engine", "State Management", "Vercel"],
    featured: false
  },
  {
    id: 7,
    name: "Noble Events",
    category: "Web Apps",
    categoryLabel: "Web Application",
    badge: "Event Platform",
    description:
      "An event booking web application simplifying how attendees discover and book events and how organizers manage reservations. Whether hosting conferences, concerts, or workshops, the platform empowers users to effortlessly browse, compare, and book tickets.",
    img: event,
    link: "https://noble-events.onrender.com/",
    tags: ["React", "Node.js", "Express", "Render"],
    featured: false
  },
  {
    id: 8,
    name: "Project Management Tool",
    category: "Web Apps",
    categoryLabel: "Web Application",
    badge: "Productivity",
    description:
      "A collaborative workspace tool designed to streamline task and project management. Features include secure authentication, workspace organization, task assignment, status pipelines, and team collaboration controls to keep projects on track.",
    img: project,
    link: "https://project-management-client-blush.vercel.app/",
    tags: ["React", "Node.js", "Authentication", "Workspace"],
    featured: false
  },
  {
    id: 9,
    name: "Car Rental",
    category: "Web Apps",
    categoryLabel: "Web Application",
    badge: "Rental UI",
    description:
      "A car rental discovery and reservation platform designed to make finding and reserving vehicles fast and straightforward. Users can search by vehicle type, compare rates across rental providers, and book directly.",
    img: car,
    link: "https://car-rental-new.vercel.app/",
    tags: ["React", "Search & Filter", "Responsive", "Vercel"],
    featured: false
  },
  {
    id: 10,
    name: "MovieLand",
    category: "Web Apps",
    categoryLabel: "Web Application",
    badge: "Media App",
    description:
      "A lightweight movie discovery web application that connects with external movie databases, enabling users to explore cinema titles, search by genre and keyword, and view release information.",
    img: movie,
    link: "https://naseehan.github.io/movieland/",
    tags: ["React", "Movie API", "Search", "GitHub Pages"],
    featured: false
  }
];

export const projectCategories = ["All", "Client Work", "Web Apps", "Mobile"];

export const experienceData = [
  {
    period: "2024 — Present",
    role: "Freelance Full-Stack Developer",
    organization: "Independent Client Engagements",
    location: "UAE & Remote",
    badge: "CURRENT QUEST",
    description:
      "Architecting and delivering bespoke web applications, e-commerce storefronts, and digital solutions for clients across the UAE and India. Notable delivered projects include Hand2Hand Mobiles, Signature Sports, and Aliya Nizar Studio.",
    highlights: [
      "Built responsive, mobile-first web platforms with Next.js and React",
      "Integrated WhatsApp business messaging and booking engines, and prototyped Stripe checkout flows",
      "Optimized Core Web Vitals, performance metrics, and structured local SEO"
    ]
  },
  {
    period: "2023 — 2024",
    role: "Junior Developer",
    organization: "Eduzell Technologies & Solutions",
    location: "India",
    badge: "EXP CHECKPOINT",
    description:
      "Contributed to building client web applications and corporate websites. Collaborated closely with senior developers on frontend architecture, RESTful API integrations, and code reviews.",
    highlights: [
      "Developed modular UI components using React and modern JavaScript",
      "Collaborated on full-stack web platforms and backend integration",
      "Ensured cross-browser compatibility and accessible frontend designs"
    ]
  }
];

export const educationData = [
  {
    period: "2022 — 2023",
    degree: "Web Development Bootcamp",
    institution: "Udemy",
    focus: "Full-Stack Web Engineering (MERN Stack, REST APIs, Modern JS)",
    typeBadge: "CERT"
  },
  {
    period: "2018 — 2023",
    degree: "Bachelor of Arts (BA)",
    institution: "MG University",
    focus: "Undergraduate Degree",
    typeBadge: "DEGREE"
  },
  {
    period: "2016 — 2018",
    degree: "Higher Secondary",
    institution: "GHSS Pallickal",
    focus: "Higher Secondary Certification",
    typeBadge: "HIGHER SECONDARY"
  }
];

export const servicesData = [
  {
    num: "01",
    title: "Web Design & UI/UX",
    desc: "Designing clean, purposeful interfaces that look refined and feel effortless to navigate. Focus on visual hierarchy, accessibility, and typography that elevates your brand."
  },
  {
    num: "02",
    title: "Frontend Engineering",
    desc: "Developing fast, responsive web applications using React, Next.js, and TypeScript. Optimized for performance, maintainability, and seamless behavior across all device screens."
  },
  {
    num: "03",
    title: "Full-Stack & APIs",
    desc: "Building secure Node.js and Express backends, database models with MongoDB, and robust API endpoints with authentication and smooth integration."
  }
];

export const funFacts = [
  { count: "20+", label: "Projects Completed" },
  { count: "3+", label: "Years Building for the Web" },
  { count: "30+", label: "GitHub Repositories" },
  { count: "14", label: "Paintings Sold via Client Site" }
];
