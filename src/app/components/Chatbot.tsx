import { useState, useEffect } from 'react';
import { X as XIcon, ThumbsUp as ThumbsUpIcon, Mail as MailIcon, ChevronRight as ChevronRightIcon, ExternalLink as ExternalLinkIcon, PlayCircle as PlayCircleIcon, Send as SendIcon } from 'lucide-react';
import orbiMascot from '../../assets/orbi_oficial.png';

interface ChatbotProps {
  onShowTutorial?: () => void;
}

type FeedbackCategory = {
  id: string;
  label: string;
  emoji: string;
  color: string;
  hoverColor: string;
  borderColor: string;
  textColor: string;
};

const FEEDBACK_CATEGORIES: FeedbackCategory[] = [
  { id: 'elogio',     label: 'Elogio',     emoji: '⭐', color: 'bg-yellow-50',  hoverColor: 'hover:bg-yellow-100', borderColor: 'hover:border-yellow-300 border-yellow-100', textColor: 'text-yellow-600' },
  { id: 'feedback',   label: 'Feedback',   emoji: '💬', color: 'bg-blue-50',    hoverColor: 'hover:bg-blue-100',   borderColor: 'hover:border-blue-300 border-blue-100',     textColor: 'text-blue-600'   },
  { id: 'sugestao',   label: 'Sugestão',   emoji: '💡', color: 'bg-purple-50',  hoverColor: 'hover:bg-purple-100', borderColor: 'hover:border-purple-300 border-purple-100', textColor: 'text-purple-600' },
  { id: 'reclamacao', label: 'Reclamação', emoji: '⚠️', color: 'bg-red-50',     hoverColor: 'hover:bg-red-100',    borderColor: 'hover:border-red-300 border-red-100',       textColor: 'text-red-500'    },
  { id: 'informacao', label: 'Informação', emoji: 'ℹ️', color: 'bg-slate-50',   hoverColor: 'hover:bg-slate-100',  borderColor: 'hover:border-slate-300 border-slate-100',   textColor: 'text-slate-500'  },
];

