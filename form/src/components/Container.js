import React from 'react'

function Container(props) {

  console.log(props);
  return (
    <div className="container">
          <div className="post">
            <h3>{props.posts.name}</h3>
            <p><strong>Email: </strong>{props.posts.email}</p>
            <p><strong>Password: </strong>{props.posts.password}</p>
            <p><strong>Created: </strong>{props.posts.createdAt}</p>
          </div>
    </div>
  )
}

export default Container
