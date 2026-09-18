"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Download,
  Mail,
  Linkedin,
  Calendar,
  Code,
  Database,
  Globe,
  Briefcase,
  Phone,
  MapPin,
  GraduationCap,
  Play,
  Star,
  Film,
} from "lucide-react"

const experiences = [
  {
    title: "Software Engineering Intern - Maruti Suzuki India Limited",
    duration: "2026",
    location: "On-Site",
    role: "Full-Stack & Data Engineering",
    achievements: [
      "Engineered an automated Excel-to-MongoDB ETL pipeline processing 10,000+ manufacturing alarm records through REST APIs, powering a full-stack Industrial Alarm Analytics platform using Node.js, Express.js, MongoDB and JavaScript.",
      "Designed a polyglot data architecture combining MongoDB for alarm/event data with PostgreSQL for relational manufacturing metadata, implementing schema relationships, foreign keys and SQL-based analytical queries.",
      "Built aggregation-driven KPI dashboards with filtering, pagination and Pareto analysis for production downtime, and implemented an Isolation Forest anomaly-detection model to identify abnormal machine alarm patterns and surface potential downtime risks.",
    ],
    tech: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "JavaScript", "SQL", "Isolation Forest", "ETL"],
  },
  {
    title: "Software Engineering Intern - AI Blocks",
    duration: "2026",
    location: "Remote",
    role: "Frontend & Document Parsing",
    achievements: [
      "Built a large-scale document data-extraction pipeline handling 4,000+ cases per PDF using Document Anchor Graph Parsing, spatial tokenization, and graph segmentation; reached 97–99% extraction accuracy at 2–4 sec/PDF with zero OCR or LLM dependencies.",
      "Designed and implemented modern frontend interfaces for client projects, emphasizing responsive design, performance, and user experience.",
    ],
    tech: ["Document Parsing", "Graph Segmentation", "Spatial Tokenization", "Frontend Development", "Responsive Design"],
  },
  {
    title: "Data Engineering Intern - Algoleap",
    duration: "2025",
    location: "Remote",
    role: "Web Scraping & Data Processing",
    achievements: [
      "Authored a modular Python/BeautifulSoup data-extraction pipeline targeting Glassdoor and AmbitionBox with site-specific parsing logic, sustaining a 95% parse success rate.",
      "Applied NLP-based sentiment analysis to isolate negative reviews; exported validated, structured CSV/JSON output with field-level schema enforcement for downstream analysis.",
      "Instrumented exponential-backoff retries, rotating proxy support, and structured logging.",
    ],
    tech: ["Python", "BeautifulSoup", "NLP", "Data Engineering", "Web Scraping"],
  }
]

const projects = [
  {
    id: 1,
    title: "RSVP Management System",
    tagline: "Full-stack event management with comprehensive features",
    description:
      "Built comprehensive full-stack RSVP system with MVC architecture, featuring responsive UI, secure JWT authentication with bcrypt password hashing, and session management. Integrated automated email confirmations via Nodemailer with customizable templates and dynamic QR code generation using node-qrcode for seamless event check-in. Implemented real-time RSVP tracking with WebSocket connections and achieved 100% test coverage using Jest for unit testing and Postman for comprehensive API testing.",
    tech: ["Node.js", "Express.js", "MongoDB", "JWT", "Nodemailer", "Jest", "WebSocket", "QR Code"],
    category: "Web Dev Originals",
    timeline: "2024",
    role: "Full-Stack Developer",
    year: "2024",
    demoUrl: "#",
    githubUrl: "#",
    rating: 4.8,
    genre: "Full-Stack",
  },
  {
    id: 2,
    title: "Enhanced Object Detection",
    tagline: "Computer vision with advanced feature engineering",
    description:
      "Conducted binary object classification using COCO 2017 dataset with 80,000+ images, implementing bilateral filtering for edge preservation and noise reduction. Extracted 500 keypoints using Scale-Invariant Feature Transform (SIFT) and applied Principal Component Analysis for dimensionality reduction from 500 to 50 features. Computed Shannon entropy for high-information feature selection and trained SVM classifier with RBF kernel, improving classification accuracy from 53% to 63% through feature engineering.",
    tech: ["Python", "OpenCV", "NumPy", "scikit-learn", "COCO Dataset", "SIFT", "PCA", "SVM"],
    category: "ML Picks",
    timeline: "2024",
    role: "Computer Vision Engineer",
    year: "2024",
    demoUrl: "#",
    githubUrl: "#",
    rating: 4.6,
    genre: "AI/ML",
  },
  {
    id: 3,
    title: "Sparse Image Compression using DCT",
    tagline: "Advanced image processing with mathematical optimization",
    description:
      "Developed efficient image compression tool using 8x8 block-wise Discrete Cosine Transform and sparse matrix techniques, achieving 70% file size reduction while maintaining PSNR above 30dB. Implemented frequency domain analysis with adaptive quantization tables and optimized compression algorithms for maximum efficiency while preserving visual quality.",
    tech: ["Python", "NumPy", "SciPy", "PIL", "DCT", "Sparse Matrices"],
    category: "ML Picks",
    timeline: "2024",
    role: "ML Engineer",
    year: "2024",
    demoUrl: "#",
    githubUrl: "#",
    rating: 4.7,
    genre: "Data Science",
  },
  {
    id: 4,
    title: "Stress Intelligence Platform",
    tagline: "Distributed data-processing and real-time risk monitoring",
    description:
      "Designed a distributed data-processing pipeline handling 130K+ weekly student records with columnar Parquet partitioning, reducing analytical query latency by 60% over row-based storage. Engineered 12+ temporal entropy features and trained a class-balanced Random Forest classifier achieving 88% recall on high-risk cases. Shipped an incremental inference engine producing student-level intervention alerts in under 1 second from live input streams.",
    tech: ["PySpark", "Spark SQL", "Parquet", "scikit-learn", "Random Forest"],
    category: "ML Picks",
    timeline: "2026",
    role: "Data & ML Engineer",
    year: "2026",
    demoUrl: "#",
    githubUrl: "#",
    rating: 4.9,
    genre: "Big Data / ML",
  },
  {
    id: 5,
    title: "Smart Waste Segregation System",
    tagline: "Real-time computer vision waste classification",
    description:
      "Trained and deployed a fine-tuned YOLOv8/CNN classifier for biodegradable vs. non-biodegradable waste detection at under 100 ms per frame, running on an ESP32-CAM computer-vision pipeline. Configured a FastAPI inference server with OpenCV preprocessing and an Arduino actuation layer, enabling model updates without hardware changes.",
    tech: ["YOLOv8", "CNN", "ESP32-CAM", "FastAPI", "OpenCV", "Arduino"],
    category: "ML Picks",
    timeline: "2025",
    role: "Computer Vision Engineer",
    year: "2025",
    demoUrl: "#",
    githubUrl: "#",
    rating: 4.8,
    genre: "Computer Vision",
  },
  {
    id: 6,
    title: "AEGIS-ZONE",
    tagline: "Zero-Trust Workstation Security System",
    description:
      "Developed a full-stack Zero-Trust workstation prototype using FastAPI, Next.js, React, ESP32, and WebSockets, integrating biometric authentication and wireless intrusion detection for continuous access verification. Implemented real-time AES session key generation/invalidation using SHA3-256, live dashboard monitoring, and automated workstation lockdown upon biometric failure or unauthorized wireless threats.",
    tech: ["FastAPI", "Next.js", "React", "ESP32", "WebSockets", "AES", "SHA3-256"],
    category: "Web Dev Originals",
    timeline: "2026",
    role: "Full-Stack Security Developer",
    year: "2026",
    demoUrl: "#",
    githubUrl: "#",
    rating: 4.9,
    genre: "Cybersecurity / Web",
  },
]

const projectCategories = [
  {
    title: "Web Dev Originals",
    projects: projects.filter((p) => p.category === "Web Dev Originals"),
  },
  {
    title: "ML Picks",
    projects: projects.filter((p) => p.category === "ML Picks"),
  },
]

