
import { useMemo, useState } from 'react'
import {
  Search, Camera, MoreVertical, MessageCircle, Users,
  Phone, CircleDot, Plus, ArrowLeft, Paperclip, Smile,
  Send, Video, CheckCheck, Mic, Image, X
} from 'lucide-react'

type Chat = {
  id: number
  name: string
  avatar: string
  message: string
  time: string
  unread: number
  online?: boolean
  sent?: boolean
}

const initialChats: Chat[] = [
  { id: 1, name: 'Gang of No Dull', avatar: '👑', message: 'Raymond: For sale', time: '12:08 PM', unread: 27 },
  { id: 2, name: 'Special People 🥺', avatar: '🌍', message: 'Star boy: DM me', time: '12:05 PM', unread: 5 },
  { id: 3, name: '+234 704 180 2654', avatar: '🖤', message: 'You no go school', time: '11:38 AM', unread: 0, sent: true },
  { id: 4, name: '+234 808 779 1979', avatar: '😎', message: 'What of the money na', time: '8:30 AM', unread: 0 },
  { id: 5, name: 'simdi669', avatar: '🐱', message: 'No worry', time: '7:15 AM', unread: 0 },
  { id: 6, name: 'My Heart 😁', avatar: '❤️', message: 'Wassup 💗', time: '7:14 AM', unread: 0, online: true },
  { id: 7, name: 'Obinna', avatar: '💔', message: 'Sticker', time: 'Yesterday', unread: 0, sent: true },
  { id: 8, name: 'On god 🙏', avatar: '🌅', message: 'Lizy Gold: Yeah', time: 'Yesterday', unread: 0 },
]

const tabs = [
  { name: 'Chats', icon: MessageCircle },
  { name: 'Updates', icon: CircleDot },
  { name: 'Communities', icon: Users },
  { name: 'Calls', icon: Phone },
]

