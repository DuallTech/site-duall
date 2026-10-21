/**
 * Ponte para o chatbot que a Duall já utiliza. [DADO A CONFIRMAR: fornecedor e script de instalação]
 * Quando o script do fornecedor estiver na página, ele deve expor `window.DuallChatbot.open()`.
 * Enquanto isso, retorna false e o chamador leva o visitante ao formulário de contato.
 */
export function openChatbot(): boolean {
  if (typeof window === 'undefined') return false;
  const bot = (window as unknown as { DuallChatbot?: { open?: () => void } }).DuallChatbot;
  if (bot?.open) {
    bot.open();
    return true;
  }
  return false;
}
