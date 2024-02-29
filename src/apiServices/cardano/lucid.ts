import { Blockfrost, Lucid } from "lucid-cardano";

const BLOCKFROST_API_KEY = "previewrgw8sG7JRnGN4N1MAXSe8pcm8da7KjVq";
const lucid = await Lucid.new(
    new Blockfrost(
        "https://cardano-preview.blockfrost.io/api/v0",
        BLOCKFROST_API_KEY,
    ),
    "Preview",
);
export {lucid}
  
