const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.json());

// 在静态文件中间件之前设置 /sub 路径的响应类型为 text/plain
app.use('/sub', (req, res, next) => {
  res.type('text/plain;charset=utf-8');
  next();
});
// 设置 /sub 目录为静态文件目录
app.use('/', express.static(path.join(__dirname, '../')));

// 处理 POST 请求
app.post('/save', async(req, res) => {
  const url = req.body.url; // 从请求体中获取文本内容
  if (!url) {
    return res.status(400).send('No url provided');
  }

  const urlRes = await fetch(url)
  const content = await urlRes.text()

  const fileName = `sub`; // 根据时间戳生成文件名
  const filePath = path.join(__dirname, '../', fileName);

  // 将文本内容保存到文件
  fs.writeFile(filePath, content, (err) => {
    if (err) {
    console.log("🚀 ~ err:", err)
      return res.status(500).send('Error writing file');
    }
    // 返回文件的 URL 路径
    res.send(`File saved successfully. Access it at /sub`);
  });
});

// 启动服务器
const PORT = 25502;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});