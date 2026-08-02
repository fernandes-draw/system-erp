import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}
export function KanbanModal({ isOpen, onClose, children, title }: ModalProps) {
  if (!isOpen) return null;

  return (
    // Backdrop fixo cobrindo toda a tela
    <div className="fixed inset-0 z-50 flex items-center justify-center" >

      {/* Camada de fundo escuro */}
      <div className="absolute inset-0 bg-black opacity-30" onClick={onClose} />

      {/* Caixa do Modal - Removido 'h-full' para o padding interno respirar */}
      <div className="relative z-10 max-h-[680px] w-full max-w-6xl overflow-y-auto bg-white p-6 md:rounded-lg">



        {/* Botão de Fechar ajustado com margem correta */}
        <button type="button" className="absolute right-4 top-4 text-gray-400 transition-all hover:text-red-400 cursor-pointer" onClick={onClose}>
          <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Cabeçalho do Modal - Ajustado paddings para evitar zeramentos do CSS global */}
        <div className="mb-6 border-b border-blue-200 py-6 text-center">
          <div className="mt-6">
            <h2 className="text-3xl font-semibold text-zinc-600 py-4">{title}</h2>
          </div>
        </div>

        {/* Conteúdo do Formulário */}
        <div className="block w-full clear-both">
          {children}
        </div>
      </div>
    </div>
  );
}