export default function Chatbot({ onShowTutorial }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'main' | 'support' | 'feedback-category'>('main');
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout>;
    let loopInterval: ReturnType<typeof setInterval>;

    const triggerTooltip = () => {
      setShowTooltip(true);
      hideTimer = setTimeout(() => setShowTooltip(false), 30000);
    };

    const initialTimer = setTimeout(() => {
      triggerTooltip();
      loopInterval = setInterval(triggerTooltip, 150000);
    }, 2000);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(hideTimer);
      clearInterval(loopInterval);
    };
  }, []);

  const handleCategorySelect = (_category: FeedbackCategory) => {
    window.open('https://forms.office.com/r/C6CCdQRRHu', '_blank', 'noopener,noreferrer');
    setIsOpen(false);
    setView('main');
  };

  const supportEmail = 'marketing@primecontrol.com.br';

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-['Poppins',sans-serif]">
      {/* Mascot Bubble */}
      {!isOpen && (
        <div className="relative group">
          {showTooltip && (
            <div className="absolute bottom-full right-0 mb-4 bg-white px-4 py-2 rounded-2xl shadow-[0_10px_40px_rgba(0,39,83,0.15)] border border-slate-100 text-[#002753] font-bold text-xs whitespace-nowrap animate-bounce pointer-events-none">
              Dúvidas? Fale comigo!
              <div className="absolute top-full right-6 border-8 border-transparent border-t-white" />
            </div>
          )}
          <button
            onClick={() => { setIsOpen(true); setShowTooltip(false); }}
            className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full shadow-[0_8px_25px_rgba(0,39,83,0.15)] hover:shadow-[0_12px_35px_rgba(0,39,83,0.2)] border border-slate-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <img src={orbiMascot} alt="Orbi" className="w-full h-full object-contain p-1.5 transform transition-transform duration-500 group-hover:scale-110" />
          </button>
        </div>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="w-[320px] sm:w-[380px] bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,39,83,0.2)] border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-500">
          {/* Header */}
          <div className="bg-[#002753] p-6 text-white relative">
            <button onClick={() => { setIsOpen(false); setView('main'); }} className="absolute top-4 right-6 text-white/50 hover:text-white transition-colors p-2">
              <XIcon size={20} />
            </button>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white rounded-2xl overflow-hidden shadow-lg transform -rotate-3 transition-transform">
                <img src={orbiMascot} alt="Orbi" className="w-full h-full object-contain p-1" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-['Titillium_Web',sans-serif] leading-tight">Olá, eu sou o Orbi!</h3>
                <p className="text-blue-100/60 text-xs font-medium">Estou aqui para ajudar você.</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Main menu */}
            {view === 'main' && (
              <div className="space-y-3">
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Bem-vindo ao canal de suporte de assinatura de e-mail da Prime Control. Qual o motivo do seu contato hoje?
                </p>

                <button onClick={() => setView('support')} className="w-full p-4 bg-slate-50 hover:bg-orange-50 border border-slate-100 hover:border-orange-200 rounded-2xl flex items-center justify-between transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-xl shadow-sm text-[#002753] group-hover:text-[#f47920] transition-colors"><MailIcon size={18} /></div>
                    <span className="text-[#002753] font-bold text-sm">Preciso de suporte</span>
                  </div>
                  <ChevronRightIcon size={16} className="text-slate-300 group-hover:text-[#f47920] transition-transform group-hover:translate-x-1" />
                </button>

                <button onClick={() => setView('feedback-category')} className="w-full p-4 bg-slate-50 hover:bg-emerald-50 border border-slate-100 hover:border-emerald-200 rounded-2xl flex items-center justify-between transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-xl shadow-sm text-[#002753] group-hover:text-emerald-500 transition-colors"><ThumbsUpIcon size={18} /></div>
                    <span className="text-[#002753] font-bold text-sm">Eu tenho um feedback</span>
                  </div>
                  <ChevronRightIcon size={16} className="text-slate-300 group-hover:text-emerald-500 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => { if (onShowTutorial) { onShowTutorial(); setIsOpen(false); } }}
                  className="w-full p-4 bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 rounded-2xl flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-xl shadow-sm text-[#002753] group-hover:text-blue-500 transition-colors"><PlayCircleIcon size={18} /></div>
                    <span className="text-[#002753] font-bold text-sm text-left">Como configurar no Outlook</span>
                  </div>
                  <ChevronRightIcon size={16} className="text-slate-300 group-hover:text-blue-500 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            )}

            {/* Support view */}
            {view === 'support' && (
              <div className="space-y-5 animate-in slide-in-from-right duration-300">
                <button onClick={() => setView('main')} className="text-slate-400 hover:text-[#002753] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                  ← VOLTAR
                </button>
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto text-orange-500">
                    <MailIcon size={32} />
                  </div>
                  <h4 className="text-[#002753] font-bold text-lg">Central de Suporte</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Nossa equipe de marketing está pronta para resolver qualquer problema com sua assinatura.
                  </p>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="block text-slate-400 text-[10px] font-bold uppercase mb-1">E-mail de Suporte</span>
                    <span className="text-[#002753] font-bold text-sm select-all">{supportEmail}</span>
                  </div>
                  <a
                    href={`mailto:${supportEmail}?subject=Dúvida sobre Gerador de Assinaturas`}
                    className="w-full py-4 bg-[#f47920] text-white rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-lg active:scale-95"
                  >
                    <SendIcon size={14} />
                    Enviar e-mail agora
                  </a>
                </div>
              </div>
            )}

            {/* Feedback category selection */}
            {view === 'feedback-category' && (
              <div className="space-y-4 animate-in slide-in-from-right duration-300">
                <button onClick={() => setView('main')} className="text-slate-400 hover:text-[#002753] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                  ← VOLTAR
                </button>

                <div className="text-center py-2">
                  <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-500 mb-3">
                    <ThumbsUpIcon size={26} />
                  </div>
                  <h4 className="text-[#002753] font-bold text-base font-['Titillium_Web',sans-serif]">Que tipo de feedback é?</h4>
                  <p className="text-slate-400 text-xs mt-1">Selecione uma categoria para continuar.</p>
                </div>

                <div className="space-y-2">
                  {FEEDBACK_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat)}
                      className={`w-full px-4 py-3 ${cat.color} ${cat.hoverColor} border ${cat.borderColor} rounded-2xl flex items-center justify-between transition-all group active:scale-95`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg leading-none">{cat.emoji}</span>
                        <span className={`font-bold text-sm ${cat.textColor}`}>{cat.label}</span>
                      </div>
                      <ExternalLinkIcon size={14} className="text-slate-300 group-hover:text-slate-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
