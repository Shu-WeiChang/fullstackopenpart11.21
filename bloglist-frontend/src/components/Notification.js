import React, { useState } from "react";
import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification)
  return (
    <>
      { {notification} ? (
        <div>
          {notification}
        </div>
      ) : null}
    </>
  )
}

export default Notification
