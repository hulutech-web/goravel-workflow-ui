### 新能源电池监控系统
### 1. 项目介绍
1. 项目名称：新能源电池监控系统HEVBms
2. 项目描述：基于STM32F103C8T6芯片，使用C语言编写，实现对锂电池的电压、电流、温度、SOC等参数的监控和显示，并能够对锂电池进行充电和放电操作。
3. 项目功能：
- 实时显示锂电池的电压、电流、温度、SOC等参数
- 支持锂电池的充电和放电操作
- 支持锂电池的故障检测和报警
### 2. 技术方案
1. 后端: 支持TCP连接，支持MQTT连接方式
2. 管理后台: 支持Web页面展示，考虑使用websocket主推方式
3. 客户端: 微信小程序，蓝牙支持蓝牙连接设备并读取参数
4. 硬件: 锂电池电压、电流、温度、SOC等参数采集，支持充电和放电操作
