import React from 'react'

const Link = (props) => {
  const {href,children,className=''}=props;
  return (
    <a href={href} className={className}>
      {children}
    </a>
  )
}

export default Link
