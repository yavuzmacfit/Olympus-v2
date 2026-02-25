import { useState, ReactNode, MouseEvent } from 'react';
import { 
  Search, Plus, HelpCircle, Settings, Bell, Sparkles, User, 
  Home, Users, Bookmark, Target, Megaphone, BarChart2, 
  LayoutGrid, ChevronDown, Filter, ArrowUpDown, Download, 
  MoreHorizontal, X, ExternalLink, RefreshCw, Phone, Copy,
  Mail, Calendar, StickyNote, CheckSquare, ChevronRight, ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'motion/react';
import { MOCK_CONTACTS, Contact } from './types';

export default function App() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(MOCK_CONTACTS[0]);
  const [activeTab, setActiveTab] = useState('All contacts');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'contacts' | 'memberships' | 'campaigns'>('home');
  const [openTabs, setOpenTabs] = useState<string[]>(['home']);

  const handleNavigate = (view: 'home' | 'contacts' | 'memberships' | 'campaigns') => {
    setCurrentView(view);
    if (!openTabs.includes(view)) {
      setOpenTabs([...openTabs, view]);
    }
  };

  const closeTab = (e: MouseEvent, tab: string) => {
    e.stopPropagation();
    if (tab === 'home') return; // Cannot close home
    
    const newTabs = openTabs.filter(t => t !== tab);
    setOpenTabs(newTabs);
    
    if (currentView === tab) {
      setCurrentView('home');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#171a1d] overflow-hidden text-[13px]">
      {/* Top Nav - Chrome Style Tabs */}
      <header className="h-12 flex-shrink-0 flex items-center px-2 bg-[#171a1d] text-white overflow-hidden">
        <div className={`flex items-end h-full flex-shrink-0 transition-all duration-300 ${currentView !== 'home' ? (isSidebarExpanded ? 'w-64 px-4' : 'w-14 justify-center') : 'w-14 justify-center'}`}>
          <div className="flex items-center font-black italic text-white text-[14px] tracking-tighter h-9 translate-y-[2px]">
            MAC<span className="text-[#df1d2f] not-italic ml-0.5 text-lg font-bold">+</span>
          </div>
        </div>
        
        <div className="flex items-end h-full flex-1 max-w-4xl">
          {/* Fixed Home Tab */}
          {openTabs.includes('home') && (
            <div 
              onClick={() => setCurrentView('home')}
              className={`group relative h-9 px-4 flex items-center gap-2 cursor-pointer transition-all min-w-[120px] max-w-[200px] flex-shrink-0 ${
                currentView === 'home' 
                  ? 'bg-slate-200 text-slate-800 rounded-t-lg z-10 before:content-[""] before:absolute before:bottom-0 before:-left-2 before:w-2 before:h-2 before:bg-[radial-gradient(circle_at_0_0,transparent_8px,#e2e8f0_8px)] after:content-[""] after:absolute after:bottom-0 after:-right-2 after:w-2 after:h-2 after:bg-[radial-gradient(circle_at_100%_0,transparent_8px,#e2e8f0_8px)]' 
                  : 'text-white/60 hover:bg-white/5 rounded-t-lg'
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="text-xs font-medium truncate">Anasayfa</span>
            </div>
          )}

          {/* Draggable Other Tabs */}
          <Reorder.Group 
            axis="x" 
            values={openTabs.filter(t => t !== 'home')} 
            onReorder={(newOrder) => setOpenTabs(['home', ...newOrder])}
            className="flex items-end h-full"
          >
            {openTabs.filter(t => t !== 'home').map((tab) => (
              <Reorder.Item
                key={tab}
                value={tab}
                onClick={() => setCurrentView(tab as any)}
                transition={{ type: "spring", stiffness: 600, damping: 30 }}
                className={`group relative h-9 px-4 flex items-center gap-2 cursor-pointer min-w-[120px] max-w-[200px] ${
                  currentView === tab 
                    ? 'bg-slate-200 text-slate-800 rounded-t-lg z-10 before:content-[""] before:absolute before:bottom-0 before:-left-2 before:w-2 before:h-2 before:bg-[radial-gradient(circle_at_0_0,transparent_8px,#e2e8f0_8px)] after:content-[""] after:absolute after:bottom-0 after:-right-2 after:w-2 after:h-2 after:bg-[radial-gradient(circle_at_100%_0,transparent_8px,#e2e8f0_8px)]' 
                    : 'text-white/60 hover:bg-white/5 rounded-t-lg transition-colors'
                }`}
              >
                {tab === 'memberships' ? <Bookmark className="w-4 h-4" /> : tab === 'campaigns' ? <Sparkles className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                <span className="text-xs font-medium truncate">
                  {tab === 'memberships' ? 'Üyelik İşlemleri' : tab === 'campaigns' ? 'Kampanya İşlemleri' : 'Aday Üye'}
                </span>
                <button 
                  onClick={(e) => closeTab(e, tab)}
                  className={`ml-auto p-0.5 rounded-full hover:bg-black/10 transition-opacity ${currentView === tab ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
        
        <div className="flex items-center gap-4 ml-auto text-white/80 pr-4">
          <Phone className="w-4 h-4 cursor-pointer hover:text-white" />
          <Bell className="w-4 h-4 cursor-pointer hover:text-white" />
          <div className="flex items-center gap-2 pl-2 border-l border-white/20">
            <div className="w-6 h-6 rounded-full bg-slate-400 flex items-center justify-center text-[10px]">MA</div>
            <span className="text-xs">Mars Athletic Club</span>
            <ChevronDown className="w-3 h-3" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        {currentView !== 'home' && (
          <aside className={`flex-shrink-0 bg-[#171a1d] flex flex-col items-center text-white/70 z-50 transition-all duration-300 ${isSidebarExpanded ? 'w-64' : 'w-14'}`}>
            <div className="flex flex-col items-center py-4 gap-4 w-full flex-1">
              <SidebarIcon 
                icon={<Home className="w-5 h-5" />} 
                label="Anasayfa" 
                isSidebarExpanded={isSidebarExpanded} 
                active={currentView === 'home'}
                onClick={() => handleNavigate('home')}
              />
              <SidebarIcon 
                icon={<BarChart2 className="w-5 h-5" />} 
                label="İstatistikler" 
                isSidebarExpanded={isSidebarExpanded} 
              />
              {currentView !== 'memberships' && currentView !== 'campaigns' && (
                <SidebarIcon 
                  icon={<Users className="w-5 h-5" />} 
                  label="Aday Üye"
                  active={currentView === 'contacts'} 
                  isSidebarExpanded={isSidebarExpanded}
                  onClick={() => handleNavigate('contacts')}
                  menu={{
                    title: "ADAY ÜYE",
                    items: ["Aday Üye Listesi", "Takvim", "QR Kodları", "Farklı Kulübe Gidenler"]
                  }}
                />
              )}
              <SidebarIcon 
                icon={<Calendar className="w-5 h-5" />} 
                label="Takvim" 
                isSidebarExpanded={isSidebarExpanded} 
              />
            </div>

            {/* Fixed Expand Toggle Button at the Bottom */}
            <div className="w-full px-2 pb-4 mt-auto">
              <button 
                onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                className={`flex items-center justify-center p-2 rounded-lg transition-colors group relative ${isSidebarExpanded ? 'w-full bg-white/5 text-white' : 'w-10 h-10 mx-auto bg-white/5 text-white hover:bg-white/10'}`}
              >
                {isSidebarExpanded ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                {!isSidebarExpanded && (
                  <div className="absolute left-full ml-4 px-3 py-2 bg-[#171a1d] text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-[100] border border-white/10 shadow-xl">
                    Expand navigation
                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-[#171a1d] border-l border-b border-white/10 rotate-45"></div>
                  </div>
                )}
                {isSidebarExpanded && <span className="ml-3 text-sm font-medium flex-1 text-left">Navigation'ı Daralt</span>}
              </button>
            </div>
          </aside>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className={`flex-1 flex flex-col p-3 gap-3 overflow-hidden bg-slate-200 ${currentView === 'home' ? '' : 'rounded-tl-xl'}`}>
          {currentView === 'home' ? (
            <div className="flex-1 flex flex-col overflow-auto px-16 py-10">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Modules</h1>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
                <ModuleCard 
                  title="Aday Üye"
                  description="Aday üyelerinizi yönetin, listeleri takip edin ve üyelik süreçlerini hızlandırın."
                  icon={<Users className="w-6 h-6 text-blue-600" />}
                  buttonText="Görüntüle"
                  onClick={() => handleNavigate('contacts')}
                />
                <ModuleCard 
                  title="Üyelik İşlemleri"
                  description="Mevcut üyelerin işlemlerini gerçekleştirin, sözleşmeleri ve ödemeleri takip edin."
                  icon={<Bookmark className="w-6 h-6 text-emerald-600" />}
                  buttonText="İşlemlere Git"
                  onClick={() => handleNavigate('memberships')}
                />
                <ModuleCard 
                  title="Kampanya İşlemleri"
                  description="Aktif kampanyaları yönetin, yeni teklifler oluşturun ve performans analizi yapın."
                  icon={<Sparkles className="w-6 h-6 text-purple-600" />}
                  buttonText="Daha Fazla Bilgi"
                  onClick={() => handleNavigate('campaigns')}
                />
              </div>
            </div>
          ) : (
            <>
              {/* Operation Dashboard */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-[#171a1d] rounded-xl flex items-center justify-center shadow-sm">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-lg font-bold text-slate-900">Operasyon Zamanı!</h2>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                      <span className="text-xs text-slate-600">🎯 Bugün Gelen: <span className="font-bold text-slate-900">124</span></span>
                      <span className="text-xs text-slate-600">🔥 Hot Lead: <span className="font-bold text-red-600">37</span></span>
                      <span className="text-xs text-slate-600">📞 Bekleyen: <span className="font-bold text-blue-600">52</span></span>
                      <span className="text-xs text-slate-600">💰 Satış: <span className="font-bold text-emerald-600">9</span></span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 italic">Not: Aranmayan lead'ler performans skorunu düşürür.</p>
                  </div>
                </div>
                <button className="bg-[#171a1d] text-white px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-slate-800 transition-all">
                  🔥 Şimdi Aramaya Başla <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Main Workspace Area (Toolbar + Table + Sidebar) */}
              <div className="flex-1 flex gap-3 min-h-0">
                {currentView === 'contacts' ? (
                  <>
                    {/* Left Side: Toolbar and Table Card */}
                <div className="flex-1 flex flex-col min-w-0 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  {/* Toolbar */}
                  <div className="px-4 py-2 border-b border-slate-200 flex items-center gap-2 bg-white">
                    <div className="flex items-center border border-slate-300 rounded overflow-hidden">
                      <button className="px-3 py-1.5 bg-slate-50 border-r border-slate-300 font-medium flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Contacts
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="flex items-center gap-1 ml-2">
                      {['All contacts', 'My contacts', 'Unassigned contacts'].map(tab => (
                        <button 
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`px-3 py-1.5 rounded-t-md text-xs font-medium transition-colors ${activeTab === tab ? 'bg-slate-100 border-b-2 border-[#df1d2f]' : 'hover:bg-slate-50'}`}
                        >
                          {tab} {tab === 'All contacts' && <span className="ml-1 px-1.5 py-0.5 bg-slate-200 rounded-full text-[10px]">2</span>}
                        </button>
                      ))}
                      <button className="p-1.5 hover:bg-slate-50 rounded">
                        <Plus className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                      <button className="p-1.5 hover:bg-slate-50 rounded border border-slate-200">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                      <button className="px-3 py-1.5 bg-[#df1d2f] text-white rounded font-medium flex items-center gap-1 hover:bg-[#b91827]">
                        Add contacts
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Table Controls */}
                  <div className="px-4 py-3 flex items-center gap-3 bg-white">
                    <div className="relative flex-1 max-w-xs">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Search" 
                        className="w-full border border-slate-300 rounded py-1.5 pl-10 pr-4 outline-none focus:ring-1 focus:ring-[#df1d2f]/30"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 border border-slate-300 rounded flex items-center gap-2 hover:bg-slate-50">
                        <LayoutGrid className="w-4 h-4" />
                        Table view
                        <ChevronDown className="w-3 h-3" />
                      </button>
                      <button className="p-1.5 border border-slate-300 rounded hover:bg-slate-50">
                        <Settings className="w-4 h-4" />
                      </button>
                      <button className="px-3 py-1.5 border border-slate-300 rounded hover:bg-slate-50">Edit columns</button>
                      <button className="px-3 py-1.5 border border-slate-300 rounded flex items-center gap-2 hover:bg-slate-50">
                        <Filter className="w-4 h-4" />
                        Filters
                      </button>
                      <button className="px-3 py-1.5 border border-slate-300 rounded flex items-center gap-2 hover:bg-slate-50">
                        <ArrowUpDown className="w-4 h-4" />
                        Sort
                      </button>
                      <button className="px-3 py-1.5 border border-slate-300 rounded flex items-center gap-2 hover:bg-slate-50">
                        <Download className="w-4 h-4" />
                        Export
                      </button>
                      <button className="p-1.5 border border-slate-300 rounded hover:bg-slate-50">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button className="px-3 py-1.5 border border-slate-200 bg-slate-50 text-slate-400 rounded cursor-not-allowed">Save</button>
                    </div>
                  </div>

                  {/* Quick Filters */}
                  <div className="px-4 pb-3 flex items-center gap-6 text-xs font-medium text-slate-600 border-b border-slate-200 bg-white">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-slate-900">
                      Contact owner <ChevronDown className="w-3 h-3" />
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer hover:text-slate-900">
                      Create date <ChevronDown className="w-3 h-3" />
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer hover:text-slate-900">
                      Last activity date <ChevronDown className="w-3 h-3" />
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer hover:text-slate-900">
                      Lead status <ChevronDown className="w-3 h-3" />
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer hover:text-slate-900 text-[#df1d2f]">
                      <Plus className="w-3 h-3" /> More
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer hover:text-slate-900 border-l border-slate-300 pl-4">
                      <Filter className="w-3 h-3" /> Advanced filters
                    </div>
                  </div>

                  {/* Table */}
                  <div className="flex-1 overflow-auto bg-white">
                    <table className="w-full border-collapse">
                      <thead className="sticky top-0 bg-slate-50 border-b border-slate-200 text-left">
                        <tr>
                          <th className="p-3 w-10"><input type="checkbox" className="rounded border-slate-300" /></th>
                          <th className="p-3 font-medium border-r border-slate-200">
                            <div className="flex items-center justify-between">
                              Name <div className="flex gap-1"><ArrowUpDown className="w-3 h-3" /><MoreHorizontal className="w-3 h-3" /></div>
                            </div>
                          </th>
                          <th className="p-3 font-medium border-r border-slate-200">
                            <div className="flex items-center justify-between">
                              Email <div className="flex gap-1"><ArrowUpDown className="w-3 h-3" /><MoreHorizontal className="w-3 h-3" /></div>
                            </div>
                          </th>
                          <th className="p-3 font-medium border-r border-slate-200">
                            <div className="flex items-center justify-between">
                              Phone Number <div className="flex gap-1"><ArrowUpDown className="w-3 h-3" /><MoreHorizontal className="w-3 h-3" /></div>
                            </div>
                          </th>
                          <th className="p-3 font-medium border-r border-slate-200">
                            <div className="flex items-center justify-between">
                              Contact owner <div className="flex gap-1"><ArrowUpDown className="w-3 h-3" /><MoreHorizontal className="w-3 h-3" /></div>
                            </div>
                          </th>
                          <th className="p-3 font-medium">
                            <div className="flex items-center justify-between">
                              Primary company <MoreHorizontal className="w-3 h-3" />
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {MOCK_CONTACTS.map(contact => (
                          <tr 
                            key={contact.id} 
                            onClick={() => setSelectedContact(contact)}
                            className={`border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors ${selectedContact?.id === contact.id ? 'bg-blue-50/50' : ''}`}
                          >
                            <td className="p-3"><input type="checkbox" className="rounded border-slate-300" /></td>
                            <td className="p-3 border-r border-slate-100">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center text-[10px] text-[#df1d2f] font-bold">
                                  {contact.initials}
                                </div>
                                <span className="text-blue-600 font-medium hover:underline">{contact.name}</span>
                              </div>
                            </td>
                            <td className="p-3 border-r border-slate-100">
                              <div className="flex items-center gap-1 text-blue-600 hover:underline">
                                {contact.email} <ExternalLink className="w-3 h-3" />
                              </div>
                            </td>
                            <td className="p-3 border-r border-slate-100 text-slate-500">{contact.phone}</td>
                            <td className="p-3 border-r border-slate-100 text-slate-500">{contact.owner}</td>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <div className="w-5 h-5 bg-[#df1d2f] rounded-sm flex items-center justify-center text-[8px] text-white">HS</div>
                                <span className="text-blue-600 font-medium hover:underline">{contact.company}</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="h-12 border-t border-slate-200 flex items-center justify-center gap-4 bg-white">
                    <button className="text-slate-400 flex items-center gap-1 disabled:opacity-50" disabled>
                      <ChevronDown className="w-4 h-4 rotate-90" /> Prev
                    </button>
                    <div className="flex items-center gap-1">
                      <span className="px-2 py-1 bg-slate-100 rounded text-xs font-bold">1</span>
                    </div>
                    <button className="text-slate-600 flex items-center gap-1">
                      Next <ChevronDown className="w-4 h-4 -rotate-90" />
                    </button>
                    <div className="ml-4 flex items-center gap-2 text-xs text-slate-600">
                      <select className="border border-slate-300 rounded px-1 py-0.5 outline-none">
                        <option>25 per page</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Right Sidebar (Contact Details) Card */}
                <AnimatePresence>
                  {selectedContact && (
                    <motion.aside 
                      initial={{ x: '100%' }}
                      animate={{ x: 0 }}
                      exit={{ x: '100%' }}
                      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                      className="w-[400px] bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden"
                    >
                      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                        <h2 className="font-bold text-lg truncate pr-4">{selectedContact.name}</h2>
                        <button onClick={() => setSelectedContact(null)} className="p-1 hover:bg-slate-100 rounded">
                          <X className="w-5 h-5 text-slate-500" />
                        </button>
                      </div>
                      
                      <div className="flex-1 overflow-auto">
                        <div className="p-4 border-b border-slate-200">
                          <div className="flex items-center gap-4 mb-4">
                            <button className="text-blue-600 font-medium hover:underline">View record</button>
                            <button className="ml-auto flex items-center gap-1 text-slate-700 font-medium">
                              Actions <ChevronDown className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="flex items-start gap-3 mb-6">
                            <div className="w-10 h-10 rounded-md bg-[#df1d2f] flex items-center justify-center text-white font-bold text-xs">
                              HS
                            </div>
                            <div>
                              <h3 className="font-bold text-lg leading-tight">{selectedContact.name}</h3>
                              <p className="text-slate-500 text-xs mt-1">{selectedContact.title}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-blue-600 hover:underline">{selectedContact.email}</span>
                                <ExternalLink className="w-3 h-3 text-blue-600" />
                                <Copy className="w-3 h-3 text-slate-400 cursor-pointer hover:text-slate-600" />
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-6 gap-2 mb-4">
                            <ActionIcon icon={<StickyNote className="w-4 h-4" />} label="Note" />
                            <ActionIcon icon={<Mail className="w-4 h-4" />} label="Email" />
                            <ActionIcon icon={<Phone className="w-4 h-4" />} label="Call" />
                            <ActionIcon icon={<CheckSquare className="w-4 h-4" />} label="Task" />
                            <ActionIcon icon={<Calendar className="w-4 h-4" />} label="Meeting" />
                            <ActionIcon icon={<MoreHorizontal className="w-4 h-4" />} label="More" />
                          </div>
                        </div>

                        {/* AI Summary Section */}
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <ChevronDown className="w-4 h-4" />
                              <h3 className="font-bold">Breeze record summary</h3>
                            </div>
                            <div className="flex items-center gap-1 px-1.5 py-0.5 bg-pink-100 text-pink-600 rounded text-[10px] font-bold">
                              <Sparkles className="w-3 h-3" /> AI
                            </div>
                          </div>

                          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Generated Feb 24, 2026</span>
                              <RefreshCw className="w-3 h-3 text-pink-500 cursor-pointer" />
                            </div>
                            <p className="text-slate-700 leading-relaxed text-xs">
                              {selectedContact.summary}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.aside>
                  )}
                </AnimatePresence>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col min-w-0 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden items-center justify-center text-slate-400">
                    <div className="flex flex-col items-center gap-4">
                      {currentView === 'memberships' ? (
                        <>
                          <Bookmark className="w-16 h-16 opacity-20" />
                          <p className="text-lg font-medium">Üyelik İşlemleri Modülü</p>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-16 h-16 opacity-20" />
                          <p className="text-lg font-medium">Kampanya İşlemleri Modülü</p>
                        </>
                      )}
                      <p className="text-sm">Bu modül için içerik yakında eklenecektir.</p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarIcon({ 
  icon, 
  active = false, 
  menu, 
  label, 
  isSidebarExpanded,
  onClick
}: { 
  icon: ReactNode, 
  active?: boolean, 
  menu?: { title: string, items: string[] },
  label?: string,
  isSidebarExpanded: boolean,
  onClick?: () => void
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const showHoverMenu = isHovered && menu && !isSidebarExpanded;
  const showTooltip = isHovered && !menu && !isSidebarExpanded && label;

  return (
    <div 
      className="relative w-full flex flex-col items-center px-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        onClick={() => {
          if (onClick) onClick();
          if (isSidebarExpanded && menu) setIsMenuOpen(!isMenuOpen);
        }}
        className={`w-full flex items-center p-2 rounded-md cursor-pointer transition-colors ${active ? 'bg-white/10 text-white' : 'hover:bg-white/5 hover:text-white'} ${isSidebarExpanded ? 'justify-start' : 'justify-center'}`}
      >
        <div className="flex-shrink-0">{icon}</div>
        {isSidebarExpanded && label && (
          <span className="ml-3 text-sm font-medium flex-1 truncate">{label}</span>
        )}
        {isSidebarExpanded && menu && (
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} />
        )}
      </div>

      {/* Expanded Menu Items (Accordion - Only visible when expanded and toggled open) */}
      <AnimatePresence>
        {isSidebarExpanded && isMenuOpen && menu && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="w-full overflow-hidden flex flex-col mt-1"
          >
            {menu.items.map((item, index) => (
              <div 
                key={index}
                className={`pl-10 pr-4 py-2 text-xs cursor-pointer transition-colors rounded-md mb-0.5 ${
                  index === 0 
                    ? 'text-white font-bold bg-[#80111b]' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {item}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tooltip (Only when collapsed and NO menu) */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -5 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-full ml-4 px-4 py-2 bg-[#171a1d] text-white text-sm font-medium rounded-lg whitespace-nowrap z-[100] border border-white/10 shadow-2xl flex items-center"
          >
            {label}
            {/* Tooltip Arrow */}
            <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 bg-[#171a1d] border-l border-b border-white/10 rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover Menu (Only when collapsed) */}
      <AnimatePresence>
        {showHoverMenu && (
          <motion.div
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -5 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-full ml-1 top-[-52px] w-64 bg-[#171a1d] border border-white/10 rounded-xl shadow-2xl z-[100] py-4 overflow-hidden"
          >
            <div className="px-6 mb-4">
              <h3 className="text-white font-bold text-sm uppercase tracking-wider">{menu.title}</h3>
            </div>
            <div className="flex flex-col px-2">
              {menu.items.map((item, index) => (
                <div 
                  key={index}
                  className={`px-4 py-2.5 rounded-lg cursor-pointer transition-colors text-sm mb-0.5 ${
                    index === 0 
                      ? 'bg-[#80111b] text-white font-medium' 
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ActionIcon({ icon, label }: { icon: ReactNode, label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 cursor-pointer group">
      <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-50 transition-colors">
        {icon}
      </div>
      <span className="text-[10px] text-slate-600">{label}</span>
    </div>
  );
}

function ModuleCard({ title, description, icon, buttonText, onClick }: { title: string, description: string, icon: ReactNode, buttonText: string, onClick?: () => void }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col items-center text-center transition-all hover:shadow-md">
      <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 relative">
        <div className="absolute inset-0 bg-slate-100 rounded-full scale-110 opacity-50"></div>
        <div className="relative z-10">{icon}</div>
      </div>
      <h3 className="text-base font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 text-xs leading-relaxed mb-6 flex-1">
        {description}
      </p>
      <button 
        onClick={onClick}
        className="w-full py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
      >
        <ChevronRight className="w-3 h-3 rotate-0" /> {buttonText}
      </button>
    </div>
  );
}
