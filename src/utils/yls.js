import md5 from "js-md5";


/*
 * 随机生成32位随机数
 */
function uuid2() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 32; i++) {
  s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23];
  var uuid = s.join("");
  return uuid;
}

/*
 * 生成签名，用于yls产码
 */
export function createSign ({appid, money, body, appsecret, out_trade_no, version, nonce_str, return_url}) {
  let pars = [
    `appid=${appid}`,
    `total_amount=${money}`,
    `body=${body}`,
    `out_trade_no=${out_trade_no}`,
    `version=${version}`,
    `return_url=${return_url}`,
    `nonce_str=${nonce_str}`
  ]
  let p = pars.sort().join("&")
  let signTemp = p + `&appsecret=${appsecret}`
  let sign = md5(signTemp).toUpperCase()
  return signTemp
}

/*
 * yls产参数
 */
export function createQrpayParam ({appid, appsecret, money, body="消费", out_trade_no, version="V1.0", return_url=""}) {
  return {
    appid,
    sign: createSign({
      appid,
      money,
      body,
      appsecret
    }),
    total_amount: money,
    body,
    nonce_str: uuid2()
    out_trade_no: '',
    version,
    return_url
  }
}