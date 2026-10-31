import type { ParsedMessage, Sender, Thread } from "~/types/mail";

const timeFormat = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" });
const monthDayFormat = new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" });
const shortDateFormat = new Intl.DateTimeFormat(undefined, {
  year: "2-digit",
  month: "numeric",
  day: "numeric",
});
const fullFormat = new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" });

/** List date: "10:24" today, "Oct 28" this year, "1/5/25" older. */
export function formatMailDate(iso: string, now: Date = new Date()): string {
  const date = new Date(iso);
  if (date.toDateString() === now.toDateString()) return timeFormat.format(date);
  if (date.getFullYear() === now.getFullYear()) return monthDayFormat.format(date);
  return shortDateFormat.format(date);
}

/** Thread date: "Oct 30, 2026, 10:24 AM". */
export function formatFullDate(iso: string): string {
  return fullFormat.format(new Date(iso));
}

export function displayName(sender: Sender): string {
  return sender.name || sender.email;
}

export function initials(sender: Sender): string {
  const parts = displayName(sender)
    .split(/[\s@.]+/)
    .filter(Boolean);
  return parts
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
}

export function latestMessage(thread: Thread): ParsedMessage {
  return thread.messages[thread.messages.length - 1]!;
}

export function isUnread(thread: Thread): boolean {
  return thread.messages.some((message) => message.unread);
}
