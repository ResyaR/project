"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    FolderKanban,
    Users,
    Settings,
    LogOut,
    Plus,
    Search,
    MoreVertical,
    Edit,
    Trash2,
    Star,
    StarOff,
    ChevronLeft,
    ChevronRight,
    X,
    Upload,
    Grid3X3,
    Menu,
    Home,
    Filter,
    Tag,
    AlignJustify,
} from "lucide-react";

// ──────────────── TYPES ────────────────
interface DashboardProject {
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
    is_featured: boolean;
    created_at: string;
}

interface DashboardCategory {
    id: number;
    name: string;
    slug: string;
}

interface ProjectFormData {
    title: string;
    description: string;
    category: string;
    student_name: string;
    student_class: string;
    tech_stack: string[];
    demo_url: string;
    repo_url: string;
    is_featured: boolean;
}

// ──────────────── CONSTANTS ────────────────
const LOGO_URL = "/logo.png";
const SIDEBAR_COLOR = "#2c595a";

// ──────────────── DUMMY DATA ────────────────
const CATEGORIES = [
    { id: 1, name: "Semua", slug: "all" },
    { id: 2, name: "Web", slug: "Web" },
    { id: 3, name: "Mobile", slug: "Mobile" },
    { id: 4, name: "IoT", slug: "IoT" },
    { id: 5, name: "Desktop", slug: "Desktop" },
    { id: 6, name: "UI/UX", slug: "UI/UX" },
];

const INITIAL_PROJECTS = [
    {
        id: 1,
        title: "Sistem Informasi Perpustakaan Digital",
        description: "Aplikasi web untuk manajemen perpustakaan sekolah secara digital dengan fitur peminjaman dan pengembalian buku.",
        thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=60",
        category: "Web",
        student_name: "Ahmad Rizky",
        student_class: "XII RPL 1",
        tech_stack: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"],
        demo_url: "#",
        repo_url: "#",
        is_featured: true,
        created_at: "2024-01-15",
    },
    {
        id: 2,
        title: "Aplikasi Absensi Siswa Berbasis QR Code",
        description: "Aplikasi mobile untuk absensi siswa menggunakan QR Code.",
        thumbnail: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&auto=format&fit=crop&q=60",
        category: "Mobile",
        student_name: "Siti Nurhaliza",
        student_class: "XII RPL 2",
        tech_stack: ["Flutter", "Firebase", "Dart"],
        demo_url: "",
        repo_url: "#",
        is_featured: true,
        created_at: "2024-02-20",
    },
    {
        id: 3,
        title: "Smart Greenhouse Monitoring System",
        description: "Sistem monitoring greenhouse berbasis IoT untuk memantau suhu, kelembaban, dan kondisi tanaman.",
        thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&auto=format&fit=crop&q=60",
        category: "IoT",
        student_name: "Budi Santoso",
        student_class: "XII RPL 1",
        tech_stack: ["Arduino", "ESP32", "MQTT", "React"],
        demo_url: "",
        repo_url: "#",
        is_featured: false,
        created_at: "2024-03-10",
    },
    {
        id: 4,
        title: "E-Kantin: Aplikasi Pemesanan Makanan",
        description: "Platform pemesanan makanan kantin sekolah secara online.",
        thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=60",
        category: "Web",
        student_name: "Dewi Lestari",
        student_class: "XI RPL 1",
        tech_stack: ["Next.js", "Prisma", "MySQL", "Stripe"],
        demo_url: "#",
        repo_url: "#",
        is_featured: false,
        created_at: "2024-04-05",
    },
    {
        id: 5,
        title: "Aplikasi Kasir Desktop untuk UMKM",
        description: "Aplikasi POS desktop untuk mengelola transaksi penjualan dan stok barang.",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=60",
        category: "Desktop",
        student_name: "Eko Prasetyo",
        student_class: "XII RPL 2",
        tech_stack: ["Java", "JavaFX", "SQLite"],
        demo_url: "",
        repo_url: "#",
        is_featured: false,
        created_at: "2024-05-12",
    },
    {
        id: 6,
        title: "Redesign UI/UX Website Sekolah",
        description: "Proyek redesign tampilan website resmi SMKN 1 Jenangan Ponorogo.",
        thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format&fit=crop&q=60",
        category: "UI/UX",
        student_name: "Fitri Handayani",
        student_class: "XI RPL 2",
        tech_stack: ["Figma", "Adobe XD", "HTML", "CSS"],
        demo_url: "#",
        repo_url: "",
        is_featured: true,
        created_at: "2024-06-18",
    },
];

