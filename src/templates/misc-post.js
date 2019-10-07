import React from "react"

import { rhythm } from "../utils/typography"

class MiscPostTemplate extends React.Component {
  constructor(){
    super();
    console.log(this)
  }
  render() {
    const post = this.props.pageContext
    console.log(post)
    return (
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            Page Template
          </h1>
          <a href="{post.slug}">{post.slug}</a>
        </header>
      </article>
    )
  }
}

export default MiscPostTemplate