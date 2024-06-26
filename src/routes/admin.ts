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
                    title: '人员管理',
                    menu: { title: '人员管理', icon: 'ApartmentOutlined', order: 200 },
                },
                children: [
                    {
                        name: 'admin.user.index',
                        path: 'index',
                        component: () => import('@/views/admin/user/index.vue'),
                        meta: {
                            auth: true,
                            title: '用户管理',
                            menu: { title: '用户管理', icon: 'HomeOutlined', order: 201 },
                        },
                    },
                    {
                        name: 'admin.emp.index',
                        path: 'emp',
                        component: () => import('@/views/admin/emp/index.vue'),
                        meta: {
                            auth: true,
                            title: '员工管理',
                            menu: { title: '员工管理', icon: 'HomeOutlined', order: 201 },
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
            {
                name: 'admin.flow',
                path: 'flow',
                component: Translation,
                meta: { title: '流程管理', menu: { title: '流程管理', icon: 'HddOutlined', order: 1000 } },
                children: [
                    {
                        name: 'admin.flow.index',
                        path: 'index',
                        component: () => import('@/views/admin/flow/index.vue'),
                        meta: { title: '流程管理', menu: { title: '流程管理', icon: 'HddOutlined', order: 1000 } },
                    },
                    {
                        name: 'admin.flow.design',
                        path: ':id/design',
                        component: () => import('@/views/admin/flow/design.vue'),
                        meta: { title: '流程设计', menu: { title: '流程设计', icon: 'HddOutlined', order: 1000, show: false } },
                    },

                ]
            },
            {
                name: 'admin.template',
                path: 'template',
                component: Translation,
                meta: { title: '模板管理', menu: { title: '模板管理', icon: 'HddOutlined', order: 1000 } },
                children: [
                    {
                        name: 'admin.template.index',
                        path: 'index',
                        component: () => import('@/views/admin/template/index.vue'),
                        meta: { title: '模板管理', menu: { title: '模板管理', icon: 'HddOutlined', order: 1000 } },
                    },
                    {
                        name: 'admin.template_form.index',
                        path: ':id/template_form',
                        component: () => import('@/views/admin/template_form/index.vue'),
                        meta: { title: '表单控件', menu: { title: '表单控件', icon: 'HddOutlined', order: 1000, show: false } },
                    },
                ]
            },
        ]
    },
] as RouteRecordRaw[]
