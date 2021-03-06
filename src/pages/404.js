import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/Layout'
import Head from '../components/Head'

const NotFoundPage = () => {
  return(
    <Layout>
      <Head title="404"></Head>
      <h1>Page Not Found</h1>
      <p>
        <Link to="/">Return Home</Link>
      </p>
    </Layout>
  )
}

export default NotFoundPage