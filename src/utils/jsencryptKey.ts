// @ts-ignore
import JSEncrypt from "jsencrypt";

//加密
//str 未加密字符串
export function getEncryCode(str: string) {
  //实例化JSEncrypt
  const jse = new JSEncrypt();
  //加密公钥（由服务端生成）
  const pubKey = `-----BEGIN PUBLIC KEY-----
    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCljXx8lXvdS9cxFXEvcC1m54cdU2O6yv4QNFFsfCjdn0hnwyydOfRY4oV0VB2apzG7X5FiPyxY8yj9acr43cqkH/zGSm+8CRWhRE0O197TBCj/ywnLz5KLm8745znQUVrfqWfAoC9JJjZG4ugVmEbsSQR1Bpks0USkvNWlLc1oKwIDAQAB
    -----END PUBLIC KEY-----`;

  jse.setPublicKey(pubKey);
  const data = jse.encrypt(str.toString()); // 进行加密
  return data;
}

//解密
//params 待解密字符串
export function sendEncryCode(params: any) {
  //实例化JSEncrypt
  const jse = new JSEncrypt();
  //使用前端私钥解密（私钥由服务端生成）
  const privKey = `-----BEGIN PRIVATE KEY-----
    MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAKWNfHyVe91L1zEVcS9wLWbnhx1TY7rK/hA0UWx8KN2fSGfDLJ059FjihXRUHZqnMbtfkWI/LFjzKP1pyvjdyqQf/MZKb7wJFaFETQ7X3tMEKP/LCcvPkoubzvjnOdBRWt+pZ8CgL0kmNkbi6BWYRuxJBHUGmSzRRKS81aUtzWgrAgMBAAECgYALBNHGUQS/g+68u5qe965t7PcXQpeetSgX2AObXuAxcAqXrWvowxS6XclYJskZpAsxV3kLuvyupvCRfVsfGVQFYRnsYljQ+Ip81jfHleY9TiE7Vxc3voPIZw+TuVAGs8AUhrC+cq2/z/mHYsuQxa89mXiOy5QYV0HcG6zRNcZNUQJBANMG72FTw02J4in+g0osuSQDUmFweI1XuzdQcS+Ks4mNJUSTkEJJPjSR38bXD0pc1ncNPksCCiau5PuhlSSC680CQQDI1ZdGtLg2eMST/a8FMjTZxvwnXYf6Ege+wjX4fbIY+5s+XzbbPvxnwzFy/L5lY5zhNys4x53zWN4QuxytpdvXAkBfOWDptUeLBK42ru+FmBrPQmR5Laxoc286raT1hAwyBKwNftz43F4ikLS+4Cq5Lp1kSWiTpk74V7FiTu6i9CT9AkEAtSqwJxE5J7IzqkhqzKYotNdieWRPGE+RewwYwYsp0I2P0mjzxD2CVVvoTJEgc7ezOhqZO8QegPmGgNM5oI+AywJAEoz5MYvISvhQ7R9EubUmg4acSMrTbzzHYpRJE7d1eGFjfoDDx+uACEHlN5mMp0HJwL6AzBEO47eQFuI5IGLaTg==
    -----END PRIVATE KEY-----`;

  jse.setPrivateKey(privKey);
  const data = jse.decrypt(params); //解密

  return data;
}
