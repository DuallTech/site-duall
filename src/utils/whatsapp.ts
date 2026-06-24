export function getWhatsAppGlobalUrl(contextMessage: string) {
  const number = '5511945406289';
  const text = encodeURIComponent(contextMessage);
  return `https://wa.me/${number}?text=${text}`;
}
