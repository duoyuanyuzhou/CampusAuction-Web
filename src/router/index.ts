import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/DefaultLayout.vue'),
      children: [
        { path: '', name: 'Home', component: () => import('@/views/HomeView.vue') },
        { path: 'about', name: 'About', component: () => import('@/views/AboutView.vue') },
      ],
    },
    // 登录/注册页
    {
      path: '/user',
      component: () => import('@/layouts/AuthLayout.vue'),
      children: [
        { path: 'login', name: 'Login', component: () => import('@/views/user/LoginView.vue') },
        { path: 'register', name: 'Register', component: () => import('@/views/user/RegisterView.vue') },
      ],
    },

// 用户已登录页面
    {
      path: '/user',
      component: () => import('@/layouts/AdminLayout.vue'),
      meta: { role: 'user' },
      children: [
        { path: 'dashboard', name: 'userDashboard', component: () => import('@/views/user/DashboardView.vue'), meta: { title: '主页面' } },
        { path: 'message', name: 'userMessage', component: () => import('@/views/user/MessageView.vue'), meta: { title: '信息' } },
        { path: 'auction',
          name: 'myAuction',
          meta: { title: '拍卖品' },
          component: () => import('@/views/user/auction/index.vue'),
        },
        { path: 'pendingPayment',
          name: 'pendingPayment',
          meta: { title: '待支付' },
          component: () => import('@/views/user/pendingPayment/index.vue'),
        },
        { path: 'paidOrders',
          name: 'paidOrders',
          meta: { title: '已支付' },
          component: () => import('@/views/user/paidOrders/index.vue'),
        },
      ],
    },
    {
      path: '/auction',
      component: () => import('@/layouts/DefaultLayout.vue'),
      children: [
        { path: ':auctionId', name: 'auction', component: () => import('@/views/auction/AuctionView.vue') },
        { path: 'auctionEvent/:auctionId', name: 'auctionEvent',
          requiresAuth: true,
          meta: {
            requiresAuth: true,
            role: 'user'
          },
          component: () => import('@/views/auction/auctionEvent/index.vue') },

      ],
    },
    {
      path: '/admin',
      component: () => import('@/layouts/AdminLayout.vue'),
      meta:{
        role: 'admin'
      },
      children: [
        { path: 'dashboard',
          name: 'dashboard',
          meta: {
            title: '主页面',
          },
          component: () => import('@/views/admin/DashboardView.vue') },
        {
          path: 'user',
          name: 'user',
          meta: {
            title: '用户管理',
          },
          component: () => import('@/views/admin/user/index.vue'),
        },
        {
          path: 'auctions',
          name: 'auctions',
          meta: {
            title: '拍卖品管理',
          },
          component: () => import('@/views/admin/auction/index.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (to.meta.requiresAuth && !userStore.isLogin) {
    ElMessage.error('请先登录')
    return next({
      path: '/user/login',
      query: { redirect: to.fullPath }
    })
  }

  if (to.meta.role) {
    if (to.meta.role === 'admin' && !userStore.isAdmin) {
      ElMessage.error('无权限访问')
      return next('/')
    }
    if (to.meta.role === 'user' && userStore.isAdmin) {
      ElMessage.error('管理员不能访问用户页面')
      return next('/admin/dashboard')
    }
  }

  next()

  // 其他情况允许访问
  next()
})


export default router
