import { useState, useCallback, useEffect } from 'react';
import { LucideIcon, Check as CheckIcon, Copy as CopyIcon, ChevronDown as ChevronDownIcon, ChevronUp as ChevronUpIcon, Phone as PhoneIcon, Mail as MailIcon, Play as PlayIcon, Download as DownloadIcon, CheckCircle2 as CheckCircle2Icon, AlertCircle as AlertCircleIcon, Loader2 as Loader2Icon, RotateCcw as RotateCcwIcon, PlayCircle as PlayCircleIcon, X as XIcon } from 'lucide-react';
import imgPrimeControl from "figma:asset/a0d2e91fe30a3ed67d7934c34a6512e942d5c35b.png";
import Chatbot from './components/Chatbot.tsx';

interface FormData {
  nome: string;
  email: string;
  cargo: string;
  celularDDD: string;
  celularNumero: string;
  telefoneDDD: string;
  telefoneNumero: string;
}

interface FormErrors {
  nome?: string;
  email?: string;
  cargo?: string;
  celularDDD?: string;
  celularNumero?: string;
}

export default function App() {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    cargo: '',
    celularDDD: '',
    celularNumero: '',
    telefoneDDD: '',
    telefoneNumero: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [showHtmlCode, setShowHtmlCode] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showTutorialModal, setShowTutorialModal] = useState(false);

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 4) return numbers;
    if (numbers.length <= 8) return `${numbers.slice(0, 4)}-${numbers.slice(4)}`;
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 9)}`;
  };

  const validateField = useCallback((name: keyof FormData, value: string) => {
    let error = '';
    
    if (name === 'nome' && value.trim().length < 3) {
      error = value.trim().length === 0 ? 'Este campo é obrigatório' : 'Nome muito curto';
    } else if (name === 'email') {
      const emailValue = value.toLowerCase();
      const genericDomains = ['gmail.com', 'yahoo.com', 'yahoo.com.br', 'hotmail.com', 'outlook.com', 'live.com', 'icloud.com', 'uol.com.br', 'bol.com.br', 'ig.com.br', 'terra.com.br'];
      const domain = emailValue.split('@')[1];

      if (value.trim().length === 0) {
        error = 'Este campo é obrigatório';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = 'E-mail corporativo inválido';
      } else if (domain && genericDomains.includes(domain)) {
        error = 'Por favor, utilize seu e-mail corporativo';
      }
    } else if (name === 'cargo' && value.trim().length < 3) {
      error = value.trim().length === 0 ? 'Este campo é obrigatório' : 'Cargo muito curto';
    } else if (name === 'celularDDD') {
      const len = value.replace(/\D/g, '').length;
      if (len > 0 && len < 2) error = 'DDD incompleto';
    } else if (name === 'celularNumero') {
      const len = value.replace(/\D/g, '').length;
      if (len > 0 && len < 8) error = 'Número incompleto';
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    let finalValue = value;

    if (id === 'celularNumero' || id === 'telefoneNumero') {
      finalValue = formatPhone(value);
    } else if (id === 'celularDDD' || id === 'telefoneDDD') {
      finalValue = value.replace(/\D/g, '').slice(0, 2);
    }

    setFormData(prev => ({ ...prev, [id]: finalValue }));
    if (errors[id as keyof FormErrors]) {
      validateField(id as keyof FormData, finalValue);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isNomeValid = validateField('nome', formData.nome);
    const isEmailValid = validateField('email', formData.email);
    const isCargoValid = validateField('cargo', formData.cargo);
    
    let isPhonePairValid = true;
    const isDDDValid = validateField('celularDDD', formData.celularDDD);
    const isNumValid = validateField('celularNumero', formData.celularNumero);

    if (formData.celularDDD.length > 0 || formData.celularNumero.length > 0) {
      if (formData.celularDDD.replace(/\D/g, '').length < 2) {
        setErrors(prev => ({ ...prev, celularDDD: 'DDD incompleto' }));
        isPhonePairValid = false;
      }
      if (formData.celularNumero.replace(/\D/g, '').length < 8) {
        setErrors(prev => ({ ...prev, celularNumero: 'Número incompleto' }));
        isPhonePairValid = false;
      }
    }

    if (isNomeValid && isEmailValid && isCargoValid && isDDDValid && isNumValid && isPhonePairValid) {
      setIsGenerating(true);
      
      setTimeout(() => {
        setIsGenerating(false);
        try {
          const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
          audio.volume = 0.5;
          audio.play().catch(e => console.log('Audio error:', e));
        } catch (err) {
          // ignore
        }

        setCurrentStep(2);
        setCopied(false);
        setShowVideo(false);
        setSubmitError(false);
      }, 750);
    } else {
      setSubmitError(true);
      setTimeout(() => setSubmitError(false), 5000);
    }
  };

  const isEmailFormatInvalid = formData.email.trim().length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  const generateSignatureHtml = () => {
    const baseUrl = window.location.origin;
    const celularFormatado = (formData.celularDDD && formData.celularNumero) ? `(${formData.celularDDD}) ${formData.celularNumero}` : '';
    const telefoneFormatado = (formData.telefoneDDD && formData.telefoneNumero) ? `(${formData.telefoneDDD}) ${formData.telefoneNumero}` : '';

    return `
<div style="font-family: 'Titillium Web', Tahoma, Arial, sans-serif; max-width: 650px; color: #002753;">
  <table width="600" border="0" cellpadding="0" cellspacing="0" style="width:100%; max-width:600px; border-collapse: collapse;">
    <tr>
      <td width="160" align="center" valign="middle" style="width:160px; text-align:center; padding-right:15px; vertical-align:middle;">
        <img src="${baseUrl}/logo-prime.png" width="150" alt="Prime Control" style="width:150px; display:block; margin:0 auto; border:0;">
      </td>

      <td width="2" align="center" valign="middle" style="width:2px; vertical-align:middle; background-color: #F47920;">
        <img src="${baseUrl}/line.png" width="2" alt="|" style="display:block; border:0;">
      </td>

      <td align="left" valign="middle" style="padding-left:20px; vertical-align:middle; text-align:left;">
        <div style="font-size:18px; font-weight:bold; color:#002753; margin:0; line-height: 1.2; text-transform: uppercase;">
          ${formData.nome}
        </div>

        <div style="font-size:14px; font-weight:700; color:#F47920; margin:4px 0 10px 0; line-height: 1.2;">
          ${formData.cargo}
        </div>

        <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
          <tr>
            <td valign="middle" style="padding-bottom:5px;">
              <img src="${baseUrl}/icon-email.png" width="12" style="display:block; border:0;" alt="Email">
            </td>
            <td valign="middle" style="padding-left:6px; padding-bottom:5px; font-size:12px; color:#002753;">
              ${formData.email}
            </td>
          </tr>

          ${celularFormatado ? `
          <tr>
            <td valign="middle" style="padding-bottom:5px;">
              <img src="${baseUrl}/icon-phone.png" width="12" style="display:block; border:0;" alt="Celular">
            </td>
            <td valign="middle" style="padding-left:6px; padding-bottom:5px; font-size:12px; color:#002753;">
              ${celularFormatado}
            </td>
          </tr>` : ''}

          ${telefoneFormatado ? `
          <tr>
            <td valign="middle" style="padding-bottom:5px;">
              <img src="${baseUrl}/icon-phone.png" width="12" style="display:block; border:0;" alt="Telefone">
            </td>
            <td valign="middle" style="padding-left:6px; padding-bottom:5px; font-size:12px; color:#002753;">
              ${telefoneFormatado}
            </td>
          </tr>` : ''}

          <tr>
            <td colspan="2" valign="middle" style="padding-top:2px; padding-bottom:5px;">
              <a href="https://www.primecontrol.com.br" target="_blank" style="text-decoration:none; color:#002753; font-size:12px;">
                www.primecontrol.com.br
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <div style="font-family: Tahoma, Arial, sans-serif; font-size: 11px; color: #666; margin-top: 20px; line-height: 1.4;">
    -----------------<br />
    As informações contidas nesta mensagem são CONFIDENCIAIS, protegidas pelo sigilo legal e por direitos autorais. 
    A divulgação, distribuição ou reprodução depende de autorização do emissor. 
    Caso tenha recebido por engano, favor avisar imediatamente.
  </div>
