// 依次引入三个库
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import base58 from "bs58";
import "dotenv/config";

// 读取 .env 文件中的私钥字符串
const userKeypair = Keypair.fromSecretKey(
  base58.decode(process.env.SECRET_KEY)
);

// 连接到 Devnet
const devConnection = new Connection(
  "https://devnet.helius-rpc.com/?api-key=9fc1bee2-a8b0-4ed5-93f6-a0dfc850013c"
);

// 我的地址
const add = userKeypair.publicKey.toBase58();
const userAdd = new PublicKey(add);

// 接收方地址
const toAdd = new PublicKey("8RJVj9JuLnhirYo2bpXJdWogLXuETD4JRi6KD7L1GFpC");

// 获取账户余额
let myBalance = await devConnection.getBalance(userAdd);
let toAddBalance = await devConnection.getBalance(toAdd);

// 转化成 SOL 数量
let balanceInSol = myBalance / LAMPORTS_PER_SOL;
let toAddBalanceInSol = toAddBalance / LAMPORTS_PER_SOL;

console.log(`发送方 ${userAdd} -- 余额 ${balanceInSol} SOL`);
console.log(`接收方 ${toAdd} -- 余额 ${toAddBalanceInSol} SOL`);

// 创建交易
const transaction = new Transaction();

const sendSolInstruction = SystemProgram.transfer({
  fromPubkey: userAdd,
  toPubkey: toAdd,
  lamports: 50000000, // 0.05 SOL
});

transaction.add(sendSolInstruction);

let signature = await sendAndConfirmTransaction(devConnection, transaction, [
  userKeypair,
]);

console.log(`成功发送`);

// 获取账户余额，confirmed参数，表示获取的状态是已被确定的、更新后的
myBalance = await devConnection.getBalance(userAdd, "confirmed");
toAddBalance = await devConnection.getBalance(toAdd, "confirmed");

// 转化成 SOL 数量
balanceInSol = myBalance / LAMPORTS_PER_SOL;
toAddBalanceInSol = toAddBalance / LAMPORTS_PER_SOL;

console.log(`发送方 ${userAdd} -- 余额更新为 ${balanceInSol} SOL`);
console.log(`接收方 ${toAdd} -- 余额更新为 ${toAddBalanceInSol} SOL`);
