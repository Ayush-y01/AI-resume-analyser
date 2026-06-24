import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { server } from "../main";
import { toBase64 } from "../utils";

interface Job {
  title: string;
  company: string;
  location: string;
  description: string;
  matchScore: number;
  url?: string;
}

interface Result {
  jobs: Job[];
  summary: string;
}

const JobMatcherPage = () => {
  const [mode, setMode] = useState<"manual" | "resume">("manual");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [experience, setExperience] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fileRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (result) {
      resultRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [result]);

  function addSkill() {
    const skill = skillInput.trim();

    if (!skill) return;

    if (!skills.includes(skill)) {
      setSkills((prev) => [...prev, skill]);
    }

    setSkillInput("");
  }

  function removeSkill(skill: string) {
    setSkills((prev) => prev.filter((s) => s !== skill));
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
    setError("");
    setResult(null);

    if (mode === "manual" && (!skills.length || !experience.trim())) {
      return setError("Please add skills and experience.");
    }

    if (mode === "resume" && !file) {
      return setError("Please upload resume.");
    }

    setLoading(true);

    try {
      let payload: any = { mode };

      if (mode === "manual") {
        payload = {
          ...payload,
          skills,
          experience,
        };
      } else {
        payload = {
          ...payload,
          pdfBase64: await toBase64(file!),
        };
      }

      const { data } = await axios.post(
        `${server}/api/ai/job-matcher`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setResult(data);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Failed to fetch matching jobs."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-page min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-12">
          <div className="feature-pill inline-flex mb-5">
            AI Job Matcher
          </div>

          <h1 className="text-5xl font-bold mb-4">
            Find Your Perfect
            <span className="text-gradient"> Job Match</span>
          </h1>

          <p className="text-white/60 max-w-2xl mx-auto">
            Upload your resume or enter skills manually and let AI
            recommend the most suitable jobs.
          </p>
        </div>

        <div className="glass-card p-2 flex gap-2 mb-8">
          {(["manual", "resume"] as const).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setResult(null);
                setError("");
              }}
              className={`flex-1 py-3 rounded-xl transition-all ${
                mode === m
                  ? "btn-primary"
                  : "hover:bg-white/5"
              }`}
            >
              {m === "manual"
                ? "Enter Skills"
                : "Upload Resume"}
            </button>
          ))}
        </div>

        {mode === "manual" ? (
          <div className="glass-card p-8">
            <h2 className="text-xl font-semibold mb-4">
              Skills
            </h2>

            <div className="flex gap-3">
              <input
                value={skillInput}
                onChange={(e) =>
                  setSkillInput(e.target.value)
                }
                placeholder="React"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3"
              />

              <button
                onClick={addSkill}
                className="btn-primary px-6 rounded-xl"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="feature-pill cursor-pointer"
                  onClick={() => removeSkill(skill)}
                >
                  {skill} ✕
                </div>
              ))}
            </div>

            <input
              value={experience}
              onChange={(e) =>
                setExperience(e.target.value)
              }
              placeholder="2 Years Experience"
              className="w-full mt-6 bg-white/5 border border-white/10 rounded-xl px-4 py-3"
            />
          </div>
        ) : (
          <div
            className="glass-card p-10 text-center cursor-pointer"
            onClick={() => fileRef.current?.click()}
          >
            <input
              hidden
              type="file"
              accept="application/pdf"
              ref={fileRef}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFileChange(f);
              }}
            />

            <h2 className="text-2xl font-bold">
              Upload Resume
            </h2>

            <p className="text-white/50 mt-2">
              PDF only • Max 5MB
            </p>

            {file && (
              <p className="mt-4 text-green-400">
                ✓ {file.name}
              </p>
            )}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="btn-primary w-full mt-8 py-4 rounded-xl"
        >
          {loading
            ? "Finding Best Matches..."
            : "Match Jobs"}
        </button>

        {error && (
          <div className="glass-card p-4 mt-6 border-red-500/20">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {result && (
          <div
            ref={resultRef}
            className="mt-12 space-y-8"
          >
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-4">
                AI Summary
              </h2>

              <p className="text-white/70">
                {result.summary}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {result.jobs.map((job, index) => (
                <div
                  key={index}
                  className="glass-card p-6"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-xl">
                        {job.title}
                      </h3>

                      <p className="text-white/60">
                        {job.company}
                      </p>
                    </div>

                    <div className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full">
                      {job.matchScore}%
                    </div>
                  </div>

                  <p className="text-white/50 mt-3">
                    {job.location}
                  </p>

                  <p className="text-white/60 mt-4">
                    {job.description}
                  </p>

                  {job.url && (
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary inline-block mt-5 px-5 py-2 rounded-lg"
                    >
                      Apply Now
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobMatcherPage;

