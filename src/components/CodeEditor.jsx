import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

export default function CodeEditor({ filename = "Solution.java", code, output }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code ? code.split('\n') : [];

  return (
    <div className="code-editor-container">
      <div className="code-editor-header">
        <div className="editor-left">
          <div className="editor-dots">
            <div className="editor-dot editor-dot-red"></div>
            <div className="editor-dot editor-dot-yellow"></div>
            <div className="editor-dot editor-dot-green"></div>
          </div>
          <span className="editor-filename">{filename}</span>
        </div>
        <button className="copy-code-btn" onClick={copyToClipboard} title="Copy Code">
          {copied ? <Check size={16} className="text-green" /> : <Copy size={16} />}
          <span>{copied ? 'Copied!' : 'Copy Code'}</span>
        </button>
      </div>

      <div className="code-editor-body">
        {lines.map((line, idx) => (
          <div key={idx} className="code-line">
            <span className="line-number">{idx + 1}</span>
            <span className="line-content">{line}</span>
          </div>
        ))}
      </div>

      {output && (
        <div className="code-editor-output">
          <div className="output-title">
            <Terminal size={14} />
            <span>Execution Output</span>
          </div>
          <pre className="output-body">{output}</pre>
        </div>
      )}

      <style>{`
        .code-editor-container {
          background: #0d1117;
          border-radius: 0.75rem;
          border: 1px solid #30363d;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
          font-family: var(--font-mono);
          margin: 1.5rem 0;
          text-align: left;
        }

        .code-editor-header {
          background: #161b22;
          padding: 0.75rem 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #30363d;
        }

        .editor-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .editor-dots {
          display: flex;
          gap: 0.4rem;
        }

        .editor-dot {
          width: 0.75rem;
          height: 0.75rem;
          border-radius: 50%;
        }

        .editor-dot-red { background: #ff5f56; }
        .editor-dot-yellow { background: #ffbd2e; }
        .editor-dot-green { background: #27c93f; }

        .editor-filename {
          color: #8b949e;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .copy-code-btn {
          background: transparent;
          border: 1px solid #30363d;
          color: #8b949e;
          border-radius: 0.5rem;
          padding: 0.35rem 0.7rem;
          font-size: 0.8rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-sans);
          transition: var(--transition);
        }

        .copy-code-btn:hover {
          color: white;
          background: #21262d;
          border-color: #8b949e;
        }

        .text-green {
          color: #39d353;
        }

        .code-editor-body {
          padding: 1.25rem;
          overflow-x: auto;
          background: #0d1117;
        }

        .code-line {
          display: flex;
          font-size: 0.9rem;
          line-height: 1.5;
          color: #e6edf3;
        }

        .line-number {
          color: #484f58;
          width: 2.5rem;
          text-align: right;
          padding-right: 1.25rem;
          user-select: none;
          border-right: 1px solid #21262d;
          margin-right: 1rem;
        }

        .line-content {
          white-space: pre;
          color: #c9d1d9;
        }

        /* Basic Syntax Highlighting Simulation via HSL patterns */
        .line-content {
          color: #e6edf3;
        }

        /* Quick pseudo token highlight */
        .code-editor-output {
          background: #090d13;
          border-top: 1px solid #30363d;
          padding: 1rem 1.25rem;
          font-size: 0.85rem;
        }

        .output-title {
          color: #e3b341;
          font-weight: 600;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-sans);
        }

        .output-body {
          margin: 0;
          padding: 0.5rem;
          white-space: pre-wrap;
          font-family: var(--font-mono);
          color: #58a6ff;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 0.25rem;
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
}
