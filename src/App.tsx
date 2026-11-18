
import { useMemo, useState } from 'react'
import {
  Search, MessageCircle, Users, Phone, Compass, BriefcaseBusiness,
  Settings, Plus, Send, Paperclip, Smile, MoreHorizontal, Video,
  CheckCheck, Bell, Sparkles, Menu, X, ArrowUpRight
} from 'lucide-react'

type Chat = {
  id: number
  name: string
  initials: string
  color: string
  message: string
  time: string
  unread?: number
  online?: boolean
}

const initialChats: Chat[] = [
  { id: 1, name: 'Amara Okafor', initials: 'AO', color: 'coral', message: 'That sounds like a great idea!', time: 'now', unread: 2, online: true },
  { id: 2, name: 'ORBITA Creators', initials: 'OC', color: 'purple', message: 'Daniel: New creator meetup this Friday', time: '10:42', unread: 4 },
  { id: 3, name: 'Daniel James', initials: 'DJ', color: 'blue', message: 'Sent you the project files.', time: '09:18', online: true },
  { id: 4, name: 'Mum ❤️', initials: 'M', color: 'green', message: 'Have you eaten?', time: 'Yesterday' },
  { id: 5, name: 'Startup Builders', initials: 'SB', color: 'amber', message: 'You: I will share an update soon', time: 'Yesterday' },
  { id: 6, name: 'Chidinma', initials: 'C', color: 'pink', message: 'Thank you so much 😊', time: 'Mon' },
]

const navItems = [
  { label: 'Chats', icon: MessageCircle },
  { label: 'Updates', icon: Sparkles },
  { label: 'Communities', icon: Users },
  { label: 'Calls', icon: Phone },
  { label: 'Discover', icon: Compass },
  { label: 'Projects', icon: BriefcaseBusiness },
]

