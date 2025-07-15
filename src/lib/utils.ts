import { toast } from "@/hooks/use-toast";
import { Link } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getDateWithFormat(date: Date) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
}

export async function copyQrToClipboard(qrUrl: string) {
  try {
    const response = await fetch(qrUrl);
    const blob = await response.blob();

    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ]);

    return { success: true, message: "QR code copied to clipboard." };
  } catch (err) {
    console.error("Failed to copy QR code", err);
    return { success: false, message: "Could not copy QR code." };
  }
}

export async function handleLinkOptionClick(type: string, link: Link) {
  switch (type) {
    case "copy":
      try {
        await navigator.clipboard.writeText(
          `${process.env.NEXT_PUBLIC_PAGE_URL}/${link.shortUrl}`
        );
        toast({
          title: "Copied",
          description: "Short link copied to clipboard.",
        });
      } catch (err) {
        console.error("Failed to copy:", err);
        toast({ title: "Error", description: "Could not copy to clipboard." });
      }
      break;

    case "qr":
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
        `${process.env.NEXT_PUBLIC_PAGE_URL}/${link.shortUrl}`
      )}`;
      const result = await copyQrToClipboard(qrUrl);
      toast({
        title: result.success ? "Copied" : "Error",
        description: result.message,
      });
      break;

    default:
      break;
  }
}
