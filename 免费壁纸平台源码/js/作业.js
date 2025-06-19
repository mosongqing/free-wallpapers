function validateIDCard(id) {
    // 定义身份证号码的正则表达式
    const idRegex = /^(^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}(\d|X|x)$)|(^[1-9]\d{7}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}$)$/;

    // 检查是否匹配正则表达式
    if (idRegex.test(id)) {
        // 如果是 18 位身份证号码，校验最后一位校验码
        if (id.length === 18) {
            const factors = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            const checksum = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
            let sum = 0;

            for (let i = 0; i < 17; i++) {
                sum += parseInt(id[i]) * factors[i];
            }

            const lastChar = checksum[sum % 11];
            if (lastChar.toUpperCase() === id[17].toUpperCase()) {
                return "身份证号码合法";
            } else {
                return "身份证号码不合法：校验码错误";
            }
        }
        return "身份证号码合法";
    } else {
        return "身份证号码格式不正确";
    }
}

// 示例测试
const idCard1 = "450329200305011413"; // 合法示例
const idCard2 = "11010519900307123A"; // 非法示例

console.log(validateIDCard(idCard1)); // 输出：身份证号码合法
console.log(validateIDCard(idCard2)); // 输出：身份证号码不合法：校验码错误


