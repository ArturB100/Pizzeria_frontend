export interface OperationResults {
    success: boolean
    errors: Error[]
  }
  
  export interface Error {
    fieldKey: string
    errorMsg: string
  }
  