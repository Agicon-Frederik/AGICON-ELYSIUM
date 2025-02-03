interface Env {
  (key: string, defaultValue?: any): any;
  int(key: string, defaultValue?: number): number;
  bool(key: string, defaultValue?: boolean): boolean;
}

// You can also define an interface for your plugin configuration.
interface PluginsConfig {
  email: {
    config: {
      provider: string;
      providerOptions: {
        host: string;
        port: number;
        secure: boolean;
        auth: {
          user: string;
          pass: string;
        };
        // Include any additional providerOptions if needed.
      };
      settings: {
        defaultFrom: string;
        defaultReplyTo: string;
      };
    };
  };
}

// Export the configuration using the default export.
// The parameter is destructured to obtain the "env" function.
export default ({ env }: { env: Env }): PluginsConfig => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST"),
        port: env.int("SMTP_PORT"),
        secure: env.bool("SMTP_SECURE"),
        auth: {
          user: env("SMTP_USERNAME"),
          pass: env("SMTP_PASSWORD"),
        },
      },
      settings: {
        defaultFrom: env("DEFAULT_FROM_EMAIL"), // Your default "from" email
        defaultReplyTo: env("DEFAULT_REPLY_TO_EMAIL"), // Your default "reply-to" email
      },
    },
  },
});
