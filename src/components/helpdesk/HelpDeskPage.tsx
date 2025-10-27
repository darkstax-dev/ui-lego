import React, { useState } from 'react'
import '../../tokens.css'
import './HelpDeskPage.css'

import { TopBar } from '../bar'
import SearchField from '../inputs/SearchField'
import Button from '../buttons/Button'
import IntegrationPopup from './IntegrationPopup'
import Snackbar from '../snackbar/Snackbar'
import { 
  Folder, 
  AddFill, 
  SearchLine, 
  ArrowRightLine, 
  Timer2Line,
  DeleteBinLine,
  SettingsFill,
  ShieldLine,
  InboxUnarchiveFill,
  UploadFill,
  EditLine,
  ArchiveLine
} from '../icons/system'

// Type definitions
interface KnowledgeArticle {
  id: string
  title: string
  category: string
  views: number
  rating: number
  lastUpdated: string
  summary: string
}

interface TicketCategory {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  estimatedTime: string
}

interface PopularTopic {
  id: string
  title: string
  category: string
  views: number
}

interface Connector {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  category: 'Project Management' | 'Knowledge Base' | 'File Management' | 'Custom'
  status: 'available' | 'coming-soon' | 'beta'
}

const HelpDeskPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [chatStatus, setChatStatus] = useState<'available' | 'busy' | 'offline'>('available')
  
  // Popup state
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [selectedIntegration, setSelectedIntegration] = useState<Connector | null>(null)
  
  // Snackbar state
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [snackbarVariant, setSnackbarVariant] = useState<'success' | 'error'>('success')

  // Sample data
  const knowledgeArticles: KnowledgeArticle[] = [
    {
      id: '1',
      title: 'How to Reset Your Password',
      category: 'Getting Started',
      views: 1250,
      rating: 4.8,
      lastUpdated: '2024-01-15',
      summary: 'Complete guide to setting up your first project on Darkstax platform'
    },
    {
      id: '2',
      title: 'API Authentication Best Practices',
      category: 'Security',
      views: 890,
      rating: 4.6,
      lastUpdated: '2024-01-12',
      summary: 'Learn how to securely authenticate with our APIs'
    },
    {
      id: '3',
      title: 'Troubleshooting VPN Connection Issues',
      category: 'Troubleshooting',
      views: 756,
      rating: 4.4,
      lastUpdated: '2024-01-10',
      summary: 'Common solutions for connectivity problems'
    }
  ]

  const ticketCategories: TicketCategory[] = [
    {
      id: '1',
      name: 'Technical Support',
      description: 'Get help with technical issues and bugs',
      icon: <SettingsFill />,
      estimatedTime: '2-4 hours'
    },
    {
      id: '2',
      name: 'Account & Billing',
      description: 'Questions about your account or billing',
      icon: <ShieldLine />,
      estimatedTime: '1-2 hours'
    },
    {
      id: '3',
      name: 'Feature Request',
      description: 'Suggest new features or improvements',
      icon: <AddFill />,
      estimatedTime: '1-3 days'
    }
  ]

  const popularTopics: PopularTopic[] = [
    { id: '1', title: 'How to reset your password', category: 'Account', views: 2340 },
    { id: '2', title: 'Setting up two-factor authentication', category: 'Security', views: 1890 },
    { id: '3', title: 'Understanding API rate limits', category: 'API', views: 1456 },
    { id: '4', title: 'Configuring webhooks', category: 'Integration', views: 1234 },
    { id: '5', title: 'Data export options', category: 'Data', views: 987 },
    { id: '6', title: 'Managing team permissions', category: 'Teams', views: 876 }
  ]

  const connectors: Connector[] = [
    {
      id: '1',
      name: 'Jira',
      description: 'Project management and issue tracking',
      icon: <SettingsFill />,
      category: 'Project Management',
      status: 'available'
    },
    {
      id: '2',
      name: 'Jira Service Management',
      description: 'Support and service requests',
      icon: <ShieldLine />,
      category: 'Project Management',
      status: 'available'
    },
    {
      id: '3',
      name: 'AWS S3 Storage',
      description: 'Team knowledge base and documentation',
      icon: <Folder />,
      category: 'Knowledge Base',
      status: 'available'
    },
    {
      id: '4',
      name: 'GitHub',
      description: 'Code repositories and documentation',
      icon: <ArchiveLine />,
      category: 'Knowledge Base',
      status: 'available'
    },
    {
      id: '5',
      name: 'File Upload',
      description: 'PDFs, documents, and other files',
      icon: <UploadFill />,
      category: 'File Management',
      status: 'available'
    },
    {
      id: '6',
      name: 'Custom Answers',
      description: 'Create your own Q&A content',
      icon: <EditLine />,
      category: 'Custom',
      status: 'available'
    }
  ]

  const filteredArticles = knowledgeArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ['all', ...Array.from(new Set(knowledgeArticles.map(article => article.category)))]

  return (
    <div className="helpdesk-page">
      <TopBar 
        activeSection="dashboard"
        onMenuItemClick={(section) => console.log('Menu clicked:', section)}
      />
      
      {/* Hero Section */}
      <div className="helpdesk-hero">
        <div className="hero-content">
          <h1 className="hero-title">How can we help you today?</h1>
          <p className="hero-subtitle">Search our knowledge base or get in touch with our support team</p>
          
          <div className="hero-search">
            <SearchField
              placeholder="Search for articles, guides, or common issues..."
              value={searchTerm}
              onChange={setSearchTerm}
            />
          </div>
        </div>
      </div>

      <div className="helpdesk-content">
        {/* Quick Actions */}
        <section className="quick-actions">
          <div className="actions-grid">
            <div className="action-card">
              <div className="action-icon">
                <Folder />
              </div>
              <h3 className="action-title">Browse Knowledge Base</h3>
              <p className="action-description">500+ articles updated daily</p>
              <div className="action-button-wrapper">
                <Button variant="secondary" size="sm">
                  Browse Articles
                </Button>
              </div>
            </div>

            <div className="action-card">
              <div className="action-icon">
                <AddFill />
              </div>
              <h3 className="action-title">Submit a Ticket</h3>
              <p className="action-description">Get help from our support team</p>
              <div className="action-button-wrapper">
                <Button variant="secondary" size="sm">
                  Create Ticket
                </Button>
              </div>
            </div>

            <div className="action-card">
              <div className="action-icon">
                <SearchLine />
              </div>
              <h3 className="action-title">Start Live Chat</h3>
              <p className="action-description">
                <span className={`chat-status ${chatStatus}`}>
                  {chatStatus === 'available' ? 'Available Now' : 
                   chatStatus === 'busy' ? 'Busy' : 'Offline'}
                </span>
              </p>
              <div className="action-button-wrapper">
                <button 
                  className="start-chat-button"
                  disabled={chatStatus === 'offline'}
                >
                  START CHAT +
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Knowledge Base with Popular Topics */}
        <section className="knowledge-base">
          <div className="section-header">
            <div className="section-header-content">
              <h2 className="section-title">Knowledge Base</h2>
              <p className="section-subtitle">Find answers and explore popular topics</p>
            </div>
            <div className="category-filter">
              {categories.map(category => (
                <button
                  key={category}
                  className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === 'all' ? 'All' : category}
                </button>
              ))}
            </div>
          </div>

          {/* Popular Topics as quick links */}
          <div className="popular-topics-inline">
            <span className="popular-topics-label">Popular:</span>
            {popularTopics.slice(0, 4).map(topic => (
              <button key={topic.id} className="popular-link" onClick={() => console.log('Topic clicked:', topic.title)}>
                {topic.title}
              </button>
            ))}
          </div>

          <div className="articles-grid">
            {filteredArticles.map(article => (
              <div key={article.id} className="article-card" onClick={() => console.log('Article clicked:', article.title)}>
                <h4 className="article-title">{article.title}</h4>
                <p className="article-summary">{article.summary}</p>
                <div className="article-meta">
                  <span className="article-category">{article.category}</span>
                  <span className="article-rating">★ {article.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* Integrations */}
        <section className="integrations-section">
          <div className="section-header-integrations">
            <div className="section-header-content">
              <h2 className="section-title">Integrations</h2>
              <p className="section-subtitle">Connect your favorite tools</p>
            </div>
            <Button variant="secondary" size="sm" onClick={() => console.log('View all integrations')}>View All Integrations</Button>
          </div>
          
          <div className="integrations-grid">
            {connectors.slice(0, 6).map(connector => (
              <div 
                key={connector.id} 
                className="integration-card" 
                onClick={() => {
                  setSelectedIntegration(connector)
                  setIsPopupOpen(true)
                }}
              >
                <div className="integration-icon">
                  {connector.icon}
                </div>
                <h4 className="integration-name">{connector.name}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="contact-section">
          <div className="contact-simple">
            <h2 className="section-title">Need More Help?</h2>
            <div className="contact-options">
              <div className="contact-option">
                <strong>Email:</strong> support@darkstax.com
              </div>
              <div className="contact-option">
                <strong>Phone:</strong> +1 (555) 123-4567
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Integration Popup */}
      <IntegrationPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        integrationName={selectedIntegration?.name || 'Integration'}
        integrationDescription={`Please provide the following information to connect to ${selectedIntegration?.name}.`}
        onSubmit={(params) => {
          // Simulate API call
          console.log('Integration params:', params)
          const success = Math.random() > 0.3 // 70% success rate for demo
          setSnackbarVariant(success ? 'success' : 'error')
          setShowSnackbar(true)
          
          // Auto-hide snackbar after 5 seconds
          setTimeout(() => {
            setShowSnackbar(false)
          }, 5000)
        }}
      />

      {/* Snackbar */}
      {showSnackbar && (
        <div className="snackbar-container">
          <Snackbar
            variant={snackbarVariant}
            title={snackbarVariant === 'success' ? 'Request Sent Successfully' : 'Request Failed'}
            message={
              snackbarVariant === 'success'
                ? 'Your integration request has been submitted successfully.'
                : 'Failed to send integration request. Please try again.'
            }
            onClose={() => setShowSnackbar(false)}
          />
        </div>
      )}
    </div>
  )
}

export default HelpDeskPage
export { HelpDeskPage }
