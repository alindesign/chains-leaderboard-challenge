interface BlockId {
  hash: string;
  parts: {
    total: number;
    hash: string;
  };
}

interface BlockHeader {
  height: string;
  version: {
    block: '11';
  };
  chain_id: string;
  time: string;
  last_block_id: BlockId;
  last_commit_hash: string;
  data_hash: string;
  validators_hash: string;
  next_validators_hash: string;
  consensus_hash: string;
  app_hash: string;
  last_results_hash: string;
  evidence_hash: string;
  proposer_address: string;
}

interface LastCommitBlock {
  height: string;
}

interface BlockData {
  txs: string[];
}

// Custom interface for Lava block
export interface Block {
  header: BlockHeader;
  data: BlockData;
  last_commit: LastCommitBlock;
  block_id: BlockId;
  block_size: string;
  num_txs: string;
}
