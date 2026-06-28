import { useRef, useState } from "react"
import type { Education, Experience, Project, ResumeData } from "../types"
import {
    ChevronDown,
    ChevronUp,
    Download,
    FileText,
    Plus,
    Sparkles,
    Trash2,
    UploadCloud,
    Wand2,
} from "lucide-react"
import { generateResumePDF, toBase64 } from "../utils"
import axios from "axios"
import { server } from "../main"

const BlankExp = ():Experience=>({
    title:"",
    company:"",
    location:"",
    startDate:"",
    endDate:"",
    bullets:[""],
})

const BlankEdu = ():Education=>({
    degree:"",
    school:"",
    location:"",
    year:"",
    gpa:""
})

const BlankProj = ():Project=> ({
    name:"",
    description:"",
    link:""
})

type FieldProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    textarea?: boolean;
}

type ResumeBuildResponse = ResumeData & {
    Certifications?: string[];
}

type ResumeBuildPayload =
    | {
        mode: "manual";
        formData: {
            summary: string;
            exp: Experience[];
            edu: Education[];
            skills: {
                technical: string[];
                soft: string[];
            };
            projects: Project[];
            certifications: string[];
            name: string;
            email: string;
            phone: string;
            location: string;
            linkedin: string;
        };
    }
    | {
        mode: "improve";
        pdfBase64: string;
    }

const Field = ({label, value, onChange, placeholder, textarea}: FieldProps) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-xs text-white/30 uppercase tracking-widest"> {label} </label>
        {textarea ? <textarea value={value} onChange={e => onChange(e.target.value)} 
        placeholder={placeholder} rows={3} className="input-field resize-none" /> : 
        <input value={value} onChange={e => onChange(e.target.value)} 
        placeholder={placeholder} className="input-field" /> }
    </div>
) 

function Section({title, children, }:{title:string,children:React.ReactNode}) {
    const [open, setOpen] = useState(true)
    return <div className="glass-card overflow-hidden">
        <button onClick={() => setOpen(!open)} className="w-full flex 
        items-center justify-between px-6 py-4 text-left hover:bg-white/2 transition-colors ">
            <span className="text-sm font-semibold text-white/80"> {title} </span>
            {open ? 
            (<ChevronUp size={16} className="text-white/30" />
            ) : (
            <ChevronDown size={16} className="text-white/30" />)}
        </button>
        {open && <div className="px-6 pb-6 flex flex-col gap-4"> {children} </div> }
    </div>
}


