import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoutes(): RouteRecordRaw[] {
  const localRoutes: RouteRecordRaw[] = []
  //1.1读取router/main所有的ts文件
  const files: Record<string, any> = import.meta.glob(
    '../router/main/**/*.ts',
    {
      eager: true
    }
  )
  //1.2将加载的对象放到localRoutes
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }
  return localRoutes
}

export let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]) {
  //1.加载本地路由
  const localRoutes = loadLocalRoutes()
  //2.根据菜单去匹配正确的路径
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        //1.给route的顶层菜单增加重定向功能(但是只需要添加一次即可)
        if (!routes.find((item) => item.path === submenu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        //2.将二级菜单对应的路径
        routes.push(route)
      }
      //记录第一个被匹配的菜单
      if (!firstMenu && route) firstMenu = submenu
    }
  }
  return routes
}

/**
 * @param path 要匹配的路径
 * @param userMenus 所有的菜单
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}

interface IBreadcurmbs {
  name: string
  path?: string
}

export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  const breadcrumbs: IBreadcurmbs[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        //1.顶层菜单
        breadcrumbs.push({ name: menu.name, path: menu.url })
        //2.匹配菜单
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}

/**
 *菜单映射到id列表
 * @param menulist
 */
export function mapMenuListToIds(menulist: any[]) {
  const ids: number[] = []

  function recurseGetId(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        recurseGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }
  recurseGetId(menulist)

  return ids
}

/**
 *
 * @param menuList 菜单的列表
 * @returns 权限的数组(字符串数组)
 */
export function mapMenusToPermissions(menuList: any[]) {
  const permissions: string[] = []

  function recurseGetPermission(menus: any[]) {
    for (const item of menus) {
      if (item.type === 3) {
        permissions.push(item.permission)
      } else {
        recurseGetPermission(item.children ?? [])
      }
    }
  }
  recurseGetPermission(menuList)
  return permissions
}
