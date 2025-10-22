const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

// 设置 /sub 目录为静态文件目录
app.use('/sub', express.static(path.join(__dirname, 'sub')));

// 处理 POST 请求
app.post('/save-text', (req, res) => {
  const content = req.body.content; // 从请求体中获取文本内容
  if (!content) {
    return res.status(400).send('No content provided');
  }

  const fileName = `file-${Date.now()}.txt`; // 根据时间戳生成文件名
  const filePath = path.join(__dirname, 'sub', fileName);

  // 将文本内容保存到文件
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      return res.status(500).send('Error writing file');
    }
    // 返回文件的 URL 路径
    res.send(`File saved successfully. Access it at /sub/${fileName}`);
  });
});

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});