// ──────────────── SIDEBAR ────────────────
interface SidebarProps {
    activeMenu: string;
    onMenuChange: (menu: string) => void;
    isOpen: boolean;
    onClose: () => void;
}

function Sidebar({ activeMenu, onMenuChange, isOpen, onClose }: SidebarProps) {
    const menuItems = [
        { id: "home", label: "Home", icon: "bi-house-door" },
        { id: "projects", label: "Project", icon: "bi-kanban-fill" },
        { id: "categories", label: "Kategori", icon: "bi-tags-fill" },
        { id: "students", label: "Siswa", icon: "bi-people-fill" },
        { id: "settings", label: "Pengaturan", icon: "bi-gear-fill" },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-50 h-screen w-64 overflow-y-auto transition-transform duration-300 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
                style={{ backgroundColor: SIDEBAR_COLOR }}
            >
                {/* Logo & School Name */}
                <div className="text-center py-6 text-white">
                    <div className="mx-auto w-20 h-20 rounded-full overflow-hidden border-2 border-white/20 shadow-lg">
                        <img
                            src={LOGO_URL}
                            alt="Logo SMKN 1 Jenangan"
                            className="w-full h-full object-contain bg-white"
                        />
                    </div>
                    <div className="mt-3 text-lg font-semibold tracking-wide">SMKN 1 JENANGAN</div>
                    <div className="text-xs text-white/60 mt-1">Panel Admin RPL</div>
                </div>

                {/* Menu Items */}
                <nav className="px-2 pb-6">
                    {menuItems.map((item) => {
                        const isActive = activeMenu === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    onMenuChange(item.id);
                                    if (window.innerWidth < 1024) onClose();
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-lg mb-1 transition-all duration-200 ${
                                    isActive
                                        ? "bg-[#f97316] text-white font-semibold shadow-md shadow-orange-500/30"
                                        : "text-white/70 hover:bg-white/10 hover:text-white"
                                }`}
                            >
                                <SidebarIcon name={item.icon} />
                                <span className="capitalize">{item.label}</span>
                            </button>
                        );
                    })}

                    {/* Divider */}
                    <div className="border-t border-white/15 my-3 mx-2" />

                    {/* Logout */}
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-sm rounded-lg text-red-300 hover:bg-red-500/15 hover:text-red-200 transition-all">
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </nav>
            </aside>
        </>
    );
}

// Simple SVG sidebar icons matching bootstrap-icons style
function SidebarIcon({ name }: { name: string }) {
    const icons: Record<string, React.ReactNode> = {
        "bi-house-door": <Home className="w-5 h-5" />,
        "bi-kanban-fill": <FolderKanban className="w-5 h-5" />,
        "bi-tags-fill": <Tag className="w-5 h-5" />,
        "bi-people-fill": <Users className="w-5 h-5" />,
        "bi-gear-fill": <Settings className="w-5 h-5" />,
    };
    return icons[name] || <LayoutDashboard className="w-5 h-5" />;
}

// ──────────────── HEADER ────────────────
function Header({ onMenuToggle }: { onMenuToggle: () => void }) {
    return (
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
            <div className="flex items-center justify-between px-4 py-3">
                <button
                    onClick={onMenuToggle}
                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
                >
                    <AlignJustify className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3">
                    {/* Sub App Grid */}
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-600">
                        <Grid3X3 className="w-5 h-5" />
                    </button>

                    {/* User Profile */}
                    <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: SIDEBAR_COLOR }}>
                            A
                        </div>
                        <div className="hidden sm:block">
                            <p className="text-sm font-semibold text-gray-800 leading-none">Admin</p>
                            <p className="text-xs text-gray-500 mt-0.5">Administrator</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

// ──────────────── STATS CARD ────────────────
function StatsCard({ label, value, borderColor }: { label: string; value: number; borderColor: string }) {
    return (
        <div className={`bg-white p-4 rounded-xl shadow-sm border-l-4 ${borderColor}`}>
            <div className="text-xs text-gray-500 uppercase tracking-wide">{label}</div>
            <div className="text-xl font-bold text-gray-800 mt-1">{value}</div>
        </div>
    );
}

// ──────────────── PROJECT FORM MODAL ────────────────
interface ProjectFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: DashboardProject | null;
    onSave: (data: ProjectFormData) => void;
}

function ProjectFormModal({ isOpen, onClose, project, onSave }: ProjectFormModalProps) {
    const isEdit = !!project;
    const [form, setForm] = useState<ProjectFormData>(
        project || {
            title: "",
            description: "",
            category: "Web",
            student_name: "",
            student_class: "",
            tech_stack: [],
            demo_url: "",
            repo_url: "",
            is_featured: false,
        }
    );
    const [techInput, setTechInput] = useState("");

    const handleAddTech = () => {
        if (techInput.trim() && !form.tech_stack.includes(techInput.trim())) {
            setForm({ ...form, tech_stack: [...form.tech_stack, techInput.trim()] });
            setTechInput("");
        }
    };

    const handleRemoveTech = (tech: string) => {
        setForm({ ...form, tech_stack: form.tech_stack.filter((t) => t !== tech) });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200" style={{ backgroundColor: SIDEBAR_COLOR }}>
                    <div>
                        <h2 className="text-lg font-bold text-white">
                            {isEdit ? "Edit Project" : "Tambah Project Baru"}
                        </h2>
                        <p className="text-sm text-white/70">
                            {isEdit ? "Perbarui informasi project" : "Isi detail project yang akan ditambahkan"}
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>

                {/* Form Body */}
                <div className="px-6 py-5 overflow-y-auto max-h-[calc(90vh-140px)] space-y-4">
                    {/* Thumbnail Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-5 text-center hover:border-teal-400 transition-colors cursor-pointer group">
                            {project?.thumbnail ? (
                                <img src={project.thumbnail} alt="" className="w-full h-36 object-cover rounded-lg" />
                            ) : (
                                <>
                                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2 group-hover:text-teal-500 transition-colors" />
                                    <p className="text-sm text-gray-500">Klik atau drag gambar ke sini</p>
                                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP (maks. 2MB)</p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Judul Project *</label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            placeholder="Masukkan judul project..."
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none text-sm"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi *</label>
                        <textarea
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            placeholder="Jelaskan tentang project ini..."
                            rows={3}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none text-sm resize-none"
                        />
                    </div>

                    {/* Category & Featured */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Kategori *</label>
                            <select
                                value={form.category}
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none text-sm bg-white"
                            >
                                {CATEGORIES.filter((c) => c.slug !== "all").map((cat) => (
                                    <option key={cat.id} value={cat.slug}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
                            <button
                                type="button"
                                onClick={() => setForm({ ...form, is_featured: !form.is_featured })}
                                className={`w-full px-4 py-2.5 rounded-lg border text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                                    form.is_featured
                                        ? "border-amber-400 bg-amber-50 text-amber-700"
                                        : "border-gray-300 bg-white text-gray-600 hover:border-amber-300"
                                }`}
                            >
                                {form.is_featured ? <Star className="w-4 h-4 fill-amber-500" /> : <StarOff className="w-4 h-4" />}
                                {form.is_featured ? "Unggulan" : "Biasa"}
                            </button>
                        </div>
                    </div>

                    {/* Student Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Siswa *</label>
                            <input
                                type="text"
                                value={form.student_name}
                                onChange={(e) => setForm({ ...form, student_name: e.target.value })}
                                placeholder="Nama lengkap siswa"
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Kelas *</label>
                            <input
                                type="text"
                                value={form.student_class}
                                onChange={(e) => setForm({ ...form, student_class: e.target.value })}
                                placeholder="cth: XII RPL 1"
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none text-sm"
                            />
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Tech Stack</label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={techInput}
                                onChange={(e) => setTechInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTech())}
                                placeholder="Tambah teknologi..."
                                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none text-sm"
                            />
                            <button
                                type="button"
                                onClick={handleAddTech}
                                className="px-4 py-2.5 rounded-lg text-sm font-medium text-white transition-colors"
                                style={{ backgroundColor: SIDEBAR_COLOR }}
                            >
                                Tambah
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {form.tech_stack.map((tech, idx) => (
                                <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium">
                                    {tech}
                                    <button onClick={() => handleRemoveTech(tech)} className="hover:text-red-500">
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Demo URL</label>
                            <input
                                type="url"
                                value={form.demo_url}
                                onChange={(e) => setForm({ ...form, demo_url: e.target.value })}
                                placeholder="https://..."
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Repository URL</label>
                            <input
                                type="url"
                                value={form.repo_url}
                                onChange={(e) => setForm({ ...form, repo_url: e.target.value })}
                                placeholder="https://github.com/..."
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <button onClick={onClose} className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                        Batal
                    </button>
                    <button
                        onClick={() => { onSave(form); onClose(); }}
                        className="px-6 py-2.5 rounded-lg text-sm font-medium text-white transition-colors shadow-md hover:opacity-90"
                        style={{ backgroundColor: SIDEBAR_COLOR }}
                    >
                        {isEdit ? "Simpan Perubahan" : "Tambah Project"}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

// ──────────────── DELETE MODAL ────────────────
interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    projectTitle: string | undefined;
}

function DeleteModal({ isOpen, onClose, onConfirm, projectTitle }: DeleteModalProps) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                    <Trash2 className="w-7 h-7 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Hapus Project?</h3>
                <p className="text-sm text-gray-500 text-center mb-6">
                    Apakah Anda yakin ingin menghapus &quot;<span className="font-medium text-gray-700">{projectTitle}</span>&quot;? Tindakan ini tidak dapat dibatalkan.
                </p>
                <div className="flex gap-3">
                    <button onClick={onClose} className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 border border-gray-300 hover:bg-gray-50 transition-colors">
                        Batal
                    </button>
                    <button onClick={() => { onConfirm(); onClose(); }} className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors">
                        Ya, Hapus
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

// ──────────────── ACTION DROPDOWN ────────────────
interface ActionDropdownProps {
    isOpen: boolean;
    onToggle: () => void;
    onEdit: () => void;
    onDelete: () => void;
    onToggleFeatured: () => void;
    isFeatured: boolean;
}

function ActionDropdown({ isOpen, onToggle, onEdit, onDelete, onToggleFeatured, isFeatured }: ActionDropdownProps) {
    return (
        <div className="relative">
            <button onClick={onToggle} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <MoreVertical className="w-4 h-4 text-gray-500" />
            </button>
            {isOpen && (
                <div className="absolute right-0 top-10 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-1.5 z-30">
                    <button onClick={onEdit} className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <Edit className="w-4 h-4 text-gray-500" />
                        Edit Project
                    </button>
                    <button onClick={onToggleFeatured} className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        {isFeatured ? <StarOff className="w-4 h-4 text-gray-500" /> : <Star className="w-4 h-4 text-amber-500" />}
                        {isFeatured ? "Hapus Unggulan" : "Jadikan Unggulan"}
                    </button>
                    <div className="my-1 border-t border-gray-100" />
                    <button onClick={onDelete} className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                        Hapus Project
                    </button>
                </div>
            )}
        </div>
    );
}

// ──────────────── MAIN DASHBOARD ────────────────
export default function DashboardPage() {
    const [projects, setProjects] = useState<DashboardProject[]>(INITIAL_PROJECTS);
    const [activeMenu, setActiveMenu] = useState<string>("home");
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filterCategory, setFilterCategory] = useState<string>("all");
    const [showFormModal, setShowFormModal] = useState<boolean>(false);
    const [editingProject, setEditingProject] = useState<DashboardProject | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [deletingProject, setDeletingProject] = useState<DashboardProject | null>(null);
    const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 5;

    // Filter & Search
    const filteredProjects = projects.filter((p) => {
        const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.student_name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchCategory = filterCategory === "all" || p.category === filterCategory;
        return matchSearch && matchCategory;
    });

    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    const paginatedProjects = filteredProjects.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handlers
    const handleSaveProject = (formData: ProjectFormData) => {
        if (editingProject) {
            setProjects(projects.map((p) => (p.id === editingProject.id ? { ...p, ...formData } : p)));
        } else {
            const newProject = {
                ...formData,
                id: Math.max(...projects.map((p) => p.id)) + 1,
                thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=60",
                created_at: new Date().toISOString().split("T")[0],
            };
            setProjects([newProject, ...projects]);
        }
        setEditingProject(null);
    };

    const handleDeleteProject = () => {
        if (deletingProject) {
            setProjects(projects.filter((p) => p.id !== deletingProject.id));
            setDeletingProject(null);
        }
    };

    const handleToggleFeatured = (project: DashboardProject) => {
        setProjects(projects.map((p) => (p.id === project.id ? { ...p, is_featured: !p.is_featured } : p)));
        setOpenDropdownId(null);
    };

    const stats = [
        { label: "Total Project", value: projects.length, borderColor: "border-blue-500" },
        { label: "Project Unggulan", value: projects.filter((p) => p.is_featured).length, borderColor: "border-green-500" },
        { label: "Kategori Aktif", value: CATEGORIES.length - 1, borderColor: "border-yellow-500" },
        { label: "Total Siswa", value: new Set(projects.map((p) => p.student_name)).size, borderColor: "border-purple-500" },
    ];

    // Category distribution for dashboard
    const categoryDistribution = CATEGORIES.filter(c => c.slug !== "all").map(cat => ({
        name: cat.name,
        count: projects.filter(p => p.category === cat.slug).length,
        percentage: projects.length > 0 ? Math.round((projects.filter(p => p.category === cat.slug).length / projects.length) * 100) : 0,
    }));

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            {/* Sidebar */}
            <Sidebar
                activeMenu={activeMenu}
                onMenuChange={setActiveMenu}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main Content */}
            <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "ml-0"}`}>
                {/* Header */}
                <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

                {/* Content */}
                <main className="flex-1 overflow-y-auto pb-8">
                    {/* Breadcrumb */}
                    <section className="px-4 sm:px-6 py-4 hidden sm:block">
                        <div className="flex gap-1 text-xs text-gray-500 mb-1 capitalize">
                            <span>home</span>
                            {activeMenu !== "home" && (
                                <>
                                    <span>/</span>
                                    <span className="text-gray-800">{activeMenu}</span>
                                </>
                            )}
                        </div>
                        <div className="text-2xl font-semibold text-gray-900 capitalize">
                            {activeMenu === "home" && "Home"}
                            {activeMenu === "projects" && "Kelola Project"}
                            {activeMenu === "categories" && "Kelola Kategori"}
                            {activeMenu === "students" && "Data Siswa"}
                            {activeMenu === "settings" && "Pengaturan"}
                        </div>
                    </section>

                    <div className="px-4 sm:px-6">
                        {/* ═══════════════ HOME VIEW ═══════════════ */}
                        {activeMenu === "home" && (
                            <div className="space-y-6">
                                {/* Welcome Card */}
                                <div className="bg-white rounded-2xl shadow-md p-6">
                                    <div className="mb-6">
                                        <div className="text-base text-gray-600">Selamat datang,</div>
                                        <div className="text-2xl font-semibold text-gray-900">Administrator</div>
                                        <div className="mt-2 text-sm text-gray-500">
                                            Panel admin untuk mengelola project siswa-siswi RPL SMKN 1 Jenangan Ponorogo.
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                                        {stats.map((stat, idx) => (
                                            <StatsCard key={idx} {...stat} />
                                        ))}
                                    </div>

                                    {/* Charts */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Category Distribution */}
                                        <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition">
                                            <h3 className="text-center text-sm font-semibold text-gray-600 mb-4">Distribusi Kategori Project</h3>
                                            <div className="space-y-3">
                                                {categoryDistribution.map((cat, idx) => (
                                                    <div key={idx}>
                                                        <div className="flex justify-between text-sm text-gray-700">
                                                            <span className="font-medium">{cat.name}</span>
                                                            <span>{cat.count} project ({cat.percentage}%)</span>
                                                        </div>
                                                        <div className="w-full bg-gray-200 rounded-full h-3 mt-1 overflow-hidden">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${cat.percentage}%` }}
                                                                transition={{ duration: 0.8, delay: idx * 0.1 }}
                                                                className="h-3 rounded-full bg-gradient-to-r from-teal-500 to-cyan-400"
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Featured vs Normal */}
                                        <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition">
                                            <h3 className="text-center text-sm font-semibold text-gray-600 mb-4">Status Project</h3>
                                            <div className="space-y-3">
                                                <div>
                                                    <div className="flex justify-between text-sm text-gray-700">
                                                        <span className="font-medium">Unggulan</span>
                                                        <span>{projects.filter(p => p.is_featured).length} project</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-3 mt-1 overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${projects.length > 0 ? (projects.filter(p => p.is_featured).length / projects.length) * 100 : 0}%` }}
                                                            transition={{ duration: 0.8 }}
                                                            className="h-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-400"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between text-sm text-gray-700">
                                                        <span className="font-medium">Biasa</span>
                                                        <span>{projects.filter(p => !p.is_featured).length} project</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-3 mt-1 overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${projects.length > 0 ? (projects.filter(p => !p.is_featured).length / projects.length) * 100 : 0}%` }}
                                                            transition={{ duration: 0.8, delay: 0.1 }}
                                                            className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Recent Projects */}
                                            <h4 className="text-sm font-semibold text-gray-600 mt-6 mb-3">Project Terbaru</h4>
                                            <div className="space-y-2">
                                                {projects.slice(0, 3).map((project) => (
                                                    <div key={project.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                                                        <img src={project.thumbnail} alt="" className="w-10 h-10 rounded-lg object-cover" />
                                                        <div className="min-w-0 flex-1">
                                                            <p className="text-sm font-medium text-gray-800 truncate">{project.title}</p>
                                                            <p className="text-xs text-gray-500">{project.student_name} • {project.category}</p>
                                                        </div>
                                                        {project.is_featured && (
                                                            <Star className="w-4 h-4 text-amber-500 fill-amber-500 flex-shrink-0" />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ═══════════════ PROJECTS VIEW ═══════════════ */}
                        {activeMenu === "projects" && (
                            <div className="space-y-4">
                                {/* Stats Row */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {stats.map((stat, idx) => (
                                        <StatsCard key={idx} {...stat} />
                                    ))}
                                </div>

                                {/* Table Card */}
                                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                                    {/* Toolbar */}
                                    <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
                                        <div className="relative flex-1 max-w-md">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                                placeholder="Cari project atau nama siswa..."
                                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none text-sm"
                                            />
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-2">
                                                <Filter className="w-4 h-4 text-gray-400" />
                                                <select
                                                    value={filterCategory}
                                                    onChange={(e) => { setFilterCategory(e.target.value); setCurrentPage(1); }}
                                                    className="px-3 py-2.5 rounded-lg border border-gray-300 text-sm bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                                                >
                                                    {CATEGORIES.map((cat) => (
                                                        <option key={cat.id} value={cat.slug}>{cat.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <button
                                                onClick={() => { setEditingProject(null); setShowFormModal(true); }}
                                                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white transition-colors hover:opacity-90 shadow-md"
                                                style={{ backgroundColor: SIDEBAR_COLOR }}
                                            >
                                                <Plus className="w-4 h-4" />
                                                <span className="hidden sm:inline">Tambah Project</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Table */}
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="bg-gray-50 border-b border-gray-200">
                                                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">No</th>
                                                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Project</th>
                                                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Kategori</th>
                                                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Siswa</th>
                                                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Tech Stack</th>
                                                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Status</th>
                                                    <th className="text-center px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {paginatedProjects.map((project, idx) => (
                                                    <tr key={project.id} className="hover:bg-gray-50/80 transition-colors">
                                                        {/* No */}
                                                        <td className="px-5 py-3.5 text-sm text-gray-500">
                                                            {(currentPage - 1) * itemsPerPage + idx + 1}
                                                        </td>
                                                        {/* Project */}
                                                        <td className="px-5 py-3.5">
                                                            <div className="flex items-center gap-3">
                                                                <img
                                                                    src={project.thumbnail}
                                                                    alt={project.title}
                                                                    className="w-11 h-11 rounded-lg object-cover border border-gray-200 flex-shrink-0"
                                                                />
                                                                <div className="min-w-0">
                                                                    <p className="font-medium text-sm text-gray-900 truncate max-w-[200px] lg:max-w-[280px]">{project.title}</p>
                                                                    <p className="text-xs text-gray-400 mt-0.5">{project.created_at}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        {/* Category */}
                                                        <td className="px-5 py-3.5 hidden md:table-cell">
                                                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                                                                {project.category}
                                                            </span>
                                                        </td>
                                                        {/* Student */}
                                                        <td className="px-5 py-3.5 hidden lg:table-cell">
                                                            <div>
                                                                <p className="text-sm text-gray-700">{project.student_name}</p>
                                                                <p className="text-xs text-gray-400">{project.student_class}</p>
                                                            </div>
                                                        </td>
                                                        {/* Tech Stack */}
                                                        <td className="px-5 py-3.5 hidden lg:table-cell">
                                                            <div className="flex flex-wrap gap-1 max-w-[200px]">
                                                                {project.tech_stack.slice(0, 2).map((tech, i) => (
                                                                    <span key={i} className="px-2 py-0.5 rounded text-xs bg-teal-50 text-teal-700 font-medium">{tech}</span>
                                                                ))}
                                                                {project.tech_stack.length > 2 && (
                                                                    <span className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-500">+{project.tech_stack.length - 2}</span>
                                                                )}
                                                            </div>
                                                        </td>
                                                        {/* Status */}
                                                        <td className="px-5 py-3.5 hidden sm:table-cell">
                                                            {project.is_featured ? (
                                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-700">
                                                                    <Star className="w-3 h-3 fill-amber-500" />
                                                                    Unggulan
                                                                </span>
                                                            ) : (
                                                                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-500">
                                                                    Biasa
                                                                </span>
                                                            )}
                                                        </td>
                                                        {/* Actions */}
                                                        <td className="px-5 py-3.5 text-center">
                                                            <ActionDropdown
                                                                isOpen={openDropdownId === project.id}
                                                                onToggle={() => setOpenDropdownId(openDropdownId === project.id ? null : project.id)}
                                                                onEdit={() => { setEditingProject(project); setShowFormModal(true); setOpenDropdownId(null); }}
                                                                onDelete={() => { setDeletingProject(project); setShowDeleteModal(true); setOpenDropdownId(null); }}
                                                                onToggleFeatured={() => handleToggleFeatured(project)}
                                                                isFeatured={project.is_featured}
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        {filteredProjects.length === 0 && (
                                            <div className="text-center py-16">
                                                <FolderKanban className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                                <p className="text-gray-500 font-medium">Tidak ada project ditemukan</p>
                                                <p className="text-sm text-gray-400 mt-1">Coba ubah kata kunci pencarian</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Pagination */}
                                    {totalPages > 1 && (
                                        <div className="flex items-center justify-between px-5 py-4 border-t border-gray-200">
                                            <p className="text-sm text-gray-500">
                                                Menampilkan {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, filteredProjects.length)} dari {filteredProjects.length}
                                            </p>
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                                    disabled={currentPage === 1}
                                                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                                >
                                                    <ChevronLeft className="w-4 h-4" />
                                                </button>
                                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                                    <button
                                                        key={page}
                                                        onClick={() => setCurrentPage(page)}
                                                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                                                            currentPage === page
                                                                ? "text-white"
                                                                : "hover:bg-gray-100 text-gray-700"
                                                        }`}
                                                        style={currentPage === page ? { backgroundColor: SIDEBAR_COLOR } : {}}
                                                    >
                                                        {page}
                                                    </button>
                                                ))}
                                                <button
                                                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                                    disabled={currentPage === totalPages}
                                                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                                >
                                                    <ChevronRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* ═══════════════ PLACEHOLDER VIEWS ═══════════════ */}
                        {(activeMenu === "categories" || activeMenu === "students" || activeMenu === "settings") && (
                            <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                                    {activeMenu === "categories" && <Tag className="w-8 h-8 text-gray-400" />}
                                    {activeMenu === "students" && <Users className="w-8 h-8 text-gray-400" />}
                                    {activeMenu === "settings" && <Settings className="w-8 h-8 text-gray-400" />}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {activeMenu === "categories" && "Halaman Kategori"}
                                    {activeMenu === "students" && "Halaman Data Siswa"}
                                    {activeMenu === "settings" && "Halaman Pengaturan"}
                                </h3>
                                <p className="text-sm text-gray-500">Fitur ini akan segera tersedia</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* Modals */}
            <ProjectFormModal
                isOpen={showFormModal}
                onClose={() => { setShowFormModal(false); setEditingProject(null); }}
                project={editingProject}
                onSave={handleSaveProject}
            />
            <DeleteModal
                isOpen={showDeleteModal}
                onClose={() => { setShowDeleteModal(false); setDeletingProject(null); }}
                onConfirm={handleDeleteProject}
                projectTitle={deletingProject?.title}
            />

            {/* Click outside to close dropdown */}
            {openDropdownId && (
                <div className="fixed inset-0 z-20" onClick={() => setOpenDropdownId(null)} />
            )}
        </div>
    );
}
