export default {
  appKey: process.env.APP_KEY || 'a-very-long-random-secret',
  http: { cookie: {}, trustProxy: () => true },
}