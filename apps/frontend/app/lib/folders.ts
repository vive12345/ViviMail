import {
  Archive,
  Clock,
  FileText,
  Inbox,
  OctagonAlert,
  Send,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import type { Folder } from "~/types/mail";

export const FOLDERS: { id: Folder; label: string; icon: LucideIcon }[] = [
  { id: "inbox", label: "Inbox", icon: Inbox },
  { id: "draft", label: "Drafts", icon: FileText },
  { id: "sent", label: "Sent", icon: Send },
  { id: "snoozed", label: "Snoozed", icon: Clock },
  { id: "archive", label: "Archive", icon: Archive },
  { id: "spam", label: "Spam", icon: OctagonAlert },
  { id: "bin", label: "Bin", icon: Trash2 },
];

export function isFolder(value: string | undefined): value is Folder {
  return FOLDERS.some((folder) => folder.id === value);
}

export function getFolderLabel(folder: Folder): string {
  return FOLDERS.find((f) => f.id === folder)?.label ?? folder;
}
