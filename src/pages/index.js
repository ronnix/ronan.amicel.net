import React from 'react'
import { Link } from 'gatsby'
import Layout from "../components/layout"

const IndexPage = () => (
  <Layout>
    <h1>Bonjour l’internet&nbsp;!</h1>
    <p>Vous trouverez ici&nbsp;:</p>
    <ul>
        <li>tous mes <Link to="/articles/">articles</Link> de blog (certains en français et d’autres en anglais)&nbsp;;</li>
        <li>des <Link to="/recettes/">recettes</Link> de cuisine&nbsp;;</li>
        <li>les liens pour me retrouver sur
            <a href="https://mamot.fr/@ronnix" title="Mastodon"><i className="icon-mastodon" alt="Mastodon" /></a>,
            <a href="https://twitter.com/amicel" title="Twitter"><i className="icon-twitter" alt="Twitter" /></a>,
            <a href="https://www.linkedin.com/in/ronanamicel" title="LinkedIn"><i className="icon-linkedin" alt="LinkedIn" /></a>,
            <a href="https://www.instagram.com/ronnix/" title="Instagram"><i className="icon-instagram" alt="Instagram" /></a>,
            ou encore
            <a href="https://github.com/ronnix" title="GitHub"><i className="icon-github-circled" alt="GitHub" /></a>.
        </li>
    </ul>
    <p>Et un jour peut-être aussi&nbsp;:</p>
    <ul>
        <li>une petite biographie&nbsp;;</li>
        <li>une liste de projets actuels et passés&nbsp;;</li>
        <li>une invitation à travailler ensemble&nbsp;;</li>
        <li>et d’autres choses selon mon inspiration…</li>
    </ul>
  </Layout>
)

export default IndexPage
