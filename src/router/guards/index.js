import { createPermissionGuard } from './permission'

export function setupRouterGuard(router) {
  createPermissionGuard(router)
}
