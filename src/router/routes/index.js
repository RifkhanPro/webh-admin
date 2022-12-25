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
import Test from '../../views/Pages/Post/Test'

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
const EditSkill = lazy(() => import('../../views/Pages/Skill/EditSkill'))

//Blog
const ViewBlogs = lazy(() => import('./../../views/Pages/Blog/ViewBlogs'))
const AddBlog = lazy(() => import('../../views/Pages/Blog/AddBlog'))
const ViewBlog = lazy(() => import('../../views/Pages/Blog/ViewBlog'))
const EditBlog = lazy(() => import('../../views/Pages/Blog/EditBlog'))

//Article
const ViewArticles = lazy(() => import('./../../views/Pages/Article/ViewArticles'))
const AddArticle = lazy(() => import('../../views/Pages/Article/AddArticle'))
const ViewArticle = lazy(() => import('../../views/Pages/Article/ViewArticle'))
const EditArticle = lazy(() => import('../../views/Pages/Article/EditArticle'))

//TopicPosts
const ViewTopicPosts = lazy(() => import('../../views/Pages/TopicPost/ViewTopicPosts'))
const AddTopicPost = lazy(() => import('../../views/Pages/TopicPost/AddTopicPost'))
const ViewTopicPost = lazy(() => import('../../views/Pages/TopicPost/ViewTopicPost'))
const EditTopicPost = lazy(() => import('../../views/Pages/TopicPost/EditTopicPost'))

//Trend
const ViewTrends = lazy(() => import('./../../views/Pages/Trend/ViewTrends'))
const AddTrend = lazy(() => import('../../views/Pages/Trend/AddTrend'))
const ViewTrend = lazy(() => import('../../views/Pages/Trend/ViewTrend'))
const EditTrend = lazy(() => import('../../views/Pages/Trend/EditTrend'))

//news
const ViewNewses = lazy(() => import('../../views/Pages/News/ViewNewses'))
const AddNews = lazy(() => import('../../views/Pages/News/AddNews'))
const ViewNews = lazy(() => import('../../views/Pages/News/ViewNews'))
const EditNews = lazy(() => import('../../views/Pages/News/EditNews'))

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


//Analytics
const ViewAnalytics = lazy(() => import('../../views/Pages/Analytics/ViewAnalytics'))
const AddAnalytic = lazy(() => import('../../views/Pages/Analytics/AddAnalytic'))
const ViewAnalytic = lazy(() => import('../../views/Pages/Analytics/ViewAnalytic'))
const EditAnalytic = lazy(() => import('../../views/Pages/Analytics/EditAnalytic'))

//Advertisements
const ViewAdvertisements = lazy(() => import('../../views/Pages/Advertisement/ViewAdvertisements'))
const AddAdvertisement = lazy(() => import('../../views/Pages/Advertisement/AddAdvertisement'))
const ViewAdvertisement = lazy(() => import('../../views/Pages/Advertisement/ViewAdvertisement'))
const EditAdvertisement = lazy(() => import('../../views/Pages/Advertisement/EditAdvertisement'))

//PostManagement
const ViewPostManagements = lazy(() => import('../../views/Pages/PostManagement/ViewPostManagements'))
const AddPostManagement = lazy(() => import('../../views/Pages/PostManagement/AddPostManagement'))
const ViewPostManagement = lazy(() => import('../../views/Pages/PostManagement/ViewPostManagement'))
const EditPostManagement = lazy(() => import('../../views/Pages/PostManagement/EditPostManagement'))

//ScoreBoxes
const ViewScoreBoxes = lazy(() => import('../../views/Pages/ScoreBox/ViewScoreBoxes'))
const AddScoreBox = lazy(() => import('../../views/Pages/ScoreBox/AddScoreBox'))
const ViewScoreBox = lazy(() => import('../../views/Pages/ScoreBox/ViewScoreBox'))
const EditScoreBox = lazy(() => import('../../views/Pages/ScoreBox/EditScoreBox'))

//ScoreBoxes
const ViewRecentSearchFeeds = lazy(() => import('../../views/Pages/RecentSearchFeed/ViewRecentSearchFeeds'))
const AddRecentSearchFeed = lazy(() => import('../../views/Pages/RecentSearchFeed/AddRecentSearchFeed'))
const ViewRecentSearchFeed = lazy(() => import('../../views/Pages/RecentSearchFeed/ViewRecentSearchFeed'))
const EditRecentSearchFeed = lazy(() => import('../../views/Pages/RecentSearchFeed/EditAddRecentSearchFeed'))

