export function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
}

export function getRelativeTime(date: string): string {
  const now = new Date();
  const past = new Date(date);
  const diff = now.getTime() - past.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return past.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
}

export const funLoadingTexts = [
  "Threading the needles... 🧵",
  "Mixing the digital ink... 🎨",
  "Cutting the fabric... ✂️",
  "Warming up the AI loom... 🤖",
  "Stitching pixels together... 🪡",
  "Designing your masterpiece... ✨",
  "Weaving imagination into fabric... 🌈",
  "Adding the final touches... 💫",
];
