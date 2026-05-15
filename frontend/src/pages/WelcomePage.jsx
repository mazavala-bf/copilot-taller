import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const certifications = [
  {
    id: 1,
    exam: 'AI-901',
    title: 'Microsoft Azure AI Fundamentals',
    level: 'Fundamentals',
    description:
      'New exam for 2026. Validates conceptual knowledge of AI solutions in Azure, including responsible AI principles and hands-on implementation using Microsoft Foundry.',
    skills: ['AI concepts & responsibilities (40–45%)', 'Implement AI with Microsoft Foundry (55–60%)'],
    color: '#533afd',
    url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/',
  },
  {
    id: 2,
    exam: 'AI-103',
    title: 'Developing AI Apps and Agents on Azure',
    level: 'Associate',
    description:
      'New 2026 certification for Azure AI engineers. Covers building, managing, and deploying agents and AI solutions using Microsoft Foundry with Python.',
    skills: ['Planning & managing Azure AI solutions', 'Generative AI & agentic solutions', 'Computer vision & text analysis'],
    color: '#0f7b6c',
    url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-engineer/',
  },
  {
    id: 3,
    exam: 'MS-721',
    title: 'Collaboration Communications Systems Engineer Associate',
    level: 'Associate',
    description:
      'Microsoft 365 certification added as a key skilling option in 2026. Validates expertise in Microsoft Teams calling, meetings, and collaboration systems.',
    skills: ['Microsoft Teams calling & meetings', 'Collaboration systems design', 'Communications engineering'],
    color: '#107c41',
    url: 'https://learn.microsoft.com/en-us/credentials/certifications/m365-collaboration-communications-systems-engineer/',
  },
  {
    id: 4,
    exam: 'AZ-500',
    title: 'Microsoft Azure Security Engineer Associate',
    level: 'Associate',
    description:
      'Validates skills in implementing security controls and threat protection, managing identity and access, and protecting data and applications in Azure.',
    skills: ['Identity & access management', 'Platform protection', 'Security operations & data protection'],
    color: '#ea2261',
    url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-security-engineer/',
  },
  {
    id: 5,
    exam: 'DP-700',
    title: 'Fabric Data Engineer Associate',
    level: 'Associate',
    description:
      'Certifies expertise in designing and implementing data solutions using Microsoft Fabric, including data ingestion, transformation, and analytics pipelines.',
    skills: ['Data ingestion & transformation', 'Microsoft Fabric lakehouses', 'Data pipeline orchestration'],
    color: '#f7630c',
    url: 'https://learn.microsoft.com/en-us/credentials/certifications/fabric-data-engineer-associate/',
  },
  {
    id: 6,
    exam: 'PL-400',
    title: 'Microsoft Power Platform Developer Associate',
    level: 'Associate',
    description:
      'Validates skills in designing, developing, and extending Microsoft Power Platform solutions using Power Apps, Power Automate, and Dataverse.',
    skills: ['Power Apps & Dataverse development', 'Power Automate & custom connectors', 'ALM & DevOps for Power Platform'],
    color: '#742774',
    url: 'https://learn.microsoft.com/en-us/credentials/certifications/power-platform-developer-associate/',
  },
]

const levelColors = {
  Fundamentals: '#533afd',
  Associate: '#0078d4',
  Expert: '#107c41',
  Specialty: '#ea2261',
}

export default function WelcomePage() {
  const { username, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/', { replace: true })
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-canvas-soft)',
        padding: '40px 24px',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Welcome card */}
        <div className="card" style={{ textAlign: 'center', marginBottom: '48px' }}>
          {/* Decorative indigo dot */}
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-soft, #665efd))',
              margin: '0 auto 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>

          <h1 className="display-lg" style={{ marginBottom: '8px' }}>
            Welcome, {username}!
          </h1>

          <p
            style={{
              fontSize: '15px',
              fontWeight: 300,
              color: 'var(--color-ink-mute)',
              marginBottom: '32px',
            }}
          >
            You are successfully authenticated.
          </p>

          <button className="btn-secondary" onClick={handleLogout}>
            Sign out
          </button>
        </div>

        {/* Microsoft Certifications 2026 */}
        <div style={{ marginBottom: '24px' }}>
          <h2 className="display-md" style={{ marginBottom: '8px', textAlign: 'center' }}>
            🎓 Microsoft Certifications 2026
          </h2>
          <p
            style={{
              fontSize: '15px',
              fontWeight: 300,
              color: 'var(--color-ink-mute)',
              textAlign: 'center',
              marginBottom: '32px',
            }}
          >
            Explore the latest Microsoft certifications to advance your career in cloud, AI, and data.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px',
            }}
          >
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="card"
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  borderTop: `3px solid ${cert.color}`,
                  transition: 'box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 4px 16px rgba(0,0,0,0.12)`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'rgba(0, 55, 112, 0.08) 0 1px 3px'
                }}
              >
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: cert.color,
                      backgroundColor: cert.color + '1a',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-pill)',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {cert.exam}
                  </span>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 500,
                      color: levelColors[cert.level] || '#0078d4',
                      backgroundColor: (levelColors[cert.level] || '#0078d4') + '1a',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-pill)',
                    }}
                  >
                    {cert.level}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: '16px',
                    fontWeight: 500,
                    color: 'var(--color-ink)',
                    lineHeight: '1.3',
                  }}
                >
                  {cert.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: '13px',
                    fontWeight: 300,
                    color: 'var(--color-ink-mute)',
                    lineHeight: '1.5',
                    flexGrow: 1,
                  }}
                >
                  {cert.description}
                </p>

                {/* Skills */}
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {cert.skills.map((skill, i) => (
                    <li
                      key={i}
                      style={{
                        fontSize: '12px',
                        fontWeight: 300,
                        color: 'var(--color-ink-secondary)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '6px',
                      }}
                    >
                      <span style={{ color: cert.color, fontWeight: 600, flexShrink: 0 }}>›</span>
                      {skill}
                    </li>
                  ))}
                </ul>

                {/* Link */}
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '13px',
                    fontWeight: 400,
                    color: cert.color,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    marginTop: '4px',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline' }}
                  onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none' }}
                >
                  Learn more
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
