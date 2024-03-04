import { Blockfrost, Lucid } from 'lucid-cardano';

const BLOCKFROST_API_KEY = 'previewrgw8sG7JRnGN4N1MAXSe8pcm8da7KjVq';

export async function connectLucid() {
  const blockfrost = new Blockfrost(
    'https://cardano-preview.blockfrost.io/api/v0',
    BLOCKFROST_API_KEY
  );
  const lucidInstance = await Lucid.new(blockfrost, 'Preview');
  return lucidInstance;
}