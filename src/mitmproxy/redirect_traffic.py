import mitmproxy
def request(flow):

    if flow.request.pretty_host.endswith("2144.playfabapi.com"):
            mitmproxy.ctx.log(flow.request.path)
            flow.request.host = "127.0.0.1"
            flow.request.port = 3000
            flow.request.scheme = 'http'
            flow.request.headers["Host"] = "127.0.0.1"