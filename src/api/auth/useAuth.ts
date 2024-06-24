import { http } from '@/plugins/axios';
import router from '@/plugins/router'
const storage = useStorage()
export default () => {
    const login = async (data) => {
        return await http.request({
            url: "auth/login",
            method: "post",
            data: data
        }).then(res => {
            const { token,user } = res.data
            storage.set(CacheEnum.TOKEN_NAME, token)
            storage.set(CacheEnum.USER, JSON.stringify(user))
            const route = router.resolve({ name: RouteEnum.ADMIN })
            location.href = "/#/admin/dashboard"
        })
    }

    //登录检测
    function isLogin(): boolean {
        return useStorage().get(CacheEnum.TOKEN_NAME)
    }
    return {
        login,
        isLogin
    }
}

