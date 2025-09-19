import React from 'react'
import './Icons.css'
import {
  HospitalLine,
  Home2Fill,
  Home3Fill,
  HomeHeartLine,
  GovernmentFill,
  BankFill,
  CommunityFill,
  AncientPavilionFill,
  AncientGateFill,
  BuildingFill,
  StoreFill,
  HotelFill,
  HomeFill,
  Home8Fill,
  Building4Fill
} from './index'

interface IconItem {
  name: string
  component: React.ComponentType<any>
  category: string
}

const Icons: React.FC = () => {
  const buildingIcons: IconItem[] = [
    { name: 'Hospital Line', component: HospitalLine, category: 'Healthcare' },
    { name: 'Government Fill', component: GovernmentFill, category: 'Government' },
    { name: 'Bank Fill', component: BankFill, category: 'Finance' },
    { name: 'Building Fill', component: BuildingFill, category: 'Commercial' },
    { name: 'Building 4 Fill', component: Building4Fill, category: 'Commercial' },
    { name: 'Store Fill', component: StoreFill, category: 'Retail' },
    { name: 'Hotel Fill', component: HotelFill, category: 'Hospitality' },
    { name: 'Community Fill', component: CommunityFill, category: 'Community' },
    { name: 'Ancient Pavilion Fill', component: AncientPavilionFill, category: 'Historical' },
    { name: 'Ancient Gate Fill', component: AncientGateFill, category: 'Historical' }
  ]

  const homeIcons: IconItem[] = [
    { name: 'Home Fill', component: HomeFill, category: 'Residential' },
    { name: 'Home 2 Fill', component: Home2Fill, category: 'Residential' },
    { name: 'Home 3 Fill', component: Home3Fill, category: 'Residential' },
    { name: 'Home 8 Fill', component: Home8Fill, category: 'Residential' },
    { name: 'Home Heart Line', component: HomeHeartLine, category: 'Special' }
  ]

  const renderIconGrid = (icons: IconItem[]) => (
    <div className="icons-grid">
      {icons.map((icon, index) => {
        const IconComponent = icon.component
        return (
          <div key={index} className="icon-card">
            <div className="icon-display">
              <IconComponent width={32} height={32} />
            </div>
            <h3 className="icon-name">{icon.name}</h3>
            <p className="icon-category">{icon.category}</p>
          </div>
        )
      })}
    </div>
  )

  const renderColorVariants = () => {
    const colors = [
      { name: 'Default', color: '#03053D' },
      { name: 'Blue', color: '#2563EB' },
      { name: 'Green', color: '#059669' },
      { name: 'Red', color: '#DC2626' },
      { name: 'Purple', color: '#7C3AED' },
      { name: 'Gray', color: '#6B7280' }
    ]

    return (
      <div className="icon-variant-grid">
        {colors.map((colorItem, index) => (
          <div key={index} className="icon-variant">
            <div className="icon-variant-display">
              <HomeFill width={24} height={24} fill={colorItem.color} />
            </div>
            <p className="icon-variant-name">{colorItem.name}</p>
          </div>
        ))}
      </div>
    )
  }

  const renderSizeVariants = () => {
    const sizes = [
      { name: '16px', size: 16 },
      { name: '20px', size: 20 },
      { name: '24px', size: 24 },
      { name: '32px', size: 32 },
      { name: '48px', size: 48 },
      { name: '64px', size: 64 }
    ]

    return (
      <div className="icon-variant-grid">
        {sizes.map((sizeItem, index) => (
          <div key={index} className="icon-variant">
            <div className="icon-variant-display">
              <BuildingFill width={sizeItem.size} height={sizeItem.size} />
            </div>
            <p className="icon-variant-name">{sizeItem.name}</p>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="icons-page">
      <h1>Buildings</h1>
      
      <section className="icons-section">
        <h2>Building Icons</h2>
        {renderIconGrid(buildingIcons)}
      </section>

      <section className="icons-section">
        <h2>Home Icons</h2>
        {renderIconGrid(homeIcons)}
      </section>

      <section className="icons-section">
        <h2>Color Variations</h2>
        {renderColorVariants()}
      </section>

      <section className="icons-section">
        <h2>Size Variations</h2>
        {renderSizeVariants()}
      </section>
    </div>
  )
}

export default Icons
