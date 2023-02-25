// Hack to get the protocol and host from headers
//
// https://github.com/vercel/next.js/discussions/44527
//
// production:  https://scribblediffusion.com
// staging:     https://branch-foo.vercel.app
// dev:         http://localhost:3000

export default function getAppHost(req) {
  const protocol = req.headers.referer?.split("://")[0] || "http";
  const appHost = `${protocol}://${req.headers.host}`;
  return appHost;
}
