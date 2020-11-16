import React, { useState } from "react"
import { graphql } from "gatsby"
import { navigate } from 'gatsby-link'

import Nav from "../components/nav"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

const ContactPage = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  const [state, setState] = useState({})

  const handleInputChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    let form = event.target;

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch((error) => alert(error))
  }

  return (
    <Layout location={{ pathname: '/contact' }} title={siteTitle}>
      <SEO title="Contact" />
      <Nav />
      <div className="post__content">
        <h2>Contact</h2>
        <form
          name="contact"
          method="POST"
          action="/thanks/"
          data-netlify="true"
          data-netlify-recaptcha="true"
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="contact" />
          <input
            type="hidden"
            name="bot-field"
            onChange={handleInputChange}
          />
          <label htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            type="text"
            name="fullName"
            placeholder="Name"
            required
            onChange={handleInputChange}
          />
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleInputChange}
          />

          <label htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            name="message"
            placeholder="Message"
            rows="5"
            required
            onChange={handleInputChange}
          />
          <div data-netlify-recaptcha="true" />
          <Button type="submit">
            Submit
          </Button>
        </form>
      </div>
    </Layout>
  )
}

export default ContactPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
