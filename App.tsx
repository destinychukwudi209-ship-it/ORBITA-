import { useMemo, useState } from 'react'
import {
  Archive, ArrowLeft, Bell, BriefcaseBusiness, Check, CheckCheck,
  ChevronDown, CircleHelp, Compass, FilePlus2, Image, MessageCircle,
  MoreHorizontal, Paperclip, Phone, Plus, Search, Send, Settings,
  ShieldCheck, Smile, Users, Video, X
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
  group?: boolean
}

const initialChats: Chat[] = [
  { id: 1, name: 'Amara Okafor', initials: 'AO', color: 'lavender', message: 'That sounds like a great plan. Let’s do it!', time: '10:42', unread: 2, online: true },
  { id: 2, name: 'ORBITA Founders', initials: 'OF', color: 'blue', message: 'David: I have shared the project brief.', time: '09:18', unread: 5, group: true },
  { id: 3, name: 'Tomi Adebayo', initials: 'TA', color: 'peach', message: 'Voice message · 0:18', time: 'Yesterday', online: true },
  { id: 4, name: 'Creative Circle', initials: 'CC', color: 'mint', message: 'You: The new design is ready.', time: 'Yesterday', group: true },
  { id: 5, name: 'Daniel Eze', initials: 'DE', color: 'rose', message: 'Thanks, I’ll check it out.', time: 'Mon' },
]

const tabs = [
  { label: 'Chats', icon: MessageCircle },
  { label: 'Updates', icon: Bell },
  { label: 'Communities', icon: Users },
  { label: 'Calls', icon: Phone },
]

function Avatar({ initials, color, online = false, small = false }: { initials: string; color: string; online?: boolean; small?: boolean }) {
  return <div className={`avatar ${color} ${small ? 'small' : ''}`}>{initials}{online && <i className="online-dot" />}</div>
}

