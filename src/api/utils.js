export const getCount = (count) => {

  if (count < 0) return;
  if (count < 10000) {
    return count;
  } else if (Math.floor(count/1000) < 10000) {
   return Math.floor(count/1000) + '万'
  }  else  {
    return Math.floor (count / 10000000)/ 10 + "亿";
  }
}


// get接口后面的参数处理 /api?a=a&id=12
export const param = (data) => {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}
