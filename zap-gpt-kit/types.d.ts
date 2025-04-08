// types.d.ts

export type ZapApp = {
    auth?: {
      provider: "email" | "github";
      roles?: string[];
    };
    db: {
      [table: string]: {
        [field: string]: string;
      };
    };
    api: {
      [endpoint: string]: {
        method: "GET" | "POST" | "PUT" | "DELETE";
        path: string;
        public?: boolean;
        handler: string; // function body as string or actual function
      };
    };
    events?: {
      [name: string]: {
        trigger: string; // e.g., "cron.daily", "auth.signup"
        handler: string;
      };
    };
  };
  
  export declare function defineApp(app: ZapApp): ZapApp;