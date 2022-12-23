// ** React Imports
import { Fragment, lazy } from 'react'
import { Navigate } from 'react-router-dom'

// ** Layouts
import BlankLayout from '@layouts/BlankLayout'
import VerticalLayout from '@src/layouts/VerticalLayout'
import HorizontalLayout from '@src/layouts/HorizontalLayout'
import LayoutWrapper from '@src/@core/layouts/components/layout-wrapper'

// ** Route Components
import PublicRoute from '@components/routes/PublicRoute'

// ** Utils
import { isObjEmpty } from '@utils'

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />
}

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/home'

const Home = lazy(() => import('../../views/Home'))
const SecondPage = lazy(() => import('../../views/SecondPage'))
const Login = lazy(() => import('../../views/Login'))
const Register = lazy(() => import('../../views/Register'))
const ForgotPassword = lazy(() => import('../../views/ForgotPassword'))
const Error = lazy(() => import('../../views/Error'))

//Skill
const ViewSkills = lazy(() => import('./../../views/Pages/Skill/ViewSkills'))
const AddSkill = lazy(() => import('./../../views/Pages/Skill/AddSkill'))
const ViewSkill = lazy(() => import('./../../views/Pages/Skill/ViewSkill'))

//Blog
const ViewBlogs = lazy(() => import('./../../views/Pages/Blog/ViewBlogs'))
const AddBlog = lazy(() => import('../../views/Pages/Blog/AddBlog'))
const ViewBlog = lazy(() => import('../../views/Pages/Blog/ViewBlog'))

//Post
const AddPost = lazy(() => import('../../views/Pages/Post/AddPost'))
const ViewPost = lazy(() => import('../../views/Pages/Post/ViewPost'))
const AllPosts = lazy(() => import('../../views/Pages/Post/AllPosts'))

//User
const AddUser = lazy(() => import('../../views/Pages/User/AddUser'))
const AllUsers = lazy(() => import('../../views/Pages/User/AllUsers'))
const ViewUser = lazy(() => import('../../views/Pages/User/ViewUser'))
const EditUser = lazy(() => import('../../views/Pages/User/EditUser'))
const EditPost = lazy(() => import('../../views/Pages/Post/EditPost'))


// ** Merge Routes
const Routes = [
  {
    path: '/',
    index: true,
    element: <Navigate replace to={DefaultRoute} />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/second-page',
    element: <SecondPage />
  },
  {
    path:'/skills',
    element: <ViewSkills />
  },
  {
    path:'/skills/:id',
    element: <ViewSkill />
  },
  {
    path:'/addSkill',
    element: <AddSkill />
  },
  {
    path:'/blogs',
    element: <ViewBlogs />
  },
  {
    path:'/blogs/:id',
    element: <ViewBlog />
  },
  {
    path:'/addBlog',
    element: <AddBlog />
  },

  //Posts
  {
    path:'/addPost',
    element: <AddPost />
  },
  {
    path:'/posts',
    element: <AllPosts />
  },
  {
    path:'/posts/:id',
    element: <ViewPost />
  },
  {
    path:'/posts/edit/:id',
    element: <EditPost />
  },

  //End Post Here

  //User
  {
    path:'/addUser',
    element: <AddUser />
  },
  {
    path:'/user',
    element: <AllUsers />
  },
  {
    path:'/user/:id',
    element: <ViewUser />
  },
  {
    path:'/user/edit/:id',
    element: <EditUser />
  },

  //End User Here


  {
    path: '/login',
    element: <Login />,
    meta: {
      layout: 'blank'
    }
  },
  {
    path: '/register',
    element: <Register />,
    meta: {
      layout: 'blank'
    }
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
    meta: {
      layout: 'blank'
    }
  },
  {
    path: '/error',
    element: <Error />,
    meta: {
      layout: 'blank'
    }
  }
]

const getRouteMeta = route => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta }
    } else {
      return {}
    }
  }
}

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = []

  if (Routes) {
    Routes.filter(route => {
      let isBlank = false
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) && defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === 'blank' ? (isBlank = true) : (isBlank = false)
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          )
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route)
      }
      return LayoutRoutes
    })
  }
  return LayoutRoutes
}

const getRoutes = layout => {
  const defaultLayout = layout || 'vertical'
  const layouts = ['vertical', 'horizontal', 'blank']

  const AllRoutes = []

  layouts.forEach(layoutItem => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout)

    AllRoutes.push({
      path: '/',
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes
    })
  })
  return AllRoutes
}

export { DefaultRoute, TemplateTitle, Routes, getRoutes }
