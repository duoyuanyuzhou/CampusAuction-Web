declare namespace API {
  type ApiResponse = {
    code?: number
    message?: string
    data?: any
  }

  type ApiResponseBidRecord = {
    code?: number
    message?: string
    data?: BidRecord
  }

  type ApiResponseIPageUser = {
    code?: number
    message?: string
    data?: IPageUser
  }

  type ApiResponseListBidRecord = {
    code?: number
    message?: string
    data?: BidRecord[]
  }

  type ApiResponsePageBidRecord = {
    code?: number
    message?: string
    data?: PageBidRecord
  }

  type ApiResponseUser = {
    code?: number
    message?: string
    data?: User
  }

  type AuctionItem = {
    id?: number
    userId?: number
    title?: string
    description?: string
    startPrice?: number
    currentPrice?: number
    stepPrice?: number
    startTime?: string
    endTime?: string
    status?: number
    auditComment?: string
    coverImage?: string
    createTime?: string
    updateTime?: string
    delFlag?: number
    version?: number
  }

  type BidRecord = {
    id?: number
    itemId?: number
    userId?: number
    bidPrice?: number
    bidTime?: string
    isWin?: number
    createTime?: string
    updateTime?: string
    delFlag?: number
  }

  type deleteAuctionItemParams = {
    id: number
  }

  type deleteUserParams = {
    id: string
  }

  type getAuctionItemParams = {
    id: number
  }

  type getBidRecordsParams = {
    id?: number
    itemId?: number
    userId?: number
    bidPrice?: number
    bidTime?: string
    isWin?: number
    createTime?: string
    updateTime?: string
    delFlag?: number
  }

  type getPage1Params = {
    records?: any[]
    total?: number
    size?: number
    current?: number
    id?: number
    itemId?: number
    userId?: number
    bidPrice?: number
    bidTime?: string
    isWin?: number
    createTime?: string
    updateTime?: string
    delFlag?: number
  }

  type getPageByAdminParams = {
    page: number
    size: number
    id?: number
    userId?: number
    title?: string
    description?: string
    startPrice?: number
    currentPrice?: number
    stepPrice?: number
    startTime?: string
    endTime?: string
    status?: number
    auditComment?: string
    coverImage?: string
    createTime?: string
    updateTime?: string
    delFlag?: number
    version?: number
  }

  type getPageByUserParams = {
    page: number
    size: number
    id?: number
    userId?: number
    title?: string
    description?: string
    startPrice?: number
    currentPrice?: number
    stepPrice?: number
    startTime?: string
    endTime?: string
    status?: number
    auditComment?: string
    coverImage?: string
    createTime?: string
    updateTime?: string
    delFlag?: number
    version?: number
  }

  type getPageParams = {
    page: number
    size: number
    id?: number
    userId?: number
    title?: string
    description?: string
    startPrice?: number
    currentPrice?: number
    stepPrice?: number
    startTime?: string
    endTime?: string
    status?: number
    auditComment?: string
    coverImage?: string
    createTime?: string
    updateTime?: string
    delFlag?: number
    version?: number
  }

  type getUserListParams = {
    records?: any[]
    total?: number
    size?: number
    current?: number
    id?: number
    username?: string
    nickname?: string
    schoolId?: string
    role?: number
    status?: number
  }

  type getUserParams = {
    id: string
  }

  type IPageUser = {
    size?: number
    records?: User[]
    current?: number
    pages?: number
    total?: number
  }

  type OrderItem = {
    column?: string
    asc?: boolean
  }

  type PageBidRecord = {
    records?: BidRecord[]
    total?: number
    size?: number
    current?: number
    orders?: OrderItem[]
    optimizeCountSql?: any
    searchCount?: any
    optimizeJoinOfCountSql?: boolean
    maxLimit?: number
    countId?: string
    pages?: number
  }

  type SseEmitter = {
    timeout?: number
  }

  type updateAuctionItemParams = {
    id: number
  }

  type User = {
    id?: number
    username?: string
    password?: string
    nickname?: string
    schoolId?: string
    role?: number
    avatar?: string
    status?: number
    createTime?: string
    updateTime?: string
    delFlag?: number
  }
}
