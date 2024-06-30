//括号

interface Expression {
  index: number;
  field: string;
  operator: string;
  value: string;
  extra: string;
  bracket: []; //字符串数组
}

function isMySQLCondition(expression) {
  // 简化并修正后的正则表达式尝试，以匹配给定的示例
  const pattern =
    /^(?:[a-zA-Z0-9_]+(?:\s*(?:>|<|=|<>|!=|>=|<=)\s*(?:"[^"]*"|'[^']*'|[\u4e00-\u9fa5]+|\d+|NULL))\s*(?:AND|OR|NOT)?)+$/i;

  return pattern.test(expression.trim());
}


// Expression的数组类型
const ExplainConditionSql = (expressions: Expression[]) => {
  let resultStr = "";
  expressions.map((expression) => {
    let str = "";
    const { field, operator, value, extra, bracket } = expression;

    if (bracket.length == 0) {
      str = `${field} ${operator} ${value} ${extra}`;
    }
    if (bracket.length == 1) {
      str = `${bracket[0]} ${field} ${operator} ${value} ${extra}`;
    }
    if (bracket.length >= 2) {
      str = `${bracket[0]} ${field} ${operator} ${value} ${bracket[1]} ${extra}`;
    }
    resultStr += ` ${str}`;
  });
  console.log(resultStr);
  return {
    resultStr: resultStr,
    isOk: isMySQLCondition(resultStr),
  };
};

export { ExplainConditionSql };
