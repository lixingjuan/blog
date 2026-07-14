/**
 * @题目描述
 * 小明来到某学校当老师，需要将学生按考试总分或单科分数进行排名，你能帮帮他吗?
 * @输入描述
 * 第1行输入两个整数，学生人数n和科目数量m。0<n<100,0<m<10
 *
 * 第2行输入m个科目名称，彼此之间用空格隔开。科目名称只由英文字母构成，单个长度不超过10个字符。科目的出现顺序和后续输入的学生成绩一一对应。不会出现重复的科目名称。
 *
 * 第3行开始的n行，每行包含一个学生的姓名和该生m个科目的成绩(空格隔开)，学生不会重名。学生姓名只由英文字母构成，长度不超过10个字符。成绩是0~100的整数，依次对应第2行中输入的科目。
 *
 * 第n+2行，输入用作排名的科目名称。若科目不存在，则按总分进行排序。
 *
 * @输出描述
 * 输出一行，按成绩排序后的学生名字，空格隔开。成绩相同的按照学生姓名字典顺序排序。
 *
 * @示例1
 * 输入：
 * 3 2
 * yuwen shuxue
 * fangfang 95 90
 * xiaohua 88 95
 * minmin 100 82
 * shuxue
 *
 * 输出：
 * xiaohua fangfang minmin
 *
 * 说明：
 * 按shuxue成绩排名，依次是xiaohua、fangfang、minmin
 */

/**
 * 考察重要：
 * 1.字母比较方法：a.localeCompare(b)
 * 2.数据组装方式
 */

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lineCount = 0;
let studentNum = 0; // 学生人数
let subjectNum = 0; // 科目数量
let subjects = []; // 科目名称数组
let students = []; // 学生信息数组

rl.on("line", function (line) {
  lineCount++;

  if (lineCount === 1) {
    // 1. 获取学生数量 和 科目数量
    const [studentStr, subjectStr] = line.split(" ");
    studentNum = Number(studentStr);
    subjectNum = Number(subjectStr);
  } else if (lineCount === 2) {
    // 2. 获取科目数组
    subjects = line.split(" ");
  } else if (lineCount <= studentNum + 2) {
    // 3. 构造学生成绩信息数组

    const [name, ...scores] = line.split(" ");
    const scoreObj = subjects.reduce((pre, cur, index) => {
      // 确保成绩被转换为数字
      pre[cur] = Number(scores[index]);
      return pre;
    }, {});

    // 各科目的成绩组装为一个对象
    students.push({
      name,
      ...scoreObj,
      total: scores.reduce((pre, cur) => (pre += Number(cur)), 0),
    });
  } else {
    // 4. 最后一次输入，获取要排名的科目
    const targetSubject = line;
    // 判断科目是否存在
    const hadTargetSubject = subjects.includes(targetSubject);

    students.sort((a, b) => {
      // 如果科目不存在，按照总分进行排序
      if (hadTargetSubject) {
        return b[targetSubject] - a[targetSubject] || b.name.localeCompare(a.name);
      } else {
        return b.total - a.total || b.name.localeCompare(a.name);
      }
    });

    console.log(students.map((it) => it.name).join(" "));
    rl.close();
  }
});
