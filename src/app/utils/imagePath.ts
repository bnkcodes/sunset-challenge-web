export function imagePath(imagePath?: string): string | undefined {
  if (!imagePath) return;
  return `${import.meta.env.VITE_STORAGE_URL}/${imagePath}`;
}