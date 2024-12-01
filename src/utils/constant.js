import { FaUsers } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { HiUserAdd } from 'react-icons/hi'
import { IoMdList } from 'react-icons/io'
import { IoIosNotifications } from 'react-icons/io'
import { FaWheelchairMove } from 'react-icons/fa6'

import { MdAddchart } from 'react-icons/md'
import { FaRegListAlt } from 'react-icons/fa'
import { MdAddHomeWork } from 'react-icons/md'

export const CONSTRUCTION_OPTIONS = [
  'Wall Layout (Internal)',
  'Tiles (Bath & Kitchen)',
  'Floor Finish (Tiles)',
  'Sanitary fitting',
  'Bathroom fitting layout',
  'Extra electric point in roof',
  'Sanitary wares (Basin, Commode, Taps)',
  'Doc Frame',
]

export const AFTER_SALES_OPTIONS = [
  'Civil Work',
  'Paint Work',
  'Sanitary Work',
  'Wood Work',
  'Thai Work',
  'MS Work',
  'Electrical Work',
  'Carpenter Work',
]

export const PAYMENT_OPTIONS = [
  'Name Change',
  'Cheque Status',
  'Payment Status',
  'Refund',
  'Handover Procedure',
  'Other Payments',
  'Allotment Deed',
  'Loan Papers',
  'Registration Process',
  'Other Papers',
]

