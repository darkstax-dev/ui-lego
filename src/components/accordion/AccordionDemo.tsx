import React from 'react'
import Accordion from './Accordion'
import AccordionItem from './AccordionItem'

const AccordionDemo: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{ marginBottom: '24px', fontFamily: 'var(--font-family-macan-mono)', textTransform: 'uppercase' }}>
        Accordion Component
      </h2>
      
      <Accordion>
        <AccordionItem
          title="First Question"
          content="Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list."
          defaultOpen={true}
        />
        <AccordionItem
          title="Second Question"
          content="This is another answer to a frequently asked question that provides helpful information to users."
        />
        <AccordionItem
          title="Third Question"
          content="Yet another detailed answer that can span multiple lines and provide comprehensive information about the topic."
        />
        <AccordionItem
          title="Fourth Question"
          content="The final answer in this accordion demo, showing how multiple items work together in the component."
        />
      </Accordion>
    </div>
  )
}

export default AccordionDemo
