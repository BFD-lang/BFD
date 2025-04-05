📘 bfd-spec.md

BFD DSL Specification (v0.1)

Core Sections

route <path> do

Defines a web page route and its structure. Should contain:

data:: define variables for the page (optional)

html:: simplified HTML-like markup

Example:

route "/" do
  data:
    greeting: "Hello :name"

  html:
    h1 greeting
    form @submit="/api/login":
      input name="email"
      button "Login"

server:

Defines HTTP endpoints. Each method (post, get, etc) maps to a path.
Use body, query, params, and return json() or redirect().

server:
  post "/api/login" do
    user = db.users.insert({ email: body.email })
    return json({ ok: true, name: body.email })

db:

Defines database tables and fields. Types include int, string, bool.

db:
  table users:
    id int primary
    email string

Variable Embedding

Use :variable inside strings in the data: block or HTML.

h1 "Hello :name"

Supported HTML Tags

h1, h2, div, form, input, button, p, a, ul, li

Event attributes:

@submit, @click, @link