export default function App() {
  const [activeTab, setActiveTab] = useState('Chats')
  const [activeChat, setActiveChat] = useState<number | null>(1)
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState<string[]>([])
  const [showNewChat, setShowNewChat] = useState(false)
  const [mobileChatOpen, setMobileChatOpen] = useState(false)

  const chats = useMemo(() => initialChats.filter(chat => chat.name.toLowerCase().includes(search.toLowerCase())), [search])
  const selected = initialChats.find(chat => chat.id === activeChat) ?? initialChats[0]

  function openChat(id: number) {
    setActiveChat(id)
    setMobileChatOpen(true)
    setActiveTab('Chats')
  }

  function sendMessage() {
    const clean = message.trim()
    if (!clean) return
    setSent(prev => [...prev, clean])
    setMessage('')
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand-row">
          <div className="brand-mark"><Compass size={21} strokeWidth={2.4} /></div>
          <div><strong>ORBITA</strong><span>YOUR WORLD, CONNECTED</span></div>
          <button className="icon-button mobile-only" aria-label="Close menu"><X size={18}/></button>
        </div>

        <div className="profile-mini">
          <Avatar initials="YO" color="blue" />
          <div className="profile-copy"><strong>Your profile</strong><span>Set up your identity</span></div>
          <ChevronDown size={16} className="muted" />
        </div>

        <div className="side-label">WORKSPACE</div>
        <nav className="main-nav">
          {tabs.map(({ label, icon: Icon }) => (
            <button key={label} className={`nav-item ${activeTab === label ? 'active' : ''}`} onClick={() => { setActiveTab(label); setMobileChatOpen(false) }}>
              <Icon size={19}/><span>{label}</span>{label === 'Chats' && <b className="nav-count">7</b>}
            </button>
          ))}
          <button className={`nav-item ${activeTab === 'Discover' ? 'active' : ''}`} onClick={() => { setActiveTab('Discover'); setMobileChatOpen(false) }}><Compass size={19}/><span>Discover</span></button>
          <button className={`nav-item ${activeTab === 'Projects' ? 'active' : ''}`} onClick={() => { setActiveTab('Projects'); setMobileChatOpen(false) }}><BriefcaseBusiness size={19}/><span>Projects</span></button>
        </nav>

        <div className="side-bottom">
          <button className="nav-item"><Settings size={19}/><span>Settings</span></button>
          <button className="nav-item"><CircleHelp size={19}/><span>Help & support</span></button>
          <div className="sidebar-foot"><ShieldCheck size={15}/> Private conversations stay yours</div>
        </div>
      </aside>

      <section className={`chat-list ${mobileChatOpen ? 'hide-mobile' : ''}`}>
        <header className="list-header">
          <div><p className="eyebrow">YOUR SPACE</p><h1>{activeTab}</h1></div>
          <button className="round-action" onClick={() => setShowNewChat(true)} aria-label="Start a new chat"><Plus size={20}/></button>
        </header>
        <div className="search-box"><Search size={17}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search conversations" /></div>

        {activeTab === 'Chats' ? <>
          <div className="section-heading"><span>RECENT MESSAGES</span><button>Filter <ChevronDown size={13}/></button></div>
          <div className="chat-items">
            {chats.map(chat => (
              <button key={chat.id} className={`chat-item ${activeChat === chat.id ? 'selected' : ''}`} onClick={() => openChat(chat.id)}>
                <Avatar initials={chat.initials} color={chat.color} online={chat.online}/>
                <div className="chat-info"><div className="chat-title"><strong>{chat.name}</strong><time>{chat.time}</time></div><div className="chat-preview"><span>{chat.message}</span>{chat.unread && <b>{chat.unread}</b>}</div></div>
              </button>
            ))}
            {chats.length === 0 && <p className="empty-note">No conversations match your search.</p>}
          </div>
          <div className="list-tip"><div className="tip-icon"><MessageCircle size={17}/></div><div><strong>Make every connection count</strong><span>Start a conversation or build a community around what matters.</span></div></div>
        </> : <div className="placeholder-panel"><div className="placeholder-icon"><Compass size={25}/></div><h3>{activeTab}</h3><p>This space is part of the ORBITA roadmap. We’ll connect its real features as development progresses.</p></div>}
      </section>

      <section className={`conversation ${mobileChatOpen ? 'show-mobile' : ''}`}>
        {activeTab === 'Chats' ? <>
          <header className="conversation-header">
            <button className="icon-button back-button" onClick={() => setMobileChatOpen(false)} aria-label="Back to conversations"><ArrowLeft size={19}/></button>
            <Avatar initials={selected.initials} color={selected.color} online={selected.online}/>
            <div className="contact-heading"><strong>{selected.name}</strong><span>{selected.online ? 'Active now' : selected.group ? 'Group conversation' : 'Last seen recently'}</span></div>
            <div className="header-actions"><button className="icon-button" aria-label="Voice call"><Phone size={18}/></button><button className="icon-button" aria-label="Video call"><Video size={19}/></button><button className="icon-button" aria-label="More options"><MoreHorizontal size={20}/></button></div>
          </header>
          <div className="encryption-note"><ShieldCheck size={14}/> Messages are private. End-to-end encryption will be configured before production launch.</div>
          <div className="message-area">
            <div className="date-pill">TODAY</div>
            <div className="message received">Hey! Welcome to ORBITA. What are you working on today?<time>10:38</time></div>
            <div className="message sent-message">I’m exploring the platform and planning a new project.<time>10:40 <CheckCheck size={13}/></time></div>
            <div className="message received">That sounds like a great plan. Let’s do it!<time>10:42</time></div>
            {sent.map((item, index) => <div className="message sent-message" key={`${item}-${index}`}>{item}<time>Now <Check size={13}/></time></div>)}
          </div>
          <div className="composer-wrap">
            <div className="composer">
              <button className="icon-button" aria-label="Add attachment"><Paperclip size={19}/></button>
              <input value={message} onChange={e => setMessage(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder="Write a message..." />
              <button className="icon-button emoji-button" aria-label="Emoji"><Smile size={19}/></button>
              <button className="send-button" onClick={sendMessage} aria-label="Send message"><Send size={17}/></button>
            </div>
            <span className="composer-hint">A calmer space for meaningful conversations.</span>
          </div>
        </> : <div className="welcome-panel"><div className="welcome-orbit"><Compass size={42}/></div><p className="eyebrow">WELCOME TO ORBITA</p><h2>Your world.<br/><em>Your opportunities.</em></h2><p>Connect with people, build together and turn conversations into progress.</p><button className="primary-button" onClick={() => setActiveTab('Chats')}>Explore your chats <ArrowLeft size={16}/></button></div>}
      </section>

      {showNewChat && <div className="modal-backdrop" onClick={() => setShowNewChat(false)}><div className="new-chat-modal" onClick={e => e.stopPropagation()}><div className="modal-head"><div><p className="eyebrow">GET CONNECTED</p><h2>Start a conversation</h2></div><button className="icon-button" onClick={() => setShowNewChat(false)}><X size={19}/></button></div><p className="modal-copy">Your contacts and people you discover will appear here once accounts are connected.</p><button className="primary-button full" onClick={() => { setShowNewChat(false); setActiveTab('Discover') }}>Discover people <Compass size={16}/></button></div></div>}
    </main>
  )
}
