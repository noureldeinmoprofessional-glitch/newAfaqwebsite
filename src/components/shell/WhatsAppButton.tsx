import { useTranslations } from "next-intl";

/**
 * Floating WhatsApp button — fixed to the bottom corner on every page, RTL-aware
 * and safe-area aware. Opens a WhatsApp chat in a new tab.
 *
 * NOTE: replace WHATSAPP_NUMBER with the real business WhatsApp number
 * (international format, digits only, no "+", spaces or dashes).
 */
const WHATSAPP_NUMBER = "966110000000"; // placeholder — update to the real number
const PREFILL = "Hello AFAQ Systems, I'd like to know more about your services.";

export function WhatsAppButton() {
  const tc = useTranslations("Common");
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(PREFILL)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={tc("whatsapp")}
      className="group fixed bottom-6 end-6 z-[70] inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-ink-900/25 outline-none ring-white/70 transition-transform duration-300 hover:scale-105 focus-visible:ring-2"
      style={{
        bottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))",
      }}
    >
      {/* WhatsApp glyph */}
      <svg viewBox="0 0 32 32" className="size-7" fill="currentColor" aria-hidden="true">
        <path d="M16.004 3.2c-7.07 0-12.8 5.73-12.8 12.8 0 2.257.59 4.46 1.712 6.402L3.2 28.8l6.57-1.69a12.74 12.74 0 0 0 6.234 1.588h.005c7.07 0 12.8-5.73 12.8-12.8 0-3.42-1.332-6.635-3.75-9.054A12.72 12.72 0 0 0 16.004 3.2Zm0 23.36h-.004a10.56 10.56 0 0 1-5.38-1.473l-.386-.23-3.9 1.003 1.04-3.8-.251-.39a10.53 10.53 0 0 1-1.614-5.57c0-5.872 4.78-10.65 10.657-10.65a10.58 10.58 0 0 1 7.53 3.122 10.56 10.56 0 0 1 3.117 7.535c0 5.873-4.78 10.65-10.655 10.65Zm5.84-7.976c-.32-.16-1.893-.934-2.187-1.04-.293-.107-.507-.16-.72.16-.214.32-.826 1.04-1.013 1.253-.187.214-.373.24-.693.08-.32-.16-1.35-.498-2.573-1.588-.95-.848-1.593-1.895-1.78-2.215-.187-.32-.02-.493.14-.653.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.214.053-.4-.027-.56-.08-.16-.72-1.735-.986-2.375-.26-.624-.524-.54-.72-.55l-.613-.01c-.214 0-.56.08-.853.4-.293.32-1.12 1.094-1.12 2.669 0 1.574 1.146 3.095 1.306 3.308.16.214 2.253 3.44 5.46 4.823.763.33 1.358.527 1.822.675.766.244 1.463.21 2.014.127.614-.092 1.893-.774 2.16-1.52.266-.747.266-1.388.186-1.52-.08-.133-.293-.214-.613-.374Z" />
      </svg>
    </a>
  );
}
