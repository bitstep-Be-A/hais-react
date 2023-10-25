export interface RouteExp {
  path: string;
  re: RegExp;
  detail?: (key: string) => string;
}

interface AdminRoutesType {
  adminHome: RouteExp;
  adminSubject: RouteExp;
  adminMajor: RouteExp;
}

export const adminRoutes: AdminRoutesType = {
  adminHome: {
    path: '/admin',
    re: new RegExp('^/admin')
  },
  adminSubject: {
    path: '/admin/subject',
    re: new RegExp('^/admin/subject')
  },
  adminMajor: {
    path: '/admin/major',
    re: new RegExp('^/admin/major')
  }
}

interface PublicRoutesType {
  home: RouteExp;
  login: RouteExp;
  signup: RouteExp;
  findCredentialId: RouteExp;
  findCredentialPw: RouteExp;
  oauth: RouteExp;
  subjectSearch: RouteExp;
}

export const publicRoutes: PublicRoutesType = {
  home: {
    path: '/',
    re: new RegExp('^/$')
  },
  login: {
    path: '/login',
    re: new RegExp('^/login')
  },
  signup: {
    path: '/signup',
    re: new RegExp('^/signup')
  },
  findCredentialId: {
    path: '/login?find=id',
    re: new RegExp('^/login?find=id')
  },
  findCredentialPw: {
    path: '/login?find=pw',
    re: new RegExp('^/login?find=pw')
  },
  oauth: {
    path: '/oauth',
    re: new RegExp('^/oauth'),
    detail: (key: string) => `/oauth/${key.toLowerCase()}`
  },
  subjectSearch: {
    path: '/subject/search',
    re: new RegExp('^/subject/search'),
  },
}

interface AuthPermissionRoutesType {
  my: RouteExp;
  subjectRecommend: RouteExp;
}

export const authPermissionRoutes: AuthPermissionRoutesType = {
  my: {
    path: '/my',
    re: new RegExp('^/my')
  },
  subjectRecommend: {
    path: '/subject/recommend',
    re: new RegExp('^/subject/recommend'),
  }
}

interface RoutesType extends PublicRoutesType, AuthPermissionRoutesType, AdminRoutesType {};

export const routes: RoutesType = {
  ...publicRoutes,
  ...authPermissionRoutes,
  ...adminRoutes
}
