import React from "react"
import { graphql } from "gatsby"
import ReCAPTCHA from "react-google-recaptcha";
// import { navigate } from 'gatsby-link'

import Nav from "../components/nav"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

class ContactPage extends React.Component {

  state = {
    fullName: '',
    email: '',
    message: '',
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    let contactForm = event.target;
    // let contactForm = document.getElementById('contact-form');

    fetch('/',{
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': contactForm.getAttribute('contact-form'),
        ...this.state
      })
    })
      .then(() => {
        alert('Thanks! Your message has been sent.')
        // navigate(form.getAttribute('action'))
      })
      .catch((error) => alert(error))
  }

  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Contact" />
        <Nav />
        <div className="post__content">
          <h2>Contact</h2>
          <form
            // id="contact-form"
            name="contact-form"
            method="post"
            // action="/thanks/"
            data-netlify="true"
            netlify-honeypot="bot-field"
            data-netlify-recaptcha="true"
            onSubmit={this.handleSubmit}
          >
            <input type="hidden" name="form-name" value="contact-form" />
            <input
              type="hidden"
              name="bot-field"
              onChange={this.handleInputChange}
            />
            <label htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              type="text"
              name="fullName"
              placeholder="Name"
              required
              value={this.state.fullName}
              onChange={this.handleInputChange}
            />
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              type="email"
              name="email"
              placeholder="Email"
              required
              value={this.state.email}
              onChange={this.handleInputChange}
            />

            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              value={this.state.message}
              placeholder="Message"
              rows="5"
              required
              onChange={this.handleInputChange}
            />
            <ReCAPTCHA sitekey="process.env.SITE_RECAPTCHA_KEY" />
            <Button type="submit" >
              Submit
            </Button>
            {/* <button type="submit">Submit</button> */}
          </form>
        </div>
      </Layout>
    )
  }
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