export default function App() {
  const [chats, setChats] = useState(initialChats)
  const [activeId, setActiveId] = useState(1)
  const [section, setSection] = useState('Chats')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')
  const [mobileMenu, setMobileMenu] = useState(false)

  const [sentMessages, setSentMessages] = useState<Record<number, string[]>>({
    1: [
      'Hey! Welcome to ORBITA 👋',
      'Thank you! I am excited to see what we can build here.',
      'That sounds like a great idea!',
    ],
    2: [
      'Welcome everyone to the ORBITA Creators community.',
      'Daniel: New creator meetup this Friday',
    ],
    3: [
      'Can you check the files I sent?',
      'Sent you the project files.',
    ],
  })

  const activeChat = chats.find(chat => chat.id === activeId) ?? chats[0]

  const filteredChats = useMemo(
    () => chats.filter(chat =>
      chat.name.toLowerCase().includes(search.toLowerCase())
    ),
    [chats, search]
  )

  function sendMessage() {
    const clean = message.trim()
    if (!clean || !activeChat) return

    setSentMessages(prev => ({
      ...prev,
      [activeId]: [...(prev[activeId] ?? []), clean],
    }))

    setChats(prev => prev.map(chat =>
      chat.id === activeId
        ? { ...chat, message: clean, time: 'now' }
        : chat
    ))

    setMessage('')
  }

  return (
    <main className="app-shell">
      <aside className={`sidebar ${mobileMenu ? 'mobile-open' : ''}`}>
        <div className="brand-row">
          <div className="brand-mark">O</div>
          <div>
            <div className="brand-name">ORBITA</div>
            <div className="brand-tag">CONNECT BEYOND CHAT</div>
          </div>
          <button
            className="icon-btn mobile-close"
            onClick={() => setMobileMenu(false)}
            aria-label="Close menu"
          >
            <X size={19} />
          </button>
        </div>

        <button className="profile-switch">
          <div className="avatar avatar-blue">D</div>
          <div className="profile-copy">
            <strong>Your profile</strong>
            <span>Personal space</span>
          </div>
          <MoreHorizontal size={19} />
        </button>

        <div className="side-label">WORKSPACE</div>

        <nav className="main-nav">
          {navItems.map(item => {
            const Icon = item.icon

            return (
              <button
                key={item.label}
                className={`nav-item ${section === item.label ? 'selected' : ''}`}
                onClick={() => {
                  setSection(item.label)
                  setMobileMenu(false)
                }}
              >
                <Icon size={19} />
                <span>{item.label}</span>
                {item.label === 'Chats' && (
                  <span className="nav-count">6</span>
                )}
              </button>
            )
          })}
        </nav>

        <div className="side-promo">
          <div className="promo-icon"><Sparkles size={17} /></div>
          <strong>More than messages.</strong>
          <p>
            Find people, ideas and opportunities in one place.
          </p>
          <button onClick={() => setSection('Discover')}>
            Explore ORBITA <ArrowUpRight size={14} />
          </button>
        </div>

        <div className="sidebar-bottom">
          <button
            className="nav-item"
            onClick={() => setSection('Settings')}
          >
            <Settings size={19} />
            Settings
          </button>

          <div className="user-mini">
            <div className="avatar avatar-blue">D</div>
            <div>
              <strong>Destiny</strong>
              <span>Available</span>
            </div>
            <span className="online-dot" />
          </div>
        </div>
      </aside>

      <section className="content-area">
        <header className="topbar">
          <button
            className="icon-btn mobile-menu-btn"
            onClick={() => setMobileMenu(true)}
            aria-label="Open menu"
          >
            <Menu />
          </button>

          <div className="breadcrumb">
            <span>Workspace</span>
            <span className="slash">/</span>
            <strong>{section}</strong>
          </div>

          <div className="top-actions">
            <div className="status-pill">
              <i /> All systems ready
            </div>

            <button className="icon-btn" aria-label="Notifications">
              <Bell size={19} />
              <i className="notification-dot" />
            </button>

            <div className="avatar avatar-blue top-avatar">D</div>
          </div>
        </header>

        {section === 'Chats' ? (
          <div className="messaging-layout">
            <section className="chat-list-panel">
              <div className="panel-heading">
                <div>
                  <h1>Messages</h1>
                  <p>Your conversations, all together.</p>
                </div>
                <button className="new-chat-btn" title="Start a conversation">
                  <Plus size={18} />
                </button>
              </div>

              <div className="search-box">
                <Search size={17} />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search conversations"
                />
              </div>

              <div className="filter-row">
                <button className="filter-active">All <span>6</span></button>
                <button>Unread</button>
                <button>Groups</button>
              </div>

              <div className="conversation-list">
                {filteredChats.map(chat => (
                  <button
                    key={chat.id}
                    className={`conversation ${activeId === chat.id ? 'active' : ''}`}
                    onClick={() => setActiveId(chat.id)}
                  >
                    <div className={`avatar avatar-${chat.color}`}>
                      {chat.initials}
                      {chat.online && <i className="avatar-online" />}
                    </div>

                    <div className="conversation-info">
                      <div className="conversation-top">
                        <strong>{chat.name}</strong>
                        <time>{chat.time}</time>
                      </div>

                      <div className="conversation-bottom">
                        <span>{chat.message}</span>
                        {chat.unread && <b>{chat.unread}</b>}
                      </div>
                    </div>
                  </button>
                ))}

                {filteredChats.length === 0 && (
                  <div className="empty-search">
                    No conversations found.
                  </div>
                )}
              </div>

              <div className="encryption-note">
                <span className="lock-dot">✦</span>
                Your space for meaningful connection.
              </div>
            </section>

            <section className="chat-panel">
              {activeChat ? (
                <>
                  <div className="chat-header">
                    <div className={`avatar avatar-${activeChat.color}`}>
                      {activeChat.initials}
                      {activeChat.online && <i className="avatar-online" />}
                    </div>

                    <div className="chat-person">
                      <strong>{activeChat.name}</strong>
                      <span>
                        {activeChat.online
                          ? '● Online now'
                          : 'ORBITA conversation'}
                      </span>
                    </div>

                    <div className="chat-tools">
                      <button className="icon-btn" title="Voice call">
                        <Phone size={18} />
                      </button>
                      <button className="icon-btn" title="Video call">
                        <Video size={19} />
                      </button>
                      <button className="icon-btn" title="More">
                        <MoreHorizontal size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="messages-area">
                    <div className="date-divider">
                      <span>TODAY</span>
                    </div>

                    <div className="welcome-card">
                      <div className="welcome-orbit">✦</div>
                      <strong>
                        This is your space with {activeChat.name.split(' ')[0]}
                      </strong>
                      <span>
                        Start a conversation and make something happen.
                      </span>
                    </div>

                    {(sentMessages[activeId] ?? []).map((msg, i) => (
                      <div
                        key={`${activeId}-${i}`}
                        className={`message-row ${
                          i === (sentMessages[activeId]?.length ?? 0) - 1 &&
                          msg === chats.find(c => c.id === activeId)?.message
                            ? 'mine'
                            : ''
                        }`}
                      >
                        <div className="message-bubble">
                          {msg}
                          <div className="message-meta">
                            12:04 <CheckCheck size={13} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="composer-wrap">
                    <div className="composer">
                      <button className="composer-tool" title="Attach file">
                        <Paperclip size={19} />
                      </button>

                      <input
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter') sendMessage()
                        }}
                        placeholder="Write a message..."
                      />

                      <button className="composer-tool" title="Emoji">
                        <Smile size={19} />
                      </button>

                      <button
                        className="send-btn"
                        onClick={sendMessage}
                        aria-label="Send message"
                      >
                        <Send size={17} />
                      </button>
                    </div>

                    <div className="composer-hint">
                      <span>Press <kbd>Enter</kbd> to send</span>
                      <span>
                        Messages in this preview are stored only in this browser session.
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="empty-search">
                  Choose a conversation to begin.
                </div>
              )}
            </section>
          </div>
        ) : (
          <section className="feature-page">
            <div className="feature-icon">
              <Sparkles size={25} />
            </div>

            <p className="eyebrow">THE ORBITA EXPERIENCE</p>
            <h1>{section}</h1>

            <p className="feature-description">
              {section === 'Updates'
                ? 'Share moments, ideas and updates with the people around you.'
                : section === 'Communities'
                ? 'Bring people together around shared interests and goals.'
                : section === 'Calls'
                ? 'Make room for real conversations, face to face or voice to voice.'
                : section === 'Discover'
                ? 'Explore people, skills, communities and opportunities.'
                : section === 'Projects'
                ? 'Turn conversations into plans and plans into progress.'
                : 'Make ORBITA feel like your own.'}
            </p>

            <div className="coming-card">
              <Sparkles size={18} />
              <div>
                <strong>Coming into focus</strong>
                <span>
                  This space is part of the ORBITA roadmap. We are building it step by step.
                </span>
              </div>
            </div>

            <button
              className="back-to-chat"
              onClick={() => setSection('Chats')}
            >
              <MessageCircle size={17} />
              Back to messages
            </button>
          </section>
        )}

        <footer className="app-footer">
          <span>© 2026 ORBITA</span>
          <span>YOUR WORLD. YOUR OPPORTUNITIES. ONE PLATFORM.</span>
          <span className="footer-live">
            <i /> Preview environment
          </span>
        </footer>
      </section>
    </main>
  )
  }
                                
