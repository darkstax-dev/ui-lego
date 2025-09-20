import React, { useState } from 'react'
import Activity from './Activity'
import Kubernetes from './Kubernetes'
import Indicator from './Indicator'
import Plus from './Plus'
import ModelingCard from './ModelingCard'
import './ModelingDemo.css'

const ModelingDemo: React.FC = () => {
  const [activityState, setActivityState] = useState<'default' | 'hover'>('default')
  const [kubernetesState, setKubernetesState] = useState<'default' | 'hover'>('default')
  const [cardState, setCardState] = useState<'default' | 'hover' | 'active'>('default')

  return (
    <div className="modeling-demo">
      <h2 className="modeling-demo__title">Modeling Components</h2>
      
      <section className="modeling-demo__section">
        <h3 className="modeling-demo__section-title">Activity Components</h3>
        <div className="modeling-demo__grid">
          <div className="modeling-demo__item">
            <h4>Red Default</h4>
            <Activity colour="red" state="default" showText text="text" />
          </div>
          <div className="modeling-demo__item">
            <h4>Red Hover</h4>
            <Activity colour="red" state="hover" showText text="text" />
          </div>
          <div className="modeling-demo__item">
            <h4>Blue Default</h4>
            <Activity colour="blue" state="default" showText text="text" />
          </div>
          <div className="modeling-demo__item">
            <h4>Blue Hover</h4>
            <Activity colour="blue" state="hover" showText text="text" />
          </div>
          <div className="modeling-demo__item">
            <h4>Interactive Red</h4>
            <Activity
              colour="red"
              state={activityState}
              showText
              text="text"
              onClick={() => setActivityState(prev => prev === 'default' ? 'hover' : 'default')}
            />
          </div>
        </div>
      </section>

      <section className="modeling-demo__section">
        <h3 className="modeling-demo__section-title">Kubernetes Components</h3>
        <div className="modeling-demo__grid">
          <div className="modeling-demo__item">
            <h4>Default</h4>
            <Kubernetes state="default" showText text="text" />
          </div>
          <div className="modeling-demo__item">
            <h4>Hover</h4>
            <Kubernetes state="hover" showText text="text" />
          </div>
          <div className="modeling-demo__item">
            <h4>Interactive</h4>
            <Kubernetes
              state={kubernetesState}
              showText
              text="text"
              onClick={() => setKubernetesState(prev => prev === 'default' ? 'hover' : 'default')}
            />
          </div>
        </div>
      </section>

      <section className="modeling-demo__section">
        <h3 className="modeling-demo__section-title">Indicators</h3>
        <div className="modeling-demo__grid">
          <div className="modeling-demo__item">
            <h4>Green (Property 1=green)</h4>
            <Indicator variant="green" value="2" />
          </div>
          <div className="modeling-demo__item">
            <h4>Blue (Property 1=Blue)</h4>
            <Indicator variant="blue" value="2" />
          </div>
          <div className="modeling-demo__item">
            <h4>Red (Property 1=Variant3)</h4>
            <Indicator variant="variant3" value="2" />
          </div>
        </div>
      </section>

      <section className="modeling-demo__section">
        <h3 className="modeling-demo__section-title">Plus/Minus Components</h3>
        <div className="modeling-demo__grid">
          <div className="modeling-demo__item">
            <h4>Plus (Property 1=Default)</h4>
            <Plus variant="default" />
          </div>
          <div className="modeling-demo__item">
            <h4>Minus (Property 1=Variant2)</h4>
            <Plus variant="minus" />
          </div>
        </div>
      </section>

      <section className="modeling-demo__section">
        <h3 className="modeling-demo__section-title">Modeling Cards</h3>
        <div className="modeling-demo__grid modeling-demo__grid--cards">
          <div className="modeling-demo__item">
            <h4>Default</h4>
            <ModelingCard 
              state="default" 
              title="Top view"
              indicatorVariant="green"
              indicatorValue="2"
            />
          </div>
          <div className="modeling-demo__item">
            <h4>Hover</h4>
            <ModelingCard 
              state="hover" 
              title="Side view"
              indicatorVariant="blue"
              indicatorValue="3"
            />
          </div>
          <div className="modeling-demo__item">
            <h4>Active</h4>
            <ModelingCard 
              state="active" 
              title="Bottom view"
              indicatorVariant="variant3"
              indicatorValue="1"
            />
          </div>
          <div className="modeling-demo__item">
            <h4>Interactive</h4>
            <ModelingCard 
              state={cardState}
              title="Interactive view"
              onClick={() => {
                setCardState(prev => {
                  if (prev === 'default') return 'hover'
                  if (prev === 'hover') return 'active'
                  return 'default'
                })
              }}
            />
          </div>
        </div>
      </section>

      <section className="modeling-demo__section">
        <h3 className="modeling-demo__section-title">Complex Layout Example</h3>
        <div className="modeling-demo__complex-layout">
          <div className="modeling-demo__row">
            <Activity colour="red" state="default" />
            <Activity colour="blue" state="default" />
          </div>
          <div className="modeling-demo__row">
            <Activity colour="red" state="hover" />
            <Activity colour="blue" state="hover" />
          </div>
          <div className="modeling-demo__row">
            <Kubernetes state="default" />
          </div>
          <div className="modeling-demo__row">
            <ModelingCard 
              state="default" 
              title="Model A"
              indicatorVariant="green"
              indicatorValue="5"
            />
            <ModelingCard 
              state="hover" 
              title="Model B"
              indicatorVariant="blue" 
              indicatorValue="3"
            />
            <ModelingCard 
              state="active" 
              title="Model C"
              indicatorVariant="variant3"
              indicatorValue="1"
            />
          </div>
          <div className="modeling-demo__row">
            <Plus variant="default" />
            <Plus variant="minus" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default ModelingDemo
