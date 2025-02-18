import contextlib
import os
import pathlib
import sys
from socket import socket
from types import ModuleType

project_root = pathlib.Path(__file__).resolve().parents[2]

for path in sys.path:
    if path.startswith(str(project_root)) or isinstance(path, ModuleType):
        sys.path.remove(path)  # noqa
sys.modules.pop("http")
sys.modules.pop("http.server")

import http.server
from http.server import ThreadingHTTPServer, test
import socketserver

Handler = http.server.SimpleHTTPRequestHandler  # noqa


class NoCacheHandler(Handler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        print("No cache")
        Handler.end_headers(self)


PORT = 8000

if len(sys.argv) > 1:
    PORT = int(sys.argv[1])

if __name__ == '__main__':
    class DualStackServer(ThreadingHTTPServer):

        def server_bind(self):
            # suppress exception when protocol is IPv4
            with contextlib.suppress(Exception):
                self.socket.setsockopt(
                    socket.IPPROTO_IPV6, socket.IPV6_V6ONLY, 0)
            return super().server_bind()

        def finish_request(self, request, client_address):
            self.RequestHandlerClass(request, client_address, self,
                                     directory=os.getcwd())


    test(
        HandlerClass=NoCacheHandler,
        ServerClass=DualStackServer,
        port=PORT,
        bind="0.0.0.0",
    )
