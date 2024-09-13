import ContactForm from '@/components/ContactForm';
import ContactHero from '@/components/ContactHero';
import ContactInfo from '@/components/ContactInfor';
import React from 'react'

const Contact = () => {
  return (
    <div>
      <ContactHero/>
      <ContactInfo/>
      <ContactForm/>
    </div>
  )
}

export default Contact;