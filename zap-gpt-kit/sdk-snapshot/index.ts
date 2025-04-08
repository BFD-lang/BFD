// sdk-snapshot/index.ts — example generated SDK output from zap.generate

export function useDB<T extends "posts" | "messages" | "logs">(table: T) {
  return {
    list: () => fetch(`/${table}`).then((res) => res.json()),
    insert: (data: any) =>
      fetch(`/${table}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((res) => res.json()),
  };
}

export function useAuth() {
  return {
    user: { id: "demo", role: "admin" },
  };
}

export async function getPublishedPosts() {
  return fetch("/posts", {
    method: "GET",
  }).then((res) => res.json());
}

export async function postMessage(input: { content: string; sender: string }) {
  return fetch("/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  }).then((res) => res.json());
}

export async function logInteraction(input: {
  prompt: string;
  response: string;
  user_id: string;
}) {
  return fetch("/logs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  }).then((res) => res.json());
}
