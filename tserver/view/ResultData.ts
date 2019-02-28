export interface interfaceResultData {
  errorMsg?: string
  isSuccess?: string
  list?: any[]
}

export default class ResultData {
  public resultCode: string
  public resultMsg: string
  public resultData: interfaceResultData
  constructor(
    resultCode: string,
    resultMsg: string,
    resultData: interfaceResultData
  ) {
    this.resultCode = resultCode || '0'
    this.resultMsg = resultMsg || '成功'
    this.resultData = resultData
  }
}
