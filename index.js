import { Keypair } from "@solana/web3.js";

// 创建新钱包
const keypair = Keypair.generate();

console.log(keypair);

// 转换为Base58编码
console.log(`The public key is: `, keypair.publicKey.toBase58());

// 处理私钥的打印格式
console.log(`The secret key is:[${keypair.secretKey.toString()}]`);
