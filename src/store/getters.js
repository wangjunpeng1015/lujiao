const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  permission_routes: state => state.permission.routes,
  userinfo: state => state.user.userinfo
}
export default getters
