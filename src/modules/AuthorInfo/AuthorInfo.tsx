import React, { ReactElement } from 'react'
import './index.scss'

interface IProps {
  authorInfo: {
    author: string
    info: string
  }
}

const AuthorInfo = (props: IProps): ReactElement => {
  const { authorInfo = null } = props
  if (!authorInfo) {
    return <></>
  }

  const { author = null, info = null } = authorInfo
  return (
    <div className='author-info'>
      <h2>{author}</h2>
      <p>{info ? <>{info}</> : <>Author info not found on wikipedia</>}</p>
    </div>
  )
}

export default AuthorInfo
