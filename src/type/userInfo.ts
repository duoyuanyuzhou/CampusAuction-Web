export interface UserInfo {
  /** 用户ID */
  id: number

  /** 登录名 */
  username: string

  /** 密码（加密） */
  password: string

  /** 昵称 */
  nickname: string

  /** 学号（可选） */
  schoolId?: string | null

  /** 1 = 学生, 2 = 管理员 */
  role: number

  /** 头像 */
  avatar?: string | null

  /** 0 = 正常, 1 = 禁用 */
  status: number

  /** 创建时间 */
  createTime: string // 后端一般返回 string 格式时间

  /** 更新时间 */
  updateTime: string

  /** 删除标记(0 默认, 1 删除) */
  delFlag: number
}