const BuildResumePage = () => {

    const [mode, setMode] = useState<"manual" | "improve">("manual");
    const [file, setFile] = useState<File | null>(null);
    const [result, setResult] = useState<ResumeData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fileRef = useRef<HTMLInputElement>(null);
    const [basics, setBasics] = useState({
        name:"",
        email:"",
        phone:"",
        location:"",
        linkedin:""
    })

    const [summary, setSummary] = useState("")
    const [exp, setExp] = useState<Experience[]>([BlankExp()])
    const [edu, setEdu] = useState<Education[]>([BlankEdu()])
    const [techSkills, setTechSkills] = useState("")
    const [softSkills, setSoftSkills] = useState("")
    const [projects, setProjects] = useState<Project[]>([BlankProj()])
    const [certs, setCerts] = useState("");

    function updateExp<K extends keyof Experience>(i:number, key:K, val:Experience[K]) {
        setExp((p) => p.map((e,idx) => (idx === i ? {...e, [key]:val} : e)));
    }

    function updateBullet(ei:number, bi:number, val:string) {
        setExp((p) => p.map((e,i) => i === ei ? {...e, bullets: e.bullets.map((b, j) => (j === bi ? val : b))} : e));
    }

    function updateEdu(i:number, key:keyof Education, val:string) {
        setEdu((p) => p.map((e,idx) => (idx === i ? {...e, [key]:val} : e)));
    }

    function updateProject(i:number, key:keyof Project, val:string) {
        setProjects((p) => p.map((proj,idx) => (idx === i ? {...proj, [key]:val} : proj)));
    }

    function addBullet(i:number) {
        setExp((p) => p.map((e,idx) => idx === i ? {...e, bullets:[...e.bullets, ""]} : e));
    }

    function removeBullet(ei:number, bi:number) {
        setExp((p) => p.map((e,i) => i === ei ? {...e, bullets:e.bullets.filter((_, j) => j !== bi)} : e));
    }

     function handleFileChange(f: File) {
    if (f.type !== "application/pdf") {
      return setError("Please upload a PDF file");
    }

    if (f.size > 5 * 1024 * 1024) {
      return setError("File size should be less than 5MB");
    }

    setError("");
    setFile(f);
  }

  async function handleSubmit() {
    setError("")
    setResult(null)

    if (mode === "improve" && !file) {
      return setError("Please upload resume pdf.");
    }

    if (mode === "manual" && !basics.name.trim()) {
      return setError("Please Enter your name.");
    }
    setLoading(true)
    try {
        let payload: ResumeBuildPayload;
        if (mode === "manual") {
            payload = {
                mode,
                formData: {
                ...basics,
                summary,
                exp,
                edu,
                skills:{
                    technical:techSkills.split(",").map((s) => s.trim()).filter(Boolean),
                    soft:softSkills.split(",").map((s) => s.trim()).filter(Boolean)
                },
                projects,
                certifications: certs.split(",").map((s) => s.trim()).filter(Boolean)
            }
        }
        }else{
            payload = {
                mode,
                pdfBase64: await toBase64(file!),
            }
        }

        const {data} = await axios.post(`${server}/api/ai/resume-build`,payload,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        const resume = data as ResumeBuildResponse;
        setResult({
            ...resume,
            certifications: resume.certifications || resume.Certifications || [],
        })

    } catch (error:unknown) {
        const message = axios.isAxiosError<{message?: string}>(error)
            ? error.response?.data?.message
            : undefined;
        setError(message || "Failed to build resume")
    }finally{
        setLoading(false);
    }
  }

  return (
    <div className="bg-page min-h-screen py-12 px-4">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 animate-slide-up">
                <div className="feature-pill inline-flex mb-5">
                    AI Resume Builder
                </div>

                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Build a Better
                    <span className="text-gradient"> Resume</span>
                </h1>

                <p className="text-white/55 text-lg max-w-2xl mx-auto">
                    Start from scratch or upload your current resume. AI will rewrite it into a cleaner, ATS-friendly version you can export as a PDF.
                </p>
            </div>

            <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-start">
                <div className="space-y-6">
                    <div className="glass-card p-2 grid grid-cols-2 gap-2">
                        {(["manual", "improve"] as const).map((m) => (
                            <button
                                type="button"
                                key={m}
                                onClick={() => {
                                    setMode(m);
                                    setError("");
                                    setResult(null);
                                }}
                                className={`flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${
                                    mode === m ? "btn-primary" : "hover:bg-white/5 text-white/70"
                                }`}
                            >
                                {m === "manual" ? <FileText size={18} /> : <Wand2 size={18} />}
                                <span>{m === "manual" ? "Create New" : "Improve PDF"}</span>
                            </button>
                        ))}
                    </div>

                    {mode === "improve" ? (
                        <div
                            className="glass-card p-10 text-center cursor-pointer hover:border-indigo-500/30 transition-all"
                            onClick={() => fileRef.current?.click()}
                            onDrop={(e) => {
                                e.preventDefault();
                                const dropped = e.dataTransfer.files[0];
                                if (dropped) handleFileChange(dropped);
                            }}
                            onDragOver={(e) => e.preventDefault()}
                        >
                            <input
                                ref={fileRef}
                                hidden
                                type="file"
                                accept="application/pdf"
                                onChange={(e) => {
                                    const selected = e.target.files?.[0];
                                    if (selected) handleFileChange(selected);
                                }}
                            />
                            <div className="floating w-20 h-20 mx-auto mb-5 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center">
                                <UploadCloud className="text-indigo-300" size={36} />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">Upload Current Resume</h2>
                            <p className="text-white/50">PDF only, up to 5MB</p>
                            {file && <p className="text-emerald-400 mt-4">{file.name}</p>}
                        </div>
                    ) : (
                        <div className="space-y-5">
                            <Section title="Personal Details">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <Field label="Full Name" value={basics.name} onChange={(v:string) => setBasics({...basics, name:v})} placeholder="Aarav Sharma" />
                                    <Field label="Email" value={basics.email} onChange={(v:string) => setBasics({...basics, email:v})} placeholder="you@example.com" />
                                    <Field label="Phone" value={basics.phone} onChange={(v:string) => setBasics({...basics, phone:v})} placeholder="+91 98765 43210" />
                                    <Field label="Location" value={basics.location} onChange={(v:string) => setBasics({...basics, location:v})} placeholder="Bengaluru, India" />
                                    <div className="md:col-span-2">
                                        <Field label="LinkedIn" value={basics.linkedin} onChange={(v:string) => setBasics({...basics, linkedin:v})} placeholder="https://linkedin.com/in/username" />
                                    </div>
                                </div>
                            </Section>

                            <Section title="Professional Summary">
                                <Field textarea label="Summary" value={summary} onChange={setSummary} placeholder="Briefly describe your role, experience, strengths, and target jobs." />
                            </Section>

                            <Section title="Experience">
                                {exp.map((item, i) => (
                                    <div key={i} className="bg-white/3 border border-white/8 rounded-xl p-4 space-y-4">
                                        <div className="flex items-center justify-between gap-3">
                                            <h3 className="font-semibold text-white/80">Experience {i + 1}</h3>
                                            {exp.length > 1 && (
                                                <button type="button" onClick={() => setExp((p) => p.filter((_, idx) => idx !== i))} className="text-red-300 hover:text-red-200">
                                                    <Trash2 size={18} />
                                                </button>
                                            )}
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <Field label="Title" value={item.title} onChange={(v:string) => updateExp(i, "title", v)} placeholder="Frontend Developer" />
                                            <Field label="Company" value={item.company} onChange={(v:string) => updateExp(i, "company", v)} placeholder="Acme Inc." />
                                            <Field label="Location" value={item.location} onChange={(v:string) => updateExp(i, "location", v)} placeholder="Remote" />
                                            <div className="grid grid-cols-2 gap-3">
                                                <Field label="Start" value={item.startDate} onChange={(v:string) => updateExp(i, "startDate", v)} placeholder="Jan 2023" />
                                                <Field label="End" value={item.endDate} onChange={(v:string) => updateExp(i, "endDate", v)} placeholder="Present" />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            {item.bullets.map((bullet, bi) => (
                                                <div key={bi} className="flex gap-2">
                                                    <input value={bullet} onChange={(e) => updateBullet(i, bi, e.target.value)} placeholder="Built a dashboard that reduced reporting time by 40%" className="input-field flex-1" />
                                                    {item.bullets.length > 1 && (
                                                        <button type="button" onClick={() => removeBullet(i, bi)} className="w-11 rounded-xl bg-red-500/10 text-red-300 flex items-center justify-center">
                                                            <Trash2 size={16} />
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                            <button type="button" onClick={() => addBullet(i)} className="feature-pill">
                                                <Plus size={14} /> Add bullet
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button type="button" onClick={() => setExp((p) => [...p, BlankExp()])} className="btn-primary px-5 py-2.5 rounded-xl inline-flex items-center gap-2">
                                    <Plus size={16} /> Add Experience
                                </button>
                            </Section>

                            <Section title="Education">
                                {edu.map((item, i) => (
                                    <div key={i} className="bg-white/3 border border-white/8 rounded-xl p-4 space-y-4">
                                        <div className="flex items-center justify-between gap-3">
                                            <h3 className="font-semibold text-white/80">Education {i + 1}</h3>
                                            {edu.length > 1 && (
                                                <button type="button" onClick={() => setEdu((p) => p.filter((_, idx) => idx !== i))} className="text-red-300 hover:text-red-200">
                                                    <Trash2 size={18} />
                                                </button>
                                            )}
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <Field label="Degree" value={item.degree} onChange={(v:string) => updateEdu(i, "degree", v)} placeholder="B.Tech Computer Science" />
                                            <Field label="School" value={item.school} onChange={(v:string) => updateEdu(i, "school", v)} placeholder="University Name" />
                                            <Field label="Location" value={item.location} onChange={(v:string) => updateEdu(i, "location", v)} placeholder="Chennai, India" />
                                            <div className="grid grid-cols-2 gap-3">
                                                <Field label="Year" value={item.year} onChange={(v:string) => updateEdu(i, "year", v)} placeholder="2026" />
                                                <Field label="GPA" value={item.gpa} onChange={(v:string) => updateEdu(i, "gpa", v)} placeholder="8.4" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button type="button" onClick={() => setEdu((p) => [...p, BlankEdu()])} className="btn-primary px-5 py-2.5 rounded-xl inline-flex items-center gap-2">
                                    <Plus size={16} /> Add Education
                                </button>
                            </Section>

                            <Section title="Skills, Projects, Certifications">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <Field label="Technical Skills" value={techSkills} onChange={setTechSkills} placeholder="React, Node.js, MongoDB" />
                                    <Field label="Soft Skills" value={softSkills} onChange={setSoftSkills} placeholder="Leadership, Communication" />
                                </div>
                                <div className="space-y-4">
                                    {projects.map((item, i) => (
                                        <div key={i} className="bg-white/3 border border-white/8 rounded-xl p-4 space-y-4">
                                            <div className="flex items-center justify-between gap-3">
                                                <h3 className="font-semibold text-white/80">Project {i + 1}</h3>
                                                {projects.length > 1 && (
                                                    <button type="button" onClick={() => setProjects((p) => p.filter((_, idx) => idx !== i))} className="text-red-300 hover:text-red-200">
                                                        <Trash2 size={18} />
                                                    </button>
                                                )}
                                            </div>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <Field label="Project Name" value={item.name} onChange={(v:string) => updateProject(i, "name", v)} placeholder="AI Resume Analyzer" />
                                                <Field label="Link" value={item.link} onChange={(v:string) => updateProject(i, "link", v)} placeholder="https://github.com/..." />
                                            </div>
                                            <Field textarea label="Description" value={item.description} onChange={(v:string) => updateProject(i, "description", v)} placeholder="What it does, tools used, and measurable impact." />
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => setProjects((p) => [...p, BlankProj()])} className="feature-pill">
                                        <Plus size={14} /> Add project
                                    </button>
                                </div>
                                <Field label="Certifications" value={certs} onChange={setCerts} placeholder="AWS Cloud Practitioner, Google UX Design" />
                            </Section>
                        </div>
                    )}

                    {error && (
                        <div className="glass-card p-4 border-red-500/20">
                            <p className="text-red-400">{error}</p>
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="btn-primary w-full py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <span className="w-5 h-5 border-2 border-white/25 border-t-white rounded-full animate-spin" />
                                Building Resume...
                            </>
                        ) : (
                            <>
                                <Sparkles size={18} />
                                Generate Resume
                            </>
                        )}
                    </button>
                </div>

                <div className="lg:sticky lg:top-24">
                    <div className="glass-card p-6 md:p-8 min-h-[560px]">
                        <div className="flex items-center justify-between gap-4 mb-6">
                            <div>
                                <p className="text-xs text-white/35 uppercase tracking-widest">Preview</p>
                                <h2 className="text-2xl font-bold">AI Optimized Resume</h2>
                            </div>
                            {result && (
                                <button
                                    type="button"
                                    onClick={() => generateResumePDF(result)}
                                    className="btn-primary px-4 py-2.5 rounded-xl flex items-center gap-2"
                                >
                                    <Download size={17} />
                                    PDF
                                </button>
                            )}
                        </div>

                        {!result ? (
                            <div className="h-[460px] border border-dashed border-white/12 rounded-xl flex flex-col items-center justify-center text-center px-6">
                                <FileText size={54} className="text-white/25 mb-5" />
                                <h3 className="text-xl font-semibold mb-2">Your resume preview appears here</h3>
                                <p className="text-white/45 max-w-sm">
                                    Fill the form or upload a PDF, then generate an ATS-friendly version ready for export.
                                </p>
                            </div>
                        ) : (
                            <div className="bg-white text-slate-900 rounded-xl p-6 md:p-8 space-y-6 shadow-2xl">
                                <div className="border-b border-slate-200 pb-4">
                                    <h3 className="text-3xl font-bold text-slate-950">{result.name}</h3>
                                    <p className="text-sm text-slate-500 mt-2">
                                        {[result.email, result.phone, result.location, result.linkedin].filter(Boolean).join(" | ")}
                                    </p>
                                </div>

                                {result.summary && (
                                    <section>
                                        <h4 className="text-xs font-bold tracking-widest text-indigo-600 uppercase mb-2">Summary</h4>
                                        <p className="text-sm leading-6 text-slate-700">{result.summary}</p>
                                    </section>
                                )}

                                {!!result.experience?.length && (
                                    <section>
                                        <h4 className="text-xs font-bold tracking-widest text-indigo-600 uppercase mb-3">Experience</h4>
                                        <div className="space-y-4">
                                            {result.experience.map((item, i) => (
                                                <div key={i}>
                                                    <div className="flex justify-between gap-3">
                                                        <div>
                                                            <h5 className="font-bold text-slate-950">{item.title}</h5>
                                                            <p className="text-sm text-slate-600">{item.company}{item.location ? `, ${item.location}` : ""}</p>
                                                        </div>
                                                        <p className="text-xs text-slate-500 whitespace-nowrap">{item.startDate} - {item.endDate}</p>
                                                    </div>
                                                    <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 space-y-1">
                                                        {item.bullets?.filter(Boolean).map((bullet, bi) => <li key={bi}>{bullet}</li>)}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {!!result.education?.length && (
                                    <section>
                                        <h4 className="text-xs font-bold tracking-widest text-indigo-600 uppercase mb-3">Education</h4>
                                        <div className="space-y-2">
                                            {result.education.map((item, i) => (
                                                <div key={i} className="flex justify-between gap-3 text-sm">
                                                    <div>
                                                        <p className="font-bold text-slate-950">{item.degree}</p>
                                                        <p className="text-slate-600">{item.school}{item.location ? `, ${item.location}` : ""}</p>
                                                    </div>
                                                    <p className="text-slate-500 whitespace-nowrap">{[item.year, item.gpa && `GPA ${item.gpa}`].filter(Boolean).join(" | ")}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {(!!result.skills?.technical?.length || !!result.skills?.soft?.length) && (
                                    <section>
                                        <h4 className="text-xs font-bold tracking-widest text-indigo-600 uppercase mb-2">Skills</h4>
                                        {!!result.skills.technical?.length && <p className="text-sm text-slate-700"><b>Technical:</b> {result.skills.technical.join(", ")}</p>}
                                        {!!result.skills.soft?.length && <p className="text-sm text-slate-700 mt-1"><b>Soft:</b> {result.skills.soft.join(", ")}</p>}
                                    </section>
                                )}

                                {!!result.projects?.length && (
                                    <section>
                                        <h4 className="text-xs font-bold tracking-widest text-indigo-600 uppercase mb-3">Projects</h4>
                                        <div className="space-y-3">
                                            {result.projects.map((item, i) => (
                                                <div key={i}>
                                                    <h5 className="font-bold text-slate-950">{item.name}</h5>
                                                    {item.link && <p className="text-xs text-indigo-600">{item.link}</p>}
                                                    <p className="text-sm text-slate-700 mt-1">{item.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {!!result.certifications?.length && (
                                    <section>
                                        <h4 className="text-xs font-bold tracking-widest text-indigo-600 uppercase mb-2">Certifications</h4>
                                        <p className="text-sm text-slate-700">{result.certifications.join(", ")}</p>
                                    </section>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BuildResumePage
