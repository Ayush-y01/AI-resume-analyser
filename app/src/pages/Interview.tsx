import { useRef, useState } from "react";
import type { InterviewData, Question } from "../types";
import {
  ChevronDown,
  ChevronUp,
  Lightbulb,
  UploadCloud,
  Loader2,
  FileText,
} from "lucide-react";
import axios from "axios";
import { server } from "../main";
import { toBase64 } from "../utils";

function QCard({ q }: { q: Question }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="
bg-white/[0.03]
border
border-white/10
rounded-3xl
overflow-hidden
hover:border-cyan-500/30
hover:-translate-y-1
transition-all
"
    >
      {" "}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left"
      >
        <div className="flex gap-3">
          <span className="text-indigo-400 font-bold text-xs">Q{q.id}</span>

          <div>
            <p className="text-white/80 text-sm leading-relaxed">
              {q.question}
            </p>

            <span className="text-[10px] uppercase tracking-widest text-white/30">
              {q.category}
            </span>
          </div>
        </div>

        {open ? (
          <ChevronUp size={16} className="text-white/40 shrink-0" />
        ) : (
          <ChevronDown size={16} className="text-white/40 shrink-0" />
        )}
      </button>
      {open && (
        <div className="border-t border-white/5 px-5 py-4 flex gap-2">
          <Lightbulb size={14} className="text-amber-400 shrink-0 mt-0.5" />

          <p className="text-xs text-white/50 leading-relaxed">{q.hint}</p>
        </div>
      )}
    </div>
  );
}

const InterviewPrep = () => {
  const [mode, setMode] = useState<"manual" | "resume">("manual");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [experience, setExperience] = useState("");
  const [round, setRound] = useState<"hr" | "technical">("hr");
  const [result, setResult] = useState<InterviewData | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  function addSkill() {
    const value = skillInput.trim();

    if (!value) return;

    if (skills.includes(value)) return;

    setSkills([...skills, value]);
    setSkillInput("");
  }

  function removeSkill(skill: string) {
    setSkills(skills.filter((s) => s !== skill));
  }

  function handleFileChange(f: File) {
    if (f.type !== "application/pdf") {
      return setError("Please upload PDF file");
    }

    if (f.size > 5 * 1024 * 1024) {
      return setError("File must be less than 5MB");
    }

    setError("");
    setFile(f);
  }

  async function handleSubmit() {
    setError("");
    setResult(null);

    if (
      mode === "manual" &&
      (!skills.length || !experience.trim())
    ) {
      return setError(
        "Please add skills and experience"
      );
    }

    if (mode === "resume" && !file) {
      return setError("Resume PDF is required");
    }

    setLoading(true);

    try {
      let payload: any = {
        mode,
        round,
      };

      if (mode === "manual") {
        payload.skills = skills;
        payload.experience = experience;
      } else {
        payload.pdfBase64 = await toBase64(file);
      }

      const { data } = await axios.post(
        `${server}/api/ai/interview`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },
        }
      );

      setResult(data);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Failed to generate interview questions"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#050816] relative overflow-hidden px-4 md:px-8 py-10">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-cyan-500/10 blur-[180px] rounded-full" />
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}

        <div className="text-center mb-14 relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Prepare For Your
            <span className="block bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Dream Interview
            </span>
          </h1>

          <p className="text-white/50 mt-5 max-w-2xl mx-auto text-lg">
            Generate personalized HR and technical interview questions using
            your resume or skills.
          </p>
        </div>

        <div
          className="
