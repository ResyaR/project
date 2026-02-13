"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Globe, 
    Smartphone, 
    Cpu, 
    Cog, 
    Palette, 
    Grid3X3,
    ExternalLink,
    Github,
    Play,
    X,
    Menu,
    MapPin,
    Phone,
    Mail,
    Award,
    Users,
    BookOpen,
    ArrowRight,
    ChevronDown,
    type LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

// ──────── TypeScript Interfaces ────────
interface Project {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    category: string;
    student_name: string;
    student_class: string;
    tech_stack: string[];
    demo_url: string;
    repo_url: string;
    video_url: string;
    is_featured: boolean;
}

interface Category {
    id: number;
    name: string;
    slug: string;
    icon: string;
}

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
    Grid3X3: Grid3X3,
    Globe: Globe,
    Smartphone: Smartphone,
    Cpu: Cpu,
    Cog: Cog,
    Palette: Palette
};

// Logo URL
const LOGO_URL = "/logo.png";

// Header / Navbar Component
const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    const navLinks = [
        { label: 'Project', href: '#projects', section: 'projects' },
        { label: 'Tentang Kami', href: '#about', section: 'about' },
        { label: 'Kontak', href: '#footer', section: 'footer' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            
            // Active section detection
            const sections = ['footer', 'about', 'projects'];
            for (const sectionId of sections) {
                const el = document.getElementById(sectionId);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 150) {
                        setActiveSection(sectionId);
                        return;
                    }
                }
            }
            setActiveSection('');
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e: React.MouseEvent, href: string) => {
        e.preventDefault();
        setMobileMenuOpen(false);
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled
                    ? 'header-scrolled py-3'
                    : 'py-5'
            }`}
            data-testid="header"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                <div className="flex items-center justify-between">
                    {/* Logo & Brand */}
                    <motion.a
                        href="#"
                        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="flex items-center gap-3 group"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="relative">
                            <img
                                src={LOGO_URL}
                                alt="Logo SMKN 1 Jenangan"
                                className={`object-contain rounded-lg shadow-md transition-all duration-300 ${
                                    scrolled ? 'w-9 h-9' : 'w-11 h-11'
                                }`}
                            />
                            <div className="absolute -inset-1 rounded-lg bg-[#2c595a]/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="hidden sm:block">
                            <p className={`font-bold tracking-tight transition-all duration-300 ${
                                scrolled ? 'text-slate-900 text-sm' : 'text-slate-800 text-base'
                            }`}>
                                SMKN 1 Jenangan
                            </p>
                            <p className={`text-slate-500 transition-all duration-300 ${
                                scrolled ? 'text-[10px]' : 'text-xs'
                            }`}>
                                Ponorogo, Jawa Timur
                            </p>
                        </div>
                    </motion.a>

                    {/* Desktop Navigation */}
                    <motion.nav
                        className="hidden md:flex items-center gap-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {navLinks.map((link, idx) => {
                            const isActive = activeSection === link.section;
                            return (
                                <motion.a
                                    key={idx}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className={`nav-link-premium ${isActive ? 'nav-link-active' : ''}`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.92 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                                >
                                    {isActive && (
                                        <motion.span
                                            className="nav-active-bg"
                                            layoutId="navIndicator"
                                            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10">{link.label}</span>
                                </motion.a>
                            );
                        })}
                        <div className="w-px h-6 bg-slate-200/60 mx-2" />
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.92 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        >
                            <Button
                                size="sm"
                                className="bg-[#2c595a] hover:bg-[#1f4041] text-white rounded-full px-5 text-sm gap-1.5 shadow-lg shadow-[#2c595a]/25 hover:shadow-[#2c595a]/40 transition-all duration-300"
                                onClick={(e) => handleNavClick(e, '#projects')}
                            >
                                Lihat Project
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Button>
                        </motion.div>
                    </motion.nav>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-sm"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileTap={{ scale: 0.9, rotate: 15 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                        <AnimatePresence mode="wait">
                            {mobileMenuOpen ? (
                                <motion.div key="close" initial={{ rotate: -90, opacity: 0, scale: 0.5 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 90, opacity: 0, scale: 0.5 }} transition={{ duration: 0.25, type: 'spring' }}>
                                    <X className="w-5 h-5 text-slate-700" />
                                </motion.div>
                            ) : (
                                <motion.div key="menu" initial={{ rotate: 90, opacity: 0, scale: 0.5 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: -90, opacity: 0, scale: 0.5 }} transition={{ duration: 0.25, type: 'spring' }}>
                                    <Menu className="w-5 h-5 text-slate-700" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            className="md:hidden mt-4 mobile-menu"
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 25 }}
                        >
                            <div className="py-4 px-2 space-y-1">
                                {navLinks.map((link, idx) => {
                                    const isActive = activeSection === link.section;
                                    return (
                                        <motion.a
                                            key={idx}
                                            href={link.href}
                                            onClick={(e) => handleNavClick(e, link.href)}
                                            className={`mobile-nav-link ${isActive ? 'mobile-nav-active' : ''}`}
                                            initial={{ opacity: 0, x: -30, scale: 0.9 }}
                                            animate={{ opacity: 1, x: 0, scale: 1 }}
                                            transition={{ delay: idx * 0.08, type: 'spring', stiffness: 300, damping: 24 }}
                                            whileTap={{ scale: 0.95, x: 5 }}
                                        >
                                            {isActive && (
                                                <motion.span
                                                    className="mobile-active-dot"
                                                    layoutId="mobileNavDot"
                                                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                                />
                                            )}
                                            {link.label}
                                        </motion.a>
                                    );
                                })}
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ delay: 0.25, type: 'spring', stiffness: 300, damping: 24 }}
                                    className="pt-3"
                                >
                                    <motion.div whileTap={{ scale: 0.96 }}>
                                        <Button
                                            className="w-full bg-[#2c595a] hover:bg-[#1f4041] text-white rounded-xl gap-2 shadow-lg shadow-[#2c595a]/20"
                                            onClick={(e) => handleNavClick(e, '#projects')}
                                        >
                                            Lihat Project
                                            <ArrowRight className="w-4 h-4" />
                                        </Button>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

// Hero Section Component
const HeroSection = () => {
    const scrollToProjects = () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative min-h-screen flex items-center hero-glow overflow-hidden" data-testid="hero-section">
            {/* Decorative elements */}
            <div className="decoration-circle w-96 h-96 bg-[#2c595a]/60 -top-48 -right-48" />
            <div className="decoration-circle w-64 h-64 bg-amber-400 bottom-20 -left-32" />
            
            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-32 md:py-40">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Content */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-3">
                            <img 
                                src={LOGO_URL} 
                                alt="Logo SMKN 1 Jenangan Ponorogo" 
                                className="w-14 h-14 object-contain rounded-lg shadow-md"
                                data-testid="school-logo"
                            />
                            <div>
                                <p className="text-sm font-semibold text-[#2c595a] tracking-wide uppercase">SMKN 1 Jenangan</p>
                                <p className="text-xs text-slate-500">Ponorogo, Jawa Timur</p>
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1]" data-testid="hero-title">
                                Karya Siswa-Siswi
                            </h1>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2c595a] tracking-tight leading-[1.1]">
                                RPL
                            </h1>
                        </div>
                        
                        <p className="text-base md:text-lg text-slate-600 max-w-lg leading-relaxed">
                            Jelajahi koleksi project inovatif dari siswa-siswi terbaik SMKN 1 Jenangan Ponorogo. 
                            Dari pengembangan web hingga robotika, temukan potensi generasi masa depan.
                        </p>
                        
                        <div className="flex flex-wrap gap-4 pt-2">
                            <Button 
                                size="lg" 
                                className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 gap-2 group"
                                onClick={scrollToProjects}
                                data-testid="explore-btn"
                            >
                                Lihat Project
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button 
                                size="lg" 
                                variant="outline" 
                                className="rounded-full px-8 border-slate-300 hover:bg-slate-50"
                                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                                data-testid="about-btn"
                            >
                                Tentang Kami
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-8 pt-2">
                            <div>
                                <p className="text-3xl font-bold text-slate-900">9</p>
                                <p className="text-sm text-slate-500">Program Keahlian</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-slate-900">60+</p>
                                <p className="text-sm text-slate-500">Tahun Berdiri</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-slate-900">A</p>
                                <p className="text-sm text-slate-500">Akreditasi</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Content - Image Collage */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="col-span-2"
                            >
                                <img 
                                    src="https://images.unsplash.com/photo-1669023414180-4dcf35d943e1?w=800&auto=format&fit=crop&q=60" 
                                    alt="Student Programming"
                                    className="w-full h-48 object-cover rounded-2xl shadow-lg"
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <img 
                                    src="https://images.unsplash.com/photo-1601119462238-d7f347e41844?w=600&auto=format&fit=crop&q=60" 
                                    alt="Student Welding"
                                    className="w-full h-40 object-cover rounded-2xl shadow-lg"
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <img 
                                    src="https://images.unsplash.com/photo-1743495851178-56ace672e545?w=600&auto=format&fit=crop&q=60" 
                                    alt="Robotics Project"
                                    className="w-full h-40 object-cover rounded-2xl shadow-lg"
                                />
                            </motion.div>
                        </div>
                        
                        {/* Floating Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 }}
                            className="absolute -bottom-4 -left-4 glass-card rounded-xl p-4 shadow-xl"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#2c595a]/10 flex items-center justify-center">
                                    <Award className="w-5 h-5 text-[#2c595a]" />
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-900 text-sm">Akreditasi Unggul</p>
                                    <p className="text-xs text-slate-500">Peringkat A</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 cursor-pointer"
                    onClick={scrollToProjects}
                >
                    <span className="text-sm text-slate-400">Scroll untuk melihat</span>
                    <ChevronDown className="w-5 h-5 text-slate-400 animate-bounce" />
                </motion.div>
            </div>
        </section>
    );
};

// Filter Bar Component
interface FilterBarProps {
    categories: Category[];
    activeCategory: string;
    onCategoryChange: (slug: string) => void;
}

const FilterBar = ({ categories, activeCategory, onCategoryChange }: FilterBarProps) => {
    return (
        <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar" data-testid="filter-bar">
            {categories.map((category, index) => {
                const IconComponent = iconMap[category.icon] || Grid3X3;
                return (
                    <motion.button
                        key={category.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => onCategoryChange(category.slug)}
                        className={`filter-pill ${activeCategory === category.slug ? 'active' : ''}`}
                        data-testid={`filter-${category.slug}`}
                    >
                        <IconComponent className="w-4 h-4" />
                        {category.name}
                    </motion.button>
                );
            })}
        </div>
    );
};

// Project Card Component
interface ProjectCardProps {
    project: Project;
    index: number;
    onClick: (project: Project) => void;
}

const ProjectCard = ({ project, index, onClick }: ProjectCardProps) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            whileHover={{ y: -8 }}
            className="project-card cursor-pointer group"
            onClick={() => onClick(project)}
            data-testid={`project-card-${project.id}`}
        >
            <div className="relative overflow-hidden">
                <img 
                    src={project.thumbnail} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Category Badge */}
                <div className="absolute top-3 right-3">
                    <span className="category-badge">
                        {project.category}
                    </span>
                </div>

                {/* Featured Badge */}
                {project.is_featured && (
                    <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 rounded-md text-xs font-bold bg-amber-500 text-white">
                            Unggulan
                        </span>
                    </div>
                )}

                {/* Play Icon for Video */}
                {project.video_url && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                            <Play className="w-6 h-6 text-slate-900 ml-1" />
                        </div>
                    </div>
                )}
            </div>

            <div className="p-5">
                <h3 className="font-semibold text-lg text-slate-900 mb-2 group-hover:text-[#2c595a] transition-colors line-clamp-2">
                    {project.title}
                </h3>
                <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                    {project.description}
                </p>

                {/* Tech Stack */}
                {project.tech_stack && project.tech_stack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tech_stack.slice(0, 3).map((tech, i) => (
                            <span key={i} className="tech-tag">{tech}</span>
                        ))}
                        {project.tech_stack.length > 3 && (
                            <span className="tech-tag">+{project.tech_stack.length - 3}</span>
                        )}
                    </div>
                )}
                
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#2c595a]/10 flex items-center justify-center text-[#1f4041] font-bold text-sm">
                            {project.student_name?.charAt(0)}
                        </div>
                        <div>
                            <p className="font-medium text-sm text-slate-700">{project.student_name}</p>
                            <p className="text-xs text-slate-400 font-mono">{project.student_class}</p>
                        </div>
                    </div>
                    <div className="flex gap-1.5">
                        {project.demo_url && (
                            <div className="w-8 h-8 rounded-full bg-[#2c595a]/5 flex items-center justify-center group-hover:bg-[#2c595a]/10 transition-colors">
                                <ExternalLink className="w-4 h-4 text-[#2c595a]" />
                            </div>
                        )}
                        {project.repo_url && (
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                                <Github className="w-4 h-4 text-slate-600" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// Project Detail Modal
interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
    if (!project) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden" data-testid="project-modal">
                <ScrollArea className="max-h-[90vh]">
                    <div className="p-6">
                        <DialogHeader className="mb-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <Badge className="mb-3 bg-[#2c595a]/10 text-[#1f4041] hover:bg-[#2c595a]/10">
                                        {project.category}
                                    </Badge>
                                    <DialogTitle className="text-2xl md:text-3xl font-bold text-slate-900">
                                        {project.title}
                                    </DialogTitle>
                                </div>
                            </div>
                        </DialogHeader>

                        {/* Video Player */}
                        {project.video_url && (
                            <div className="video-container mb-6">
                                <iframe 
                                    src={project.video_url}
                                    title={project.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        )}

                        {/* Thumbnail if no video */}
                        {!project.video_url && (
                            <img 
                                src={project.thumbnail} 
                                alt={project.title}
                                className="w-full h-64 object-cover rounded-xl mb-6"
                            />
                        )}

                        {/* Description */}
                        <div className="mb-6">
                            <h4 className="font-semibold text-slate-900 mb-2">Deskripsi Project</h4>
                            <p className="text-slate-600 leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        {/* Tech Stack */}
                        {project.tech_stack && project.tech_stack.length > 0 && (
                            <div className="mb-6">
                                <h4 className="font-semibold text-slate-900 mb-3">Teknologi yang Digunakan</h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech_stack.map((tech, idx) => (
                                        <span key={idx} className="tech-tag">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Student Info */}
                        <div className="bg-slate-50 rounded-xl p-4 mb-6">
                            <h4 className="font-semibold text-slate-900 mb-3">Informasi Pembuat</h4>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#2c595a]/10 flex items-center justify-center">
                                    <Users className="w-6 h-6 text-[#2c595a]" />
                                </div>
                                <div>
                                    <p className="font-medium text-slate-900">{project.student_name}</p>
                                    <p className="text-sm text-slate-500 font-mono">{project.student_class}</p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3">
                            {project.demo_url && (
                                <Button 
                                    className="bg-[#2c595a] hover:bg-[#1f4041] gap-2"
                                    onClick={() => window.open(project.demo_url, '_blank')}
                                    data-testid="demo-link"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    Lihat Demo
                                </Button>
                            )}
                            {project.repo_url && (
                                <Button 
                                    variant="outline"
                                    className="gap-2"
                                    onClick={() => window.open(project.repo_url, '_blank')}
                                    data-testid="repo-link"
                                >
                                    <Github className="w-4 h-4" />
                                    Source Code
                                </Button>
                            )}
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

// Projects Section
interface ProjectsSectionProps {
    projects: Project[];
    categories: Category[];
    activeCategory: string;
    onCategoryChange: (slug: string) => void;
    onProjectClick: (project: Project) => void;
}

const ProjectsSection = ({ projects, categories, activeCategory, onCategoryChange, onProjectClick }: ProjectsSectionProps) => {
    const filteredProjects = activeCategory === 'all' 
        ? projects 
        : projects.filter(p => p.category === activeCategory);

    // Sort to put featured first
    const sortedProjects = [...filteredProjects].sort((a, b) => {
        if (a.is_featured && !b.is_featured) return -1;
        if (!a.is_featured && b.is_featured) return 1;
        return 0;
    });

    return (
        <section id="projects" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-slate-50/50" data-testid="projects-section">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-1 bg-[#2c595a] rounded-full" />
                        <span className="text-[#2c595a] font-semibold text-sm uppercase tracking-wider">Galeri Project RPL</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                        Project Siswa-Siswi RPL
                    </h2>
                    <p className="text-slate-600 max-w-2xl text-base md:text-lg">
                        Karya inovatif dari siswa-siswi Rekayasa Perangkat Lunak SMKN 1 Jenangan Ponorogo.
                    </p>
                </motion.div>

                {/* Filter Bar */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10 sticky top-4 z-20 bg-white/80 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-slate-200/50"
                >
                    <FilterBar 
                        categories={categories}
                        activeCategory={activeCategory}
                        onCategoryChange={onCategoryChange}
                    />
                </motion.div>

                {/* Uniform Grid */}
                <motion.div 
                    layout 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {sortedProjects.map((project, index) => (
                            <ProjectCard 
                                key={project.id}
                                project={project}
                                index={index}
                                onClick={onProjectClick}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProjects.length === 0 && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300"
                    >
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                            <Grid3X3 className="w-8 h-8 text-slate-400" />
                        </div>
                        <p className="text-slate-500 text-lg">Belum ada project di kategori ini.</p>
                        <p className="text-slate-400 text-sm mt-1">Coba pilih kategori lain</p>
                    </motion.div>
                )}

                {/* Stats Bar */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 flex flex-wrap justify-center gap-8 p-6 bg-white rounded-2xl border border-slate-200"
                >
                    <div className="text-center">
                        <p className="text-3xl font-bold text-slate-900">{filteredProjects.length}</p>
                        <p className="text-sm text-slate-500">Total Project</p>
                    </div>
                    <div className="w-px bg-slate-200 hidden sm:block" />
                    <div className="text-center">
                        <p className="text-3xl font-bold text-[#2c595a]">{filteredProjects.filter(p => p.is_featured).length}</p>
                        <p className="text-sm text-slate-500">Project Unggulan</p>
                    </div>
                    <div className="w-px bg-slate-200 hidden sm:block" />
                    <div className="text-center">
                        <p className="text-3xl font-bold text-amber-500">{categories.length - 1}</p>
                        <p className="text-sm text-slate-500">Kategori</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// About Section
const AboutSection = () => {
    const achievements = [
        { icon: Award, title: "Sekolah Unggulan", desc: "Akreditasi A" },
        { icon: Globe, title: "Bertaraf Internasional", desc: "World Skills Competition" },
        { icon: BookOpen, title: "9 Program Keahlian", desc: "Bidang Keteknikan" },
    ];

    return (
        <section id="about" className="py-24 md:py-32 about-pattern" data-testid="about-section">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <span className="text-[#2c595a] font-semibold text-sm uppercase tracking-wider">Tentang Kami</span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
                            SMK Teknik Tertua di Ponorogo
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            SMKN 1 Jenangan Ponorogo didirikan pada tahun 1964, menjadikannya sekolah teknik 
                            tertua di Ponorogo. Dengan akreditasi A dan status Sekolah Bertaraf Internasional, 
                            kami berkomitmen untuk mencetak lulusan yang siap bersaing di tingkat global.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            Sekolah kami menawarkan 9 program keahlian di bidang keteknikan, termasuk 
                            Rekayasa Perangkat Lunak, Teknik Elektronik Industri, Teknik Pemesinan, dan lainnya.
                        </p>

                        {/* Achievements */}
                        <div className="grid sm:grid-cols-3 gap-4 pt-4">
                            {achievements.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm"
                                >
                                    <item.icon className="w-8 h-8 text-[#2c595a] mb-2" />
                                    <h4 className="font-semibold text-slate-900 text-sm">{item.title}</h4>
                                    <p className="text-xs text-slate-500">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right - Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <img 
                                src="/smkn1-jenangan.png" 
                                alt="SMKN 1 Jenangan Ponorogo"
                                className="w-full h-96 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <p className="text-white font-semibold text-xl">SMKN 1 Jenangan Ponorogo</p>
                                <p className="text-white/80 text-sm">Sejak 1964</p>
                            </div>
                        </div>

                        {/* Floating Stats */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="absolute -bottom-6 -right-6 bg-white rounded-xl p-5 shadow-xl border border-slate-100"
                        >
                            <div className="text-center">
                                <p className="text-4xl font-bold text-[#2c595a]">1000+</p>
                                <p className="text-sm text-slate-500">Siswa Aktif</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// Footer Component
const Footer = () => {
    return (
        <footer id="footer" className="footer-gradient py-16 border-t border-slate-200" data-testid="footer">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <img 
                                src={LOGO_URL} 
                                alt="Logo SMKN 1 Jenangan" 
                                className="w-12 h-12 object-contain rounded-lg"
                            />
                            <div>
                                <p className="font-bold text-slate-900">SMKN 1 Jenangan</p>
                                <p className="text-xs text-slate-500">Ponorogo, Jawa Timur</p>
                            </div>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed max-w-sm mb-4">
                            Sekolah Menengah Kejuruan Negeri yang fokus pada bidang keteknikan dengan 
                            akreditasi A dan status Sekolah Bertaraf Internasional.
                        </p>
                        <p className="text-slate-500 text-sm font-medium">
                            &quot;SMKN 1 Jenangan! Jaya Luar Biasa!&quot;
                        </p>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold text-slate-900 mb-4">Kontak</h4>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-[#2c595a] mt-1 flex-shrink-0" />
                                <p className="text-sm text-slate-600">
                                    Jl. Niken Gandini No. 98, Setono, Jenangan, Ponorogo
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-[#2c595a] flex-shrink-0" />
                                <p className="text-sm text-slate-600">(0352) 461473</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-[#2c595a] flex-shrink-0" />
                                <p className="text-sm text-slate-600">info@smkn1jenpo.sch.id</p>
                            </div>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-semibold text-slate-900 mb-4">Program Keahlian</h4>
                        <ul className="space-y-2">
                            {[
                                "Rekayasa Perangkat Lunak",
                                "Teknik Elektronik Industri",
                                "Teknik Pemesinan",
                                "Teknik Pengelasan",
                                "Teknik Otomasi Industri"
                            ].map((item, idx) => (
                                <li key={idx}>
                                    <span className="text-sm text-slate-600 hover:text-[#2c595a] transition-colors cursor-pointer">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-8 border-t border-slate-200">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-slate-500">
                            © 2024 SMKN 1 Jenangan Ponorogo. All rights reserved.
                        </p>
                        <p className="text-sm text-slate-500">
                            project.smkn1jenpo.sch.id
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// Dummy Categories
const DUMMY_CATEGORIES = [
    { id: 1, name: "Semua", slug: "all", icon: "Grid3X3" },
    { id: 2, name: "Web", slug: "Web", icon: "Globe" },
    { id: 3, name: "Mobile", slug: "Mobile", icon: "Smartphone" },
    { id: 4, name: "IoT", slug: "IoT", icon: "Cpu" },
    { id: 5, name: "Desktop", slug: "Desktop", icon: "Cog" },
    { id: 6, name: "UI/UX", slug: "UI/UX", icon: "Palette" },
];

// Dummy Projects
const DUMMY_PROJECTS = [
    {
        id: 1,
        title: "Sistem Informasi Perpustakaan Digital",
        description: "Aplikasi web untuk manajemen perpustakaan sekolah secara digital. Fitur meliputi pencarian buku, peminjaman online, dan laporan statistik perpustakaan.",
        thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=60",
        category: "Web",
        student_name: "Ahmad Rizky",
        student_class: "XII RPL 1",
        tech_stack: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"],
        demo_url: "#",
        repo_url: "#",
        video_url: "",
        is_featured: true,
    },
    {
        id: 2,
        title: "Aplikasi Absensi Siswa Berbasis QR Code",
        description: "Aplikasi mobile untuk absensi siswa menggunakan QR Code. Guru dapat memantau kehadiran siswa secara real-time melalui dashboard.",
        thumbnail: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&auto=format&fit=crop&q=60",
        category: "Mobile",
        student_name: "Siti Nurhaliza",
        student_class: "XII RPL 2",
        tech_stack: ["Flutter", "Firebase", "Dart"],
        demo_url: "",
        repo_url: "#",
        video_url: "",
        is_featured: true,
    },
    {
        id: 3,
        title: "Smart Greenhouse Monitoring System",
        description: "Sistem monitoring greenhouse berbasis IoT untuk memantau suhu, kelembaban, dan intensitas cahaya secara otomatis menggunakan sensor.",
        thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&auto=format&fit=crop&q=60",
        category: "IoT",
        student_name: "Budi Santoso",
        student_class: "XII RPL 1",
        tech_stack: ["Arduino", "ESP32", "MQTT", "React"],
        demo_url: "",
        repo_url: "#",
        video_url: "",
        is_featured: false,
    },
    {
        id: 4,
        title: "E-Kantin: Aplikasi Pemesanan Makanan",
        description: "Platform pemesanan makanan kantin sekolah secara online. Siswa dapat memesan dan membayar melalui aplikasi, mengurangi antrian di kantin.",
        thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=60",
        category: "Web",
        student_name: "Dewi Lestari",
        student_class: "XI RPL 1",
        tech_stack: ["Next.js", "Prisma", "MySQL", "Stripe"],
        demo_url: "#",
        repo_url: "#",
        video_url: "",
        is_featured: false,
    },
    {
        id: 5,
        title: "Aplikasi Kasir Desktop untuk UMKM",
        description: "Aplikasi point-of-sale (POS) desktop untuk membantu pelaku UMKM dalam mengelola transaksi penjualan, stok barang, dan laporan keuangan.",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=60",
        category: "Desktop",
        student_name: "Eko Prasetyo",
        student_class: "XII RPL 2",
        tech_stack: ["Java", "JavaFX", "SQLite"],
        demo_url: "",
        repo_url: "#",
        video_url: "",
        is_featured: false,
    },
    {
        id: 6,
        title: "Redesign UI/UX Website Sekolah",
        description: "Proyek redesign tampilan website resmi SMKN 1 Jenangan agar lebih modern, responsif, dan user-friendly dengan pendekatan mobile-first.",
        thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format&fit=crop&q=60",
        category: "UI/UX",
        student_name: "Fitri Handayani",
        student_class: "XI RPL 2",
        tech_stack: ["Figma", "Adobe XD", "HTML", "CSS"],
        demo_url: "#",
        repo_url: "",
        video_url: "",
        is_featured: true,
    },
];

// Main Page Component
export default function Home() {
    const [projects] = useState<Project[]>(DUMMY_PROJECTS);
    const [categories] = useState<Category[]>(DUMMY_CATEGORIES);
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Header />
            <HeroSection />
            <ProjectsSection 
                projects={projects}
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                onProjectClick={handleProjectClick}
            />
            <AboutSection />
            <Footer />
            <ProjectModal 
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
}