//Topic
const ViewTopics = lazy(() => import('../../views/Pages/Topic/ViewTopics'))
const AddTopic = lazy(() => import('../../views/Pages/Topic/AddTopic'))
const ViewTopic = lazy(() => import('../../views/Pages/Topic/ViewTopic'))
const EditTopic = lazy(() => import('../../views/Pages/Topic/EditTopic'))
const AddName = lazy(() => import('../../views/Pages/Topic/AddName'))
const ShowNames = lazy(() => import('../../views/Pages/Topic/ShowNames'))

//Feedback
const AllFeedback = lazy(() => import('../../views/Pages/Feedback/AllFeedback'))
const ViewFeedback = lazy(() => import('../../views/Pages/Feedback/ViewFeedback'))

//Questions
const AllQuestion = lazy(() => import('../../views/Pages/Question/AllQuestion'))

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
    path:'/skills/edit/:id',
    element: <EditSkill />
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
    path:'/blogs/edit/:id',
    element: <EditBlog />
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
  {
    path:'/test',
    element: <Test />
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
  },
  {
    path:'/articles',
    element: <ViewArticles/>
  },
  {
    path:'/addArticle',
    element: <AddArticle/>
  },
  {
    path:'/articles/:id',
    element: <ViewArticle/>
  },
  {
    path:'/articles/edit/:id',
    element: <EditArticle/>
  },
  {
    path:'/topicPosts',
    element: <ViewTopicPosts/>
  },
  {
    path:'/addTopicPost',
    element: <AddTopicPost/>
  },
  {
    path:'/topicPosts/:id',
    element: <ViewTopicPost/>
  },
  {
    path:'/topicPosts/edit/:id',
    element: <EditTopicPost/>
  },
  {
    path:'/news',
    element: <ViewNewses/>
  },
  {
    path:'/addNews',
    element: <AddNews/>
  },
  {
    path:'/news/:id',
    element: <ViewNews/>
  },
  {
    path:'/news/edit/:id',
    element: <EditNews/>
  },
  {
    path:'/trends',
    element: <ViewTrends/>
  },
  {
    path:'/addTrend',
    element: <AddTrend/>
  },
  {
    path:'/trends/:id',
    element: <ViewTrend/>
  },
  {
    path:'/trends/edit/:id',
    element: <EditTrend/>
  },
  {
    path:'/analytics',
    element: <ViewAnalytics/>
  },
  {
    path:'/addAnalytic',
    element: <AddAnalytic/>
  },
  {
    path:'/analytics/:id',
    element: <ViewAnalytic/>
  },
  {
    path:'/analytics/edit/:id',
    element: <EditAnalytic/>
  },
  {
    path:'/advertisements',
    element: <ViewAdvertisements/>
  },
  {
    path:'/addAdvertisement',
    element: <AddAdvertisement/>
  },
  {
    path:'/advertisements/:id',
    element: <ViewAdvertisement/>
  },
  {
    path:'/advertisements/edit/:id',
    element: <EditAdvertisement/>
  },
  {
    path:"/feedbacks",
    element:<AllFeedback />
  },
  {
    path:"/feedbacks/:id",
    element:<ViewFeedback />
  },
  {
    path:'/postManagements',
    element: <ViewPostManagements/>
  },
  {
    path:'/addPostManagement',
    element: <AddPostManagement/>
  },
  {
    path:'/postManagements/:id',
    element: <ViewPostManagement/>
  },
  {
    path:'/postManagements/edit/:id',
    element: <EditPostManagement/>
  },
  {
    path:'/scoreBoxes',
    element: <ViewScoreBoxes/>
  },
  {
    path:'/addScoreBox',
    element: <AddScoreBox/>
  },
  {
    path:'/scoreBoxes/:id',
    element: <ViewScoreBox/>
  },
  {
    path:'/scoreBoxes/edit/:id',
    element: <EditScoreBox/>
  },
  {
    path:'/recentSearchFeeds',
    element: <ViewRecentSearchFeeds/>
  },
  {
    path:'/addRecentSearchFeed',
    element: <AddRecentSearchFeed/>
  },
  {
    path:'/recentSearchFeeds/:id',
    element: <ViewRecentSearchFeed/>
  },
  {
    path:'/recentSearchFeeds/edit/:id',
    element: <EditRecentSearchFeed/>
  },
  {
    path:"/topics",
    element:<ViewTopics />
  },
  {
    path:"/addTopic",
    element:<AddTopic />
  },
  {
    path:"/topics/:id",
    element:<ViewTopic />
  },
  {
    path:"/topics/edit/:id",
    element:<EditTopic />
  },
  {
    path:"/topics/:id/addName",
    element:<AddName />
  },
  {
    path:"/topics/:id/names",
    element:<ShowNames />
  },
  {
    path:"/questions",
    element:<AllQuestion />
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
