import React, { PropTypes } from "react"
import enhanceCollection from "phenomic/lib/enhance-collection"

import PagesList from "../../components/PagesList"

import styles from "./index.css"

const defaultNumberOfPosts = 6

const LatestPosts = (props, { collection }) => {
  const tag = props.tag
  const latestPosts = enhanceCollection(collection, {
    filter: (item) => (
      item.layout === "Post" && (tag ?
      (item.tags && item.tags.indexOf(tag) > -1): true)
    ),
    sort: "date",
    reverse: true,
  })
  .slice(0, props.numberOfPosts || defaultNumberOfPosts)

  return (
    <div>
      { props.title &&
      <h2 className={ styles.latestPosts }>
        { props.title }
      </h2>
      }
      <PagesList pages={ latestPosts } withHero={props.withHero}/>
    </div>
  )
}

LatestPosts.propTypes = {
  numberOfPosts: PropTypes.number,
  title: PropTypes.string,
  tag: PropTypes.string,
  withHero: PropTypes.bool,
}

LatestPosts.contextTypes = {
  collection: PropTypes.array.isRequired,
}

export default LatestPosts
