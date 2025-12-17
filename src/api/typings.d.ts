declare namespace API {
  type ApiResponse = {
    code?: number
    message?: string
    data?: any
  }

  type ApiResponseAuctionItem = {
    code?: number
    message?: string
    data?: AuctionItem
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

  type ApiResponseOrderInfoVo = {
    code?: number
    message?: string
    data?: OrderInfoVo
  }

  type ApiResponsePageBidRecord = {
    code?: number
    message?: string
    data?: PageBidRecord
  }

  type ApiResponsePageOrderInfoVo = {
    code?: number
    message?: string
    data?: PageOrderInfoVo
  }

  type ApiResponsePageUserMessage = {
    code?: number
    message?: string
    data?: PageUserMessage
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

  type getInProgressAuctionItemParams = {
    id: number
  }

  type getOrderInfoVoPageParams = {
    records?: any[]
    total?: number
    size?: number
    current?: number
    id?: number
    itemId?: number
    buyerId?: number
    sellerId?: number
    finalPrice?: number
    status?: number
    createTime?: string
    payTime?: string
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

  type getUserMessagePageParams = {
    records?: any[]
    total?: number
    size?: number
    current?: number
    id?: number
    userId?: number
    type?: number
    content?: string
    isRead?: number
    createTime?: string
    updateTime?: string
    delFlag?: number
    title?: string
  }

  type IPageUser = {
    size?: number
    current?: number
    records?: User[]
    total?: number
    pages?: number
  }

  type OrderInfoVo = {
    id?: number
    itemId?: number
    buyerId?: number
    sellerId?: number
    finalPrice?: number
    status?: number
    createTime?: string
    payTime?: string
    updateTime?: string
    delFlag?: number
    itemName?: string
    sellerUserName?: string
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

  type PageOrderInfoVo = {
    records?: OrderInfoVo[]
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

  type PageUserMessage = {
    records?: UserMessage[]
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

  type payOrderParams = {
    orderId: number
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

  type UserMessage = {
    id?: number
    userId?: number
    type?: number
    content?: string
    isRead?: number
    createTime?: string
    updateTime?: string
    delFlag?: number
    title?: string
  }
}
