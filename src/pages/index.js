import React from 'react'
import { Link } from 'gatsby'
import Layout from "../components/layout"

const IndexPage = () => (
  <Layout>
    <h1>Bonjour l’internet&nbsp;!</h1>
    <p>Vous trouverez ici&nbsp;:</p>
    <ul>
        <li>tous mes <Link to="/articles/">articles</Link> de blog (certains en français et d’autres en anglais)&nbsp;;</li>
        <li>les liens pour me retrouver sur
            <a href="https://twitter.com/amicel" title="Twitter"><i className="icon-twitter" alt="Twitter" /></a>,
            <a href="https://www.linkedin.com/in/ronanamicel" title="LinkedIn"><i className="icon-linkedin" alt="LinkedIn" /></a>, ou encore
            <a href="https://github.com/ronnix" title="GitHub"><i className="icon-github" alt="GitHub" /></a>.
        </li>
    </ul>
    <p>Et bientôt aussi&nbsp;:</p>
    <ul>
        <li>une petite biographie&nbsp;;</li>
        <li>une liste de projets actuels et passés&nbsp;;</li>
        <li>une invitation à travailler ensemble&nbsp;;</li>
        <li>et peut-être d’autres choses encore...</li>
    </ul>
  </Layout>
)

export default IndexPage
