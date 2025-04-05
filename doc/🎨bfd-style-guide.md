BFD Style Guide (v0.1)

Formatting

Use 2-space indentation

Prefer inline HTML style

Keep route files short — one page per route

Naming

Use short, lowercase variable names: email, msg, user

Tables: use singular names: user, task, message

Avoid camelCase — prefer snake_case or flat names

Data Flow

Always define data: block before html:

Use :varname for embedding inside strings

Do not use logic or conditions in the UI layer (no if, for in html:)

Best Practices

Separate logic into server: and display into route:

Store only meaningful state in db: or data:

Keep one .bfd file per app for MVPs; split later if needed