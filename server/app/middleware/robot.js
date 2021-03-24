const robot = (options, app) => {
  return async function robotMiddleware(ctx, next) {
    const source = ctx.get("user-agent") || "";
    const match = options.ua.some(ua => ua.test(source));
    if (match) {
      ctx.status = 403;
      ctx.message = "走开, robot.";
    } else {
      await next();
    }
  };
};

module.exports = robot;