bg-white/[0.03]
backdrop-blur-xl
border border-white/10
rounded-3xl
p-8
shadow-[0_0_50px_rgba(0,255,255,0.05)]
relative
z-10
"
        >
          {/* MODE */}

          <div className="bg-white/5 p-2 rounded-2xl flex mb-8">
            <button
              onClick={() => setMode("manual")}
              className={`flex-1 py-4 rounded-xl font-medium transition-all ${
                mode === "manual"
                  ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg"
                  : "text-white/60"
              }`}
            >
              Enter Skills
            </button>

            <button
              onClick={() => setMode("resume")}
              className={`flex-1 py-4 rounded-xl font-medium transition-all ${
                mode === "resume"
                  ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg"
                  : "text-white/60"
              }`}
            >
              Upload Resume
            </button>
          </div>

          {/* ROUND */}

          <div className="flex justify-center mb-8">
            <div className="bg-white/5 rounded-full p-1 flex">
              <button
                onClick={() => setRound("hr")}
                className={`px-6 py-2 rounded-full transition ${
                  round === "hr" ? "bg-cyan-500 text-white" : "text-white/50"
                }`}
              >
                HR Round
              </button>

              <button
                onClick={() => setRound("technical")}
                className={`px-6 py-2 rounded-full transition ${
                  round === "technical"
                    ? "bg-cyan-500 text-white"
                    : "text-white/50"
                }`}
              >
                Technical Round
              </button>
            </div>
          </div>

          {mode === "manual" ? (
            <>
              <div className="mb-5">
                <label className="block mb-2 text-sm text-white/60">
                  Skills
                </label>

                <div className="flex gap-3">
                  <input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="React"
                    className="
w-full
h-14
bg-white/5
border
border-white/10
rounded-2xl
px-5
outline-none
focus:border-cyan-500
focus:ring-4
focus:ring-cyan-500/20
transition
"
                  />

                  <button
                    onClick={addSkill}
                    className="
px-8
rounded-2xl
bg-gradient-to-r
from-indigo-500
to-cyan-500
font-semibold
hover:scale-105
transition
"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {skills.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => removeSkill(skill)}
                      className="
px-4
py-2
rounded-full
bg-cyan-500/10
border
border-cyan-500/20
text-cyan-300
text-sm
"
                    >
                      {skill} ✕
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm text-white/60">
                  Experience
                </label>

                <input
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="1 Year"
                  className="
w-full
h-14
bg-white/5
border
border-white/10
rounded-2xl
px-5
outline-none
focus:border-cyan-500
focus:ring-4
focus:ring-cyan-500/20
transition
"
                />
              </div>
            </>
          ) : (
            <div>
              <input
                type="file"
                className="
w-full
h-14
bg-white/5
border
border-white/10
rounded-2xl
px-5
outline-none
focus:border-cyan-500
focus:ring-4
focus:ring-cyan-500/20
transition
"
                hidden
                ref={fileRef}
                accept=".pdf"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    handleFileChange(e.target.files[0]);
                  }
                }}
              />

              <button
                onClick={() => fileRef.current?.click()}
                className="
w-full
h-72
rounded-3xl
border-2
border-dashed
border-cyan-500/20
bg-gradient-to-br
from-cyan-500/5
to-indigo-500/5
flex
flex-col
items-center
justify-center
gap-4
hover:border-cyan-500
transition
"
              >
                <UploadCloud size={60} className="text-cyan-400" />
                <span>Upload Resume PDF</span>

                {file && (
                  <span className="text-green-400 text-sm">{file.name}</span>
                )}
              </button>
            </div>
          )}

          {error && <div className="mt-5 text-red-400 text-sm">{error}</div>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="
mt-8
w-full
h-16
rounded-2xl
font-semibold
text-lg
bg-gradient-to-r
from-indigo-500
via-blue-500
to-emerald-500
hover:scale-[1.01]
transition-all
shadow-lg
shadow-cyan-500/20
flex
items-center
justify-center
gap-2
"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Questions"
            )}
          </button>
        </div>

        {result && (
          <div className="mt-10 space-y-5">
            <div
              className="
rounded-3xl
border
border-cyan-500/20
bg-gradient-to-br
from-cyan-500/5
to-indigo-500/5
p-6
"
            >
              {" "}
              <div className="flex items-center gap-2 mb-3">
                <FileText size={18} />
                <h2 className="font-semibold text-lg">Interview Overview</h2>
              </div>
              <p className="text-white/70 leading-relaxed">{result.summary}</p>
            </div>

            <div className="grid gap-4">
              {result.questions.map((q) => (
                <QCard key={q.id} q={q} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewPrep;