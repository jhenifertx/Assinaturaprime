import { useState, useEffect } from 'react';
import { X as XIcon, MessageSquare as MessageSquareIcon, Send as SendIcon, ThumbsUp as ThumbsUpIcon, Heart as HeartIcon, Mail as MailIcon, ChevronRight as ChevronRightIcon, ExternalLink as ExternalLinkIcon } from 'lucide-react';
import orbiMascot from '../../assets/orbi_oficial.png';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'main' | 'support' | 'feedback'>('main');
  const [feedback, setFeedback] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout>;
    let loopInterval: ReturnType<typeof setInterval>;

    const triggerTooltip = () => {
      setShowTooltip(true);
      hideTimer = setTimeout(() => setShowTooltip(false), 30000); // Fica ativo por 30s
    };

    const initialTimer = setTimeout(() => {
      triggerTooltip();
      // Ciclo total de 150s (30s ativo + 120s escondido)
      loopInterval = setInterval(triggerTooltip, 150000); 
    }, 2000); // Espera 2s ao entrar na página

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(hideTimer);
      clearInterval(loopInterval);
    };
  }, []);

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    
    // Simulate sending
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setFeedback('');
      setView('main');
      setIsOpen(false);
    }, 3000);
  };

  const supportEmail = 'marketing@primecontrol.com.br';

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-['Poppins',sans-serif]">
      {/* Mascot Bubble / Trigger */}
      {!isOpen && (
        <div className="relative group">
          {showTooltip && (
            <div className="absolute bottom-full right-0 mb-4 bg-white px-4 py-2 rounded-2xl shadow-[0_10px_40px_rgba(0,39,83,0.15)] border border-slate-100 text-[#002753] font-bold text-xs whitespace-nowrap animate-bounce pointer-events-none">
              Dúvidas? Fale comigo!
              <div className="absolute top-full right-6 border-8 border-transparent border-t-white" />
            </div>
          )}
          
          <button
            onClick={() => {
              setIsOpen(true);
              setShowTooltip(false);
            }}
            className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full shadow-[0_8px_25px_rgba(0,39,83,0.15)] hover:shadow-[0_12px_35px_rgba(0,39,83,0.2)] border border-slate-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 active:scale-95 group-hover:shadow-orange-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <img 
              src={orbiMascot} 
              alt="Orbi Mascot" 
              className="w-full h-full object-contain p-1.5 transform transition-transform duration-500 group-hover:scale-110"
            />
          </button>
        </div>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="w-[320px] sm:w-[380px] bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,39,83,0.2)] border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-500">
          {/* Header */}
          <div className="bg-[#002753] p-6 text-white relative">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-6 text-white/50 hover:text-white transition-colors p-2"
            >
              <XIcon size={20} />
            </button>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white rounded-2xl overflow-hidden shadow-lg transform -rotate-3 group:hover:rotate-0 transition-transform">
                <img src={orbiMascot} alt="Orbi Mascot" className="w-full h-full object-contain p-1" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-['Titillium_Web',sans-serif] leading-tight">Olá, eu sou o Orbi!</h3>
                <p className="text-blue-100/60 text-xs font-medium">Estou aqui para ajudar você.</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {view === 'main' && (
              <div className="space-y-4">
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Bem-vindo ao canal de suporte de assinatura de e-mail da Prime Control. Qual o motivo do seu contato hoje?
                </p>
                <button 
                  onClick={() => setView('support')}
                  className="w-full p-4 bg-slate-50 hover:bg-orange-50 border border-slate-100 hover:border-orange-200 rounded-2xl flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-xl shadow-sm text-[#002753] group-hover:text-[#f47920] transition-colors">
                      <MailIcon size={18} />
                    </div>
                    <span className="text-[#002753] font-bold text-sm">Preciso de suporte</span>
                  </div>
                  <ChevronRightIcon size={16} className="text-slate-300 group-hover:text-[#f47920] transition-transform group-hover:translate-x-1" />
                </button>

                <a 
                  href="https://forms.office.com/r/C6CCdQRRHu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full p-4 bg-slate-50 hover:bg-emerald-50 border border-slate-100 hover:border-emerald-200 rounded-2xl flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-xl shadow-sm text-[#002753] group-hover:text-emerald-500 transition-colors">
                      <ThumbsUpIcon size={18} />
                    </div>
                    <span className="text-[#002753] font-bold text-sm">Eu tenho um feedback</span>
                  </div>
                  <ExternalLinkIcon size={16} className="text-slate-300 group-hover:text-emerald-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            )}

            {view === 'support' && (
              <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <button 
                  onClick={() => setView('main')}
                  className="text-slate-400 hover:text-[#002753] text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-1"
                >
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

            {view === 'feedback' && (
              <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <button 
                  onClick={() => setView('main')}
                  className="text-slate-400 hover:text-[#002753] text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-1"
                >
                  ← VOLTAR
                </button>
                
                {!isSent ? (
                  <form onSubmit={handleSendFeedback} className="space-y-4">
                    <div className="text-center space-y-2 mb-6">
                      <h4 className="text-[#002753] font-bold text-lg">Sua opinião importa!</h4>
                      <p className="text-slate-500 text-sm">Como tem sido sua experiência com nosso gerador?</p>
                    </div>
                    <textarea 
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      required
                      placeholder="Conte para o Orbi o que você achou..."
                      className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-emerald-400 transition-all text-sm text-slate-700 placeholder:text-slate-400 placeholder:font-normal resize-none"
                    />
                    <button 
                      type="submit"
                      className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all shadow-lg active:scale-95"
                    >
                      <SendIcon size={14} />
                      Enviar Feedback
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-10 animate-in zoom-in-95 duration-500">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-500 mb-6">
                      <HeartIcon size={40} fill="currentColor" />
                    </div>
                    <h4 className="text-[#002753] font-bold text-xl mb-2">Obrigado!</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Sua mensagem foi entregue diretamente ao nosso time de marketing. Você é incrível!
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
