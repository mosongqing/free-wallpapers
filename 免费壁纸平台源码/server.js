const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // 引入 cors 中间件

const app = express();
app.use(cors()); // 启用跨域支持

// 解析 JSON 格式的请求体
app.use(express.json());

// 连接数据库
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'mosongqng'
});

db.connect((err) => {
    if (err) {
        console.log('连接数据库失败', err);
        return;
    }
    console.log('数据库连接成功');
});

// 注册接口
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.json({ message: '用户名和密码不能为空' });
    }

    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, result) => {
        if (err) {
            return res.json({ message: '数据库查询失败' });
        }
        if (result.length > 0) {
            return res.json({ message: '用户名已存在' });
        }

        const insertQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.query(insertQuery, [username, password], (err) => {
            if (err) {
                return res.json({ message: '数据库插入失败' });
            }
            res.json({ message: '注册成功' });
        });
    });
});

// 启动服务器
app.listen(3000, () => {
    console.log('服务器正在运行，访问地址： http://localhost:3000');
});
