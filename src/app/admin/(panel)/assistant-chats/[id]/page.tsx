"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
  createdAt: string;
};

type AssistantChatDetail = {
  _id: string;
  sessionId: string;
  messages: ChatMessage[];
  pagePath?: string;
  userAgent?: string;
  messageCount: number;
  createdAt: string;
  updatedAt: string;
};

export default function AdminAssistantChatDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [chat, setChat] = useState<AssistantChatDetail | null>(null);

  useEffect(() => {
    params.then(({ id }) => {
      fetch(`/api/admin/assistant-chats/${id}`)
        .then((r) => r.json())
        .then((data) => setChat(data));
    });
  }, [params]);

  if (!chat) {
    return <p className="text-[var(--admin-muted)]">Loading...</p>;
  }

  return (
    <>
      <AdminHeader
        title="Chat Session"
        description={`${chat.messageCount} messages · Last active ${new Date(chat.updatedAt).toLocaleString()}`}
      />

      <div className="admin-card mb-6 grid gap-4 p-6 sm:grid-cols-2">
        <div>
          <p className="text-xs text-[var(--admin-muted)]">Session ID</p>
          <p className="font-mono text-sm text-[var(--brand-charcoal)]">{chat.sessionId}</p>
        </div>
        <div>
          <p className="text-xs text-[var(--admin-muted)]">Started on page</p>
          <p className="text-[var(--brand-charcoal)]">{chat.pagePath ?? "Unknown"}</p>
        </div>
        {chat.userAgent ? (
          <div className="sm:col-span-2">
            <p className="text-xs text-[var(--admin-muted)]">Browser</p>
            <p className="text-sm text-[var(--admin-text)]">{chat.userAgent}</p>
          </div>
        ) : null}
      </div>

      <div className="admin-card space-y-3 p-6">
        {chat.messages.map((message, index) => (
          <div
            key={`${message.createdAt}-${index}`}
            className={`max-w-3xl rounded-md px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
              message.role === "user"
                ? "ml-auto bg-[var(--brand-red)]/10 text-[var(--brand-charcoal)]"
                : "bg-[var(--admin-surface-muted)] text-[var(--admin-text)]"
            }`}
          >
            <p className="mb-1 text-[10px] font-semibold tracking-wide uppercase text-[var(--admin-muted)]">
              {message.role === "user" ? "Visitor" : "NEBCO Assistance"} ·{" "}
              {new Date(message.createdAt).toLocaleString()}
            </p>
            {message.text}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Link href="/admin/assistant-chats" className="text-sm text-[var(--brand-red)] hover:underline">
          Back to all chats
        </Link>
      </div>
    </>
  );
}