</div>`;
  };

  const handleCopy = async () => {
    try {
      const html = generateSignatureHtml();
      const blobHtml = new Blob([html], { type: 'text/html' });
      const clipboardItem = new window.ClipboardItem({ 'text/html': blobHtml });
      await navigator.clipboard.write([clipboardItem]);
      setCopied(true);
      setCurrentStep(3);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy rich text: ', err);
      const signatureText = `${formData.nome}\n${formData.cargo}\n${formData.email}`;
      navigator.clipboard.writeText(signatureText);
      setCopied(true);
      setCurrentStep(3);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(generateSignatureHtml());
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-['Poppins',sans-serif] selection:bg-[#f47920] selection:text-white">
      <header className="bg-[#002753] text-white shadow-md relative z-10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-5 sm:py-6 flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="bg-white/10 p-2 sm:p-2.5 rounded-2xl backdrop-blur-sm shadow-inner transition-transform hover:scale-105 duration-300">
              <img src={imgPrimeControl} alt="Prime Control" className="h-8 sm:h-9 w-auto" />
            </div>
            <div className="h-10 w-px bg-white/20 hidden sm:block mx-1" />
            <div className="font-['Titillium_Web',sans-serif] flex flex-col justify-center">
              <h1 className="text-xl sm:text-[1.65rem] font-bold tracking-tight leading-none mb-1.5 pt-0.5">
                Gerador de Assinaturas de E-mail
              </h1>
              <p className="text-blue-100/70 text-[10px] sm:text-[12px] font-semibold tracking-[0.2em] uppercase leading-none">
                Prime Control
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-white border-b border-slate-200 py-3 shadow-sm sticky top-0 z-30">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between font-['Titillium_Web',sans-serif]">
            <button 
              type="button" 
              onClick={() => setCurrentStep(1)}
              className={`flex items-center gap-2 group transition-opacity ${currentStep > 1 ? 'hover:opacity-80 cursor-pointer' : 'cursor-default'}`}
            >
              <div className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full font-bold text-xs sm:text-sm transition-all duration-500 ${
                currentStep >= 1 ? 'bg-[#f47920] text-white shadow-sm' : 'bg-slate-200 text-slate-500'
              }`}>
                {currentStep > 1 ? <CheckIcon size={16} strokeWidth={3} className="animate-in zoom-in-50 duration-300" /> : '1'}
              </div>
              <span className={`font-semibold text-xs sm:text-[15px] hidden sm:inline transition-colors ${currentStep >= 1 ? 'text-[#002753]' : 'text-slate-500'}`}>Preencher dados</span>
            </button>

            <div className="flex-1 h-[2px] bg-slate-200 mx-4 sm:mx-8 rounded-full overflow-hidden">
              <div className={`h-full transition-all duration-700 ease-in-out ${currentStep >= 2 ? 'bg-[#f47920] w-full' : 'bg-transparent w-0'}`} />
            </div>

            <button 
              type="button"
              onClick={() => { if (currentStep >= 2) setCurrentStep(2); }}
              disabled={currentStep < 2}
              className={`flex items-center gap-2 group transition-opacity ${currentStep > 2 ? 'hover:opacity-80 cursor-pointer' : 'cursor-default'}`}
            >
              <div className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full font-bold text-xs sm:text-sm transition-all duration-500 ${
                currentStep >= 2 ? 'bg-[#f47920] text-white shadow-sm' : 'bg-[#e2e8f0] text-slate-500'
              }`}>
                {currentStep > 2 ? <CheckIcon size={16} strokeWidth={3} className="animate-in zoom-in-50 duration-300" /> : '2'}
              </div>
              <span className={`font-semibold text-xs sm:text-[15px] hidden sm:inline transition-colors ${currentStep >= 2 ? 'text-[#002753]' : 'text-slate-500'}`}>Gerar assinatura</span>
            </button>

            <div className="flex-1 h-[2px] bg-slate-200 mx-4 sm:mx-8 rounded-full overflow-hidden">
              <div className={`h-full transition-all duration-700 ease-in-out ${currentStep >= 3 ? 'bg-[#f47920] w-full' : 'bg-transparent w-0'}`} />
            </div>

            <button 
              type="button"
              onClick={() => { if (currentStep >= 3) setCurrentStep(3); }}
              disabled={currentStep < 3}
              className="flex items-center gap-2 group cursor-default"
            >
              <div className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full font-bold text-xs sm:text-sm transition-all duration-500 ${
                currentStep >= 3 ? 'bg-[#f47920] text-white shadow-sm' : 'bg-[#e2e8f0] text-slate-500'
              }`}>
                {currentStep >= 3 ? <CheckIcon size={16} strokeWidth={3} className="animate-in zoom-in-50 duration-300" /> : '3'}
              </div>
              <span className={`font-semibold text-xs sm:text-[15px] hidden sm:inline transition-colors ${currentStep >= 3 ? 'text-[#002753]' : 'text-slate-500'}`}>Copiar e aplicar</span>
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-[1200px] mx-auto px-4 sm:px-8 py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative pb-10">
          <div className="lg:col-span-5 order-2 lg:order-1 h-full">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 border-l-[6px] border-l-orange-500 p-6 lg:p-8 lg:sticky lg:top-6 z-20 transition-all duration-500">
              <div className="mb-6 font-['Titillium_Web',sans-serif]">
                <h2 className="text-xl sm:text-2xl text-[#002753] font-bold mb-2 tracking-tight leading-tight">
                  Preencha seus dados para criar sua assinatura
                </h2>
                <p className="text-slate-500 text-sm font-medium">
                  Informe as informações essenciais
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="nome" className="block text-[#002753] font-normal mb-1.5 text-[13px] tracking-wide">
                    Nome completo <span className="text-orange-500" aria-hidden="true">*</span>
                  </label>
                  <div className="relative group">
                    <input
                      id="nome"
                      type="text"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      aria-invalid={errors.nome ? 'true' : 'false'}
                      className={`w-full px-4 py-2.5 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all font-sans text-[14px] text-slate-800 placeholder:text-slate-400 placeholder:font-normal font-normal ${
                        errors.nome ? 'border-red-200 focus:border-red-400 shadow-sm shadow-red-100' : 'border-slate-200 focus:border-orange-400'
                      }`}
                      placeholder="Ex: Maria Silva Santos"
                    />
                    {errors.nome && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 animate-in zoom-in-95 duration-300">
                        <AlertCircleIcon size={18} />
                      </div>
                    )}
                  </div>
                  {errors.nome && <p className="mt-1 text-red-500 text-[11px] font-semibold" role="alert">{errors.nome}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-[#002753] font-normal mb-1.5 text-[13px] tracking-wide">
                    E-mail corporativo <span className="text-orange-500" aria-hidden="true">*</span>
                  </label>
                  <div className="relative group">
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => { if(formData.email.trim().length > 0) validateField('email', formData.email) }}
                      required
                      aria-required="true"
                      aria-invalid={errors.email ? 'true' : 'false'}
                      className={`w-full px-4 py-2.5 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all font-sans text-[14px] text-slate-800 placeholder:text-slate-400 placeholder:font-normal font-normal ${
                        errors.email ? 'border-red-200 focus:border-red-400 shadow-sm shadow-red-100' : 'border-slate-200 focus:border-orange-400'
                      }`}
                      placeholder="nome.sobrenome@primecontrol.com.br"
                    />
                    {errors.email && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 animate-in zoom-in-95 duration-300">
                        <AlertCircleIcon size={18} />
                      </div>
                    )}
                  </div>
                  {errors.email && <p className="mt-1 text-red-500 text-[11px] font-semibold" role="alert">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="cargo" className="block text-[#002753] font-normal mb-1.5 text-[13px] tracking-wide">
                    Cargo / Área <span className="text-orange-500" aria-hidden="true">*</span>
                  </label>
                  <div className="relative group">
                    <input
                      id="cargo"
                      type="text"
                      value={formData.cargo}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      aria-invalid={errors.cargo ? 'true' : 'false'}
                      className={`w-full px-4 py-2.5 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all font-sans text-[14px] text-slate-800 placeholder:text-slate-400 placeholder:font-normal font-normal ${
                        errors.cargo ? 'border-red-200 focus:border-red-400 shadow-sm shadow-red-100' : 'border-slate-200 focus:border-orange-400'
                      }`}
                      placeholder="Ex: Analista de Marketing"
                    />
                    {errors.cargo && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 animate-in zoom-in-95 duration-300">
                        <AlertCircleIcon size={18} />
                      </div>
                    )}
                  </div>
                  {errors.cargo && <p className="mt-1 text-red-500 text-[11px] font-semibold" role="alert">{errors.cargo}</p>}
                </div>

                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-3">
                    <label className="block text-[#002753] font-normal mb-1.5 text-[13px] tracking-wide">DDD</label>
                    <input
                      id="celularDDD"
                      type="text"
                      value={formData.celularDDD}
                      onChange={handleChange}
                      className={`w-full px-3 py-2.5 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all font-sans text-[14px] text-slate-800 placeholder:text-slate-400 placeholder:font-normal font-normal text-center ${
                        errors.celularDDD ? 'border-red-200 focus:border-red-400' : 'border-slate-200 focus:border-orange-400'
                      }`}
                      placeholder="00"
                      maxLength={2}
                    />
                  </div>
                  <div className="col-span-9">
                    <label className="block text-[#002753] font-normal mb-1.5 text-[13px] tracking-wide">Celular</label>
                    <input
                      id="celularNumero"
                      type="text"
                      value={formData.celularNumero}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all font-sans text-[14px] text-slate-800 placeholder:text-slate-400 placeholder:font-normal font-normal ${
                        errors.celularNumero ? 'border-red-200 focus:border-red-400' : 'border-slate-200 focus:border-orange-400'
                      }`}
                      placeholder="00000-0000"
                    />
                  </div>
                </div>
                {(errors.celularDDD || errors.celularNumero) && <p className="mt-1 text-red-500 text-[11px] font-semibold" role="alert">{errors.celularDDD || errors.celularNumero}</p>}

                <div>
                  <button
                    type="button"
                    onClick={() => setShowMoreInfo(!showMoreInfo)}
                    className="flex items-center gap-2 text-[#002753] hover:text-orange-500 transition-all font-semibold text-sm tracking-tight group"
                  >
                    <div className="transition-transform duration-300 group-hover:scale-110">
                      {showMoreInfo ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
                    </div>
                    Dados adicionais
                  </button>

                  {showMoreInfo && (
                    <div className="mt-3 p-4 bg-slate-50/50 rounded-2xl space-y-4 border border-slate-100 animate-in slide-in-from-top-2 fade-in duration-300">
                      <div className="grid grid-cols-12 gap-3">
                        <div className="col-span-3">
                          <label className="block text-[#002753] font-normal mb-1.5 text-[11px] uppercase tracking-wider">DDD</label>
                          <input
                            id="telefoneDDD"
                            type="text"
                            value={formData.telefoneDDD}
                            onChange={handleChange}
                            className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20 transition-all font-sans text-slate-800 placeholder:text-slate-400 placeholder:font-normal font-normal text-center text-[14px]"
                            placeholder="00"
                            maxLength={2}
                          />
                        </div>
                        <div className="col-span-9">
                          <label className="block text-[#002753] font-normal mb-1.5 text-[11px] uppercase tracking-wider">Telefone Fixo</label>
                          <input
                            id="telefoneNumero"
                            type="text"
                            value={formData.telefoneNumero}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20 transition-all font-sans text-slate-800 placeholder:text-slate-400 placeholder:font-normal font-normal text-[14px]"
                            placeholder="0000-0000"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isGenerating || isEmailFormatInvalid}
                    className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-[13px] transition-all shadow-lg flex items-center justify-center gap-3 active:scale-95 ${
                      !isGenerating && !isEmailFormatInvalid
                        ? 'bg-[#f47920] text-white hover:bg-orange-600 hover:shadow-orange-500/30 transform hover:-translate-y-0.5'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed grayscale bg-opacity-70'
                    }`}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2Icon size={18} className="animate-spin" />
                        <span>Gerando...</span>
                      </>
                    ) : (
                      <span>Criar assinatura digital</span>
                    )}
                  </button>

                  {submitError && (
                    <div className="flex items-center justify-center gap-2 text-red-500 font-semibold text-xs mt-4 animate-in fade-in slide-in-from-top-1">
                      <AlertCircleIcon size={14} />
                      <span>Revise os campos obrigatórios acima.</span>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden font-['Poppins',sans-serif]">
                  <div className="p-6 pb-4">
                    <h3 className="text-[#002753] font-bold text-lg font-['Titillium_Web',sans-serif] tracking-tight">Veja como usar</h3>
                  </div>
                  
                  <div className="px-6 pb-6">
                    {!showVideo ? (
                      <div 
                        onClick={() => setShowVideo(true)}
                        className="relative rounded-2xl overflow-hidden aspect-video cursor-pointer hover:shadow-2xl transition-all duration-700 group ring-4 ring-slate-50"
                      >
                        <img 
                          src="https://img.youtube.com/vi/XCpDXNuEbos/maxresdefault.jpg" 
                          alt="Tutorial" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-[#002753]/40 flex items-center justify-center group-hover:bg-[#002753]/20 transition-colors">
                          <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-[360deg]">
                            <PlayIcon size={28} className="text-[#f47920] ml-1" fill="currentColor" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-2xl overflow-hidden aspect-video shadow-2xl animate-in zoom-in-95 duration-500">
                        <iframe 
                          width="100%" 
                          height="100%" 
                          src="https://www.youtube.com/embed/XCpDXNuEbos?autoplay=1" 
                          title="Tutorial Prime Control" 
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                          allowFullScreen
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-10 flex flex-col items-center justify-center text-center transition-colors min-h-[300px]">
                  <div className="bg-slate-100 p-5 rounded-full mb-4 text-slate-400">
                    <MailIcon size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-[#002753] font-['Titillium_Web',sans-serif] mb-2 tracking-tight">Sua assinatura aparecerá aqui</h3>
                  <p className="text-slate-500 text-[13px] font-medium max-w-[280px] leading-relaxed font-['Poppins',sans-serif]">
                    Preencha o formulário ao lado e clique em "Criar minha assinatura" para visualizar o resultado
                  </p>
                </div>
              </div>
            )}

            {currentStep >= 2 && (
              <div className="space-y-6 animate-in slide-in-from-right fade-in duration-500 font-['Poppins',sans-serif]">
                <div className="bg-white rounded-[1.5rem] shadow-xl p-8 border border-slate-100 relative">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#002753] font-['Titillium_Web',sans-serif] uppercase tracking-tighter">
                      Resultado Final
                    </h2>
                    <div className="flex items-center justify-center gap-2 text-emerald-600 bg-emerald-50/80 px-4 py-2 rounded-full font-semibold text-sm animate-in fade-in zoom-in-50 duration-700 border border-emerald-200/50 shadow-sm">
                      <CheckCircle2Icon size={18} />
                      <span>Gerada com sucesso!</span>
                    </div>
                  </div>

                  <div className="bg-slate-50/80 rounded-[1.5rem] p-4 sm:p-5 mb-8 border border-slate-100 flex items-center justify-center shadow-inner transition-colors group-hover:bg-slate-100 duration-500">
                    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200/60 w-full overflow-x-auto transform transition-transform group-hover:scale-[1.01] duration-500">
                      <div 
                        dangerouslySetInnerHTML={{ __html: generateSignatureHtml() }}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={handleCopy}
                      aria-label={copied ? "Assinatura copiada" : "Copiar assinatura digital"}
                      className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-[13px] transition-all shadow-lg flex items-center justify-center gap-3 active:scale-95 ${
                        copied ? 'bg-emerald-500 text-white transform scale-[1.02]' : 'bg-[#002753] text-white hover:bg-[#00346f] hover:-translate-y-0.5'
                      }`}
                    >
                      {copied ? <CheckIcon size={24} strokeWidth={3} className="animate-in zoom-in-50" /> : <CopyIcon size={20} />}
                      <span>{copied ? 'Copiado para Clipboard' : 'Copiar Assinatura'}</span>
                    </button>

                    <div className="flex flex-col sm:flex-row items-center gap-4 border-t border-slate-100 pt-6 justify-center">
                      <button 
                        onClick={() => {
                          setFormData({
                            nome: '', email: '', cargo: '',
                            celularDDD: '', celularNumero: '',
                            telefoneDDD: '', telefoneNumero: ''
                          });
                          setErrors({});
                          setCurrentStep(1);
                        }}
                        className="flex items-center gap-2 font-bold text-[#002753] text-[11px] sm:text-[12px] uppercase tracking-wider hover:opacity-80 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all"
                      >
                        <RotateCcwIcon size={14} strokeWidth={2.5} />
                        Criar uma nova assinatura
                      </button>

                      <div className="hidden sm:block w-px h-6 bg-slate-200" />

                      <button 
                        onClick={() => setShowTutorialModal(true)}
                        className="flex items-center gap-2 font-bold text-[#002753] text-[11px] sm:text-[12px] uppercase tracking-wider hover:opacity-80 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all"
                      >
                        <PlayCircleIcon size={16} strokeWidth={2.5} />
                        Como configurar
                      </button>
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex flex-col items-center">
                      <button
                        onClick={() => setShowHtmlCode(!showHtmlCode)}
                        aria-expanded={showHtmlCode}
                        className="text-slate-400 hover:text-[#002753] font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 group"
                      >
                        <div className="transition-transform group-hover:scale-110">
                          {showHtmlCode ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
                        </div>
                        Modo Desenvolvedor
                      </button>

                      {showHtmlCode && (
                        <div className="mt-6 w-full animate-in slide-in-from-top-4 fade-in duration-300">
                          <div className="bg-[#1e293b] rounded-2xl p-6 relative group border border-slate-700/50 shadow-2xl">
                            <div className="flex justify-between items-center mb-4">
                              <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]" role="status" aria-live="polite">
                                {copiedHtml ? "HMTL COPIADO!" : "CÓDIGO HTML PRONTO"}
                              </span>
                              <button 
                                onClick={handleCopyHtml}
                                aria-label="Copiar código HTML"
                                className={`p-2.5 rounded-xl transition-all flex items-center justify-center ${copiedHtml ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600 active:scale-90'}`}
                                title="Copiar HTML"
                              >
                                {copiedHtml ? <CheckIcon size={16} className="animate-in zoom-in-50" /> : <CopyIcon size={16} />}
                              </button>
                            </div>
                            <pre className="text-slate-300 text-[10px] font-mono leading-relaxed whitespace-pre-wrap break-all h-32 overflow-y-auto pr-2 custom-scrollbar focus:outline-none" tabIndex={0}>
                              {generateSignatureHtml()}
                            </pre>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="w-full border-t border-slate-200 mt-12 bg-white/50">
        <div className="max-w-[1200px] mx-auto px-6 py-8 text-center">
          <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.3em] font-['Titillium_Web',sans-serif]">
            &copy; 2026 Prime Control — Marketing
          </p>
        </div>
      </footer>
      <Chatbot onShowTutorial={() => setShowTutorialModal(true)} />

      {/* Tutorial Modal */}
      {showTutorialModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[10000] flex items-center justify-center p-4 lg:p-6 font-['Poppins',sans-serif] animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-y-auto custom-scrollbar relative">
            <button 
              onClick={() => setShowTutorialModal(false)} 
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors z-10"
            >
              <XIcon size={20} />
            </button>
            
            <div className="p-6 sm:p-8">
               <h3 className="text-xl sm:text-2xl font-bold text-[#002753] font-['Titillium_Web',sans-serif] mb-5 pr-8 tracking-tight leading-tight">
                 Como configurar sua assinatura
               </h3>
               
               <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-md border border-slate-200 mb-6 aspect-video relative w-full">
                 <iframe 
                   width="100%" 
                   height="100%" 
                   src="https://www.youtube.com/embed/XCpDXNuEbos?autoplay=1" 
                   title="Tutorial Prime Control" 
                   frameBorder="0" 
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                   allowFullScreen
                   className="absolute inset-0"
                 />
               </div>

               <div className="flex justify-center">
                 <a 
                   href="#" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="w-full sm:max-w-sm py-3.5 px-6 bg-[#002753] text-white rounded-xl font-bold hover:bg-[#003875] transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 text-[13px] sm:text-[14px] shadow-sm hover:shadow-md"
                 >
                   <DownloadIcon size={18} />
                   <span>Baixar manual (PPTX)</span>
                 </a>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
