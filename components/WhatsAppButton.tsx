import { socials } from "@/lib/socials";

export function WhatsAppButton({ message }: { message?: string }) {
  const text = encodeURIComponent(message ?? "Hi Luxe Wear, I'd like to order.");
  return (
    <a
      href={`${socials.whatsappLink}?text=${text}`}
      target="_blank"
      aria-label="Order on WhatsApp"
      className="fixed right-[18px] z-40 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg"
      style={{ bottom: "calc(18px + env(safe-area-inset-bottom, 0px))" }}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
        <path d="M20.5 3.5A10.3 10.3 0 0 0 3.6 16.1L2 22l6.1-1.6A10.3 10.3 0 0 0 20.5 3.5ZM12 20a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 20.2 12 8.2 8.2 0 0 1 12 20Zm4.5-6.1c-.2-.1-1.4-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.6 6.6 0 0 1-2-1.2 7.4 7.4 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5s.2-.3.4-.4a1.6 1.6 0 0 0 .2-.4.4.4 0 0 0 0-.4c-.1-.1-.6-1.5-.9-2s-.5-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-1 2.3c0 1.3 1 2.6 1.1 2.8s2 3 4.7 4.2a15.9 15.9 0 0 0 1.6.6 3.8 3.8 0 0 0 1.7.1 2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z" />
      </svg>
    </a>
  );
}
