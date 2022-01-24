from mcstatus import MinecraftServer
from mcstatus import MinecraftBedrockServer
from qqwry import QQwry
import re
import json
from enum import Enum, unique
import flask
from flask import request, abort
from flask_cors import *
from werkzeug.exceptions import BadRequestKeyError
from gevent import pywsgi

server = flask.Flask(__name__)
server.config['JSON_AS_ASCII'] = False
CORS(server, supports_credentials=True)

wry = QQwry()
wry.load_file('ip.dat')


@unique
class MinecraftMethod(Enum):
    """
    枚举类型，便于判断检测的Minecraft版本，同时减少内存消耗
    """
    JavaMinecraft = 0
    BedrockMinecraft = 1


class UserServer(object):
    """
    封装结果为对象，用于回传JSON对象到前台
    """

    def __init__(self, version, description, players):
        """
        对象工作方法，方便分装对象
        :param version: 游戏版本
        :param description: 游戏描述
        :param players: 当前玩家和最大玩家比
        """
        self.version = version
        self.description = description
        self.players = players


def check_server(server_ip, method):
    """
    检测服务器是否存在和接收响应
    :param server_ip: 游戏服务器IP或域名
    :param method: 工作模式
    :return: 连接记录以及数据
    """
    if method == MinecraftMethod.JavaMinecraft:
        server_ip = MinecraftServer.lookup(server_ip)
    else:
        if re.search(r":", server_ip) is None:
            server_ip = server_ip + ":19132"
        server_ip = MinecraftBedrockServer.lookup(server_ip)
    try:
        status = server_ip.status()
    except Exception as e:
        # 连接失败，捕捉异常，并返回状态码：0
        print(e.__dict__)
        return 0
    return status


def get_server_info(status, method):
    """
    获取服务器详情信息（解析status）
    :param status: 连接记录以及数据
    :param method: 工作模式
    :return: 返回结果对象
    """
    if method == MinecraftMethod.JavaMinecraft:
        server_response = UserServer(status.version.name, status.description,
                                     str(status.players.online) + "/" + str(status.players.max))
    else:
        server_response = UserServer(status.version.version, status.motd,
                                     str(status.players_online) + "/" + str(status.players_max))
    return server_response


@server.route("/MC_Status", methods=['GET', 'POST'])
def get_detail():
    """
    接收浏览器请求
    :return: JSON对象
    """
    server_ip = request.values['serverIP']
    try:
        server_method = request.values['method']
        if server_method == '0' or server_method == 0:
            server_method = MinecraftMethod.JavaMinecraft
        else:
            server_method = MinecraftMethod.BedrockMinecraft
    except BadRequestKeyError:
        # 如果没定义工作模式，则默认检测Java版本
        server_method = MinecraftMethod.JavaMinecraft
    user_server = check_server(server_ip, server_method)
    if user_server == 0:
        return json.dumps(UserServer("操作失败", "操作失败", "操作失败").__dict__),202
    else:
        server_info = get_server_info(user_server, server_method)
    return json.dumps(server_info.__dict__), 200


@server.route("/IP_Details", methods=['post'])
def location():
    try:
        res = request
        ip = request.values['ip']
        info = wry.lookup(ip)
        res = {'ip': ip, 'city': info[0], 'isp': info[1]}
        print(res)
    except Exception as e:
        abort(404)
        return "找不到了嗷"
    return json.dumps(res)


if __name__ == '__main__':
    """
    启动服务器
    """
    print("服务器已经开始运行了嗷(*≧ω≦)～～")
    # Debug模式
    # server.run("127.0.0.1", 8099, debug=True)
    # 发行版本
    pywsgi.WSGIServer(('0.0.0.0', 8099), server).serve_forever()