export default function App() {
  const [chats, setChats] = useState(initialChats)
  const [activeTab, setActiveTab] = useState('Chats')
  const [activeChat, setActiveChat] = useState<Chat | null>(null)
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<string[]>([])
  const [showMenu, setShowMenu] = useState(false)

  const filteredChats = useMemo(
    () => chats.filter(chat => chat.name.toLowerCase().includes(search.toLowerCase())),
    [chats, search]
  )

  function sendMessage() {
    if (!message.trim()) return
    setMessages(previous => [...previous, message.trim()])
    setMessage('')
  }

  function startNewChat() {
    const name = window.prompt('Enter a contact name')
    if (!name?.trim()) return
    const newChat: Chat = {
      id: Date.now(),
      name: name.trim(),
      avatar: '👤',
      message: 'Start a conversation',
      time: 'Now',
      unread: 0,
    }
    setChats(previous => [newChat, ...previous])
    setActiveChat(newChat)
  }

  return (
    <div className="orbita-app">
      <header className="top-header">
        {activeChat ? (
          <button className="header-icon" onClick={() => setActiveChat(null)}>
            <ArrowLeft />
          </button>
        ) : (
          <h1 className="brand-name">ORBITA</h1>
        )}

        {activeChat && (
          <div className="active-contact">
            <div className="avatar small-avatar">{activeChat.avatar}</div>
            <div>
              <strong>{activeChat.name}</strong>
              <small>{activeChat.online ? 'online' : 'tap here for contact info'}</small>
            </div>
          </div>
        )}

        <div className="header-actions">
          {!activeChat && (
            <button className="header-icon" aria-label="Camera">
              <Camera />
            </button>
          )}
          {activeChat && (
            <>
              <button className="header-icon"><Video /></button>
              <button className="header-icon"><Phone /></button>
            </>
          )}
          <button className="header-icon" onClick={() => setShowMenu(!showMenu)}>
            <MoreVertical />
          </button>
        </div>

        {showMenu && (
          <div className="menu-popup">
            <button onClick={() => { setShowMenu(false); setActiveTab('Settings') }}>Settings</button>
            <button onClick={() => setShowMenu(false)}>New group</button>
            <button onClick={() => setShowMenu(false)}>Help</button>
          </div>
        )}
      </header>

      {activeChat ? (
        <main className="conversation-screen">
          <div className="message-history">
            <div className="date-divider">TODAY</div>
            <div className="message-bubble received">Welcome to ORBITA! 👋</div>
            {messages.map((item, index) => (
              <div className="message-bubble sent-message" key={index}>
                {item}
                <small>Now <CheckCheck size={14} /></small>
              </div>
            ))}
          </div>
          <div className="composer">
            <button className="composer-icon"><Smile /></button>
            <input
              value={message}
              onChange={event => setMessage(event.target.value)}
              onKeyDown={event => event.key === 'Enter' && sendMessage()}
              placeholder="Message"
            />
            <button className="composer-icon"><Paperclip /></button>
            <button className="send-button" onClick={sendMessage}>
              {message.trim() ? <Send /> : <Mic />}
            </button>
          </div>
        </main>
      ) : (
        <>
          <main className="main-content">
            {activeTab === 'Chats' && (
              <>
                <div className="search-bar">
                  <Search size={23} />
                  <input
                    value={search}
                    onChange={event => setSearch(event.target.value)}
                    placeholder="Search or start a new chat"
                  />
                  {search && <button onClick={() => setSearch('')}><X size={18} /></button>}
                </div>

                <div className="chat-list">
                  {filteredChats.map(chat => (
                    <button className="chat-row" key={chat.id} onClick={() => {
                      setActiveChat(chat)
                      setMessages([])
                    }}>
                      <div className="avatar">{chat.avatar}</div>
                      <div className="chat-details">
                        <div className="chat-topline">
                          <strong>{chat.name}</strong>
                          <span className={chat.unread ? 'chat-time unread-time' : 'chat-time'}>{chat.time}</span>
                        </div>
                        <div className="chat-bottomline">
                          <span className="last-message">
                            {chat.sent && <CheckCheck className="read-check" size={17} />}
                            {chat.message}
                          </span>
                          {chat.unread > 0 && <span className="unread-count">{chat.unread}</span>}
                        </div>
                      </div>
                    </button>
                  ))}
                  {filteredChats.length === 0 && <p className="empty-state">No conversations found.</p>}
                </div>
              </>
            )}

            {activeTab === 'Updates' && (
              <section className="section-content">
                <h2>Updates</h2>
                <div className="status-row">
                  <div className="avatar status-avatar">👤</div>
                  <div><strong>My status</strong><p>Tap to add a status update</p></div>
                  <button className="add-status"><Plus /></button>
                </div>
                <h3>Recent updates</h3>
                <p className="muted-text">Status updates from your contacts will appear here.</p>
              </section>
            )}

            {activeTab === 'Communities' && (
              <section className="section-content">
                <h2>Communities</h2>
                <div className="community-card">
                  <div className="community-icon"><Users /></div>
                  <div><strong>Explore communities</strong><p>Bring groups together around shared interests.</p></div>
                </div>
                <button className="green-action" onClick={startNewChat}>Start a community</button>
              </section>
            )}

            {activeTab === 'Calls' && (
              <section className="section-content">
                <h2>Calls</h2>
                <p className="muted-text">Your voice and video call history will appear here.</p>
                <button className="green-action">Start a call</button>
              </section>
            )}

            {activeTab === 'Settings' && (
              <section className="section-content">
                <h2>Settings</h2>
                <div className="settings-row">Profile</div>
                <div className="settings-row">Privacy</div>
                <div className="settings-row">Notifications</div>
                <div className="settings-row">Account</div>
              </section>
            )}
          </main>

          {activeTab === 'Chats' && (
            <button className="new-chat-button" onClick={startNewChat} aria-label="New chat">
              <Plus />
            </button>
          )}

          <nav className="bottom-nav">
            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.name}
                  className={activeTab === tab.name ? 'nav-item active' : 'nav-item'}
                  onClick={() => setActiveTab(tab.name)}
                >
                  <span className="nav-icon"><Icon /></span>
                  <span>{tab.name}</span>
                </button>
              )
            })}
          </nav>
        </>
      )}
    </div>
  )
}
  
