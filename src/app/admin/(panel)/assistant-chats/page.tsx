"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";

type AssistantChatSummary = {
  _id: string;
  sessionId: string;
  lastPreview: string;
  messageCount: number;
  pagePath?: string;
  createdAt: string;
  updatedAt: string;
};

export default function AdminAssistantChatsPage() {
  const [items, setItems] = useState<AssistantChatSummary[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await fetch("/api/admin/assistant-chats").then((r) => r.json());
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <>
      <AdminHeader
        title="Assistant Chats"
        description="Visitor conversations with NEBCO Assistance"
      />

      <div className="admin-card overflow-x-auto">
        {loading ? (
          <p className="p-8 text-center text-sm text-[var(--admin-muted)]">Loading...</p>
        ) : items.length === 0 ? (
          <p className="p-8 text-center text-sm text-[var(--admin-muted)]">No chat sessions yet</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Last message</th>
                <th>Messages</th>
                <th>Page</th>
                <th>Started</th>
                <th>Last active</th>
              </tr>
            </thead>
            <tbody>
              {items.map((chat) => (
                <tr key={chat._id}>
                  <td>
                    <Link
                      href={`/admin/assistant-chats/${chat._id}`}
                      className="font-medium text-[var(--brand-charcoal)] hover:text-[var(--brand-red)]"
                    >
                      {chat.lastPreview || "New conversation"}
                    </Link>
                    <p className="mt-0.5 text-xs text-[var(--admin-muted)]">
                      Session {chat.sessionId.slice(0, 8)}...
                    </p>
                  </td>
                  <td>{chat.messageCount}</td>
                  <td className="text-[var(--admin-muted)]">{chat.pagePath ?? "—"}</td>
                  <td className="text-[var(--admin-muted)]">
                    {new Date(chat.createdAt).toLocaleString()}
                  </td>
                  <td className="text-[var(--admin-muted)]">
                    {new Date(chat.updatedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
