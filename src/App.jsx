import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Github, Linkedin, Mail, ExternalLink, Code2, Database,
  BrainCircuit, Rocket, MapPin, Briefcase, GraduationCap,
  ChevronRight, Layout, Edit3, Save, X, LogOut, Lock, Phone,
  Settings, User, FolderKanban, Award, Plus, Trash2, Image as ImageIcon, Upload, Download, FileText, Send, ArrowUp
} from 'lucide-react'
import { supabase } from './lib/supabase'

// --- Constants ---
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
}

// --- Components ---

const Navbar = ({ logo, user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {logo || 'BG.'}
        </Link>
        <div className="hidden md:flex items-center gap-6 text-xs font-medium text-gray-400">
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#experience" className="hover:text-white transition-colors">Experience</a>
          <a href="#certs" className="hover:text-white transition-colors">Certs</a>
          <a href="#skills" className="hover:text-white transition-colors">Skills</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/admin" className="flex items-center gap-2 text-primary hover:text-primary/80">
                <Layout size={14} /> Dashboard
              </Link>
              <button onClick={onLogout} className="text-red-400 hover:text-red-300 cursor-pointer"><LogOut size={14} /></button>
            </div>
          ) : (
            <Link to="/admin" className="opacity-0 hover:opacity-100 transition-opacity"><Lock size={14} /></Link>
          )}
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-400 p-2">
          {isOpen ? <X size={20} /> : <Edit3 size={20} />}
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-background/95 border-b border-white/10 overflow-hidden">
            <div className="px-4 py-6 space-y-4 flex flex-col items-center">
              <a href="#about" onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">About</a>
              <a href="#projects" onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">Projects</a>
              <a href="#experience" onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">Experience</a>
              <a href="#certs" onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">Certificates</a>
              <a href="#skills" onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">Skills</a>
              <a href="#contact" onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">Contact</a>
              {user && <Link to="/admin" className="text-primary font-bold pt-2">Dashboard</Link>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

const Hero = ({ profile, config }) => (
  <section id="home" className="pt-32 pb-16 px-4 max-w-7xl mx-auto">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] uppercase tracking-widest font-bold mb-4 border border-primary/20"
        >
          {config?.hero_badge}
        </motion.span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
          I'm <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">{profile?.full_name}</span>
        </h1>
        <p className="text-base md:text-lg text-gray-400 mb-8 leading-relaxed max-w-lg">{profile?.headline}</p>
        <div className="flex flex-wrap gap-4 items-center">
          <motion.a href="#projects" whileHover={{ scale: 1.02, x: 3 }} whileTap={{ scale: 0.98 }} className="px-6 py-3 bg-primary hover:bg-primary/90 rounded-full text-sm font-bold transition-all flex items-center gap-2 shadow-xl shadow-primary/20">
            View Projects <ChevronRight size={16} />
          </motion.a>
          {profile?.resume_url && (
            <motion.a
              href={profile.resume_url}
              target="_blank"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-white/5 border border-white/10 hover:border-primary/50 rounded-full text-sm font-bold transition-all flex items-center gap-2"
            >
              <Download size={16} className="text-primary" /> Resume
            </motion.a>
          )}
          <div className="flex items-center gap-4 px-2">
            <motion.a whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }} href={profile?.github_url} target="_blank" className="text-gray-400 hover:text-white" title="GitHub"><Github size={20} /></motion.a>
            <motion.a whileHover={{ scale: 1.2, rotate: -5 }} whileTap={{ scale: 0.9 }} href={profile?.linkedin_url} target="_blank" className="text-gray-400 hover:text-white" title="LinkedIn"><Linkedin size={20} /></motion.a>
            <motion.a whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }} href={`mailto:${profile?.email}`} className="text-gray-400 hover:text-white" title="Email"><Mail size={20} /></motion.a>
          </div>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative hidden md:block">
        <div className="max-w-md mx-auto aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10 flex items-center justify-center overflow-hidden relative group shadow-2xl">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
          {profile?.photo_url ? <img src={profile.photo_url} alt={profile.full_name} className="w-full h-full object-cover rounded-3xl group-hover:scale-105 transition-transform duration-700" /> : <Rocket className="w-20 h-20 text-primary/40 group-hover:text-primary transition-all duration-500 group-hover:scale-110" />}
          <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-background/60 backdrop-blur-md border border-white/10 text-center italic text-xs text-gray-300">"{config?.hero_quote}"</div>
        </div>
      </motion.div>
    </div>
  </section>
)

