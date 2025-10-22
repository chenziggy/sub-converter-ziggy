编译部署
```shell
docker build -t sub-converter-ziggy:latest .
docker run -d -p 25502:25502 --restart always --name sub-converter-ziggy sub-converter-ziggy:latest
```