// 依次引入三个库
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import base58 from "bs58";
import "dotenv/config";

// 读取 .env 文件中的私钥字符串
const userKeypair = Keypair.fromSecretKey(
  base58.decode(process.env.SECRET_KEY)
);
// console.log(userKeypair)

// 连接到 Devnet https://dev.helius.xyz/rpcs/my
// solana 节点非常贵，所以需要购买，免费的节点一般都很慢
const devConnection = new Connection(
  "https://devnet.helius-rpc.com/?api-key=9fc1bee2-a8b0-4ed5-93f6-a0dfc850013c"
);

// 我的地址
const add = userKeypair.publicKey.toBase58();
const userAdd = new PublicKey(add);

// 获取账户余额
const balance = await devConnection.getBalance(userAdd);

// 转化成 SOL 数量 SOL是 Solana 公链原生令牌的名称。每个 SOL 由 10 亿个Lamports组成
const balanceInSol = balance / LAMPORTS_PER_SOL;

console.log(`用户 ${userAdd} -- 余额 ${balanceInSol} SOL`);
