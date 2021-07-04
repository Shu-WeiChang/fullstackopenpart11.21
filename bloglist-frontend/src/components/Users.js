import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useHistory,
} from "react-router-dom"

const Users = ({ users }) => {  
  return (
      <>
        {users.map(user =>
          <>
            <tr>
              <td>
                <Link key={user.id} to={`/users/${user.id}`}>
                  {user.name}
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          </>
        )}
      </>
  )
}

export default Users