export const getSidebarOptions = (role, sub) => {
  const SalesOptions = [
    {
      title: 'Current Client',
      path: '/admin/sales/current-clients',
      icon: <FaUsers />,
    },
    {
      title: 'Create Client',
      path: '/admin/sales/create-client',
      icon: <HiUserAdd />,
    },
    {
      title: 'Property List',
      path: '/admin/sales/property-list',
      icon: <IoMdList />,
    },
    {
      title: 'HR Notification',
      path: '/admin/sales/hr-notification',
      icon: <IoIosNotifications />,
    },
    {
      title: 'Go to site',
      path: 'https://www.sel.com.bd/',
      icon: <FaWheelchairMove />,
    },
  ]

  const MarketingOptions = [
    {
      title: 'Property Create',
      icon: <MdAddHomeWork />,
      path: '/admin/marketing/property-create',
    },
    {
      title: 'Create Offer',
      icon: <MdAddchart />,
      path: '/admin/marketing/create-offer',
    },
    {
      title: 'Property List',
      icon: <IoMdList />,
      path: '/admin/marketing/property-list',
    },
    {
      title: 'Offer List',
      icon: <FaRegListAlt />,
      path: '/admin/marketing/offer-list',
    },
    {
      title: 'HR Notification',
      path: '/admin/marketing/hr-notification',
      icon: <IoIosNotifications />,
    },
    {
      title: 'Go to site',
      path: 'https://www.sel.com.bd/',
      icon: <FaWheelchairMove />,
    },
  ]

  const AfterSalesOptions = [
    {
      title: 'Current Feedbacks',
      icon: <MdAddchart />,
      path: '/admin/after-sales/current-feedback',
    },
    {
      title: 'Client Feedbacks',
      icon: <MdAddchart />,
      path: '/admin/after-sales/client-feedback',
    },
    ...(sub === '0'
      ? [
          {
            title: 'Assign Sub Admin',
            icon: <MdAddchart />,
            path: '/admin/after-sales/assign-sub-admin',
          },
        ]
      : []),
    ...(sub !== '0'
      ? [
          {
            title: 'Assigned Properties',
            icon: <MdAddchart />,
            path: '/admin/after-sales/assigned-properties',
          },
        ]
      : []),
    {
      title: 'Send Notifications',
      icon: <MdAddchart />,
      path: '/admin/after-sales/send-notifications',
    },
    {
      title: 'Upcoming Schedule',
      icon: <MdAddchart />,
      path: '/admin/after-sales/upcoming-schedule',
    },
    {
      title: 'Property List',
      icon: <MdAddchart />,
      path: '/admin/after-sales/property-list',
    },
    {
      title: 'HR Notification',
      icon: <MdAddchart />,
      path: '/admin/after-sales/hr-notification',
    },
    {
      title: 'My Profile',
      icon: <MdAddchart />,
      path: '/admin/after-sales/my-profile',
    },
  ]

  const ConstructionOptions = [
    {
      title: 'Current Feedbacks',
      icon: <MdAddchart />,
      path: '/admin/construction/current-feedback',
    },
    {
      title: 'Client Feedbacks',
      icon: <MdAddchart />,
      path: '/admin/construction/client-feedback',
    },
    ...(sub === '0'
      ? [
          {
            title: 'Assign Sub Admin',
            icon: <MdAddchart />,
            path: '/admin/construction/assign-sub-admin',
          },
        ]
      : []),
    ...(sub !== '0'
      ? [
          {
            title: 'Assigned Properties',
            icon: <MdAddchart />,
            path: '/admin/construction/assigned-properties',
          },
        ]
      : []),
    {
      title: 'Send Notifications',
      icon: <MdAddchart />,
      path: '/admin/construction/send-notifications',
    },
    {
      title: 'Upcoming Schedule',
      icon: <MdAddchart />,
      path: '/admin/construction/upcoming-schedule',
    },
    {
      title: 'Property List',
      icon: <MdAddchart />,
      path: '/admin/construction/property-list',
    },
    {
      title: 'HR Notification',
      icon: <MdAddchart />,
      path: '/admin/construction/hr-notification',
    },
    {
      title: 'My Profile',
      icon: <MdAddchart />,
      path: '/admin/construction/my-profile',
    },
  ]

  const AccountsOptions = [
    {
      title: 'Current Feedbacks',
      icon: <MdAddchart />,
      path: '/admin/accounts/current-feedback',
    },
    {
      title: 'All Feedbacks',
      icon: <MdAddchart />,
      path: '/admin/accounts/all-feedback',
    },
    // {
    //   title: 'Client Feedbacks',
    //   icon: <MdAddchart />,
    //   path: '/admin/accounts/client-feedback',
    // },
    ...(sub === '0'
      ? [
          {
            title: 'Assign Sub Admin',
            icon: <MdAddchart />,
            path: '/admin/accounts/assign-sub-admin',
          },
        ]
      : []),
    ...(sub !== '0'
      ? [
          {
            title: 'Assigned Properties',
            icon: <MdAddchart />,
            path: '/admin/accounts/assigned-properties',
          },
        ]
      : []),
    {
      title: 'Send Notifications',
      icon: <MdAddchart />,
      path: '/admin/accounts/send-notifications',
    },
    {
      title: 'Upcoming Schedule',
      icon: <MdAddchart />,
      path: '/admin/accounts/upcoming-schedule',
    },
    {
      title: 'Property List',
      icon: <MdAddchart />,
      path: '/admin/accounts/property-list',
    },
    {
      title: 'HR Notification',
      icon: <MdAddchart />,
      path: '/admin/accounts/hr-notification',
    },
    {
      title: 'My Profile',
      icon: <MdAddchart />,
      path: '/admin/accounts/my-profile',
    },
  ]

  const LegalOptions = [
    {
      title: 'Current Feedbacks',
      icon: <MdAddchart />,
      path: '/admin/legal/current-feedback',
    },
    {
      title: 'Client Feedbacks',
      icon: <MdAddchart />,
      path: '/admin/legal/client-feedback',
    },
    ...(sub === '0'
      ? [
          {
            title: 'Assign Sub Admin',
            icon: <MdAddchart />,
            path: '/admin/legal/assign-sub-admin',
          },
        ]
      : []),
    ...(sub !== '0'
      ? [
          {
            title: 'Assigned Properties',
            icon: <MdAddchart />,
            path: '/admin/legal/assigned-properties',
          },
        ]
      : []),
    {
      title: 'Send Notifications',
      icon: <MdAddchart />,
      path: '/admin/legal/send-notifications',
    },
    {
      title: 'Upcoming Schedule',
      icon: <MdAddchart />,
      path: '/admin/legal/upcoming-schedule',
    },
    {
      title: 'Property List',
      icon: <MdAddchart />,
      path: '/admin/legal/property-list',
    },
    {
      title: 'HR Notification',
      icon: <MdAddchart />,
      path: '/admin/legal/hr-notification',
    },
    {
      title: 'My Profile',
      icon: <MdAddchart />,
      path: '/admin/legal/my-profile',
    },
  ]

  const InteriorOptions = [
    {
      title: 'Current Feedbacks',
      icon: <MdAddchart />,
      path: '/admin/interior/current-feedback',
    },
    {
      title: 'All Feedbacks',
      icon: <MdAddchart />,
      path: '/admin/interior/all-feedback',
    },
    {
      title: 'Add Previous Project',
      icon: <MdAddchart />,
      path: '/admin/interior/create-previous-project',
    },
    {
      title: 'Interior Offer',
      icon: <MdAddchart />,
      path: '/admin/interior/interior-offer',
    },
    {
      title: 'Previous Project',
      icon: <MdAddchart />,
      path: '/admin/interior/previous-project',
    },
  ]

  const HrOptions = [
    {
      title: 'Send Notification',
      icon: <MdAddchart />,
      path: '/admin/hr/send-notification',
    },
    {
      title: 'Notification History',
      icon: <MdAddchart />,
      path: '/admin/hr/notification-history',
    },
  ]

  const StaffOptions = [
    {
      title: 'View Notification',
      icon: <MdAddchart />,
      path: '/admin/staff/view-notification',
    },
    {
      title: 'Property Ads',
      icon: <MdAddchart />,
      path: '/admin/staff/property-ads',
    },
  ]

  if (role === '2') {
    return SalesOptions
  } else if (role === '3') {
    return MarketingOptions
  } else if (role === '4') {
    return ConstructionOptions
  } else if (role === '5') {
    return AccountsOptions
  } else if (role === '6') {
    return AfterSalesOptions
  } else if (role === '8') {
    return LegalOptions
  } else if (role === '7') {
    return InteriorOptions
  } else if (role === '9') {
    return HrOptions
  } else if (role === '10') {
    return StaffOptions
  } else {
    return []
  }
}

export const FEEDBACK_TYPES = [
  'Construction Feedback',
  'Accounts Feedback',
  'Sales Feedback',
  'Interior Feedback',
  'Legal Feedback',
]

export const PLACEHOLDER =
  'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg'

//  * main_admin	-> 1
//  * admin_sales	-> 2
//  * admin_marketing	-> 3
//  * admin_construction-> 4
//  * admin_accounts	-> 5
//  * admin_after_sales -> 6
//  * admin_interior -> 7
//  * admin_legal -> 8
//  * admin_HR -> 9
//  * admin_staff -> 10

export const getDepartmentByType = type => {
  let dept = ''
  if (type === '2') {
    dept = 'sales'
  } else if (type === '3') {
    dept = 'marketing'
  } else if (type === '4') {
    dept = 'construction'
  } else if (type === '5') {
    dept = 'accounts'
  } else if (type === '6') {
    dept = 'after-sales'
  } else if (type === '7') {
    dept = 'interior'
  } else if (type === '8') {
    dept = 'legal'
  } else if (type === '9') {
    dept = 'hr'
  } else if (type === '10') {
    dept = 'staff'
  } else {
    dept = 'admin'
  }

  return dept
}
