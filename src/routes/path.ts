export interface RouteExp {
  path: string;
  re: RegExp;
  detail?: (key: string) => string;
}

interface PublicRoutesType {
  home: RouteExp;
  login: RouteExp;
  signup: RouteExp;
  findCredentialId: RouteExp;
  findCredentialPw: RouteExp;
  oauth: RouteExp;
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
  }
}

interface AuthPermissionRoutesType {
  subject: RouteExp;
  my: RouteExp;
}

export const authPermissionRoutes: AuthPermissionRoutesType = {
  subject: {
    path: '/subject',
    re: new RegExp('^/subject'),
  },
  my: {
    path: '/my',
    re: new RegExp('^/my')
  }
}

interface RoutesType extends PublicRoutesType, AuthPermissionRoutesType {};

export const routes: RoutesType = {
  ...publicRoutes,
  ...authPermissionRoutes
}
