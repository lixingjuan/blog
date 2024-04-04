/**
 * @题目描述
 * 某个开源社区Q希望将最近热度比较高的开源项目出一个榜单，推荐给社区里面的开发者。
 * 对于每个开源项目，开发者可以进行关注(watch)、收藏(star)、fork、提issue、提交合并请求(MR)等。
 * 数据库里面统计了每个开源项目关注、收藏、fork、issue、MR的数量，开源项目的热度,根据这5个维度的加权求和进行排序。
 * H= (Wwatch * #watchQ )+ (Wstar * #star) + (Wfork * #fork)+ (Wissue * #issue)+ (Wmr * #mr)H表示热度值
 * Wwatch、Wstar、Wfork、Wissue、Wmr, 分别表示5个统计维度的权重。
 * #watch、#star、#fork、#issue、#mr, 分别表示5个统计维度的统计值。
 * 榜单按照热度值降序排序，对于热度值相等的，按照项目名字转换为全小写字母后的字典序排序('a,'b',c…,'x,y,Z)。
 *
 * @输入描述
 * 第一行输入为N，表示开源项目的个数，0<N<100
 * 第二行输入为权重值列表，一共5个整型值，分别对应关注、收藏、fork、issue、MR的权重，权重取值0<W≤50.
 * 第三行开始接下来的 N 行为开源项目的统计维度，每一行的格式为:
 * name nr_watch nr_start nr_fork nr_issue nr_mi
 * 其中 name 为开源项目的名字，由英文字母组成，长度<50，其余5个整型值分别为该开源项目关注、收藏、fork、issue、MR的数量数量取值 0<nr≤ 1000。
 *
 * @输出描述
 * 按照热度降序，输出开源项目的名字，对于热度值相等的，按照项目名字转换为全小写后的字典序排序(a'>'$'>℃'>.>x>y>Z)。
 */

const demo = (arr, weightMap) => {
  // 计算每个项目的H
  const formatted = arr.map((it) => ({
    ...it,
    sumH: it.otherItems.reduce(
      (pre, { propertyName, value }) => (pre += weightMap.get(propertyName) * value),
      0
    ),
  }));

  return formatted
    .sort((a, b) => {
      const heatDiff = b.sumH - a.sumH; // 首先根据热度值排序
      if (heatDiff === 0) {
        // 如果热度相同，则根据项目名的字典序排序
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      }
      return heatDiff;
    })
    .map((it) => it.name);
};

console.log(
  demo(
    [
      {
        name: "project1",
        otherItems: [
          {
            propertyName: "Wwatch",
            value: 1,
          },
          {
            propertyName: "Wstar",
            value: 8,
          },
          {
            propertyName: "Wfork",
            value: 15,
          },
          {
            propertyName: "Wissue",
            value: 10,
          },
          {
            propertyName: "Wmr",
            value: 10,
          },
        ],
      },
      {
        name: "project2",
        otherItems: [
          {
            propertyName: "Wwatch",
            value: 1,
          },
          {
            propertyName: "Wstar",
            value: 8,
          },
          {
            propertyName: "Wfork",
            value: 15,
          },
          {
            propertyName: "Wissue",
            value: 10,
          },
          {
            propertyName: "Wmr",
            value: 10,
          },
        ],
      },
    ],
    new Map([
      ["Wwatch", 10],
      ["Wstar", 10],
      ["Wfork", 10],
      ["Wissue", 10],
      ["Wmr", 10],
    ])
  )
);