const techStack = {
  "Programming Languages": ["Python", "C/C++", "Java", "JavaScript (ES6+)", "SQL", "HTML5", "CSS3"],
  "Web Development": ["Node.js", "Express.js", "React.js", "RESTful APIs", "JWT", "Bootstrap"],
  "Database Management": ["MySQL", "MongoDB", "PostgreSQL", "Database Design", "Query Optimization"],
  "ML & Data Science": ["NumPy", "SciPy", "scikit-learn", "OpenCV", "Pandas", "Matplotlib", "Feature Engineering"],
  "Core Computer Science": ["Data Structures & Algorithms", "Software Engineering", "System Design", "OOP"],
}

// Netflix-style film strip animation
function FilmStrip() {
  return (
    <div className="fixed top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-red-600 to-transparent z-50">
      <motion.div
        className="h-full bg-gradient-to-r from-red-600 via-red-500 to-red-600"
        animate={{ x: [-100, 300] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
    </div>
  )
}

// Consistent background for entire page
function NetflixBackground() {
  return (
    <div className="fixed inset-0 z-0">
      {/* Base Netflix dark background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

      {/* Subtle red gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/5 via-transparent to-red-900/10" />

      {/* Netflix-style grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="netflix-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(229,9,20,0.3)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#netflix-grid)" />
        </svg>
      </div>

      {/* Floating Netflix-style particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-500/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Cinematic vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/30" />
    </div>
  )
}

// Simplified continuous scroll animations
function ContinuousScrollAnimations() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {/* Continuous flowing lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <motion.path
          d="M-100,100 Q200,200 100,400 T100,800 Q300,1000 100,1200 T100,1600 Q400,1800 100,2000"
          stroke="url(#netflixGradient)"
          strokeWidth="2"
          fill="none"
          animate={{ y: [0, -50, 0] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.path
          d="M400,0 Q600,150 400,300 T400,600 Q700,750 400,900 T400,1200 Q800,1400 400,1600"
          stroke="url(#netflixGradient2)"
          strokeWidth="1.5"
          fill="none"
          animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <defs>
          <linearGradient id="netflixGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(229,9,20,0.6)" />
            <stop offset="50%" stopColor="rgba(229,9,20,0.3)" />
            <stop offset="100%" stopColor="rgba(229,9,20,0.1)" />
          </linearGradient>
          <linearGradient id="netflixGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(229,9,20,0.4)" />
            <stop offset="100%" stopColor="rgba(229,9,20,0.1)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Continuous floating elements */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`continuous-${i}`}
          className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-red-500/30 to-red-600/30"
          style={{
            left: `${10 + i * 8}%`,
            top: `${5 + (i % 3) * 30}%`,
          }}
          animate={{
            y: [0, -200 - i * 20],
            x: [0, Math.sin(i) * 50],
            rotate: [0, 360],
            scale: [0.5, 1, 0.8],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Netflix-style streaming dots */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`stream-${i}`}
          className="absolute w-2 h-2 bg-red-500/40 rounded-full"
          style={{
            left: `${20 + i * 10}%`,
            top: "80%",
          }}
          animate={{
            y: [-800],
            scale: [1, 0.3],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  )
}

// Loading component to prevent hydration issues
function LoadingScreen() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <motion.div
          className="text-red-500 text-4xl font-bold mb-4 flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <Film className="w-8 h-8 mr-3" />
          YASH
        </motion.div>
        <motion.div
          className="w-16 h-1 bg-red-600 mx-auto rounded-full"
          animate={{ scaleX: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>
    </div>
  )
}

function HeroSection() {
  const [activeSection, setActiveSection] = useState("home")
  const { scrollYProgress } = useScroll()

  // Safe scroll transforms with fallbacks
  const heroTransform = useTransform(scrollYProgress, [0, 0.3], [0, -100])
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9])

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]")
      const scrollPos = window.scrollY + 100

      sections.forEach((section) => {
        const element = section as HTMLElement
        const top = element.offsetTop
        const height = element.offsetHeight

        if (scrollPos >= top && scrollPos < top + height) {
          setActiveSection(element.id)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <NetflixBackground />
      <ContinuousScrollAnimations />
      <FilmStrip />

      {/* Netflix-style Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-md border-b border-red-900/30"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-red-600 flex items-center"
            >
              <Film className="w-6 h-6 mr-2" />
              YASH
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {[
                { id: "home", label: "Home" },
                { id: "about", label: "About" },
                { id: "experience", label: "Experience" },
                { id: "projects", label: "Projects" },
                { id: "tech", label: "Tech" },
                { id: "contact", label: "Contact" },
              ].map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`transition-all duration-300 hover:text-red-400 ${
                    activeSection === item.id ? "text-red-500 font-semibold" : "text-gray-300"
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative z-20">
        <motion.div
          className="container mx-auto px-6 text-center"
          style={{
            y: heroTransform,
            scale: heroScale,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Netflix-style title treatment */}
            <motion.div
              className="relative mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-red-200 to-red-400 bg-clip-text text-transparent">
                Yash Bajpai
              </h1>
              {/* Netflix-style glow effect */}
              <div className="absolute inset-0 text-6xl md:text-8xl font-bold text-red-600/20 blur-lg -z-10">
                Yash Bajpai
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-2xl md:text-4xl mb-8 text-red-400 font-light flex items-center justify-center"
            >
              <Play className="w-8 h-8 mr-3 text-red-500" />
              Information Technology Student | Developer
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12"
            >
              Results-driven IT student with expertise in full-stack development, machine learning, and data structures.
              Proven track record in Python, JavaScript, and database management through internship and academic
              projects.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 text-lg hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 flex items-center"
                  onClick={() => scrollToSection("projects")}
                >
                  <Play className="w-5 h-5 mr-2" />
                  View My Work
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-red-600 text-red-400 hover:bg-red-600/10 bg-transparent px-8 py-4 text-lg hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300"
                  onClick={() => scrollToSection("contact")}
                >
                  Get In Touch
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="/resume.pdf"
                  download
                  className="inline-block"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-red-600 text-red-400 hover:bg-red-600/10 bg-transparent px-8 py-4 text-lg hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 flex items-center"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Resume
                  </Button>
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}

function AboutSection() {
  const { scrollYProgress } = useScroll()
  const aboutTransform = useTransform(scrollYProgress, [0.1, 0.4], [50, -50])

  return (
    <motion.section
      id="about"
      className="py-20 relative z-20"
      style={{
        y: aboutTransform,
      }}
    >
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-red-400 bg-clip-text text-transparent">
            About Me
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Education - Netflix card style */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.div
                className="bg-gradient-to-br from-gray-900/80 to-black/80 p-6 rounded-lg border border-red-900/30 backdrop-blur-sm hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <GraduationCap className="w-6 h-6 text-red-400 mr-3" />
                  Education
                </h3>
                <div className="space-y-4">
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                    className="p-3 rounded bg-red-900/10 border-l-4 border-red-500"
                  >
                    <p className="text-lg font-semibold text-red-400">
                      Bachelor of Technology in Information Technology
                    </p>
                    <p className="text-gray-300">Vellore Institute of Technology (VIT)</p>
                    <p className="text-gray-400">2023 – 2027 | CGPA: 8.75/10</p>
                  </motion.div>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                    className="p-3 rounded bg-red-900/10 border-l-4 border-red-500"
                  >
                    <p className="text-lg font-semibold text-red-400">Higher Secondary Education (CBSE)</p>
                    <p className="text-gray-300">Delhi Public School Vindhyanagar</p>
                    <p className="text-gray-400">2023 | PCM: 88%</p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Skills - Netflix card style */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.div
                className="bg-gradient-to-br from-gray-900/80 to-black/80 p-6 rounded-lg border border-red-900/30 backdrop-blur-sm hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <h3 className="text-2xl font-bold text-white mb-4">Professional Strengths</h3>
                <div className="grid grid-cols-1 gap-3">
                  {["Problem Solving", "Quick Learner", "Team Collaboration", "Adaptability"].map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ x: 10, scale: 1.02 }}
                      className="flex items-center space-x-3 p-3 rounded bg-red-900/10 hover:bg-red-900/20 transition-all duration-200"
                    >
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                      <span className="text-gray-300">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

function ExperienceSection() {
  const { scrollYProgress } = useScroll()
  const experienceTransform = useTransform(scrollYProgress, [0.25, 0.5], [50, -50])

  return (
    <motion.section
      id="experience"
      className="py-20 relative z-20"
      style={{
        y: experienceTransform,
      }}
    >
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-red-400 bg-clip-text text-transparent">
            Professional Experience
          </h2>

          <div className="space-y-8">
            {experiences.map((exp, expIndex) => (
              <motion.div
                key={expIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + expIndex * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-gradient-to-br from-gray-900/80 to-black/80 p-8 rounded-lg border border-red-900/30 backdrop-blur-sm hover:border-red-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/20"
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className="p-2 bg-red-600/20 rounded-lg flex-shrink-0">
                    <Briefcase className="w-8 h-8 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-gray-400">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {exp.duration}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {exp.location}
                      </div>
                      <Badge className="bg-red-600/20 text-red-400 border-red-500/30">{exp.role}</Badge>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">Key Achievements:</h4>
                  <ul className="space-y-3">
                    {exp.achievements.map((achievement, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ x: 10 }}
                        className="flex items-start space-x-3 text-gray-300 p-3 rounded bg-red-900/5 hover:bg-red-900/10 transition-all duration-200"
                      >
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="leading-relaxed">{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-3">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech, index) => (
                      <motion.div
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <Badge
                          variant="outline"
                          className="border-red-600/50 text-gray-300 hover:border-red-500 hover:bg-red-600/10 transition-colors"
                        >
                          {tech}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

function ProjectsSection() {
  const { scrollYProgress } = useScroll()
  const projectsTransform = useTransform(scrollYProgress, [0.4, 0.7], [50, -50])

  return (
    <motion.section
      id="projects"
      className="py-20 relative z-20"
      style={{
        y: projectsTransform,
      }}
    >
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-red-400 bg-clip-text text-transparent">
            Technical Projects
          </h2>

          {projectCategories.map((category, categoryIndex) => (
            <div key={category.title} className="mb-16">
              <motion.h3
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                className="text-2xl font-bold text-red-400 mb-8 flex items-center"
              >
                <Film className="w-6 h-6 mr-3" />
                {category.title}
              </motion.h3>

              <div className="grid lg:grid-cols-2 gap-8">
                {category.projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-lg border border-red-900/30 backdrop-blur-sm hover:border-red-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/20 group overflow-hidden"
                  >
                    {/* Netflix-style project header */}
                    <div className="relative h-48 bg-gradient-to-br from-red-900/20 to-red-600/10 flex items-center justify-center">
                      <div className="text-center">
                        <h4 className="text-2xl font-bold text-white mb-2">{project.title}</h4>
                        <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 mr-1" />
                            {project.rating}
                          </div>
                          <Badge className="bg-red-600/20 text-red-400 border-red-500/30">{project.genre}</Badge>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {project.timeline}
                          </div>
                        </div>
                      </div>
                      {/* Netflix play button overlay */}
                      <motion.div
                        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.1 }}
                      >
                        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                      </motion.div>
                    </div>

                    <div className="p-6">
                      <p className="text-red-300 text-lg mb-3">{project.tagline}</p>
                      <p className="text-gray-300 mb-6 leading-relaxed text-sm">{project.description}</p>

                      <div className="mb-6">
                        <p className="text-white font-semibold mb-3">Technologies & Tools</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, techIndex) => (
                            <motion.div
                              key={tech}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: techIndex * 0.05 }}
                              whileHover={{ scale: 1.1 }}
                            >
                              <Badge
                                variant="outline"
                                className="border-red-600/50 text-gray-300 text-xs hover:border-red-500 hover:bg-red-600/10 transition-colors"
                              >
                                {tech}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <a
                            href="https://github.com/yash-bajpai"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1"
                          >
                            <Button
                              variant="outline"
                              className="border-red-600/50 text-red-400 hover:bg-red-600/10 bg-transparent w-full hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 flex items-center justify-center"
                            >
                              <Github className="w-4 h-4 mr-2" />
                              View Code
                            </Button>
                          </a>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}

function TechStackSection() {
  const { scrollYProgress } = useScroll()
  const techTransform = useTransform(scrollYProgress, [0.6, 0.85], [50, -50])

  const categories = [
    { name: "Programming Languages", icon: Code, techs: techStack["Programming Languages"] },
    { name: "Web Development", icon: Globe, techs: techStack["Web Development"] },
    { name: "Database Management", icon: Database, techs: techStack["Database Management"] },
    { name: "ML & Data Science", icon: Briefcase, techs: techStack["ML & Data Science"] },
    { name: "Core Computer Science", icon: Code, techs: techStack["Core Computer Science"] },
  ]

  return (
    <motion.section
      id="tech"
      className="py-20 relative z-20"
      style={{
        y: techTransform,
      }}
    >
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-red-400 bg-clip-text text-transparent">
            Technical Skills
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-gray-900/80 to-black/80 p-5 rounded-lg border border-red-900/30 hover:border-red-500/50 transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-red-500/20 group"
              >
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-red-600/20 rounded-lg mr-3">
                    <category.icon className="w-5 h-5 text-red-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                </div>
                <div className="space-y-2">
                  {category.techs.map((tech, techIndex) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: techIndex * 0.05 }}
                      whileHover={{ x: 5, scale: 1.02 }}
                      className="text-gray-300 text-sm py-2 px-3 bg-red-900/10 rounded hover:bg-red-900/20 transition-all duration-200 cursor-pointer border-l-2 border-red-500/30 hover:border-red-500"
                    >
                      {tech}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

function ContactSection() {
  const { scrollYProgress } = useScroll()
  const contactTransform = useTransform(scrollYProgress, [0.8, 1], [50, -50])

  return (
    <motion.section
      id="contact"
      className="py-20 relative z-20"
      style={{
        y: contactTransform,
      }}
    >
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-white to-red-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
            Ready to collaborate on your next project? Let's connect and create something amazing together.
          </p>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { href: "tel:+918103171125", icon: Phone, color: "green", label: "Phone", value: "+91 81031 71125" },
              {
                href: "mailto:yashbajpai1585@gmail.com",
                icon: Mail,
                color: "red",
                label: "Email",
                value: "yashbajpai1585@gmail.com",
              },
              {
                href: "https://www.linkedin.com/in/yashbajpai7106",
                icon: Linkedin,
                color: "blue",
                label: "LinkedIn",
                value: "Connect with me",
              },
              {
                href: "https://github.com/yashbajpai",
                icon: Github,
                color: "purple",
                label: "GitHub",
                value: "View my code",
              },
            ].map((contact, index) => (
              <motion.a
                key={contact.label}
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-gray-900/80 to-black/80 p-6 rounded-lg border border-red-900/30 hover:border-red-500/50 transition-all duration-300 group backdrop-blur-sm hover:shadow-xl hover:shadow-red-500/20"
              >
                <div className="p-3 bg-red-600/20 rounded-lg w-fit mx-auto mb-3">
                  <contact.icon className="w-8 h-8 text-red-400 group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-white font-semibold mb-1">{contact.label}</p>
                <p className="text-gray-400 text-sm">{contact.value}</p>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a href="/resume.pdf" download className="inline-block">
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg hover:shadow-xl hover:shadow-red-500/25 transition-all duration-300 flex items-center"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Resume
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default function Portfolio() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <TechStackSection />
      <ContactSection />

      {/* Netflix-style Footer */}
      <motion.footer
        className="py-8 bg-black/90 border-t border-red-900/30 relative z-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6 text-center relative">
          <p className="text-gray-400 flex items-center justify-center">
            <Film className="w-4 h-4 mr-2 text-red-500" />© 2025 Yash Bajpai. Crafted with passion for innovation.
          </p>
        </div>
      </motion.footer>
    </div>
  )
}
