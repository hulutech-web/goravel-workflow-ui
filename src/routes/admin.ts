//平移组件
import Translation from '@/views/admin/Translation.vue'
export default [
    {
        path: '/admin',
        redirect: '/admin/dashboard',
        component: () => import('@/layouts/admin/index.vue'),
        children: [
            {
                name: 'admin.dashboard',
                path: 'dashboard',
                component: () => import('@/views/admin/dashboard/index.vue'),
                meta: { title: '工作台', menu: { title: '工作台', icon: 'DashboardOutlined', order: 1000 } },
                children: []
            },
           
            {
                name: 'admin.user',
                path: 'user',
                component: Translation,
                meta: {
                    auth: true,
                    title: '用户管理',
                    menu: { title: '用户管理', icon: 'ApartmentOutlined', order: 200 },
                },
                children: [
                    {
                        name: 'admin.user.index',
                        path: 'index',
                        component: () => import('@/views/admin/agent/manage.vue'),
                        meta: {
                            auth: true,
                            title: '用户管理',
                            menu: { title: '用户管理', icon: 'HomeOutlined', order: 201 },
                        },
                    },
                ],
            },
            {
                name: 'admin.dept',
                path: 'dept',
                component: Translation,
                meta: { title: '部门管理', menu: { title: '部门管理', icon: 'HddOutlined', order: 1000 } },
                children: [
                    {
                        name: 'admin.dept.index',
                        path: 'index',
                        component: () => import('@/views/admin/dept/index.vue'),
                        meta: { title: '部门管理', menu: { title: '部门管理', icon: 'HddOutlined', order: 1000 } },
                    },
                ]
            },
        ]
    },
] as RouteRecordRaw[]
