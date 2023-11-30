enum Environment {
  development = "development",
  testing = "testing",
  staging = "staging",
  production = "production",
}

enum EmailSender {
  logger = "logger",
  sendgrid = "sendgrid",
}

// const env = process.env.POLAR_ENV ?? Environment.development

// let envFile = ".env"

// if (env === Environment.testing)
//   envFile = ".env.testing"

// if (process.env.POLAR_ENV_FILE) envFile = process.env.POLAR_ENV_FILE

export function useSettings() {
  const settings = {
    ENV: Environment.development satisfies Environment,
    DEBUG: false,
    LOG_LEVEL: "DEBUG",
    TESTING: false,

    SECRET: "super secret jwt secret",
    CORS_ORIGINS: "",

    BASE_URL: "http://127.0.0.1:8000/api/v1",
    FRONTEND_BASE_URL: "http://127.0.0.1:3000",

    MAGIC_LINK_TTL_SECONDS: 60 * 30, // 30 minutes,

    EMAIL_SENDER: EmailSender.logger satisfies EmailSender,
    SENDGRID_API_KEY: "",

    SUBSCRIPTION_FEE_PERCENT: 10,
    MINIMUM_ORG_PLEDGE_AMOUNT: 2000,
  }

  return {
    settings,
  }
}
