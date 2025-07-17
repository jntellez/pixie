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

export async function handleQrAction(qrUrl: string, shortUrl: string) {
  try {
    const response = await fetch(qrUrl);
    const blob = await response.blob();
    const file = new File([blob], `qr-code-${shortUrl}.png`, {
      type: blob.type,
    });

    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    if (isMobile) {
      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          files: [file],
          title: "QR Code",
          text: `Scan this ${shortUrl} QR code or share it.`,
        });

        return {
          success: true,
          method: "share",
          message: "QR code shared successfully.",
        };
      } else {
        return {
          success: false,
          method: "share",
          message: "Sharing is not supported on this device.",
        };
      }
    } else {
      if (navigator.clipboard && navigator.clipboard.write) {
        await navigator.clipboard.write([
          new ClipboardItem({
            [blob.type]: blob,
          }),
        ]);

        return {
          success: true,
          method: "copy",
          message: "QR code copied to clipboard.",
        };
      } else {
        return {
          success: false,
          method: "copy",
          message: "Clipboard copy is not supported in this browser.",
        };
      }
    }
  } catch (err) {
    console.error("Failed to handle QR code action", err);
    return {
      success: false,
      method: "unknown",
      message: "Could not process QR code.",
    };
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

      const result = await handleQrAction(qrUrl, link.shortUrl);

      toast({
        title: result.success
          ? result.method === "share"
            ? "Shared"
            : "Copied"
          : "Error",
        description: result.message,
      });
      break;

    default:
      break;
  }
}
