import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../views/home/Home.vue')
const Video = () => import('../views/video/Video.vue')
const Contact = () => import('../views/contact/Contact.vue')
const Personal = () => import('../views/personal/Personal.vue')
const SongListDetail = () => import('../views/songListDetail/SongListDetail.vue')

const routes = [
  { 
    path: '/', 
    redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      meta: {
        tabBar: true
      },
      component: Home
    },
    {
      path: '/video',
      name: 'Video',
      meta: {
        tabBar: true
      },
    component: Video
    },
    {
      path: '/contact',
      name: 'Contact',
      meta: {
        tabBar: true
      },
    component: Contact
    },
    {
      path: '/personal',
      name: 'Personal',
      meta: {
        tabBar: true
      },
    component: Personal
    },
    {
      path: '/songListDetail/:id',
      name: 'SongListDetail',
      meta: {
        tabBar: false
      },
    component: SongListDetail
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
