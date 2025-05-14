import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { Clock, Download, RotateCw } from 'lucide-react';

const data = [
  { date: "Nov 27", accepted: 135, rejected: 18, flagged: 9 },
  { date: "Dec 27", accepted: 110, rejected: 22, flagged: 9 },
  { date: "Jan 28", accepted: 112, rejected: 17, flagged: 10 },
  { date: "Feb 28", accepted: 130, rejected: 25, flagged: 8 },
  { date: "Mar 28", accepted: 111, rejected: 27, flagged: 11 },
  { date: "Apr 28", accepted: 112, rejected: 19, flagged: 7 },
  { date: "May 28", accepted: 132, rejected: 21, flagged: 8 },
  { date: "Jun 28", accepted: 115, rejected: 23, flagged: 7 },
  { date: "Jul 28", accepted: 140, rejected: 18, flagged: 6 },
  { date: "Aug 28", accepted: 139, rejected: 11, flagged: 9 },
  { date: "Sep 28", accepted: 138, rejected: 26, flagged: 10 },
  { date: "Oct 28", accepted: 128, rejected: 25, flagged: 7 },
];

const courses = [
  { code: "CSEN 603", name: "Software Engineering" },
  { code: "CSEN 602", name: "Operating Systems" },
  { code: "DMET 602", name: "Network & Media Lab" },
  { code: "CSEN 604", name: "Data Bases II" },
  { code: "CSEN 601", name: "Computer System Architecture" },
  { code: "MNGT 601", name: "Introduction to Management" },
  { code: "CSEN 502", name: "Theory of Computation" },
  { code: "MATH 501", name: "Mathematics V (Discrete Math)" },
  { code: "CSEN 503", name: "Introduction To Communication Networks" },
  { code: "DMET 501", name: "Introduction to Media Engineering" },
  { code: "CSEN 501", name: "Data Base I" },
  { code: "CSEN 605", name: "Digital System Design" },
];

