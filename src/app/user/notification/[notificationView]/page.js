import NotificationViewComponent from '@/components/notification/NotificationViewComponent'
import Navbar from '@/components/shared/Navbar'
import React from 'react'

const NotificationView = ({ params }) => {
  return (
    <>
      <Navbar />
      <NotificationViewComponent dynamicId={params.notificationView} />
    </>
  )
}

export default NotificationView
