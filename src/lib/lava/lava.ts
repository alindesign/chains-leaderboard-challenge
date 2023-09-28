import { LavaSDK } from '@lavanet/lava-sdk';
import { Block } from './block';
import { JsonRpcResponse } from './json-rpc-response';

export class Lava {
  private static _instance: Lava;
  private _sdk!: Promise<LavaSDK>;

  /**
   * Singleton instance of Lava
   */
  static get instance(): Lava {
    if (!Lava._instance) {
      Lava._instance = new Lava();
    }

    return Lava._instance;
  }

  /**
   * Get the Lava SDK, creating it if it doesn't exist
   * @protected
   */
  protected getSdk(): Promise<LavaSDK> {
    if (!this._sdk) {
      if (!process.env.LAVA_SDK_PROJECT_ID) {
        throw new Error('LAVA_SDK_PROJECT_ID is not set');
      }

      this._sdk = LavaSDK.create({
        badge: {
          badgeServerAddress: 'https://badges.lavanet.xyz',
          projectId: process.env.LAVA_SDK_PROJECT_ID,
        },
        chainID: 'LAV1',
        rpcInterface: 'tendermintrpc',
        geolocation: '2',
      });
    }

    return this._sdk;
  }

  /**
   * A helper function to convert the results from the Lava SDK to JSON
   * @param results
   * @protected
   */
  protected toJson<T>(results: any): T {
    if (typeof results === 'string') {
      return JSON.parse(results);
    }

    return results;
  }

  /**
   * Get a block by height
   * Picked from:
   * - https://github.com/lavanet/lava/blob/cd05dbd29b01bc8c3fc399adb1fe21e4c8d4e6b7/ecosystem/lava-sdk/examples/tendermintRPC.ts#L45
   * - https://docs.tendermint.com/v0.34/rpc/#/Info/block
   * @param height
   */
  public async getBlock(height: number | string): Promise<Block> {
    const sdk = await this.getSdk();
    const results = await sdk.sendRelay({
      method: 'block',
      params: [height],
    });

    const { result } = this.toJson<JsonRpcResponse<{ block: Block }>>(results);

    return result.block;
  }

  /**
   * Get the latest block
   * Picked from:
   * - https://github.com/lavanet/lava/blob/cd05dbd29b01bc8c3fc399adb1fe21e4c8d4e6b7/ecosystem/lava-sdk/examples/tendermintRPC.ts#L34
   * - https://docs.tendermint.com/v0.34/rpc/#/ABCI/abci_info
   */
  public async getLatestBlock(): Promise<Block> {
    const sdk = await this.getSdk();
    const info = await sdk.sendRelay({
      method: 'abci_info',
      params: [],
    });

    const parsedInfo = this.toJson<any>(info)?.result?.response;
    const latestBlockNumber = parsedInfo?.last_block_height;

    return this.getBlock(latestBlockNumber);
  }

  /**
   * Get the latest block height
   * Picked the method from https://docs.tendermint.com/v0.34/rpc/#/Info/blockchain
   * @param maxHeight
   * @param minHeight
   */
  public async fetchBlocks(
    maxHeight: string | number,
    minHeight: string | number,
  ): Promise<Block[]> {
    const sdk = await this.getSdk();
    const results = await sdk.sendRelay({
      method: 'blockchain',
      params: [String(minHeight), String(maxHeight)],
    });

    const data =
      this.toJson<JsonRpcResponse<{ block_metas: Block[] }>>(results);

    return data.result.block_metas;
  }
}
