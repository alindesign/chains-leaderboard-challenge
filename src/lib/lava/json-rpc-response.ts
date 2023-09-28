export interface JsonRpcResponse<T> {
  jsonrpc: string;
  id: string;
  result: T;
}
