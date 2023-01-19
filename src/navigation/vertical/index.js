import { Mail, Home, FileText, Folder, Award, User, List, TrendingUp, Search, HelpCircle, MessageCircle, BarChart2, Paperclip, Type } from 'react-feather'
export default [
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home'
  },
  {
    id: 'postManagement',
    title: 'Post',
    icon: <Paperclip size={20} />,
    navLink: '/postManagements'
  },
  {
    id: 'reportPost',
    title: 'PostReport',
    icon: <Paperclip size={20} />,
    navLink: '/postReport'
  },
  // {
  //   id: 'skills',
  //   title: 'Skills',
  //   icon: <Award size={20} />,
  //   navLink: '/skills'
  // },
  {
    id: 'blogs',
    title: 'Blog',
    icon: <FileText size={20} />,
    navLink: '/blogs'
  },
  // {
  //   id: 'allPosts',
  //   title: 'All Posts',
  //   icon: <Mail size={20} />,
  //   navLink: '/posts'
  // },
  // {
  //   id: 'addPost',
  //   title: 'Add Post',
  //   icon: <Mail size={20} />,
  //   navLink: '/addPost'
  // },
  {
    id: 'allUsers',
    title: 'User',
    icon: <User size={20} />,
    navLink: '/user'
  },
  {
    id: 'articles',
    title: 'Article',
    icon: <Folder size={20} />,
    navLink: '/articles'
  },
  {
    id: 'topic',
    title: 'Topic',
    icon: <Mail size={20} />,
    navLink: '/topics'
  },
  {
    id: 'topicPosts',
    title: 'TopicPosts',
    icon: <Type size={20} />,
    navLink: '/topicPosts'
  }, {
    id: 'advertisement',
    title: 'Advertisement',
    icon: <List size={20} />,
    navLink: '/advertisements'
  }, 
  // {
  //   id: 'postManagement',
  //   title: 'Post',
  //   icon: <Mail size={20} />,
  //   navLink: '/postManagements'
  // },
  // {
  //   id: 'scoreBox',
  //   title: 'ScoreBox',
  //   icon: <Mail size={20} />,
  //   navLink: '/scoreBoxes'
  // },
  {
    id: 'news',
    title: 'News',
    icon: <Mail size={20} />,
    navLink: '/news'
  },
  {
    id: 'analytics',
    title: 'Analytics',
    icon: <BarChart2 size={20} />,
    navLink: '/analytics'
  },
  {
    id: 'recentSearchFeed',
    title: 'Recent Search Feed',
    icon: <Search size={20} />,
    navLink: '/recentSearchFeeds'
  },
  {
    id: 'feedback',
    title: 'FeedBack',
    icon: <MessageCircle size={20} />,
    navLink: '/feedbacks'
  },
  {
    id: 'question',
    title: 'Question',
    icon: <HelpCircle size={20} />,
    navLink: '/questions'
  },
  {
    id: 'trend',
    title: 'Trend',
    icon: <TrendingUp size={20} />,
    navLink: '/trends'
  }
]
