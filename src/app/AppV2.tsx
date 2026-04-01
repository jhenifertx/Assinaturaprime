import { useState, useCallback, useEffect } from 'react';
import { LucideIcon, Check as CheckIcon, Copy as CopyIcon, ChevronDown as ChevronDownIcon, ChevronUp as ChevronUpIcon, Phone as PhoneIcon, Mail as MailIcon, Play as PlayIcon, Download as DownloadIcon, CheckCircle2 as CheckCircle2Icon, AlertCircle as AlertCircleIcon, Loader2 as Loader2Icon } from 'lucide-react';
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

export default function AppV2() {
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
  const [showHtmlCode, setShowHtmlCode] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 4) return numbers;
    if (numbers.length <= 8) return `${numbers.slice(0, 4)}-${numbers.slice(4)}`;
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 9)}`;
  };

  const validateField = useCallback((name: keyof FormData, value: string) => {
    let error = '';
    
    if (!value && ['nome', 'email', 'cargo', 'celularDDD', 'celularNumero'].includes(name)) {
      error = 'Este campo é obrigatório';
    } else if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = 'E-mail inválido';
    } else if (name === 'celularDDD' && value.length < 2) {
      error = 'DDD inválido';
    } else if (name === 'celularNumero' && value.replace(/\D/g, '').length < 8) {
      error = 'Número incompleto';
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
    const isDDDValid = validateField('celularDDD', formData.celularDDD);
    const isNumValid = validateField('celularNumero', formData.celularNumero);

    if (isNomeValid && isEmailValid && isCargoValid && isDDDValid && isNumValid) {
      setIsGenerating(true);
      
      // Simulated "Tactile" feedback for the user
      setTimeout(() => {
        setIsGenerating(false);
        setCurrentStep(2);
        setCopied(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 750);
    }
  };

  const generateSignatureHtml = () => {
    // URL base usa o domínio em que o site estiver hospedado para as imagens carregarem em emails.
    const baseUrl = window.location.origin;
    const celularFormatado = (formData.celularDDD && formData.celularNumero) ? `(${formData.celularDDD}) ${formData.celularNumero}` : '';
    const telefoneFormatado = (formData.telefoneDDD && formData.telefoneNumero) ? `(${formData.telefoneDDD}) ${formData.telefoneNumero}` : '';

    return `
