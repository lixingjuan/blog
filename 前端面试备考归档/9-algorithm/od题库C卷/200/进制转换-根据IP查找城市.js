/**
 * @题目描述
 * 某业务需要根据终端的IP地址获取该终端归属的城市，可以根据公开的IP地址池信息查询归属城市。
 * 地址池格式如下:
 * 城市名=起始IP,结束IP
 * 起始和结束地址按照英文逗号分隔，多个地址段采用英文分号分隔。比如:
 *
 * city1=1.1.1.1,1.1.1.2;city1=1.1.1.11,1.1.1.16;city2=3.3.3.3,4.4.4.4;city3=2.2.2.2.6.6.6.6
 *
 * 一个城市可以有多个IP段，比如City1有2个IP段。
 * 城市间也可能存在包含关系，如City3的IP段包含City2的IP段范围。
 * 现在要根据输入的IP列表，返回最佳匹配的城市列表。
 * 注:最佳匹配即包含待査询IP旦长度最小的IP段，比如例子中3.4.4.4最佳匹配是Ciy2=3.3.3.3,4.4.4.4，5.5.5.5的最佳匹配是City3=2.2.2.2.6.6.6.6
 *
 * @输入描述
 * 输入共两行
 * 第一行为城市的IP段列表，多个P段采用英文分号,分隔，P段列表最大不超过500000。城市名称只包含英文字母、数字和下划线。最多不超过10000个。P段包含关系可能有多层，但不超过100层。
 * 第二行为查询的IP列表，多个!P采用英文逗号"分隔，最多不超过10000条
 *
 * @输出描述
 * 最佳匹配的城市名列表，采用英文逗号‘,’分隔，城市列表长度应该跟查询的IP列表长度一致。
 *
 */

/**
 * @解题思路
 * 1. 解析输入的IP地址池字符串，将其转换为每个城市对应的IP范围列表的映射。
 * 2. 解析输入的查询IP字符串，将其分割成单独的IP地址。
 * 3. 对于每个查询IP地址，将其转换为长整型数值以便比较。
 * 4. 遍历每个城市的IP范围列表，检查查询IP是否落在某个范围内。
 * 5. 如果查询IP落在某个范围内，计算该范围的大小，并与当前已知的最小范围进行比较。
 * 6. 如果当前范围更小，更新最佳匹配城市和最小范围。
 * 7. 将最佳匹配城市添加到结果字符串中。
 *
 * 将IP地址转换成长整型数值(通常是64位的整数)是为了方便比较和计算。!IP地址通常以点分十进制格式呈现，如 192.168.1.1，这种格式不便于直接进行数学运算或比较。转换成长整型数值后，IP地址就变成了一个数值，可以轻松地进行比较和范围检查。
 * 例如，对于IP地址 192.168.1.1:
 * 1. 将每个十进制块转换为二进制形式: 11000808.10101080.8008001.80808801
 * 2. 将这些二进制块拼接成一个32位的二进制数:11808800181018088008080180080001
 * 3. 将这个二进制数转换为长整型数值: 3232235777
 * 这样，IP地址就可以像普通的整数一样参与计算和比较操作，使得IP范围匹配变得简单高效。
 */

function ipToLong(ip) {
  // !! 这个转换过程非常重要
  return ip.split(".").reduce((acc, cur) => (acc << 8) + parseInt(cur, 10), 0);
}

function parseIpPool(ipPool) {
  const cityIpRanges = {};
  ipPool.split(";").forEach((cityRange) => {
    const [city, range] = cityRange.split("=");
    const [startIp, endIp] = range.split(",");
    const start = ipToLong(startIp);
    const end = ipToLong(endIp);
    if (!cityIpRanges[city]) cityIpRanges[city] = [];
    cityIpRanges[city].push({ start, end });
  });
  return cityIpRanges;
}

function matchCities(ipPool, queryIPs) {
  const cityIpRanges = parseIpPool(ipPool);

  return queryIPs
    .split(",")
    .map((ip) => {
      const ipNum = ipToLong(ip);
      let bestMatchCity = "";
      let smallestRange = Number.MAX_SAFE_INTEGER;

      for (const city in cityIpRanges) {
        cityIpRanges[city].forEach((range) => {
          if (ipNum >= range.start && ipNum <= range.end) {
            const rangeSize = range.end - range.start;
            if (rangeSize < smallestRange) {
              bestMatchCity = city;
              smallestRange = rangeSize;
            }
          }
        });
      }
      return bestMatchCity;
    })
    .join(",");
}

console.log(
  matchCities(
    "City1=1.1.1.1,1.1.1.2;City1=1.1.1.11,1.1.1.16;City2=3.3.3.3,4.4.4.4;City3=2.2.2.2,6.6.6.6",
    "1.1.1.1,3.3.3.3,5.5.5.5"
  ) === "City1,City2,City3"
);

console.log(
  matchCities(
    "CityA=10.0.0.1,10.0.0.5;CityB=10.0.0.6,10.0.0.10;CityC=9.9.9.9,10.0.0.7",
    "10.0.0.4,10.0.0.9,9.9.9.9"
  ) === "CityA,CityB,CityC"
);

console.log(
  matchCities(
    "CityX=192.168.1.1,192.168.1.10;CityY=192.168.1.11,192.168.1.20;CityZ=192.168.1.5,192.168.2.5",
    "192.168.1.2,192.168.1.15,192.168.2.2"
  ) === "CityX,CityY,CityZ"
);

console.log(
  matchCities(
    "CityA=10.0.0.1,10.0.0.5;CityB=10.0.1.1,10.0.1.5;CityC=10.0.0.3,10.0.0.4",
    "10.0.0.3,10.0.1.2"
  ) === "CityC,CityB"
);

// 测试用例 1: 基本示例
console.log(
  matchCities("CityA=1.1.1.1,1.1.1.2;CityB=2.2.2.2,2.2.2.5", "1.1.1.1,2.2.2.3") === "CityA,CityB"
);

// 测试用例 2: 城市间IP段包含关系
console.log(
  matchCities("CityX=192.168.1.1,192.168.1.10;CityY=192.168.1.5,192.168.1.6", "192.168.1.5") ===
    "CityY"
);

// 测试用例 3: 查询IP不在任何城市的IP段内
console.log(matchCities("City1=10.10.10.1,10.10.10.5", "10.10.10.6") === "");
