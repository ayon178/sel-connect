'use client'

import Loader from '@/components/shared/Loader'
import { getStorage } from '@/functions/api'
import { getDepartmentByType } from '@/utils/constant'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const AdminHome = () => {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const getDept = () => {
    setLoading(true)
    const user = getStorage('selConnect')
    if (!user) {
      toast.error('Please login')
      router.push('/auth/login')
      return
    }
    const parsedUser = JSON.parse(user)
    if (parsedUser.role !== 'admin') {
      toast.error('Please login as admin to view this page')
      router.push('/auth/login')
      return
    }
    const dept = getDepartmentByType(parsedUser.type)
    router.push(`/admin/${dept}`)

    setLoading(false)
  }

  useEffect(() => {
    getDept()
  }, [])

  if (loading) return <Loader />
  return <div>AdminHome</div>
}

export default AdminHome