<div style="font-family: 'Titillium Web', Tahoma, Arial, sans-serif; max-width: 650px; color: #002753;">
  <p style="font-size:13px; margin: 0 0 15px 0;">Atenciosamente,</p>

  <table width="600" border="0" cellpadding="0" cellspacing="0" style="width:100%; max-width:600px; border-collapse: collapse;">
    <tr>
      <td width="160" align="center" valign="middle" style="width:160px; text-align:center; padding-right:15px; vertical-align:middle;">
        <img src="${baseUrl}/logo-prime.png" width="150" alt="Prime Control" style="width:150px; display:block; margin:0 auto; border:0;">
      </td>

      <td width="2" align="center" valign="middle" style="width:2px; vertical-align:middle; background-color: #F47920;">
        <img src="${baseUrl}/line.png" width="2" alt="|" style="display:block; border:0;">
      </td>

      <td align="left" valign="middle" style="padding-left:20px; vertical-align:middle; text-align:left;">
        <div style="font-size:18px; font-weight:bold; color:#002753; margin:0; line-height: 1.2;">
          ${formData.nome}
        </div>

        <div style="font-size:14px; color:#F47920; margin:4px 0 10px 0; line-height: 1.2;">
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
            <td valign="middle" style="padding-bottom:5px;">
              <img src="${baseUrl}/icon-web.png" width="12" style="display:block; border:0;" alt="Site">
            </td>
            <td valign="middle" style="padding-left:6px; padding-bottom:5px;">
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
      // Fallback if rich text fails
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

  const isFormValid = formData.nome && formData.email && formData.cargo;

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-['Poppins',sans-serif] selection:bg-[#f47920] selection:text-white">
      {/* Header */}
      <header className="bg-[#002753] text-white shadow-md">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="bg-white/10 p-1.5 sm:p-2 rounded-xl backdrop-blur-sm shadow-inner transition-transform hover:scale-105 duration-300">
              <img src={imgPrimeControl} alt="Prime Control" className="h-6 sm:h-8 w-auto" />
            </div>
            <div className="h-8 w-px bg-white/20 hidden sm:block mx-1" />
            <div className="font-['Titillium_Web',sans-serif] flex flex-col justify-center">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight leading-none mb-1">
                Gerador de Assinaturas <span className="text-[#f47920] ml-2 text-xs uppercase tracking-widest hidden sm:inline">V2 Teste</span>
              </h1>
              <p className="text-blue-100/70 text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase leading-none">
                Prime Control
              </p>
            </div>
          </div>
          
          <a href="#" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-colors font-semibold text-sm">
            <DownloadIcon size={16} />
            <span>Manual de Apoio</span>
          </a>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="bg-white border-b border-slate-200 py-3 shadow-sm sticky top-0 z-30">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between font-['Titillium_Web',sans-serif]">
            {/* Step 1 */}
            <div className="flex items-center gap-2 group">
              <div className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full font-bold text-xs sm:text-sm transition-all duration-500 ${
                currentStep >= 1 ? 'bg-[#f47920] text-white shadow-sm' : 'bg-slate-200 text-slate-500'
              }`}>
                {currentStep > 1 ? <CheckIcon size={16} strokeWidth={3} className="animate-in zoom-in-50 duration-300" /> : '1'}
              </div>
              <span className={`font-semibold text-xs sm:text-[15px] hidden sm:inline transition-colors ${currentStep >= 1 ? 'text-[#002753]' : 'text-slate-500'}`}>Preencher dados</span>
            </div>

            <div className="flex-1 h-[2px] bg-slate-200 mx-4 sm:mx-8 rounded-full overflow-hidden">
              <div className={`h-full transition-all duration-700 ease-in-out ${currentStep >= 2 ? 'bg-[#f47920] w-full' : 'bg-transparent w-0'}`} />
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-2 group">
              <div className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full font-bold text-xs sm:text-sm transition-all duration-500 ${
                currentStep >= 2 ? 'bg-[#f47920] text-white shadow-sm' : 'bg-[#e2e8f0] text-slate-500'
              }`}>
                {currentStep > 2 ? <CheckIcon size={16} strokeWidth={3} className="animate-in zoom-in-50 duration-300" /> : '2'}
              </div>
              <span className={`font-semibold text-xs sm:text-[15px] hidden sm:inline transition-colors ${currentStep >= 2 ? 'text-[#002753]' : 'text-slate-500'}`}>Gerar assinatura</span>
            </div>

            <div className="flex-1 h-[2px] bg-slate-200 mx-4 sm:mx-8 rounded-full overflow-hidden">
              <div className={`h-full transition-all duration-700 ease-in-out ${currentStep >= 3 ? 'bg-[#f47920] w-full' : 'bg-transparent w-0'}`} />
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-2 group">
              <div className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full font-bold text-xs sm:text-sm transition-all duration-500 ${
                currentStep >= 3 ? 'bg-[#f47920] text-white shadow-sm' : 'bg-[#e2e8f0] text-slate-500'
              }`}>
                {currentStep >= 3 ? <CheckIcon size={16} strokeWidth={3} className="animate-in zoom-in-50 duration-300" /> : '3'}
              </div>
              <span className={`font-semibold text-xs sm:text-[15px] hidden sm:inline transition-colors ${currentStep >= 3 ? 'text-[#002753]' : 'text-slate-500'}`}>Copiar e aplicar</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 py-6 lg:py-8 space-y-8">
        
        {/* V2 Header Section: Tutorial */}
        {currentStep === 1 && (
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Video Card */}
            <div className="bg-white rounded-[1.5rem] shadow-xl overflow-hidden border border-slate-100 transition-shadow hover:shadow-2xl duration-500 font-['Poppins',sans-serif]">
              <div className="p-6 flex items-center justify-between font-['Titillium_Web',sans-serif]">
                <div>
                  <h3 className="text-xl font-bold text-[#002753] uppercase tracking-tight">Tutorial Rápido</h3>
                  <p className="text-slate-400 text-sm font-medium">Aprenda a aplicar sua nova assinatura</p>
                </div>
              </div>
              <div className="px-8 pb-8">
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
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Form Column */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-[1.5rem] shadow-xl border-l-[6px] border-orange-500 p-6 sm:p-8 lg:sticky lg:top-24 transition-shadow hover:shadow-2xl hover:shadow-orange-500/5 duration-500 h-full">
              <div className="mb-6 font-['Titillium_Web',sans-serif]">
                <h2 className="text-xl sm:text-2xl text-[#002753] font-bold mb-1 tracking-tight">
                  Gere sua assinatura
                </h2>
                <p className="text-slate-500 text-sm font-medium">
                  Preencha os campos abaixo para gerar sua identidade digital.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Nome e sobrenome */}
                <div>
                  <label htmlFor="nome" className="block text-[#002753] font-bold mb-1.5 text-[13px] tracking-wide">
                    Nome completo <span className="text-orange-500" aria-hidden="true">*</span>
                  </label>
                  <div className="relative group">
                    <input
                      id="nome"
                      type="text"
                      value={formData.nome}
                      onChange={handleChange}
                      onBlur={() => validateField('nome', formData.nome)}
                      required
                      aria-required="true"
                      aria-invalid={errors.nome ? 'true' : 'false'}
                      className={`w-full px-4 py-2.5 bg-white border rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all font-sans text-[14px] text-slate-800 placeholder:text-slate-400 placeholder:font-normal font-medium ${
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

                {/* E-mail */}
                <div>
                  <label htmlFor="email" className="block text-[#002753] font-bold mb-1.5 text-[13px] tracking-wide">
                    E-mail corporativo <span className="text-orange-500" aria-hidden="true">*</span>
                  </label>
                  <div className="relative group">
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => validateField('email', formData.email)}
                      required
                      aria-required="true"
                      aria-invalid={errors.email ? 'true' : 'false'}
                      className={`w-full px-4 py-2.5 bg-white border rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all font-sans text-[14px] text-slate-800 placeholder:text-slate-400 placeholder:font-normal font-medium ${
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

                {/* Cargo */}
                <div>
                  <label htmlFor="cargo" className="block text-[#002753] font-bold mb-1.5 text-[13px] tracking-wide">
                    Cargo / Área <span className="text-orange-500" aria-hidden="true">*</span>
                  </label>
                  <div className="relative group">
                    <input
                      id="cargo"
                      type="text"
                      value={formData.cargo}
                      onChange={handleChange}
                      onBlur={() => validateField('cargo', formData.cargo)}
                      required
                      aria-required="true"
                      aria-invalid={errors.cargo ? 'true' : 'false'}
                      className={`w-full px-4 py-2.5 bg-white border rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all font-sans text-[14px] text-slate-800 placeholder:text-slate-400 placeholder:font-normal font-medium ${
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

                {/* Celular */}
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-3">
                    <label className="block text-[#002753] font-bold mb-1.5 text-[13px] tracking-wide">DDD</label>
                    <input
                      id="celularDDD"
                      type="text"
                      value={formData.celularDDD}
                      onChange={handleChange}
                      onBlur={() => validateField('celularDDD', formData.celularDDD)}
                      className={`w-full px-2 py-2.5 bg-white border rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all font-sans text-[14px] text-slate-800 placeholder:text-slate-400 placeholder:font-normal font-bold text-center ${
                        errors.celularDDD ? 'border-red-200 focus:border-red-400' : 'border-slate-200 focus:border-orange-400'
                      }`}
                      placeholder="00"
                      maxLength={2}
                    />
                  </div>
                  <div className="col-span-9">
                    <label className="block text-[#002753] font-bold mb-1.5 text-[13px] tracking-wide">Celular</label>
                    <input
                      id="celularNumero"
                      type="text"
                      value={formData.celularNumero}
                      onChange={handleChange}
                      onBlur={() => validateField('celularNumero', formData.celularNumero)}
                      className={`w-full px-4 py-2.5 bg-white border rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all font-sans text-[14px] text-slate-800 placeholder:text-slate-400 placeholder:font-normal font-medium ${
                        errors.celularNumero ? 'border-red-200 focus:border-red-400' : 'border-slate-200 focus:border-orange-400'
                      }`}
                      placeholder="00000-0000"
                    />
                  </div>
                </div>
                {(errors.celularDDD || errors.celularNumero) && <p className="mt-1 text-red-500 text-[11px] font-semibold" role="alert">Telefone obrigatório ou inválido</p>}

                {/* More Info */}
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
                          <label className="block text-[#002753] font-bold mb-1.5 text-[11px] uppercase tracking-wider">DDD</label>
                          <input
                            id="telefoneDDD"
                            type="text"
                            value={formData.telefoneDDD}
                            onChange={handleChange}
                            className="w-full px-2 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 transition-all font-sans text-slate-800 placeholder:text-slate-400 placeholder:font-normal font-bold text-center text-[14px]"
                            placeholder="00"
                            maxLength={2}
                          />
                        </div>
                        <div className="col-span-9">
                          <label className="block text-[#002753] font-bold mb-1.5 text-[11px] uppercase tracking-wider">Telefone Fixo</label>
                          <input
                            id="telefoneNumero"
                            type="text"
                            value={formData.telefoneNumero}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 transition-all font-sans text-slate-800 placeholder:text-slate-400 placeholder:font-normal font-medium text-[14px]"
                            placeholder="0000-0000"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={!isFormValid || isGenerating}
                    className={`w-full py-4 rounded-[1rem] font-bold uppercase tracking-widest text-sm transition-all shadow-lg font-['Titillium_Web',sans-serif] flex items-center justify-center gap-3 active:scale-95 mt-auto ${
                      isFormValid && !isGenerating
                        ? 'bg-[#f47920] text-white hover:bg-orange-600 hover:shadow-orange-500/30 transform hover:-translate-y-0.5'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed grayscale'
                    }`}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2Icon size={20} className="animate-spin" />
                        <span>Gerando...</span>
                      </>
                    ) : (
                      <span>Criar assinatura digital</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Preview Column */}
          <div className="order-1 lg:order-2 h-full">
            {currentStep === 1 ? (
              <div className="bg-white rounded-[2rem] border-2 border-dashed border-slate-200 p-8 flex flex-col items-center justify-center text-center transition-colors shadow-sm group duration-500 h-full min-h-[500px]">
                <div className="bg-slate-50 p-4 rounded-2xl mb-6 shadow-inner text-slate-300 group-hover:bg-orange-50 transition-colors duration-500">
                  <MailIcon size={40} className="group-hover:text-orange-400 transition-colors duration-500 animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-slate-700 font-['Titillium_Web',sans-serif] uppercase tracking-tighter mb-4">Preview em Tempo Real</h3>
                <p className="text-slate-400 text-sm font-medium max-w-[280px] leading-relaxed font-['Poppins',sans-serif]">
                  Preencha o formulário ao lado para visualizar como sua assinatura ficará, antes de concluí-la.
                </p>
                
                <div className="w-full max-w-sm mt-12 space-y-4 opacity-40 mix-blend-multiply">
                  <div className="flex gap-4 items-center">
                    <div className="w-16 h-16 rounded bg-slate-200 animate-pulse" />
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-slate-200 rounded w-3/4 animate-pulse" />
                      <div className="h-3 bg-slate-200 rounded w-1/2 animate-pulse" />
                    </div>
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className="h-2 bg-slate-200 rounded w-full animate-pulse" />
                    <div className="h-2 bg-slate-200 rounded w-4/5 animate-pulse" />
                    <div className="h-2 bg-slate-200 rounded w-5/6 animate-pulse" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8 animate-in slide-in-from-right fade-in duration-500 font-['Poppins',sans-serif] h-full flex flex-col justify-start">
                {/* Success Banner */}
                <div className="bg-[#10B981] rounded-[2rem] p-6 shadow-xl flex items-center gap-6 text-white relative overflow-hidden transition-transform hover:scale-[1.01] duration-300">
                  <div className="animate-bounce">
                    <CheckCircle2Icon size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-['Titillium_Web',sans-serif] uppercase leading-tight">Excelente!</h3>
                    <p className="text-emerald-50 text-sm font-medium">Sua assinatura foi gerada com total sucesso.</p>
                  </div>
                </div>

                {/* Final Preview */}
                <div className="bg-white rounded-[2rem] shadow-2xl p-8 border border-slate-100 relative group flex-1 flex flex-col">
                  <h2 className="text-2xl font-bold text-[#002753] font-['Titillium_Web',sans-serif] mb-6 uppercase tracking-tighter">
                    Resultado Final
                  </h2>

                  <div className="bg-slate-50 rounded-3xl p-6 mb-8 border border-slate-100 flex items-center justify-center shadow-inner transition-colors group-hover:bg-slate-100 duration-500 flex-1 relative overflow-hidden">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-50 w-full overflow-x-auto transform transition-transform group-hover:scale-[1.02] duration-500">
                      <div 
                        dangerouslySetInnerHTML={{ __html: generateSignatureHtml() }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-4">
                    <button
                      onClick={handleCopy}
                      aria-label={copied ? "Assinatura copiada" : "Copiar assinatura digital"}
                      className={`w-full py-5 rounded-2xl font-bold uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-4 active:scale-95 ${
                        copied ? 'bg-emerald-500 text-white transform scale-[1.02]' : 'bg-[#002753] text-white hover:bg-[#00346f] hover:-translate-y-0.5'
                      }`}
                    >
                      {copied ? <CheckIcon size={24} strokeWidth={3} className="animate-in zoom-in-50" /> : <CopyIcon size={20} />}
                      <span>{copied ? 'Copiado para Clipboard' : 'Copiar Assinatura'}</span>
                    </button>

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

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setCurrentStep(1);
                      setFormData({
                        nome: '', email: '', cargo: '',
                        celularDDD: '', celularNumero: '',
                        telefoneDDD: '', telefoneNumero: ''
                      });
                      setErrors({});
                    }}
                    className="w-full bg-white text-[#002753] shadow border-2 border-slate-100 rounded-2xl hover:text-orange-500 hover:border-orange-500 flex items-center justify-center gap-2 transition-all font-bold text-xs uppercase tracking-widest py-4 hover:tracking-[0.2em] transform duration-300"
                  >
                    Criar uma nova assinatura
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="max-w-[1400px] mx-auto px-16 py-12 text-center">
        <p className="text-slate-600 font-bold text-[10px] uppercase tracking-[0.3em] font-['Titillium_Web',sans-serif]">
          &copy; 2026 Prime Control — Marketing
        </p>
      </footer>
      <Chatbot />
    </div>
  );
}
