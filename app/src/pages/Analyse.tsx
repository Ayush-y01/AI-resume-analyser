
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { server } from "../main";
import { toBase64 } from "../utils";
import type { Analysis } from "../types";

const AnalysePage = () => {
  const [result, setResult] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  async function handleFile(file: File) {
    if (file.type !== "application/pdf") {
      return setError("Please upload a PDF file");
    }

    if (file.size > 5 * 1024 * 1024) {
      return setError("File size should be less than 5MB");
    }

    setError("");
    setSelectedFile(file);
    setLoading(true);
    setResult(null);

    try {
      const pdfBase64 = await toBase64(file);

      const { data } = await axios.post(`${server}/api/ai/analyse`,
        { pdfBase64 },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setResult(data);
    } catch (error: any) {
      setError(
        error?.response?.data?.message ||
          "Analysis failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if (file) {
      handleFile(file);
    }
  };
  useEffect(() => {
  if (result && resultRef.current) {
    resultRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}, [result]);

  return (
    <div className="bg-page py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* HERO */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-flex feature-pill mb-5">
            AI Powered Resume Analysis
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Analyze Your
            <span className="text-gradient"> Resume</span>
          </h1>

          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Upload your resume and get ATS scoring, keyword analysis,
            formatting feedback and actionable recommendations.
          </p>
        </div>

        {/* UPLOAD */}
        <div
          className="glass-card p-10 md:p-14 text-center cursor-pointer
                     hover:border-indigo-500/30 transition-all duration-300"
          onClick={() => fileRef.current?.click()}
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <input
            ref={fileRef}
            type="file"
            accept="application/pdf"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (file) {
                handleFile(file);
              }
            }}
          />

          <div className="floating w-24 h-24 mx-auto mb-6 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-indigo-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 16V4m0 0l-4 4m4-4l4 4M4 20h16"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold mb-3">
            Upload Resume PDF
          </h2>

          <p className="text-white/50 mb-8">
            Drag & drop your resume or click below
          </p>

          <button
            type="button"
            className="btn-primary px-8 py-3 rounded-xl"
          >
            Select Resume
          </button>
          {selectedFile && (
  <p className="text-green-400 mt-4">
    ✓ {selectedFile.name}
  </p>
)}

          <div className="flex justify-center gap-3 mt-8 flex-wrap">
            <div className="feature-pill">PDF Only</div>
            <div className="feature-pill">Max 5 MB</div>
            <div className="feature-pill">ATS Analysis</div>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="glass-card mt-6 p-4 border-red-500/20">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="glass-card mt-8 p-8 text-center animate-fade-in">
            <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4" />

            <h3 className="text-xl font-semibold">
              Analyzing Resume...
            </h3>

            <p className="text-white/50 mt-2">
              Extracting skills, keywords and ATS score
            </p>
          </div>
        )}

        {/* RESULTS */}
        {result && (
          <div ref={resultRef} className="mt-10 space-y-8 animate-fade-in">

            {/* ATS SCORE */}
            <div className="glass-card p-8">
              <h3 className="text-lg text-white/60 mb-4">
                ATS Score
              </h3>

              <div className="flex items-end gap-2">
                <span className="text-7xl font-bold text-gradient">
                  {result.atsScore}
                </span>

                <span className="text-white/40 text-2xl mb-2">
                  /100
                </span>
              </div>

              <p className="text-white/50 mt-4">
                {result.summary}
              </p>
            </div>

            {/* BREAKDOWN */}
            <div className="glass-card p-6 border border-red-500/20">
  <h3 className="text-xl font-bold text-red-400 mb-4">
    🚨 Fix These First
  </h3>

  <div className="space-y-3">
    {result.suggestions
      .filter((s) => s.priority === "high")
      .slice(0, 3)
      .map((item, index) => (
        <div
          key={index}
          className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl"
        >
          <h4 className="font-semibold">
            {item.category}
          </h4>

          <p className="text-white/60 mt-2">
            {item.recommendation}
          </p>
        </div>
      ))}
  </div>
</div>
            <div>
              <h3 className="text-2xl font-bold mb-5">
                Score Breakdown
              </h3>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="glass-card p-5">
                  <h4 className="text-white/50 mb-3">
                    Formatting
                  </h4>

                  <div className="text-3xl font-bold text-indigo-400">
                    {result.scoreBreakdown.formatting.score}
                  </div>

                  <p className="text-sm text-white/40 mt-3">
                    {result.scoreBreakdown.formatting.feedback}
                  </p>
                </div>

                <div className="glass-card p-5">
                  <h4 className="text-white/50 mb-3">
                    Keywords
                  </h4>

                  <div className="text-3xl font-bold text-indigo-400">
                    {result.scoreBreakdown.keywords.score}
                  </div>

                  <p className="text-sm text-white/40 mt-3">
                    {result.scoreBreakdown.keywords.feedback}
                  </p>
                </div>

                <div className="glass-card p-5">
                  <h4 className="text-white/50 mb-3">
                    Structure
                  </h4>

                  <div className="text-3xl font-bold text-indigo-400">
                    {result.scoreBreakdown.structure.score}
                  </div>

                  <p className="text-sm text-white/40 mt-3">
                    {result.scoreBreakdown.structure.feedback}
                  </p>
                </div>

                <div className="glass-card p-5">
                  <h4 className="text-white/50 mb-3">
                    Readability
                  </h4>

                  <div className="text-3xl font-bold text-indigo-400">
                    {result.scoreBreakdown.readability.score}
                  </div>

                  <p className="text-sm text-white/40 mt-3">
                    {result.scoreBreakdown.readability.feedback}
                  </p>
                </div>
              </div>
            </div>

            {/* STRENGTHS */}
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-6">
                Strengths
              </h3>

              <div className="space-y-3">
                {result.strengths.map((item, index) => (
                  <div
                    key={index}
                    className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4"
                  >
                    <span className="text-emerald-300">
                      ✓ {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* SUGGESTIONS */}
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-6">
                Recommendations
              </h3>

              <div className="space-y-4">
                {result.suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="bg-white/3 border border-white/8 rounded-xl p-5"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold">
                        {suggestion.category}
                      </h4>

                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          suggestion.priority === "high"
                            ? "bg-red-500/15 text-red-300"
                            : suggestion.priority === "medium"
                            ? "bg-yellow-500/15 text-yellow-300"
                            : "bg-emerald-500/15 text-emerald-300"
                        }`}
                      >
                        {suggestion.priority}
                      </span>
                    </div>

                    <p className="text-white/50 mb-3">
                      {suggestion.issue}
                    </p>

                    <p className="text-indigo-300">
                      {suggestion.recommendation}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysePage;