const ProjectCard = ({ project }) => (
  <motion.div {...fadeInUp} whileHover={{ y: -5 }} className="group rounded-xl bg-white/5 border border-white/10 overflow-hidden hover:border-primary/40 transition-all duration-300 flex flex-col h-full shadow-lg shadow-black/20">
    <div className="aspect-[16/9] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
      {project.image_url ? (
        <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      ) : (
        <Code2 className="w-10 h-10 text-gray-700 group-hover:text-primary/40 transition-colors" />
      )}
      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <h3 className="text-lg font-extrabold mb-2 group-hover:text-primary transition-colors line-clamp-1">{project.title}</h3>
      <p className="text-gray-400 text-xs mb-4 line-clamp-2 leading-relaxed flex-1">{project.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-6">
        {project.tech_stack?.slice(0, 5).map(tech => (
          <span key={tech} className="px-2.5 py-1 rounded-md bg-primary/5 text-[9px] font-bold text-primary/90 border border-primary/20 shadow-sm">{tech}</span>
        ))}
      </div>
      <div className="flex items-center gap-4 border-t border-white/5 pt-4">
        {project.live_url && <motion.a whileHover={{ x: 2 }} href={project.live_url} target="_blank" className="text-xs font-bold text-primary flex items-center gap-1.5 hover:underline"><ExternalLink size={12} /> Live Demo</motion.a>}
        {project.github_url && <motion.a whileHover={{ x: 2 }} href={project.github_url} target="_blank" className="text-xs font-bold text-gray-500 flex items-center gap-1.5 hover:text-white"><Github size={12} /> Source</motion.a>}
      </div>
    </div>
  </motion.div>
)

const CertificateCard = ({ cert }) => (
  <motion.div {...fadeInUp} whileHover={{ y: -3 }} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4 hover:border-primary/40 transition-all shadow-md group">
    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden border border-white/5 group-hover:bg-primary group-hover:text-white transition-all">
      {cert.image_url ? <img src={cert.image_url} className="w-full h-full object-cover" /> : <Award size={20} />}
    </div>
    <div className="flex-1 min-w-0">
      <h3 className="text-sm font-bold line-clamp-1 group-hover:text-primary transition-colors">{cert.title}</h3>
      <div className="flex items-center justify-between mt-1">
        <p className="text-[10px] text-gray-500 font-medium truncate pr-2">{cert.issuer}</p>
        {cert.credential_url && (
          <a href={cert.credential_url} target="_blank" className="text-[9px] text-primary hover:underline flex items-center gap-1 whitespace-nowrap"><ExternalLink size={8} /> Verify</a>
        )}
      </div>
    </div>
  </motion.div>
)

const ExperienceItem = ({ item, isLast }) => (
  <div className="relative pl-8 pb-12">
    {!isLast && <div className="absolute left-[7px] top-4 w-px h-full bg-primary/20" />}
    <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]" />
    <motion.div {...fadeInUp} className="space-y-2">
      <span className="text-[10px] font-black text-primary uppercase tracking-widest">{item.period}</span>
      <h3 className="text-xl font-bold">{item.role}</h3>
      <p className="text-sm font-semibold text-gray-400 flex items-center gap-2"><Briefcase size={14} className="text-primary" /> {item.company}</p>
      <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">{item.description}</p>
    </motion.div>
  </div>
)

const SkillItem = ({ skill }) => (
  <motion.div {...fadeInUp} whileHover={{ y: -3 }} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4 hover:border-primary/40 transition-all shadow-md group">
    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden border border-white/5 group-hover:bg-primary group-hover:text-white transition-all">
      {skill.image_url ? <img src={skill.image_url} className="w-full h-full object-cover" /> : <Code2 size={20} />}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-bold line-clamp-1 group-hover:text-primary transition-colors">{skill.name}</h3>
        <span className="text-[10px] font-black text-primary/70">{skill.level || 80}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level || 80}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-primary to-accent relative"
        >
          <div className="absolute top-0 right-0 w-8 h-full bg-white/20 blur-sm" />
        </motion.div>
      </div>
    </div>
  </motion.div>
)

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke('contact-email', {
        body: form
      })

      if (error) throw error

      setSent(true);
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setSent(false), 5000)
    } catch (err) {
      console.error(err)
      setError("Failed to send message. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-gray-600 ml-1">Your Name</label>
          <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-primary transition-all" placeholder="Your names" required />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-gray-600 ml-1">Email Address</label>
          <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-primary transition-all" placeholder="youremail@example.com" required />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase text-gray-600 ml-1">Message</label>
        <textarea rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-primary transition-all" placeholder="How can we collaborate?" required />
      </div>
      {error && <p className="text-red-400 text-xs text-center">{error}</p>}
      <button disabled={loading} type="submit" className="w-full py-4 bg-primary rounded-2xl font-black text-sm flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50">
        {sent ? 'MESSAGE SENT!' : loading ? 'SENDING...' : <><Send size={18} /> SEND MESSAGE</>}
      </button>
    </form>
  )
}

const EducationCard = ({ edu }) => (
  <motion.div {...fadeInUp} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/40 transition-all shadow-xl group">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-xl font-extrabold group-hover:text-primary transition-colors">{edu.degree}</h3>
        <p className="text-gray-500 font-bold text-sm">{edu.institution}</p>
      </div>
      <span className="text-[10px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">{edu.period}</span>
    </div>
    <div className="flex flex-wrap gap-2 mt-6">
      {edu.coursework?.map(course => (
        <span key={course} className="text-[10px] text-gray-400 bg-white/5 px-2 py-1 rounded-lg border border-white/5">{course}</span>
      ))}
    </div>
  </motion.div>
)

// --- Main Page ---

const LandingPage = () => {
  const [profile, setProfile] = useState(null)
  const [projects, setProjects] = useState([])
  const [certs, setCerts] = useState([])
  const [skills, setSkills] = useState([])
  const [experience, setExperience] = useState([])
  const [education, setEducation] = useState([])
  const [config, setConfig] = useState({})
  const [loading, setLoading] = useState(true)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const [p, pr, cr, s, ex, e, c] = await Promise.all([
        supabase.from('profile').select('*').single(),
        supabase.from('projects').select('*').order('order_index'),
        supabase.from('certificates').select('*').order('order_index'),
        supabase.from('skills').select('*').order('order_index'),
        supabase.from('experience').select('*').order('order_index'),
        supabase.from('education').select('*').order('id'),
        supabase.from('site_config').select('*')
      ])
      setProfile(p.data); setProjects(pr.data || []); setCerts(cr.data || []); setSkills(s.data || []); setExperience(ex.data || []); setEducation(e.data || []);
      const configObj = {}; c.data?.forEach(item => configObj[item.key] = item.value); setConfig(configObj);
      setLoading(false)
    }
    fetchData()
    const handleScroll = () => setShowTop(window.scrollY > 500); window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (loading) return <div className="h-screen flex items-center justify-center bg-background"><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full" /></div>
  const categories = [...new Set(skills.map(s => s.category))]

  return (
    <div className="scroll-smooth bg-background overflow-x-hidden selection:bg-primary/30">
      <Navbar logo={config.logo_text} />
      <Hero profile={profile} config={config} />

      <motion.section {...fadeInUp} id="about" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          <div className="md:w-1/3">
            <h2 className="text-3xl font-black mb-4 flex items-center gap-3 text-primary"><Briefcase size={28} /> {config.about_title}</h2>
            <div className="w-16 h-1.5 bg-primary rounded-full mb-8 shadow-lg shadow-primary/20" />
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-gray-400 group"><div className="p-3 rounded-xl bg-white/5 group-hover:bg-primary/10 transition-colors"><MapPin size={20} className="text-primary" /></div> {profile.location}</div>
              <div className="flex items-center gap-4 text-sm text-gray-400 group"><div className="p-3 rounded-xl bg-white/5 group-hover:bg-primary/10 transition-colors"><Mail size={20} className="text-primary" /></div> {profile.email}</div>
              {profile.contact_phone && <div className="flex items-center gap-4 text-sm text-gray-400 group"><div className="p-3 rounded-xl bg-white/5 group-hover:bg-primary/10 transition-colors"><Phone size={20} className="text-primary" /></div> {profile.contact_phone}</div>}
            </div>
          </div>
          <div className="md:w-2/3">
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed italic border-l-4 border-primary/20 pl-8 py-4 bg-white/[0.01] rounded-r-3xl">"{profile.bio}"</p>
          </div>
        </div>
      </motion.section>

      <section id="projects" className="py-24 px-4 max-w-7xl mx-auto">
        <motion.h2 {...fadeInUp} className="text-4xl font-black mb-16 flex items-center gap-3"><FolderKanban size={32} className="text-primary" /> {config.projects_title}</motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => <ProjectCard key={project.id} project={project} />)}
        </div>
      </section>

      {experience.length > 0 && (
        <section id="experience" className="py-24 px-4 max-w-7xl mx-auto border-t border-white/5">
          <div className="grid lg:grid-cols-3 gap-16">
            <div>
              <h2 className="text-4xl font-black mb-6">Experience</h2>
              <p className="text-gray-400 leading-relaxed">My professional journey and industry contributions.</p>
            </div>
            <div className="lg:col-span-2">
              {experience.map((item, idx) => <ExperienceItem key={item.id} item={item} isLast={idx === experience.length - 1} />)}
            </div>
          </div>
        </section>
      )}

      {certs.length > 0 && (
        <section id="certs" className="py-24 px-4 max-w-7xl mx-auto border-t border-white/5">
          <motion.h2 {...fadeInUp} className="text-3xl font-black mb-12 flex items-center gap-3"><Award className="text-primary" /> CERTIFICATIONS</motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certs.map(cert => <CertificateCard key={cert.id} cert={cert} />)}
          </div>
        </section>
      )}

      <section id="skills" className="py-24 px-4 max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="bg-gradient-to-br from-white/[0.03] to-transparent p-12 lg:p-20 rounded-[3rem] border border-white/5">
          <h2 className="text-4xl font-black mb-20 text-center">{config.skills_title}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {categories.map(cat => (
              <div key={cat} className="space-y-8">
                <h3 className="text-primary font-black text-xs uppercase tracking-[0.3em] flex items-center gap-4">{cat} <div className="flex-1 h-px bg-primary/20" /></h3>
                <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
                  {skills.filter(s => s.category === cat).map(skill => (
                    <SkillItem key={skill.id} skill={skill} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="education" className="py-24 px-4 max-w-7xl mx-auto">
        <motion.h2 {...fadeInUp} className="text-3xl font-black mb-12 flex items-center gap-3"><GraduationCap className="text-primary" /> {config.education_title}</motion.h2>
        <div className="grid md:grid-cols-2 gap-8">
          {education.map(edu => <EducationCard key={edu.id} edu={edu} />)}
        </div>
      </section>

      <section id="contact" className="py-32 px-4 max-w-4xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-16 space-y-4">
          <h2 className="text-5xl font-black">Get In Touch</h2>
          <p className="text-gray-400">Have a project in mind? Let's build something extraordinary together.</p>
        </motion.div>
        <ContactForm />
      </section>

      <footer className="py-24 px-4 text-center border-t border-white/5 bg-black/20">
        <div className="flex justify-center gap-8 mb-10">
          <motion.a whileHover={{ y: -5, scale: 1.1 }} href={profile.github_url} className="p-4 rounded-3xl bg-white/5 text-gray-400 hover:text-white hover:bg-primary/10 transition-all shadow-xl"><Github size={28} /></motion.a>
          <motion.a whileHover={{ y: -5, scale: 1.1 }} href={profile.linkedin_url} className="p-4 rounded-3xl bg-white/5 text-gray-400 hover:text-white hover:bg-primary/10 transition-all shadow-xl"><Linkedin size={28} /></motion.a>
          <motion.a whileHover={{ y: -5, scale: 1.1 }} href={`mailto:${profile.email}`} className="p-4 rounded-3xl bg-white/5 text-gray-400 hover:text-white hover:bg-primary/10 transition-all shadow-xl"><Mail size={28} /></motion.a>
        </div>
        <p className="text-gray-500 text-xs font-black tracking-[0.2em] uppercase leading-relaxed">© {new Date().getFullYear()} {profile.full_name}<br />{config.footer_copy}</p>
      </footer>

      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 p-4 bg-primary text-white rounded-full shadow-2xl shadow-primary/40 z-50 hover:scale-110 active:scale-90 transition-all"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

// --- Admin Dashboard ---

const AdminDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('profile')
  const [profile, setProfile] = useState(null)
  const [projects, setProjects] = useState([])
  const [certs, setCerts] = useState([])
  const [skills, setSkills] = useState([])
  const [experience, setExperience] = useState([])
  const [education, setEducation] = useState([])
  const [config, setConfig] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [authError, setAuthError] = useState(''); const [isRegistering, setIsRegistering] = useState(false)
  const navigate = useNavigate()

  useEffect(() => { if (user) fetchData(); else setLoading(false) }, [user])

  const fetchData = async () => {
    const [p, c, pr, cr, s, ex, e] = await Promise.all([
      supabase.from('profile').select('*').single(),
      supabase.from('site_config').select('*').order('key'),
      supabase.from('projects').select('*').order('order_index'),
      supabase.from('certificates').select('*').order('order_index'),
      supabase.from('skills').select('*').order('order_index'),
      supabase.from('experience').select('*').order('order_index'),
      supabase.from('education').select('*').order('id')
    ])
    setProfile(p.data); setConfig(c.data || []); setProjects(pr.data || []); setCerts(cr.data || []); setSkills(s.data || []); setExperience(ex.data || []); setEducation(e.data || []);
    setLoading(false)
  }

  const handleLogin = async (e) => { e.preventDefault(); setAuthError(''); const { error } = await supabase.auth.signInWithPassword({ email, password }); if (error) setAuthError(error.message) }
  const updateProfile = async (e) => { e.preventDefault(); setSaving(true); await supabase.from('profile').update(profile).eq('id', profile.id); alert('Saved!'); setSaving(false) }
  const updateConfig = async (key, val) => { await supabase.from('site_config').update({ value: val }).eq('key', key); fetchData() }
  const handleLogout = async () => { await supabase.auth.signOut(); navigate('/') }

  const uploadFile = async (e, type, id = null) => {
    try {
      setUploading(true)
      const file = e.target.files[0]; if (!file) return
      const fileName = `${Math.random()}.${file.name.split('.').pop()}`
      const { error } = await supabase.storage.from('portfolio').upload(fileName, file)
      if (error) throw error
      const { data: { publicUrl } } = supabase.storage.from('portfolio').getPublicUrl(fileName)

      if (type === 'profile') {
        setProfile({ ...profile, photo_url: publicUrl })
        await supabase.from('profile').update({ photo_url: publicUrl }).eq('id', profile.id)
      } else if (type === 'project') {
        await supabase.from('projects').update({ image_url: publicUrl }).eq('id', id)
        fetchData()
      } else if (type === 'cert') {
        await supabase.from('certificates').update({ image_url: publicUrl }).eq('id', id)
        fetchData()
      } else if (type === 'skill') {
        await supabase.from('skills').update({ image_url: publicUrl }).eq('id', id)
        fetchData()
      }
      alert('Uploaded!')
    } catch (err) { alert(err.message) } finally { setUploading(false) }
  }

  const addProject = async () => {
    const { data } = await supabase.from('projects').insert({ title: 'New Project', description: 'Desc', order_index: projects.length }).select().single()
    setProjects([...projects, data])
  }
  const addExperience = async () => {
    const { data } = await supabase.from('experience').insert({ role: 'Role', company: 'Company', period: '2023 - Present', order_index: experience.length }).select().single()
    setExperience([...experience, data])
  }
  const addCert = async () => {
    const { data } = await supabase.from('certificates').insert({ title: 'Certificate Name', issuer: 'Issuer', order_index: certs.length }).select().single()
    setCerts([...certs, data])
  }
  const addSkill = async () => {
    const { data } = await supabase.from('skills').insert({ name: 'New Skill', category: 'General', level: 80, order_index: skills.length }).select().single()
    setSkills([...skills, data])
  }
  const addEdu = async () => {
    const { data } = await supabase.from('education').insert({ degree: 'Degree', institution: 'School', period: '20XX - 20XX' }).select().single()
    setEducation([...education, data])
  }

  if (loading) return null
  if (!user) return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-xl font-black text-center mb-6 flex items-center justify-center gap-2"><Lock size={20} className="text-primary" /> Admin Access</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary text-sm transition-all" required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary text-sm transition-all" required />
          {authError && <p className="text-red-400 text-[10px] bg-red-400/10 p-2 rounded-lg">{authError}</p>}
          <button type="submit" className="w-full py-3 bg-primary rounded-xl font-black text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">Sign In</button>
        </form>
      </motion.div>
    </div>
  )

  return (
    <div className="pt-24 pb-20 px-4 max-w-6xl mx-auto bg-background min-h-screen">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-2xl font-black flex items-center gap-3"><Layout size={28} className="text-primary" /> Admin Control</h1>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/')} className="p-2 text-gray-400 hover:text-white transition-colors bg-white/5 rounded-xl"><X size={20} /></button>
          <button onClick={handleLogout} className="p-2 text-red-400 hover:text-red-300 transition-colors bg-red-400/10 rounded-xl"><LogOut size={20} /></button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-64 space-y-2">
          {['profile', 'projects', 'experience', 'certs', 'skills', 'education', 'site'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`w-full text-left px-5 py-3 rounded-xl text-sm font-bold flex items-center gap-3 capitalize transition-all ${activeTab === tab ? 'bg-primary text-white shadow-xl shadow-primary/30 scale-105' : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'}`}>
              {tab === 'profile' && <User size={18} />}
              {tab === 'projects' && <FolderKanban size={18} />}
              {tab === 'experience' && <Briefcase size={18} />}
              {tab === 'certs' && <Award size={18} />}
              {tab === 'skills' && <BrainCircuit size={18} />}
              {tab === 'education' && <GraduationCap size={18} />}
              {tab === 'site' && <Settings size={18} />}
              {tab}
            </button>
          ))}
        </div>
        <div className="flex-1 bg-white/5 border border-white/10 rounded-[2.5rem] p-8 min-h-[500px] shadow-2xl overflow-hidden">
          {activeTab === 'profile' && (
            <form onSubmit={updateProfile} className="space-y-8 animate-in fade-in duration-500">
              <div className="flex items-center gap-8">
                <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shadow-xl ring-4 ring-primary/10">
                  {profile?.photo_url ? <img src={profile.photo_url} className="w-full h-full object-cover" /> : <ImageIcon className="text-gray-700" size={32} />}
                </div>
                <label className="flex-1 cursor-pointer p-4 border-2 border-dashed border-white/10 rounded-2xl hover:border-primary/40 hover:bg-primary/5 transition-all group">
                  <div className="flex flex-col items-center gap-2">
                    <Upload size={20} className="text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-gray-500">{uploading ? 'Processing...' : 'Upload Profile Photo'}</span>
                  </div>
                  <input type="file" className="hidden" onChange={e => uploadFile(e, 'profile')} />
                </label>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2"><label className="text-[10px] font-black uppercase text-gray-600 ml-1">Full Name</label>
                  <input type="text" value={profile?.full_name || ''} onChange={e => setProfile({ ...profile, full_name: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-all" /></div>
                <div className="space-y-2"><label className="text-[10px] font-black uppercase text-gray-600 ml-1">Headline</label>
                  <input type="text" value={profile?.headline || ''} onChange={e => setProfile({ ...profile, headline: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-all" /></div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2"><label className="text-[10px] font-black uppercase text-gray-600 ml-1">Location</label>
                  <input type="text" value={profile?.location || ''} onChange={e => setProfile({ ...profile, location: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-all" /></div>
                <div className="space-y-2"><label className="text-[10px] font-black uppercase text-gray-600 ml-1">Email</label>
                  <input type="email" value={profile?.email || ''} onChange={e => setProfile({ ...profile, email: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-all" /></div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2"><label className="text-[10px] font-black uppercase text-gray-600 ml-1">Resume Link (Google Drive/Dropbox)</label>
                  <input type="text" value={profile?.resume_url || ''} onChange={e => setProfile({ ...profile, resume_url: e.target.value })} placeholder="https://..." className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-all" /></div>
                <div className="space-y-2"><label className="text-[10px] font-black uppercase text-gray-600 ml-1">Social Links (GitHub, LinkedIn)</label>
                  <div className="flex gap-2">
                    <input type="text" value={profile?.github_url || ''} onChange={e => setProfile({ ...profile, github_url: e.target.value })} placeholder="GitHub" className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-primary" />
                    <input type="text" value={profile?.linkedin_url || ''} onChange={e => setProfile({ ...profile, linkedin_url: e.target.value })} placeholder="LinkedIn" className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-primary" />
                  </div></div>
              </div>
              <div className="space-y-2"><label className="text-[10px] font-black uppercase text-gray-600 ml-1">Short Bio</label>
                <textarea rows={3} value={profile?.bio || ''} onChange={e => setProfile({ ...profile, bio: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-all" /></div>
              <button type="submit" disabled={saving} className="px-10 py-4 bg-primary rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">{saving ? 'Syncing...' : 'Save All Changes'}</button>
            </form>
          )}
          {activeTab === 'projects' && (
            <div className="space-y-4 animate-in slide-in-from-right duration-500">
              <button onClick={addProject} className="w-full py-4 border-2 border-dashed border-primary/20 text-primary font-black text-xs rounded-2xl hover:bg-primary/5 transition-all">+ ADD NEW PROJECT</button>
              {projects.map((p, idx) => (
                <div key={p.id} className="p-6 bg-black/30 rounded-3xl border border-white/5 group hover:border-primary/20 transition-all">
                  <div className="flex gap-6 items-start">
                    <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center overflow-hidden flex-shrink-0 relative group/img">
                      {p.image_url ? <img src={p.image_url} className="w-full h-full object-cover" /> : <ImageIcon className="text-gray-800" size={28} />}
                      <label className="absolute inset-0 bg-primary/60 opacity-0 group-hover/img:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                        <Upload size={20} className="text-white" />
                        <input type="file" className="hidden" onChange={e => uploadFile(e, 'project', p.id)} />
                      </label>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-1"><label className="text-[9px] font-black uppercase text-gray-600 ml-1">Title</label>
                          <input type="text" value={p.title} onChange={e => { const np = [...projects]; np[idx].title = e.target.value; setProjects(np); }} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2 text-sm outline-none focus:border-primary" /></div>
                        <div className="space-y-1"><label className="text-[9px] font-black uppercase text-gray-600 ml-1">Tech Stack</label>
                          <input type="text" value={p.tech_stack?.join(', ') || ''} onChange={e => { const np = [...projects]; np[idx].tech_stack = e.target.value.split(',').map(s => s.trim()); setProjects(np); }} placeholder="React, Node, etc." className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2 text-sm outline-none focus:border-primary" /></div>
                      </div>
                      <div className="space-y-1"><label className="text-[9px] font-black uppercase text-gray-600 ml-1">Summary</label>
                        <textarea value={p.description} onChange={e => { const np = [...projects]; np[idx].description = e.target.value; setProjects(np); }} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2 text-xs outline-none focus:border-primary" rows={2} /></div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <input type="text" placeholder="Live URL" value={p.live_url || ''} onChange={e => { const np = [...projects]; np[idx].live_url = e.target.value; setProjects(np); }} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2 text-xs outline-none focus:border-primary" />
                        <input type="text" placeholder="GitHub URL" value={p.github_url || ''} onChange={e => { const np = [...projects]; np[idx].github_url = e.target.value; setProjects(np); }} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2 text-xs outline-none focus:border-primary" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button onClick={async () => { setSaving(true); await supabase.from('projects').update({ title: p.title, description: p.description, tech_stack: p.tech_stack, live_url: p.live_url, github_url: p.github_url }).eq('id', p.id); alert('Saved!'); setSaving(false); }} className="text-green-500/50 hover:text-green-500 p-2"><Save size={20} /></button>
                      <button onClick={async () => { if (confirm('Delete?')) { await supabase.from('projects').delete().eq('id', p.id); fetchData() } }} className="text-red-500/30 hover:text-red-500 p-2"><Trash2 size={20} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'experience' && (
            <div className="space-y-4 animate-in slide-in-from-right duration-500">
              <button onClick={addExperience} className="w-full py-4 border-2 border-dashed border-primary/20 text-primary font-black text-xs rounded-2xl hover:bg-primary/5 transition-all">+ ADD EXPERIENCE</button>
              {experience.map((ex, idx) => (
                <div key={ex.id} className="p-6 bg-black/30 rounded-3xl border border-white/5 flex gap-4 items-start">
                  <div className="flex-1 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <input type="text" value={ex.role} onChange={e => { const n = [...experience]; n[idx].role = e.target.value; setExperience(n); }} placeholder="Role" className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2 text-sm outline-none" />
                      <input type="text" value={ex.company} onChange={e => { const n = [...experience]; n[idx].company = e.target.value; setExperience(n); }} placeholder="Company" className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2 text-sm outline-none" />
                    </div>
                    <input type="text" value={ex.period} onChange={e => { const n = [...experience]; n[idx].period = e.target.value; setExperience(n); }} placeholder="Period (e.g. 2023 - Present)" className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2 text-xs outline-none" />
                    <textarea value={ex.description} onChange={e => { const n = [...experience]; n[idx].description = e.target.value; setExperience(n); }} placeholder="Job description..." rows={2} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2 text-xs outline-none" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <button onClick={async () => { setSaving(true); await supabase.from('experience').update({ role: ex.role, company: ex.company, period: ex.period, description: ex.description }).eq('id', ex.id); alert('Saved!'); setSaving(false); }} className="text-green-500/50 hover:text-green-500 p-2"><Save size={20} /></button>
                    <button onClick={async () => { await supabase.from('experience').delete().eq('id', ex.id); fetchData() }} className="text-red-500/30 hover:text-red-500 p-2"><Trash2 size={20} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'certs' && (
            <div className="space-y-4 animate-in slide-in-from-right duration-500">
              <button onClick={addCert} className="w-full py-4 border-2 border-dashed border-primary/20 text-primary font-black text-xs rounded-2xl hover:bg-primary/5 transition-all">+ ADD CERTIFICATE</button>
              {certs.map((c, idx) => (
                <div key={c.id} className="p-6 bg-black/30 rounded-3xl border border-white/5 group hover:border-primary/20 transition-all">
                  <div className="flex gap-6 items-start">
                    <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center overflow-hidden flex-shrink-0 relative group/img">
                      {c.image_url ? <img src={c.image_url} className="w-full h-full object-cover" /> : <Award className="text-gray-800" size={24} />}
                      <label className="absolute inset-0 bg-primary/60 opacity-0 group-hover/img:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                        <Upload size={18} className="text-white" />
                        <input type="file" className="hidden" onChange={e => uploadFile(e, 'cert', c.id)} />
                      </label>
                    </div>
                    <div className="flex-1 grid md:grid-cols-2 gap-4">
                      <div className="space-y-1"><label className="text-[9px] font-black uppercase text-gray-600 ml-1">Name</label>
                        <input type="text" value={c.title} onChange={e => { const nc = [...certs]; nc[idx].title = e.target.value; setCerts(nc); }} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2 text-sm outline-none focus:border-primary" /></div>
                      <div className="space-y-1"><label className="text-[9px] font-black uppercase text-gray-600 ml-1">Issuer</label>
                        <input type="text" value={c.issuer} onChange={e => { const nc = [...certs]; nc[idx].issuer = e.target.value; setCerts(nc); }} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2 text-sm outline-none focus:border-primary" /></div>
                      <div className="md:col-span-2 space-y-1"><label className="text-[9px] font-black uppercase text-gray-600 ml-1">Credential URL</label>
                        <input type="text" value={c.credential_url || ''} onChange={e => { const nc = [...certs]; nc[idx].credential_url = e.target.value; setCerts(nc); }} placeholder="https://..." className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2 text-xs outline-none focus:border-primary" /></div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button onClick={async () => { setSaving(true); await supabase.from('certificates').update({ title: c.title, issuer: c.issuer, credential_url: c.credential_url }).eq('id', c.id); alert('Saved!'); setSaving(false); }} className="text-green-500/50 hover:text-green-500 p-2"><Save size={20} /></button>
                      <button onClick={async () => { await supabase.from('certificates').delete().eq('id', c.id); fetchData() }} className="text-red-500/30 hover:text-red-500 p-2"><Trash2 size={20} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'skills' && (
            <div className="space-y-4 animate-in slide-in-from-right duration-500">
              <button onClick={addSkill} className="w-full py-4 border-2 border-dashed border-primary/20 text-primary font-black text-xs rounded-2xl hover:bg-primary/5 transition-all">+ ADD NEW SKILL</button>
              {skills.map((s, idx) => (
                <div key={s.id} className="p-6 bg-black/30 rounded-3xl border border-white/5 group hover:border-primary/20 transition-all">
                  <div className="flex gap-6 items-start">
                    <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center overflow-hidden flex-shrink-0 relative group/img">
                      {s.image_url ? <img src={s.image_url} className="w-full h-full object-cover" /> : <Code2 className="text-gray-800" size={24} />}
                      <label className="absolute inset-0 bg-primary/60 opacity-0 group-hover/img:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                        <Upload size={18} className="text-white" />
                        <input type="file" className="hidden" onChange={e => uploadFile(e, 'skill', s.id)} />
                      </label>
                    </div>
                    <div className="flex-1 grid md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-gray-600 ml-1">Skill Name</label>
                        <input type="text" value={s.name} onChange={e => { const ns = [...skills]; ns[idx].name = e.target.value; setSkills(ns); }} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2 text-sm outline-none focus:border-primary" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-gray-600 ml-1">Category</label>
                        <select value={s.category} onChange={e => { const ns = [...skills]; ns[idx].category = e.target.value; setSkills(ns); }} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2 text-sm outline-none focus:border-primary">
                          <option value="Frontend">Frontend</option><option value="Backend">Backend</option><option value="Database">Database</option><option value="Machine Learning">Machine Learning</option><option value="DevOps">DevOps</option><option value="General">General</option>
                        </select>
                      </div>
                      <div className="md:col-span-2 space-y-1">
                        <label className="text-[9px] font-black uppercase text-gray-600 ml-1">Proficiency Level ({s.level || 80}%)</label>
                        <input type="range" min="0" max="100" value={s.level || 80} onChange={e => { const ns = [...skills]; ns[idx].level = parseInt(e.target.value); setSkills(ns); }} className="w-full accent-primary h-2" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button onClick={async () => { setSaving(true); await supabase.from('skills').update({ name: s.name, category: s.category, level: s.level }).eq('id', s.id); alert('Saved!'); setSaving(false); }} className="text-green-500/50 hover:text-green-500 p-2"><Save size={20} /></button>
                      <button onClick={async () => { if (confirm('Delete?')) { await supabase.from('skills').delete().eq('id', s.id); fetchData() } }} className="text-red-500/30 hover:text-red-500 p-2"><Trash2 size={20} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'education' && (
            <div className="space-y-6 animate-in slide-in-from-right duration-500">
              <button onClick={addEdu} className="w-full py-4 border-2 border-dashed border-primary/20 text-primary font-black text-xs rounded-2xl hover:bg-primary/5 transition-all">+ ADD EDUCATION</button>
              {education.map((e, idx) => (
                <div key={e.id} className="p-6 bg-black/30 rounded-3xl border border-white/5 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 grid md:grid-cols-2 gap-4">
                      <input type="text" value={e.degree} onChange={val => { const ne = [...education]; ne[idx].degree = val.target.value; setEducation(ne); }} onBlur={() => supabase.from('education').update({ degree: e.degree }).eq('id', e.id)} className="bg-transparent font-bold text-sm outline-none" placeholder="Degree" />
                      <input type="text" value={e.period} onChange={val => { const ne = [...education]; ne[idx].period = val.target.value; setEducation(ne); }} onBlur={() => supabase.from('education').update({ period: e.period }).eq('id', e.id)} className="bg-transparent text-primary text-xs outline-none text-right" placeholder="Period" />
                      <input type="text" value={e.institution} onChange={val => { const ne = [...education]; ne[idx].institution = val.target.value; setEducation(ne); }} onBlur={() => supabase.from('education').update({ institution: e.institution }).eq('id', e.id)} className="bg-transparent text-gray-500 text-xs outline-none" placeholder="Institution" />
                    </div>
                    <button onClick={async () => { await supabase.from('education').delete().eq('id', e.id); fetchData() }} className="text-red-500/30 hover:text-red-500 ml-4"><Trash2 size={18} /></button>
                  </div>
                  <input type="text" value={e.coursework?.join(', ') || ''} onChange={val => { const ne = [...education]; ne[idx].coursework = val.target.value.split(',').map(s => s.trim()); setEducation(ne); }} onBlur={() => supabase.from('education').update({ coursework: e.coursework }).eq('id', e.id)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2 text-[10px] outline-none" placeholder="Coursework (comma separated)" />
                </div>
              ))}
            </div>
          )}
          {activeTab === 'site' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-black text-gray-600 uppercase tracking-widest">Site Configuration Labels</h3>
                <button onClick={async () => {
                  const defaults = [
                    { key: 'logo_text', value: 'BG.', description: 'Navbar Logo Text' },
                    { key: 'hero_badge', value: 'AVAILABLE FOR HIRE', description: 'Hero Badge Text' },
                    { key: 'hero_quote', value: 'Designing the future of AI-driven commerce.', description: 'Hero Quote Text' },
                    { key: 'about_title', value: 'ABOUT ME', description: 'About Section Title' },
                    { key: 'projects_title', value: 'FEATURED PROJECTS', description: 'Projects Section Title' },
                    { key: 'skills_title', value: 'TECHNICAL SKILLS', description: 'Skills Section Title' },
                    { key: 'education_title', value: 'EDUCATION', description: 'Education Section Title' },
                    { key: 'footer_copy', value: 'Built with React 19 & Supabase.', description: 'Footer Copyright Text' }
                  ];
                  for (const d of defaults) {
                    const { data } = await supabase.from('site_config').select('*').eq('key', d.key).single();
                    if (!data) await supabase.from('site_config').insert(d);
                  }
                  fetchData();
                }} className="text-[10px] bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20 hover:bg-primary/20 transition-all font-bold tracking-tighter">RE-SEED DEFAULTS</button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {config.map(item => (
                  <div key={item.key} className="space-y-2">
                    <label className="text-[10px] font-black text-gray-600 uppercase ml-1">{item.description}</label>
                    <div className="flex gap-2">
                      <input type="text" value={item.value} onChange={e => setConfig(config.map(c => c.key === item.key ? { ...c, value: e.target.value } : c))} className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-primary transition-all" />
                      <button onClick={() => updateConfig(item.key, item.value)} className="p-2.5 bg-primary/20 text-primary rounded-xl hover:bg-primary/30 transition-colors shadow-lg"><Save size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null))
    return () => subscription.unsubscribe()
  }, [])
  return (<Router><div className="min-h-screen bg-background selection:bg-primary/30 selection:text-white"><Routes><Route path="/" element={<LandingPage />} /><Route path="/admin" element={<AdminDashboard user={user} />} /></Routes></div></Router>)
}
export default App
