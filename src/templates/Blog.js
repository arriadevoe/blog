import React from "react"
import { graphql, Link } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
// import ScriptTag from "react-script-tag"
import Gist from 'react-gist'

import blogStyles from "./Blog.module.scss"

import Layout from "../components/Layout"
import Head from "../components/Head"
import SocialShareMenu from "../components/SocialShareMenu"

export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishedDate(formatString: "MMMM Do, YYYY")
      body {
        json
      }
      tags
      slug
      previewImage {
        fluid {
          src
        }
        title
      }
    }
  }
`

const Blog = props => {
  const options = {
    renderNode: {
      "embedded-asset-block": node => {
        const alt = node.data.target.fields.title["en-US"]
        const url = node.data.target.fields.file["en-US"].url
        return <img src={url} alt={alt} />
      },
      "embedded-entry-inline": node => {
        const file = node.data.target.fields.json["en-US"].file
        const gist_id = node.data.target.fields.json["en-US"].gist_id
        return (
          <Gist id={gist_id} file={file} />
        )
      },
    },
  }

  return (
    <Layout>
      <Head title={props.data.contentfulBlogPost.title}></Head>
      <h1 className={blogStyles.postTitle}>
        {props.data.contentfulBlogPost.title}
      </h1>
      <div className={blogStyles.postHeaderImageContainer}>
        <img
          src={props.data.contentfulBlogPost.previewImage.fluid.src}
          alt={props.data.contentfulBlogPost.previewImage.title}
        />
      </div>
      <div className={blogStyles.postTags}>
        {props.data.contentfulBlogPost.tags.map(tag => (
          <span>{tag}</span>
        ))}
      </div>
      <div className={blogStyles.postHeader}>
        <SocialShareMenu shareableLink={props.data.contentfulBlogPost.slug} />
        <div className={blogStyles.userCardContainer}>
          <Link className={blogStyles.avatar} to="/blog/about-me">
            <img
              src={require("../assets/apple-touch-icon.png")}
              alt="avatar"
              width="50"
            />
          </Link>
          <div className={blogStyles.publishingInformation}>
            <span className={blogStyles.name}>Guillermo Arria-Devoe</span>
            <span className={blogStyles.date}>
              {props.data.contentfulBlogPost.publishedDate}
            </span>
          </div>
        </div>
      </div>
      {documentToReactComponents(
        props.data.contentfulBlogPost.body.json,
        options
      )}
      <b>Share this article:</b>
      <SocialShareMenu shareableLink={props.data.contentfulBlogPost.slug} />
    </Layout>
  )
}

export default Blog