export default function Statistics() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7fafd",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "40px",
      }}
    >
      {/* Top Row: Two Boxes */}
      <div
        style={{
          display: "flex",
          gap: 40,
          marginBottom: 40,
        }}
      >
        {/* Left Card: Average Review Time */}
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 2px 12px rgba(56,211,159,0.10)",
            padding: "32px 40px",
            width: 420,
            minHeight: 180,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            position: "relative",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 24,
              right: 24,
            }}
          >
            <Clock size={28} color="#ffb300" />
          </div>
          <div
            style={{
              fontSize: "1.1rem",
              fontWeight: 500,
              color: "#222",
              marginBottom: 8,
            }}
          >
            Average Review Time
          </div>
          <div
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              color: "#38d39f",
              marginBottom: 4,
            }}
          >
            5.1 days
          </div>
          <div
            style={{
              color: "#4d6a7a",
              fontSize: "1rem",
              fontWeight: 400,
            }}
          >
            Based on last 100 processed reports
          </div>
        </div>

        {/* Right Card: Generate Reports */}
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 2px 12px rgba(56,211,159,0.10)",
            padding: "32px 40px",
            width: 420,
            minHeight: 180,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            position: "relative",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 24,
              right: 24,
            }}
          >
            <Download size={28} color="#ffb300" />
          </div>
          <div
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              color: "#222",
              marginBottom: 4,
            }}
          >
            Generate Reports
          </div>
          <div
            style={{
              color: "#4d6a7a",
              fontSize: "1rem",
              fontWeight: 400,
              marginBottom: 12,
            }}
          >
            Download a summary of current internship statistics and insights.
          </div>
          <button
            style={{
              background: "#4caf50",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "12px 28px",
              fontWeight: 600,
              fontSize: "1.1rem",
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
              width: "fit-content",
            }}
            onClick={() => {
              // Download the PDF from the public/assets folder
              const link = document.createElement("a");
              link.href = require("../assets/Report.pdf");
              link.download = "Report.pdf";
              link.click();
            }}
          >
            <Download size={20} color="#fff" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Real-time Report Statistics Chart */}
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 2px 12px rgba(56,211,159,0.10)",
          padding: "32px 40px",
          width: 1100,
          maxWidth: "100%",
          marginBottom: 40,
        }}
      >
        <h2 style={{ fontSize: "2rem", fontWeight: 600, marginBottom: 0 }}>
          Real-time Report Statistics
        </h2>
        <div style={{ color: "#4d6a7a", marginBottom: 24 }}>
          Total reports accepted, rejected, and flagged per review cycle.
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="accepted" stroke="#43a047" strokeWidth={2} dot />
            <Line type="monotone" dataKey="rejected" stroke="#e53935" strokeWidth={2} dot />
            <Line type="monotone" dataKey="flagged" stroke="#ffb300" strokeWidth={2} dot />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Popular Course Identification */}
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 2px 12px rgba(56,211,159,0.10)",
          padding: "32px 40px",
          width: 1100,
          maxWidth: "100%",
          minHeight: 250,
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <h2 style={{ fontSize: "2rem", fontWeight: 600, marginBottom: 0 }}>
              Popular Course Identification
            </h2>
            <div style={{ color: "#4d6a7a", marginBottom: 24 }}>
              Most frequently mentioned courses in internship reports (AI-powered).
            </div>
          </div>
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
              marginTop: 8,
            }}
            title="Refresh"
            onClick={() => { /* Add refresh logic if needed */ }}
          >
            <RotateCw size={22} color="#4d6a7a" />
          </button>
        </div>
        <div style={{ marginTop: 32 }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "1.13rem",
            color: "#222",
            background: "#fff"
          }}>
            <thead>
              <tr>
                <th style={{
                  textAlign: "left",
                  padding: "12px 16px",
                  fontWeight: 700,
                  fontSize: "1.08em",
                  color: "#38d39f",
                  fontFamily: "monospace",
                  letterSpacing: "1px",
                  borderBottom: "2px solid #e0e0e0"
                }}>Course Code</th>
                <th style={{
                  textAlign: "left",
                  padding: "12px 16px",
                  fontWeight: 700,
                  fontSize: "1.08em",
                  color: "#222",
                  fontFamily: "Segoe UI, Arial, sans-serif",
                  borderBottom: "2px solid #e0e0e0"
                }}>Course Name</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.code + course.name}>
                  <td style={{
                    padding: "10px 16px",
                    fontWeight: 700,
                    fontFamily: "monospace",
                    color: "#38d39f",
                    letterSpacing: "1px",
                    fontSize: "1.08em",
                    borderBottom: "1px solid #f0f0f0"
                  }}>
                    {course.code}
                  </td>
                  <td style={{
                    padding: "10px 16px",
                    fontWeight: 500,
                    fontFamily: "Segoe UI, Arial, sans-serif",
                    color: "#222",
                    fontSize: "1.08em",
                    borderBottom: "1px solid #f0f0f0"
                  }}>
                    {course.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Companies Table */}
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 2px 12px rgba(56,211,159,0.10)",
          padding: "32px 40px",
          width: 1100,
          maxWidth: "100%",
          marginTop: 40,
        }}
      >
        <h2 style={{ fontSize: "2rem", fontWeight: 600, marginBottom: 0 }}>
          Top Companies
        </h2>
        <div style={{ color: "#4d6a7a", marginBottom: 24 }}>
          Ranking of companies based on internship ratings and cycles.
        </div>
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "1.13rem",
          color: "#222",
          background: "#fff"
        }}>
          <thead>
            <tr>
              <th style={{
                textAlign: "left",
                padding: "12px 16px",
                fontWeight: 700,
                fontSize: "1.08em",
                color: "#222",
                borderBottom: "2px solid #e0e0e0"
              }}>Rank</th>
              <th style={{
                textAlign: "left",
                padding: "12px 16px",
                fontWeight: 700,
                fontSize: "1.08em",
                color: "#222",
                borderBottom: "2px solid #e0e0e0"
              }}>Company</th>
              <th style={{
                textAlign: "left",
                padding: "12px 16px",
                fontWeight: 700,
                fontSize: "1.08em",
                color: "#222",
                borderBottom: "2px solid #e0e0e0"
              }}>Rating</th>
              <th style={{
                textAlign: "left",
                padding: "12px 16px",
                fontWeight: 700,
                fontSize: "1.08em",
                color: "#222",
                borderBottom: "2px solid #e0e0e0"
              }}>Cycle</th>
            </tr>
          </thead>
          <tbody>
            {[
              { rank: 1, name: "EcoWorld Sustainables", rating: 4.9, cycle: "Fall 2023" },
              { rank: 2, name: "Stark Industries", rating: 4.9, cycle: "Summer 2023" },
              { rank: 3, name: "Innovatech Solutions", rating: 4.8, cycle: "Spring 2024" },
              { rank: 4, name: "QuantumLeap AI", rating: 4.7, cycle: "Spring 2024" },
              { rank: 5, name: "HealthFirst Medtech", rating: 4.6, cycle: "Fall 2023" },
            ].map((company) => (
              <tr key={company.rank}>
                <td style={{
                  padding: "10px 16px",
                  fontWeight: 600,
                  color: "#222",
                  borderBottom: "1px solid #f0f0f0"
                }}>{company.rank}</td>
                <td style={{
                  padding: "10px 16px",
                  fontWeight: 600,
                  color: "#222",
                  borderBottom: "1px solid #f0f0f0"
                }}>{company.name}</td>
                <td style={{
                  padding: "10px 16px",
                  color: "#ffb300",
                  fontWeight: 600,
                  borderBottom: "1px solid #f0f0f0"
                }}>
                  <span style={{ marginRight: 4 }}>★</span>{company.rating}
                </td>
                <td style={{
                  padding: "10px 16px",
                  color: "#4d6a7a",
                  borderBottom: "1px solid #f0f0f0"
                }}>{company.cycle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top Companies by Internship Count and Top Rated Companies Side by Side */}
      <div
        style={{
          display: "flex",
          gap: 40,
          marginTop: 40,
          width: 1100,
          maxWidth: "100%",
        }}
      >
        {/* Top Companies by Internship Count */}
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 2px 12px rgba(56,211,159,0.10)",
            padding: "32px 40px",
            flex: 1,
            minWidth: 0,
          }}
        >
          <h2 style={{ fontSize: "2rem", fontWeight: 600, marginBottom: 0 }}>
            Top Companies by Internship Count
          </h2>
          <div style={{ color: "#4d6a7a", marginBottom: 24 }}>
            Companies offering the highest number of internships.
          </div>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "1.13rem",
            color: "#222",
            background: "#fff"
          }}>
            <thead>
              <tr>
                <th style={{
                  textAlign: "left",
                  padding: "12px 16px",
                  fontWeight: 700,
                  fontSize: "1.08em",
                  color: "#222",
                  borderBottom: "2px solid #e0e0e0"
                }}>Rank</th>
                <th style={{
                  textAlign: "left",
                  padding: "12px 16px",
                  fontWeight: 700,
                  fontSize: "1.08em",
                  color: "#222",
                  borderBottom: "2px solid #e0e0e0"
                }}>Company</th>
                <th style={{
                  textAlign: "left",
                  padding: "12px 16px",
                  fontWeight: 700,
                  fontSize: "1.08em",
                  color: "#222",
                  borderBottom: "2px solid #e0e0e0"
                }}>Internships</th>
              </tr>
            </thead>
            <tbody>
              {[
                { rank: 1, name: "Innovatech Solutions", internships: 150 },
                { rank: 2, name: "Stark Industries", internships: 135 },
                { rank: 3, name: "Future Gadgets Lab", internships: 120 },
                { rank: 4, name: "QuantumLeap AI", internships: 110 },
                { rank: 5, name: "HealthFirst Medtech", internships: 95 },
              ].map((company) => (
                <tr key={company.rank}>
                  <td style={{
                    padding: "10px 16px",
                    fontWeight: 600,
                    color: "#222",
                    borderBottom: "1px solid #f0f0f0"
                  }}>{company.rank}</td>
                  <td style={{
                    padding: "10px 16px",
                    fontWeight: 600,
                    color: "#222",
                    borderBottom: "1px solid #f0f0f0"
                  }}>{company.name}</td>
                  <td style={{
                    padding: "10px 16px",
                    color: "#38d39f",
                    fontWeight: 600,
                    borderBottom: "1px solid #f0f0f0"
                  }}>
                    <span style={{ marginRight: 6, fontSize: 18 }}>🧳</span>
                    {company.internships}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top Rated Companies */}
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 2px 12px rgba(56,211,159,0.10)",
            padding: "32px 40px",
            flex: 1,
            minWidth: 0,
          }}
        >
          <h2 style={{ fontSize: "2rem", fontWeight: 600, marginBottom: 0 }}>
            Top Rated Companies
          </h2>
          <div style={{ color: "#4d6a7a", marginBottom: 24 }}>
            Based on student evaluations. Filter by review cycle.
          </div>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "1.13rem",
            color: "#222",
            background: "#fff"
          }}>
            <thead>
              <tr>
                <th style={{
                  textAlign: "left",
                  padding: "12px 16px",
                  fontWeight: 700,
                  fontSize: "1.08em",
                  color: "#222",
                  borderBottom: "2px solid #e0e0e0"
                }}>Rank</th>
                <th style={{
                  textAlign: "left",
                  padding: "12px 16px",
                  fontWeight: 700,
                  fontSize: "1.08em",
                  color: "#222",
                  borderBottom: "2px solid #e0e0e0"
                }}>Company</th>
                <th style={{
                  textAlign: "left",
                  padding: "12px 16px",
                  fontWeight: 700,
                  fontSize: "1.08em",
                  color: "#222",
                  borderBottom: "2px solid #e0e0e0"
                }}>Rating</th>
                <th style={{
                  textAlign: "left",
                  padding: "12px 16px",
                  fontWeight: 700,
                  fontSize: "1.08em",
                  color: "#222",
                  borderBottom: "2px solid #e0e0e0"
                }}>Cycle</th>
              </tr>
            </thead>
            <tbody>
              {[
                { rank: 1, name: "EcoWorld Sustainables", rating: 4.9, cycle: "Fall 2023" },
                { rank: 2, name: "Stark Industries", rating: 4.9, cycle: "Summer 2023" },
                { rank: 3, name: "Innovatech Solutions", rating: 4.8, cycle: "Spring 2024" },
                { rank: 4, name: "QuantumLeap AI", rating: 4.7, cycle: "Spring 2024" },
                { rank: 5, name: "HealthFirst Medtech", rating: 4.6, cycle: "Fall 2023" },
              ].map((company) => (
                <tr key={company.rank}>
                  <td style={{
                    padding: "10px 16px",
                    fontWeight: 600,
                    color: "#222",
                    borderBottom: "1px solid #f0f0f0"
                  }}>{company.rank}</td>
                  <td style={{
                    padding: "10px 16px",
                    fontWeight: 600,
                    color: "#222",
                    borderBottom: "1px solid #f0f0f0"
                  }}>{company.name}</td>
                  <td style={{
                    padding: "10px 16px",
                    color: "#ffb300",
                    fontWeight: 600,
                    borderBottom: "1px solid #f0f0f0"
                  }}>
                    <span style={{ marginRight: 4 }}>★</span>{company.rating}
                  </td>
                  <td style={{
                    padding: "10px 16px",
                    color: "#4d6a7a",
                    borderBottom: "1px solid #f0f0f0"
                  }}>{company.cycle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}